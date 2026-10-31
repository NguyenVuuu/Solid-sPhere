#!/usr/bin/env node

/**
 * I18n Scanner - Phân tích mức độ đa ngôn ngữ trong dự án
 * Tác giả: AI Assistant
 * Ngày tạo: 2025
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cấu hình
const CONFIG = {
  localesPath: './src/i18n/locales',
  supportedLanguages: ['vi', 'en', 'jp'],
  languageNames: {
    vi: 'Tiếng Việt',
    en: 'English',
    jp: '日本語'
  },
  outputFile: './i18n-coverage-report.html'
};

class I18nScanner {
  constructor() {
    this.locales = {};
    this.stats = {
      totalKeys: 0,
      languageStats: {},
      missingTranslations: {},
      duplicateKeys: {},
      emptyValues: {},
      coverage: {}
    };
  }

  /**
   * Đọc và phân tích tất cả file locales
   */
  async scanLocales() {
    console.log('🔍 Đang quét các file locales...');
    
    for (const lang of CONFIG.supportedLanguages) {
      const filePath = path.join(CONFIG.localesPath, `${lang}.json`);
      
      try {
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          this.locales[lang] = JSON.parse(content);
          console.log(`✅ Đã load ${lang}.json (${Object.keys(this.locales[lang]).length} keys)`);
        } else {
          console.log(`❌ Không tìm thấy file ${filePath}`);
          this.locales[lang] = {};
        }
      } catch (error) {
        console.error(`❌ Lỗi khi đọc file ${lang}.json:`, error.message);
        this.locales[lang] = {};
      }
    }
  }

  /**
   * Phân tích chi tiết các keys và translations
   */
  analyzeTranslations() {
    console.log('\n📊 Đang phân tích translations...');
    
    // Lấy tất cả keys từ tất cả languages
    const allKeys = new Set();
    for (const lang in this.locales) {
      this.getAllKeys(this.locales[lang], '', allKeys);
    }
    
    this.stats.totalKeys = allKeys.size;
    console.log(`📝 Tổng số keys: ${this.stats.totalKeys}`);

    // Phân tích từng language
    for (const lang of CONFIG.supportedLanguages) {
      this.analyzeLanguage(lang, allKeys);
    }

    // Tính toán coverage
    this.calculateCoverage();
  }

  /**
   * Lấy tất cả keys từ object (bao gồm nested)
   */
  getAllKeys(obj, prefix = '', keys = new Set()) {
    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.getAllKeys(obj[key], fullKey, keys);
      } else {
        keys.add(fullKey);
      }
    }
  }

  /**
   * Phân tích một language cụ thể
   */
  analyzeLanguage(lang, allKeys) {
    const langKeys = new Set();
    this.getAllKeys(this.locales[lang] || {}, '', langKeys);
    
    const missing = [];
    const empty = [];
    const duplicates = [];

    // Kiểm tra missing keys
    for (const key of allKeys) {
      if (!this.hasKey(this.locales[lang] || {}, key)) {
        missing.push(key);
      } else {
        const value = this.getValue(this.locales[lang] || {}, key);
        if (!value || value.trim() === '') {
          empty.push(key);
        }
      }
    }

    // Kiểm tra duplicate values
    const values = {};
    for (const key of langKeys) {
      const value = this.getValue(this.locales[lang] || {}, key);
      if (value && value.trim() !== '') {
        if (values[value]) {
          if (!duplicates[value]) duplicates[value] = [];
          duplicates[value].push(key);
        } else {
          values[value] = key;
        }
      }
    }

    this.stats.languageStats[lang] = {
      totalKeys: langKeys.size,
      missingKeys: missing.length,
      emptyValues: empty.length,
      duplicateValues: Object.keys(duplicates).length
    };

    this.stats.missingTranslations[lang] = missing;
    this.stats.emptyValues[lang] = empty;
    this.stats.duplicateKeys[lang] = duplicates;

    console.log(`\n📋 ${CONFIG.languageNames[lang]} (${lang}):`);
    console.log(`   • Tổng keys: ${langKeys.size}`);
    console.log(`   • Keys thiếu: ${missing.length}`);
    console.log(`   • Values trống: ${empty.length}`);
    console.log(`   • Values trùng: ${Object.keys(duplicates).length}`);
  }

  /**
   * Kiểm tra xem key có tồn tại trong object không
   */
  hasKey(obj, keyPath) {
    const keys = keyPath.split('.');
    let current = obj;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Lấy value từ key path
   */
  getValue(obj, keyPath) {
    const keys = keyPath.split('.');
    let current = obj;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return null;
      }
    }
    
    return current;
  }

  /**
   * Tính toán coverage percentage
   */
  calculateCoverage() {
    console.log('\n🎯 Tính toán coverage...');
    
    for (const lang of CONFIG.supportedLanguages) {
      const stats = this.stats.languageStats[lang];
      const coverage = ((stats.totalKeys - stats.missingKeys - stats.emptyValues) / this.stats.totalKeys) * 100;
      this.stats.coverage[lang] = Math.round(coverage * 100) / 100;
      
      console.log(`📊 ${CONFIG.languageNames[lang]}: ${this.stats.coverage[lang]}% coverage`);
    }

    // Tính overall coverage
    const totalCoveredKeys = Object.values(this.stats.languageStats)
      .reduce((sum, stats) => sum + (stats.totalKeys - stats.missingKeys - stats.emptyValues), 0);
    const totalPossibleKeys = this.stats.totalKeys * CONFIG.supportedLanguages.length;
    this.stats.overallCoverage = Math.round((totalCoveredKeys / totalPossibleKeys) * 10000) / 100;
    
    console.log(`\n🌟 Tổng coverage: ${this.stats.overallCoverage}%`);
  }

  /**
   * Tạo báo cáo HTML chi tiết
   */
  generateHTMLReport() {
    console.log('\n📄 Đang tạo báo cáo HTML...');
    
    const html = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Báo Cáo Đa Ngôn Ngữ - I18n Coverage</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 20px; 
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            padding: 40px; 
            text-align: center; 
        }
        .header h1 { 
            font-size: 2.5em; 
            margin-bottom: 10px; 
            font-weight: 300;
        }
        .header p { 
            font-size: 1.2em; 
            opacity: 0.9; 
        }
        .content { padding: 40px; }
        .stats-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
            gap: 30px; 
            margin-bottom: 40px; 
        }
        .stat-card { 
            background: #f8f9fa; 
            border-radius: 15px; 
            padding: 30px; 
            text-align: center;
            border-left: 5px solid #667eea;
            transition: transform 0.3s ease;
        }
        .stat-card:hover { transform: translateY(-5px); }
        .stat-number { 
            font-size: 3em; 
            font-weight: bold; 
            color: #667eea; 
            margin-bottom: 10px; 
        }
        .stat-label { 
            color: #6c757d; 
            font-size: 1.1em; 
        }
        .language-section { 
            margin-bottom: 40px; 
        }
        .language-header { 
            background: #667eea; 
            color: white; 
            padding: 20px; 
            border-radius: 10px 10px 0 0; 
            font-size: 1.3em; 
            font-weight: 500;
        }
        .language-content { 
            background: #f8f9fa; 
            padding: 30px; 
            border-radius: 0 0 10px 10px; 
            border: 1px solid #dee2e6;
            border-top: none;
        }
        .coverage-bar { 
            background: #e9ecef; 
            height: 20px; 
            border-radius: 10px; 
            overflow: hidden; 
            margin: 15px 0; 
        }
        .coverage-fill { 
            height: 100%; 
            background: linear-gradient(90deg, #28a745, #20c997); 
            transition: width 0.3s ease; 
            border-radius: 10px;
        }
        .issues-list { 
            margin-top: 20px; 
        }
        .issue-item { 
            background: #fff3cd; 
            border: 1px solid #ffeaa7; 
            padding: 15px; 
            margin: 10px 0; 
            border-radius: 8px; 
            font-family: 'Courier New', monospace; 
            font-size: 0.9em;
        }
        .missing { background: #f8d7da; border-color: #f5c6cb; }
        .empty { background: #fff3cd; border-color: #ffeaa7; }
        .duplicate { background: #d1ecf1; border-color: #bee5eb; }
        .summary { 
            background: linear-gradient(135deg, #28a745, #20c997); 
            color: white; 
            padding: 30px; 
            border-radius: 15px; 
            text-align: center; 
            margin-top: 40px; 
        }
        .summary h2 { 
            font-size: 2em; 
            margin-bottom: 15px; 
            font-weight: 300;
        }
        .summary p { 
            font-size: 1.2em; 
            opacity: 0.9; 
        }
        .footer { 
            text-align: center; 
            padding: 20px; 
            color: #6c757d; 
            border-top: 1px solid #dee2e6; 
            margin-top: 40px; 
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌍 Báo Cáo Đa Ngôn Ngữ</h1>
            <p>Phân tích mức độ i18n trong dự án React</p>
            <p>Generated on: ${new Date().toLocaleString('vi-VN')}</p>
        </div>
        
        <div class="content">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">${this.stats.totalKeys}</div>
                    <div class="stat-label">Tổng số Keys</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${CONFIG.supportedLanguages.length}</div>
                    <div class="stat-label">Ngôn Ngữ Hỗ Trợ</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${this.stats.overallCoverage}%</div>
                    <div class="stat-label">Coverage Tổng Thể</div>
                </div>
            </div>

            ${CONFIG.supportedLanguages.map(lang => `
                <div class="language-section">
                    <div class="language-header">
                        🌐 ${CONFIG.languageNames[lang]} (${lang.toUpperCase()})
                    </div>
                    <div class="language-content">
                        <div class="coverage-bar">
                            <div class="coverage-fill" style="width: ${this.stats.coverage[lang]}%"></div>
                        </div>
                        <p><strong>Coverage: ${this.stats.coverage[lang]}%</strong></p>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0;">
                            <div><strong>Tổng Keys:</strong> ${this.stats.languageStats[lang].totalKeys}</div>
                            <div><strong>Keys Thiếu:</strong> ${this.stats.languageStats[lang].missingKeys}</div>
                            <div><strong>Values Trống:</strong> ${this.stats.languageStats[lang].emptyValues}</div>
                            <div><strong>Values Trùng:</strong> ${this.stats.languageStats[lang].duplicateValues}</div>
                        </div>

                        ${this.stats.missingTranslations[lang].length > 0 ? `
                            <div class="issues-list">
                                <h4>🔍 Keys Thiếu (${this.stats.missingTranslations[lang].length})</h4>
                                ${this.stats.missingTranslations[lang].slice(0, 10).map(key => 
                                    `<div class="issue-item missing">${key}</div>`
                                ).join('')}
                                ${this.stats.missingTranslations[lang].length > 10 ? 
                                    `<div class="issue-item">... và ${this.stats.missingTranslations[lang].length - 10} keys khác</div>` : ''}
                            </div>
                        ` : ''}

                        ${this.stats.emptyValues[lang].length > 0 ? `
                            <div class="issues-list">
                                <h4>⚠️ Values Trống (${this.stats.emptyValues[lang].length})</h4>
                                ${this.stats.emptyValues[lang].slice(0, 5).map(key => 
                                    `<div class="issue-item empty">${key}</div>`
                                ).join('')}
                                ${this.stats.emptyValues[lang].length > 5 ? 
                                    `<div class="issue-item">... và ${this.stats.emptyValues[lang].length - 5} keys khác</div>` : ''}
                            </div>
                        ` : ''}

                        ${Object.keys(this.stats.duplicateKeys[lang]).length > 0 ? `
                            <div class="issues-list">
                                <h4>🔄 Values Trùng Lặp (${Object.keys(this.stats.duplicateKeys[lang]).length})</h4>
                                ${Object.entries(this.stats.duplicateKeys[lang]).slice(0, 3).map(([value, keys]) => 
                                    `<div class="issue-item duplicate">
                                        <strong>"${value}"</strong><br>
                                        Keys: ${keys.join(', ')}
                                    </div>`
                                ).join('')}
                                ${Object.keys(this.stats.duplicateKeys[lang]).length > 3 ? 
                                    `<div class="issue-item">... và ${Object.keys(this.stats.duplicateKeys[lang]).length - 3} values trùng khác</div>` : ''}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('')}

            <div class="summary">
                <h2>📊 Tóm Tắt</h2>
                <p>Dự án hiện tại hỗ trợ ${CONFIG.supportedLanguages.length} ngôn ngữ với tổng coverage ${this.stats.overallCoverage}%</p>
                <p>Để cải thiện i18n, hãy tập trung vào các keys thiếu và values trống</p>
            </div>
        </div>
        
        <div class="footer">
            <p>Generated by I18n Scanner | ${new Date().getFullYear()}</p>
        </div>
    </div>
</body>
</html>`;

    try {
      fs.writeFileSync(CONFIG.outputFile, html, 'utf8');
      console.log(`✅ Đã tạo báo cáo HTML: ${CONFIG.outputFile}`);
    } catch (error) {
      console.error('❌ Lỗi khi tạo báo cáo HTML:', error.message);
    }
  }

  /**
   * In báo cáo console
   */
  printConsoleReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📋 BÁO CÁO ĐA NGÔN NGỮ - I18N COVERAGE');
    console.log('='.repeat(60));
    
    console.log(`\n📊 TỔNG QUAN:`);
    console.log(`   • Tổng số keys: ${this.stats.totalKeys}`);
    console.log(`   • Ngôn ngữ hỗ trợ: ${CONFIG.supportedLanguages.length}`);
    console.log(`   • Coverage tổng thể: ${this.stats.overallCoverage}%`);
    
    console.log(`\n🌍 CHI TIẾT TỪNG NGÔN NGỮ:`);
    for (const lang of CONFIG.supportedLanguages) {
      const stats = this.stats.languageStats[lang];
      console.log(`\n   ${CONFIG.languageNames[lang]} (${lang}):`);
      console.log(`      • Coverage: ${this.stats.coverage[lang]}%`);
      console.log(`      • Tổng keys: ${stats.totalKeys}`);
      console.log(`      • Keys thiếu: ${stats.missingKeys}`);
      console.log(`      • Values trống: ${stats.emptyValues}`);
      console.log(`      • Values trùng: ${stats.duplicateValues}`);
    }
    
    console.log('\n🎯 KHUYẾN NGHỊ:');
    if (this.stats.overallCoverage < 80) {
      console.log('   ⚠️  Coverage thấp (< 80%) - Cần bổ sung translations');
    } else if (this.stats.overallCoverage < 95) {
      console.log('   ✅ Coverage tốt - Có thể cải thiện thêm');
    } else {
      console.log('   🎉 Coverage xuất sắc!');
    }
    
    console.log('\n' + '='.repeat(60));
  }

  /**
   * Chạy toàn bộ quá trình scan
   */
  async run() {
    try {
      console.log('🚀 Bắt đầu scan i18n...\n');
      
      await this.scanLocales();
      this.analyzeTranslations();
      this.generateHTMLReport();
      this.printConsoleReport();
      
      console.log('\n✅ Hoàn thành scan i18n!');
      console.log(`📄 Xem báo cáo chi tiết: ${CONFIG.outputFile}`);
      
    } catch (error) {
      console.error('❌ Lỗi trong quá trình scan:', error.message);
      process.exit(1);
    }
  }
}

// Chạy script
const scanner = new I18nScanner();
scanner.run();

export default I18nScanner;