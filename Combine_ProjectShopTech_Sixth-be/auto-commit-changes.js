const { execSync } = require('child_process');
const path = require('path');

console.log('\n' + '='.repeat(80));
console.log('AUTO COMMIT - DETAILED MODE');
console.log('='.repeat(80));

function gitCommand(command) {
    try {
        return execSync(command, { encoding: 'utf-8', stdio: 'pipe' }).trim();
    } catch (error) {
        return error.stdout ? error.stdout.trim() : '';
    }
}

// Check git
try {
    gitCommand('git --version');
} catch (error) {
    console.log('\nERROR: Git not found');
    process.exit(1);
}

// Get status
console.log('\nChecking git status...');
const status = gitCommand('git status --porcelain');

if (!status) {
    console.log('\nNo changes to commit');
    process.exit(0);
}

// Parse files
const lines = status.split('\n').filter(line => line.trim());
const changes = lines.map(line => {
    const statusCode = line.substring(0, 2).trim();
    const filePath = line.substring(3).trim();
    return { status: statusCode, path: filePath };
});

console.log(`Found ${changes.length} changed files\n`);
console.log('='.repeat(80));

// Generate commit message
function getCommitMessage(file) {
    const fileName = path.basename(file.path);
    const dirPath = path.dirname(file.path);
    const ext = path.extname(file.path);
    
    let action = 'Update';
    if (file.status === 'A' || file.status === '??') {
        action = 'Add';
    } else if (file.status === 'D') {
        action = 'Delete';
    } else if (file.status === 'M') {
        action = 'Modify';
    }
    
    // Java files
    if (ext === '.java') {
        const baseName = fileName.replace('.java', '');
        
        if (fileName.includes('Controller')) {
            return `${action} ${baseName} REST controller`;
        } else if (fileName.includes('ServiceImpl')) {
            return `${action} ${baseName.replace('Impl', '')} service implementation`;
        } else if (fileName.includes('Service')) {
            return `${action} ${baseName} service interface`;
        } else if (fileName.includes('Repository')) {
            return `${action} ${baseName} repository interface`;
        } else if (dirPath.includes('entity')) {
            return `${action} ${baseName} entity model`;
        } else if (dirPath.includes('dto')) {
            return `${action} ${baseName} data transfer object`;
        } else if (dirPath.includes('enum')) {
            return `${action} ${baseName} enumeration`;
        } else if (fileName.includes('Application')) {
            return `${action} Spring Boot application class`;
        } else if (fileName.includes('Config')) {
            return `${action} ${baseName} configuration`;
        } else {
            return `${action} ${baseName} class`;
        }
    }
    
    // JavaScript files
    else if (ext === '.js') {
        if (fileName.includes('generate')) {
            return `${action} ${fileName} data generation script`;
        } else if (fileName.includes('check')) {
            return `${action} ${fileName} validation script`;
        } else if (fileName.includes('convert')) {
            return `${action} ${fileName} conversion script`;
        } else if (fileName.includes('scan')) {
            return `${action} ${fileName} scanning utility`;
        } else if (fileName.includes('map')) {
            return `${action} ${fileName} mapping script`;
        } else if (fileName.includes('commit') || fileName.includes('git')) {
            return `${action} ${fileName} git automation script`;
        } else {
            return `${action} ${fileName} script`;
        }
    }
    
    // SQL files
    else if (ext === '.sql') {
        if (fileName.includes('complete')) {
            return `${action} complete database SQL dump`;
        } else if (fileName.includes('additional')) {
            return `${action} additional test data SQL`;
        } else if (fileName.includes('export')) {
            return `${action} database export SQL file`;
        } else if (fileName.includes('migration')) {
            return `${action} database migration script`;
        } else {
            return `${action} ${fileName} SQL file`;
        }
    }
    
    // YAML files
    else if (ext === '.yaml' || ext === '.yml') {
        if (fileName === 'application.yaml' || fileName === 'application.yml') {
            return `${action} Spring Boot application configuration`;
        } else {
            return `${action} ${fileName} configuration file`;
        }
    }
    
    // Properties files
    else if (ext === '.properties') {
        return `${action} ${fileName} properties file`;
    }
    
    // XML files
    else if (ext === '.xml') {
        if (fileName === 'pom.xml') {
            return `${action} Maven project configuration`;
        } else {
            return `${action} ${fileName} XML configuration`;
        }
    }
    
    // Markdown files
    else if (ext === '.md') {
        return `${action} ${fileName} documentation`;
    }
    
    // JSON files
    else if (ext === '.json') {
        return `${action} ${fileName} JSON configuration`;
    }
    
    // Git files
    else if (fileName === '.gitignore') {
        return `${action} git ignore rules`;
    } else if (fileName === '.gitattributes') {
        return `${action} git attributes configuration`;
    }
    
    // Maven wrapper
    else if (fileName === 'mvnw' || fileName === 'mvnw.cmd') {
        return `${action} Maven wrapper script`;
    }
    
    // Other files
    else {
        return `${action} ${fileName}`;
    }
}

// Commit each file
console.log('\nStarting commits...\n');

let commitCount = 0;
let failedCount = 0;

changes.forEach((change, index) => {
    try {
        const message = getCommitMessage(change);
        
        gitCommand(`git add "${change.path}"`);
        
        const result = gitCommand(`git commit -m "${message}"`);
        
        if (result) {
            commitCount++;
            console.log(`[${commitCount}] ${message}`);
            console.log(`    File: ${change.path}`);
            console.log('');
        } else {
            failedCount++;
            console.log(`[SKIP] ${change.path}`);
            console.log('');
        }
        
    } catch (error) {
        failedCount++;
        console.log(`[ERROR] ${change.path}`);
        console.log(`    ${error.message}`);
        console.log('');
    }
});

console.log('='.repeat(80));
console.log('\nSUMMARY:');
console.log(`  Total files: ${changes.length}`);
console.log(`  Successful: ${commitCount}`);
console.log(`  Failed: ${failedCount}`);
console.log('\n' + '='.repeat(80));

if (commitCount > 0) {
    console.log('\nCommits completed!');
    console.log('\nYou can push with:');
    console.log('  git push origin NewBackEnd');
    
    console.log('\nLast 5 commits:');
    console.log('='.repeat(80));
    const log = gitCommand('git log --oneline -5');
    console.log(log);
} else {
    console.log('\nNo commits made');
}

console.log('\n' + '='.repeat(80));
console.log('DONE');
console.log('='.repeat(80) + '\n');
