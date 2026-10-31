#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Function to scan directory recursively
function scanDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      scanDirectory(filePath, fileList);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to check if file uses i18n
function checkI18nUsage(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file imports useTranslation
    const hasUseTranslation = content.includes('useTranslation') || content.includes('react-i18next');
    
    // Check if file uses t() function
    const hasTFunction = content.includes('t(') || content.includes('t(');
    
    // Check for hardcoded text patterns
    const hardcodedPatterns = [
      /"[^"]*[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ][^"]*"/g, // Vietnamese text
      /'[^']*[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ][^']*'/g, // Vietnamese text
      /"[A-Z][a-z]+ [A-Z][a-z]+"/g, // English phrases
      /'[A-Z][a-z]+ [A-Z][a-z]+'/g, // English phrases
    ];
    
    const hardcodedText = [];
    hardcodedPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        hardcodedText.push(...matches);
      }
    });
    
    // Filter out common false positives
    const filteredHardcoded = hardcodedText.filter(text => {
      const lowerText = text.toLowerCase();
      return !lowerText.includes('console.log') && 
             !lowerText.includes('error') &&
             !lowerText.includes('loading') &&
             !lowerText.includes('success') &&
             !lowerText.includes('warning') &&
             !lowerText.includes('debug') &&
             !lowerText.includes('test') &&
             !lowerText.includes('mock') &&
             !lowerText.includes('api') &&
             !lowerText.includes('url') &&
             !lowerText.includes('http') &&
             !lowerText.includes('css') &&
             !lowerText.includes('class') &&
             !lowerText.includes('id') &&
             !lowerText.includes('src') &&
             !lowerText.includes('alt') &&
             !lowerText.includes('href') &&
             !lowerText.includes('type') &&
             !lowerText.includes('name') &&
             !lowerText.includes('value') &&
             text.length > 10; // Only check longer strings
    });
    
    return {
      filePath,
      hasUseTranslation,
      hasTFunction,
      hardcodedText: filteredHardcoded,
      needsI18n: filteredHardcoded.length > 0 && (!hasUseTranslation || !hasTFunction)
    };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

// Main function
function main() {
  console.log(`${colors.cyan}${colors.bright}🔍 Checking i18n usage in React components...${colors.reset}\n`);
  
  const srcDir = path.join(__dirname, 'src');
  const files = scanDirectory(srcDir);
  
  let totalFiles = 0;
  let filesWithI18n = 0;
  let filesNeedingI18n = 0;
  const issues = [];
  
  files.forEach(file => {
    const result = checkI18nUsage(file);
    if (result) {
      totalFiles++;
      
      if (result.hasUseTranslation && result.hasTFunction) {
        filesWithI18n++;
      }
      
      if (result.needsI18n) {
        filesNeedingI18n++;
        issues.push(result);
      }
    }
  });
  
  // Print summary
  console.log(`${colors.green}✅ Files with proper i18n: ${filesWithI18n}/${totalFiles}${colors.reset}`);
  console.log(`${colors.yellow}⚠️  Files needing i18n: ${filesNeedingI18n}${colors.reset}`);
  console.log(`${colors.blue}📁 Total files scanned: ${totalFiles}${colors.reset}\n`);
  
  // Print detailed issues
  if (issues.length > 0) {
    console.log(`${colors.red}${colors.bright}🚨 Files that need i18n attention:${colors.reset}\n`);
    
    issues.forEach(issue => {
      const relativePath = path.relative(process.cwd(), issue.filePath);
      console.log(`${colors.red}📄 ${relativePath}${colors.reset}`);
      
      if (!issue.hasUseTranslation) {
        console.log(`   ${colors.yellow}❌ Missing useTranslation import${colors.reset}`);
      }
      
      if (!issue.hasTFunction) {
        console.log(`   ${colors.yellow}❌ Missing t() function usage${colors.reset}`);
      }
      
      if (issue.hardcodedText.length > 0) {
        console.log(`   ${colors.magenta}📝 Hardcoded text found:${colors.reset}`);
        issue.hardcodedText.slice(0, 3).forEach(text => {
          console.log(`      ${colors.cyan}"${text}"${colors.reset}`);
        });
        if (issue.hardcodedText.length > 3) {
          console.log(`      ${colors.cyan}... and ${issue.hardcodedText.length - 3} more${colors.reset}`);
        }
      }
      
      console.log('');
    });
  } else {
    console.log(`${colors.green}${colors.bright}🎉 All files are properly using i18n!${colors.reset}`);
  }
  
  // Print recommendations
  if (filesNeedingI18n > 0) {
    console.log(`${colors.blue}${colors.bright}💡 Recommendations:${colors.reset}`);
    console.log(`1. Add ${colors.cyan}import { useTranslation } from 'react-i18next';${colors.reset}`);
    console.log(`2. Add ${colors.cyan}const { t } = useTranslation();${colors.reset} inside component`);
    console.log(`3. Replace hardcoded text with ${colors.cyan}t('key')${colors.reset}`);
    console.log(`4. Add corresponding keys to translation files (en.json, vi.json)`);
  }
}

// Run the checker
main();
