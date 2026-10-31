const fs = require('fs');
const path = require('path');

console.log('🔍 QUÉT CẤU TRÚC ẢNH LOCAL VÀ SO SÁNH VỚI DATABASE\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Đọc file SQL
const sqlContent = fs.readFileSync('src/main/resources/data-from-export.sql', 'utf-8');

// Parse products từ SQL
const productRegex = /\('([^']+(?:''[^']+)*)',\s*'([^']*(?:''[^']*)*)',\s*([0-9.]+),\s*(\d+),\s*([0-9.]+),\s*'([^']+)',\s*(\d+),\s*'([^']+(?:''[^']+)*)'\)/g;
const products = [];
let match;

while ((match = productRegex.exec(sqlContent)) !== null) {
    const [_, name, description, unitPrice, quantity, percentage, status, categoryId, imageUrl] = match;
    products.push({
        name: name.replace(/''/g, "'"),
        imageUrl: imageUrl.replace(/''/g, "'"),
        categoryId: parseInt(categoryId)
    });
}

console.log(`📊 Tổng số products trong database: ${products.length}\n`);

// Function để quét folder đệ quy
function scanFolder(folderPath, basePath = '') {
    const files = [];
    
    try {
        const items = fs.readdirSync(folderPath);
        
        items.forEach(item => {
            const fullPath = path.join(folderPath, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                // Đệ quy vào subfolder
                const subFiles = scanFolder(fullPath, path.join(basePath, item));
                files.push(...subFiles);
            } else if (stat.isFile() && (item.endsWith('.webp') || item.endsWith('.jpg') || item.endsWith('.png') || item.endsWith('.jpeg'))) {
                files.push({
                    fileName: item,
                    relativePath: path.join(basePath, item).replace(/\\/g, '/'),
                    fullPath: fullPath
                });
            }
        });
    } catch (err) {
        console.error(`❌ Lỗi khi đọc folder ${folderPath}:`, err.message);
    }
    
    return files;
}

// Quét folder ảnh local
const localImagesPath = 'src/main/resources/Anh';
console.log(`📁 Đang quét folder: ${localImagesPath}\n`);

const localImages = scanFolder(localImagesPath);

console.log(`✅ Tìm thấy ${localImages.length} ảnh trong folder local\n`);

// Phân tích cấu trúc
const folderStats = {};
localImages.forEach(img => {
    const folder = path.dirname(img.relativePath);
    if (!folderStats[folder]) {
        folderStats[folder] = 0;
    }
    folderStats[folder]++;
});

console.log('📊 PHÂN BỐ ẢNH THEO FOLDER:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

Object.entries(folderStats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([folder, count]) => {
        console.log(`📁 ${folder}: ${count} ảnh`);
    });

// So sánh với database
console.log('\n\n🔍 SO SÁNH VỚI DATABASE:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Extract hash từ Cloudinary URL
function extractHashFromUrl(url) {
    // https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033646/ReactNew/anh/Computer/BanPhim/hktgvgk8h3oddq1nzb1l.webp
    const match = url.match(/([a-z0-9]+)\.(webp|jpg|png|jpeg)$/i);
    return match ? match[1] : null;
}

// Tạo map của local images
const localImageMap = {};
localImages.forEach(img => {
    const hash = img.fileName.replace(/\.(webp|jpg|png|jpeg)$/i, '');
    localImageMap[hash] = img;
});

// Kiểm tra products
let matchedProducts = 0;
let unmatchedProducts = [];

products.forEach(product => {
    const hash = extractHashFromUrl(product.imageUrl);
    
    if (hash && localImageMap[hash]) {
        matchedProducts++;
    } else {
        unmatchedProducts.push({
            name: product.name,
            imageUrl: product.imageUrl,
            hash: hash
        });
    }
});

console.log(`✅ Products có ảnh khớp trong folder local: ${matchedProducts}/${products.length} (${(matchedProducts/products.length*100).toFixed(1)}%)`);
console.log(`❌ Products KHÔNG tìm thấy ảnh local: ${unmatchedProducts.length}\n`);

if (unmatchedProducts.length > 0) {
    console.log('⚠️  DANH SÁCH PRODUCTS KHÔNG TÌM THẤY ẢNH:');
    console.log('─────────────────────────────────────────────\n');
    
    unmatchedProducts.slice(0, 20).forEach((prod, idx) => {
        console.log(`${idx + 1}. ${prod.name}`);
        console.log(`   URL: ${prod.imageUrl.substring(0, 80)}...`);
        console.log(`   Hash: ${prod.hash || 'N/A'}\n`);
    });
    
    if (unmatchedProducts.length > 20) {
        console.log(`... và ${unmatchedProducts.length - 20} products khác\n`);
    }
}

// Kiểm tra ảnh thừa (có trong folder nhưng không dùng)
console.log('\n📊 KIỂM TRA ẢNH THỪA:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const usedHashes = new Set();
products.forEach(product => {
    const hash = extractHashFromUrl(product.imageUrl);
    if (hash) usedHashes.add(hash);
});

const unusedImages = localImages.filter(img => {
    const hash = img.fileName.replace(/\.(webp|jpg|png|jpeg)$/i, '');
    return !usedHashes.has(hash);
});

console.log(`📁 Ảnh trong folder local: ${localImages.length}`);
console.log(`✅ Ảnh đang được sử dụng: ${usedHashes.size}`);
console.log(`⚠️  Ảnh KHÔNG được sử dụng: ${unusedImages.length}\n`);

if (unusedImages.length > 0 && unusedImages.length <= 30) {
    console.log('⚠️  DANH SÁCH ẢNH THỪA (không dùng):');
    console.log('─────────────────────────────────────────────\n');
    
    unusedImages.forEach((img, idx) => {
        console.log(`${idx + 1}. ${img.relativePath}`);
    });
}

// Đề xuất mapping
console.log('\n\n💡 ĐỀ XUẤT:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (matchedProducts === products.length) {
    console.log('✅ TẤT CẢ PRODUCTS ĐÃ CÓ ẢNH KHỚP!');
    console.log('   Database hiện tại đã chính xác, không cần chỉnh sửa.');
} else {
    console.log('⚠️  CÓ SẢN PHẨM CHƯA CÓ ẢNH KHỚP');
    console.log('\nCác bước tiếp theo:');
    console.log('1. Kiểm tra lại các products không tìm thấy ảnh ở trên');
    console.log('2. Có thể cần upload ảnh lên Cloudinary hoặc cập nhật URL');
    console.log('3. Hoặc map lại với ảnh thừa nếu phù hợp');
}

if (unusedImages.length > 0) {
    console.log('\n💡 Có ảnh thừa trong folder:');
    console.log('   - Có thể dùng để map cho products chưa có ảnh');
    console.log('   - Hoặc xóa nếu không cần thiết');
}

console.log('\n✨ Quét hoàn tất!\n');
