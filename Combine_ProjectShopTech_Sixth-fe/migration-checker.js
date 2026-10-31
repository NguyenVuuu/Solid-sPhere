/**
 * Migration Checker Script
 * Kiểm tra xem còn code nào sử dụng functions/properties cũ không
 */

const fs = require('fs');
const path = require('path');

// Patterns cần tìm (old code)
const OLD_PATTERNS = [
  { pattern: /isManager\s*\(/g, name: 'isManager()', replacement: 'isAdmin()' },
  { pattern: /isEmployee\s*\(/g, name: 'isEmployee()', replacement: 'isCustomerService()' },
  { pattern: /user\.position/g, name: 'user.position', replacement: 'user.role' },
  { pattern: /['"]manager['"]/g, name: '"manager"', replacement: '"admin"' },
  { pattern: /requiredRoles=\{?\[?\s*['"]manager['"]\s*\]?\}?/g, name: 'requiredRoles={["manager"]}', replacement: 'requiredRoles={["admin"]}' },
  { pattern: /requiredRoles=\{?\[?\s*['"]employee['"]\s*\]?\}?/g, name: 'requiredRoles={["employee"]}', replacement: 'requiredRoles={["customer_service"]}' }
];

// Directories to scan
const SCAN_DIRS = [
  'src/components',
  'src/pages',
  'src/services',
  'src/context',
  'src/router'
];

// Files to exclude
const EXCLUDE_FILES = [
  'BUGFIX_isManager_isEmployee.md',
  'MIGRATION_GUIDE.md',
  'migration-checker.js'
];

/**
 * Scan a file for old patterns
 */
function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const findings = [];

    OLD_PATTERNS.forEach(({ pattern, name, replacement }) => {
      const matches = content.match(pattern);
      if (matches && matches.length > 0) {
        findings.push({
          file: filePath,
          pattern: name,
          count: matches.length,
          replacement: replacement
        });
      }
    });

    return findings;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return [];
  }
}

/**
 * Recursively scan directory
 */
function scanDirectory(dir, results = []) {
  try {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      // Skip excluded files
      if (EXCLUDE_FILES.includes(file)) {
        return;
      }

      if (stat.isDirectory()) {
        scanDirectory(filePath, results);
      } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.tsx') || file.endsWith('.ts')) {
        const findings = scanFile(filePath);
        if (findings.length > 0) {
          results.push(...findings);
        }
      }
    });

    return results;
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
    return results;
  }
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Starting Migration Checker...\n');

  let allFindings = [];

  SCAN_DIRS.forEach(dir => {
    console.log(`📂 Scanning ${dir}...`);
    const findings = scanDirectory(dir);
    allFindings.push(...findings);
  });

  console.log('\n' + '='.repeat(80));

  if (allFindings.length === 0) {
    console.log('✅ No old patterns found! Migration is complete.');
  } else {
    console.log(`❌ Found ${allFindings.length} instances of old patterns:\n`);

    // Group by file
    const byFile = {};
    allFindings.forEach(finding => {
      if (!byFile[finding.file]) {
        byFile[finding.file] = [];
      }
      byFile[finding.file].push(finding);
    });

    // Print results
    Object.keys(byFile).forEach(file => {
      console.log(`\n📄 ${file}`);
      byFile[file].forEach(({ pattern, count, replacement }) => {
        console.log(`   ❌ ${pattern} (${count} occurrences) → Should be: ${replacement}`);
      });
    });

    console.log('\n' + '='.repeat(80));
    console.log('\n💡 To fix these issues:');
    console.log('   1. Open each file listed above');
    console.log('   2. Replace old patterns with new ones');
    console.log('   3. Run this script again to verify');
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 Summary:');
  console.log(`   Files scanned: ${Object.keys(byFile).length}`);
  console.log(`   Issues found: ${allFindings.length}`);
  console.log(`   Status: ${allFindings.length === 0 ? '✅ PASS' : '❌ FAIL'}`);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { scanFile, scanDirectory };
