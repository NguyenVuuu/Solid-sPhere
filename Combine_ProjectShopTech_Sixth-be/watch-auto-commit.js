/*
  Auto-commit watcher for maximum commit granularity.
  - Commits EACH changed file individually, as soon as possible
  - Scans periodically to catch missed changes (e.g., bulk edits)
  - Ignores common build/output folders
  Usage:
    node watch-auto-commit.js [--interval 5] [--scan-interval 10] [--push origin branch]
*/

const { exec, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ---------------------- Config (can be overridden via CLI) ----------------------
const args = process.argv.slice(2);
function getArg(name, def) {
  const idx = args.indexOf(`--${name}`);
  if (idx !== -1 && idx + 1 < args.length) return args[idx + 1];
  return def;
}

const commitIntervalSeconds = Number(getArg('interval', '2')); // per-file debounce seconds (default faster)
const scanIntervalSeconds = Number(getArg('scan-interval', '8')); // periodic scan seconds (default faster)
const pushRemote = (() => {
  const idx = args.indexOf('--push');
  if (idx !== -1 && idx + 2 < args.length) return { remote: args[idx + 1], branch: args[idx + 2] };
  return null;
})();

const repoRoot = process.cwd();

const ignoreDirs = new Set([
  '.git',
  'target',
  'node_modules',
  '.idea',
  '.vscode',
  'out'
]);

// --------------------------------------------------------------------------------

function run(cmd) {
  return new Promise((resolve) => {
    exec(cmd, { cwd: repoRoot }, (err, stdout, stderr) => {
      resolve({ ok: !err, stdout: (stdout || '').trim(), stderr: (stderr || '').trim() });
    });
  });
}

function runSync(cmd) {
  try {
    return execSync(cmd, { cwd: repoRoot, encoding: 'utf-8', stdio: 'pipe' }).trim();
  } catch (e) {
    return '';
  }
}

function isGitAvailable() {
  try { execSync('git --version', { stdio: 'ignore' }); return true; } catch { return false; }
}

function isIgnored(filePath) {
  const rel = path.relative(repoRoot, filePath).replace(/\\/g, '/');
  const parts = rel.split('/');
  return parts.some((p) => ignoreDirs.has(p));
}

function commitMessageFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const base = path.basename(filePath);
  if (ext === '.java') return `chore(java): update ${base}`;
  if (ext === '.yaml' || ext === '.yml') return `chore(config): update ${base}`;
  if (ext === '.xml') return base === 'pom.xml' ? 'chore(maven): update pom.xml' : `chore(xml): update ${base}`;
  if (ext === '.sql') return `chore(sql): update ${base}`;
  if (ext === '.js') return `chore(js): update ${base}`;
  if (ext === '.md') return `docs: update ${base}`;
  return `chore: update ${base}`;
}

async function commitOneFile(relPath) {
  const quoted = `"${relPath.replace(/"/g, '\\"')}"`;
  await run(`git add ${quoted}`);
  const msg = commitMessageFor(relPath);
  const result = await run(`git commit -m "${msg.replace(/"/g, '\\"')}"`);
  if (!result.ok && result.stderr.includes('nothing to commit')) {
    return false;
  }
  console.log(`[commit] ${msg}  -> ${relPath}`);
  return result.ok;
}

async function pushIfConfigured() {
  if (!pushRemote) return;
  const { remote, branch } = pushRemote;
  const res = await run(`git push ${remote} ${branch}`);
  if (res.ok) console.log(`[push] ${remote} ${branch}`);
  else console.warn(`[push failed] ${res.stderr || res.stdout}`);
}

// Debounce map per file
const timers = new Map(); // relPath -> timeout

function scheduleCommit(relPath) {
  if (timers.has(relPath)) clearTimeout(timers.get(relPath));
  const timeout = setTimeout(async () => {
    timers.delete(relPath);
    await commitOneFile(relPath);
    await pushIfConfigured();
  }, commitIntervalSeconds * 1000);
  timers.set(relPath, timeout);
}

function watchDir(dir) {
  // Recursive watch using fs.watch; on Windows it supports { recursive: true }
  try {
    const watcher = fs.watch(dir, { recursive: true }, (event, filename) => {
      if (!filename) return;
      const abs = path.resolve(dir, filename.toString());
      if (isIgnored(abs)) return;
      if (!fs.existsSync(abs)) return; // ignore deletions for simplicity
      const rel = path.relative(repoRoot, abs).replace(/\\/g, '/');
      scheduleCommit(rel);
    });
    watcher.on('error', (e) => console.warn('[watch error]', e.message));
    return watcher;
  } catch (e) {
    console.warn('Fallback to periodic scan only (fs.watch not available):', e.message);
    return null;
  }
}

async function scanAndCommitAllPending() {
  // Commit each path individually to maximize commit count
  const status = runSync('git status --porcelain');
  if (!status) return;
  const lines = status.split('\n').map((l) => l.trim()).filter(Boolean);
  for (const line of lines) {
    // formats: "XY path" or "?? path"
    const relPath = line.substring(3).trim();
    if (!relPath) continue;
    if (isIgnored(path.resolve(repoRoot, relPath))) continue;
    await commitOneFile(relPath);
  }
  await pushIfConfigured();
}

async function main() {
  if (!isGitAvailable()) {
    console.error('Git is not available in PATH. Please install Git.');
    process.exit(1);
  }

  console.log('='.repeat(80));
  console.log('AUTO COMMIT WATCHER (maximum commits) v1.1');
  console.log('Repo :', repoRoot);
  console.log('Watch: fs.watch recursive + periodic scan');
  console.log('Debounce per file (s):', commitIntervalSeconds);
  console.log('Scan interval (s)    :', scanIntervalSeconds);
  if (pushRemote) console.log('Push on commit       :', `${pushRemote.remote} ${pushRemote.branch}`);
  console.log('Ignoring dirs        :', Array.from(ignoreDirs).join(', '));
  console.log('='.repeat(80));

  // Initial scan (commit anything already pending, per-file)
  await scanAndCommitAllPending();

  // Start watcher
  const watcher = watchDir(repoRoot);

  // Periodic scan to catch missed changes or deletions/renames
  setInterval(scanAndCommitAllPending, Math.max(2, scanIntervalSeconds) * 1000);

  // Keep process alive
  process.stdin.resume();
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});


