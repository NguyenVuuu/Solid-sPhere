import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

async function restorePreviousDesign() {
  console.log('🎨 Restoring previous design (white backgrounds + gradient headers)...\n');
  
  try {
    // 1. Fix Header - restore gradient background
    const headerFile = 'src/components/Header.jsx';
    if (fs.existsSync(headerFile)) {
      let headerContent = fs.readFileSync(headerFile, 'utf8');
      
      // Restore gradient header
      headerContent = headerContent.replace(
        /className="[^"]*bg-white[^"]*"/g,
        'className="bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white shadow-lg sticky top-0 z-50"'
      );
      
      // Fix header buttons to be white text on gradient
      headerContent = headerContent.replace(
        /className="[^"]*text-gray-900[^"]*"/g,
        'className="text-white hover:text-gray-200"'
      );
      
      fs.writeFileSync(headerFile, headerContent, 'utf8');
      console.log('✅ Fixed Header.jsx - restored gradient background');
    }

    // 2. Fix Footer - restore gradient background
    const footerFile = 'src/components/Footer.jsx';
    if (fs.existsSync(footerFile)) {
      let footerContent = fs.readFileSync(footerFile, 'utf8');
      
      // Restore gradient footer
      footerContent = footerContent.replace(
        /className="[^"]*bg-white[^"]*"/g,
        'className="bg-gradient-to-b from-black via-gray-900 to-purple-950 text-white"'
      );
      
      // Fix footer text to be white
      footerContent = footerContent.replace(
        /className="[^"]*text-gray-900[^"]*"/g,
        'className="text-white"'
      );
      
      fs.writeFileSync(footerFile, footerContent, 'utf8');
      console.log('✅ Fixed Footer.jsx - restored gradient background');
    }

    // 3. Fix all page files to have white backgrounds with gradient sections
    const pageFiles = await glob('src/pages/**/*.jsx', {
      ignore: ['node_modules/**', 'dist/**']
    });

    for (const file of pageFiles) {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let newContent = content;
        let changed = false;

        // Fix main page backgrounds to white
        newContent = newContent.replace(
          /className="[^"]*min-h-screen[^"]*bg-gray-50[^"]*"/g,
          'className="min-h-screen bg-white"'
        );
        newContent = newContent.replace(
          /className="[^"]*min-h-screen[^"]*bg-blue-50[^"]*"/g,
          'className="min-h-screen bg-white"'
        );
        newContent = newContent.replace(
          /className="[^"]*min-h-screen[^"]*bg-purple-50[^"]*"/g,
          'className="min-h-screen bg-white"'
        );

        // Add gradient headers to important sections
        if (file.includes('All_Products')) {
          newContent = newContent.replace(
            /<div className="[^"]*text-center[^"]*mb-12[^"]*">/g,
            '<div className="text-center mb-12 bg-gradient-to-r from-black via-gray-900 to-purple-950 py-12 px-4 rounded-lg">'
          );
          newContent = newContent.replace(
            /<h1 className="[^"]*text-4xl[^"]*font-bold[^"]*mb-4[^"]*text-gray-900[^"]*">/g,
            '<h1 className="text-4xl font-bold mb-4 text-white">'
          );
        }

        if (file.includes('AboutUs')) {
          // Add hero section with gradient
          newContent = newContent.replace(
            /<div className="flex flex-col min-h-screen bg-white">/g,
            `<div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">{t('about.about_us')}</h1>
          <p className="text-xl text-purple-300">Learn more about our company and values</p>
        </div>
      </div>`
          );
        }

        if (file.includes('Our_Deal')) {
          newContent = newContent.replace(
            /<div className="[^"]*text-center[^"]*mb-12[^"]*">/g,
            '<div className="text-center mb-12 bg-gradient-to-b from-black via-gray-900 to-purple-950 py-12 px-4 rounded-lg">'
          );
          newContent = newContent.replace(
            /<h1 className="[^"]*text-4xl[^"]*font-bold[^"]*mb-4[^"]*text-gray-900[^"]*">/g,
            '<h1 className="text-4xl font-bold mb-4 text-white">'
          );
        }

        if (file.includes('Printer_scanner')) {
          newContent = newContent.replace(
            /<div className="[^"]*text-center[^"]*mb-12[^"]*">/g,
            '<div className="text-center mb-12 bg-gradient-to-b from-black via-gray-900 to-purple-950 py-12 px-4 rounded-lg">'
          );
          newContent = newContent.replace(
            /<h1 className="[^"]*text-4xl[^"]*font-bold[^"]*mb-4[^"]*text-gray-900[^"]*">/g,
            '<h1 className="text-4xl font-bold mb-4 text-white">'
          );
        }

        // Fix button styles to use gradient
        newContent = newContent.replace(
          /className="[^"]*bg-blue-600[^"]*hover:bg-blue-700[^"]*"/g,
          'className="bg-gradient-to-r from-black via-gray-900 to-purple-950 hover:from-gray-800 hover:via-purple-900 hover:to-purple-900 text-white"'
        );
        newContent = newContent.replace(
          /className="[^"]*bg-purple-600[^"]*hover:bg-purple-700[^"]*"/g,
          'className="bg-gradient-to-r from-black via-gray-900 to-purple-950 hover:from-gray-800 hover:via-purple-900 hover:to-purple-900 text-white"'
        );

        if (newContent !== content) {
          fs.writeFileSync(file, newContent, 'utf8');
          console.log(`✅ Fixed: ${file}`);
          changed = true;
        }
      } catch (error) {
        console.log(`❌ Error processing ${file}:`, error.message);
      }
    }

    // 4. Fix component files
    const componentFiles = await glob('src/components/**/*.jsx', {
      ignore: ['node_modules/**', 'dist/**', 'src/components/Header.jsx', 'src/components/Footer.jsx']
    });

    for (const file of componentFiles) {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let newContent = content;

        // Fix component backgrounds
        newContent = newContent.replace(
          /className="[^"]*bg-gray-100[^"]*"/g,
          'className="bg-white"'
        );
        newContent = newContent.replace(
          /className="[^"]*bg-gray-200[^"]*"/g,
          'className="bg-white"'
        );
        newContent = newContent.replace(
          /className="[^"]*bg-blue-50[^"]*"/g,
          'className="bg-white"'
        );
        newContent = newContent.replace(
          /className="[^"]*bg-purple-50[^"]*"/g,
          'className="bg-white"'
        );

        // Fix buttons to use gradient
        newContent = newContent.replace(
          /className="[^"]*bg-blue-600[^"]*"/g,
          'className="bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white"'
        );

        if (newContent !== content) {
          fs.writeFileSync(file, newContent, 'utf8');
          console.log(`✅ Fixed: ${file}`);
        }
      } catch (error) {
        console.log(`❌ Error processing ${file}:`, error.message);
      }
    }

    console.log(`\n============================================================`);
    console.log(`🎨 DESIGN RESTORE COMPLETE`);
    console.log(`============================================================`);
    console.log(`✅ Header: Gradient background (black → gray → purple)`);
    console.log(`✅ Footer: Gradient background (black → gray → purple)`);
    console.log(`✅ Pages: White backgrounds with gradient sections`);
    console.log(`✅ Components: White backgrounds`);
    console.log(`✅ Buttons: Gradient styling for important actions`);
    console.log(`\n🚀 Website ready with previous design!`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Chạy script
restorePreviousDesign();
