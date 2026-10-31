-- ============================================
-- SQL Data Migration from Export Files
-- Generated: 19:19:09 14/10/2025
-- Total Categories: 54
-- Total Products: 273
-- ============================================




-- Avoid duplicate PK errors if data scripts run multiple times
DELETE FROM categories;
INSERT INTO categories (id, name, description, supplier_name) VALUES
(1, 'BanPhim Daeru Gaming', 'Bàn phím gaming Daeru', 'Daeru'),
(2, 'BanPhim Aula Gaming', 'Bàn phím gaming Aula', 'Aula'),
(3, 'BanPhim Rapoo Gaming', 'Bàn phím gaming Rapoo', 'Rapoo'),
(4, 'BanPhim Asus ROG', 'Bàn phím gaming Asus ROG', 'Asus'),
(5, 'BanPhim Logitech G Series', 'Bàn phím gaming Logitech G Series', 'Logitech'),
(6, 'Mouse Daeru Gaming', 'Chuột gaming Daeru', 'Daeru'),
(7, 'Mouse MSI Gaming', 'Chuột gaming MSI', 'MSI'),
(8, 'Mouse Logitech G Series', 'Chuột gaming Logitech G Series', 'Logitech'),
(9, 'Mouse Rapoo Gaming', 'Chuột gaming Rapoo', 'Rapoo'),
(10, 'Mouse Razer DeathAdder', 'Chuột gaming Razer DeathAdder', 'Razer'),
(11, 'Mousepad Daeru Gaming', 'Pad chuột gaming Daeru', 'Daeru'),
(12, 'Mousepad Asus ROG', 'Pad chuột gaming Asus ROG', 'Asus'),
(13, 'Mousepad Razer Goliathus', 'Pad chuột gaming Razer Goliathus', 'Razer'),
(14, 'GamingGear Sony PlayStation', 'Phụ kiện gaming Sony PlayStation', 'Sony'),
(15, 'GamingGear Lenovo Legion', 'Phụ kiện gaming Lenovo Legion', 'Lenovo'),
(16, 'GamingGear Daeru Pro', 'Phụ kiện gaming Daeru Pro', 'Daeru'),
(17, 'Case T01 Standard', 'Vỏ case máy tính T01', 'T01'),
(18, 'CPU AMD Ryzen', 'Bộ xử lý AMD Ryzen', 'AMD'),
(19, 'CPU Intel Core', 'Bộ xử lý Intel Core', 'Intel'),
(20, 'Main Asus ROG', 'Bo mạch chủ Asus ROG', 'Asus'),
(21, 'Main Gigabyte Aorus', 'Bo mạch chủ Gigabyte Aorus', 'Gigabyte'),
(22, 'Main MSI MPG', 'Bo mạch chủ MSI MPG', 'MSI'),
(23, 'PSU Asus ROG', 'Nguồn máy tính Asus ROG', 'Asus'),
(24, 'PSU Corsair RM Series', 'Nguồn máy tính Corsair RM Series', 'Corsair'),
(25, 'PSU Deepcool PQ Series', 'Nguồn máy tính Deepcool PQ Series', 'Deepcool'),
(26, 'PSU MSI MPG', 'Nguồn máy tính MSI MPG', 'MSI'),
(27, 'HDD Kingston SSD', 'Ổ cứng thể rắn Kingston SSD', 'Kingston'),
(28, 'HDD Samsung EVO', 'Ổ cứng thể rắn Samsung EVO', 'Samsung'),
(29, 'HDD Western Digital Blue', 'Ổ cứng Western Digital Blue', 'Western Digital'),
(30, 'RAM Kingston Fury', 'Bộ nhớ RAM Kingston Fury', 'Kingston'),
(31, 'RAM Corsair Vengeance', 'Bộ nhớ RAM Corsair Vengeance', 'Corsair'),
(32, 'RAM PNY XLR8', 'Bộ nhớ RAM PNY XLR8', 'PNY'),
(33, 'VGA Asus ROG Strix', 'Card đồ họa Asus ROG Strix', 'Asus'),
(34, 'VGA MSI Gaming X', 'Card đồ họa MSI Gaming X', 'MSI'),
(35, 'VGA Gigabyte Aorus', 'Card đồ họa Gigabyte Aorus', 'Gigabyte'),
(36, 'screen Asus TUF Gaming', 'Màn hình gaming Asus TUF Gaming', 'Asus'),
(37, 'screen Acer Predator', 'Màn hình gaming Acer Predator', 'Acer'),
(38, 'screen LG UltraGear', 'Màn hình gaming LG UltraGear', 'LG'),
(39, 'screen MSI Optix', 'Màn hình gaming MSI Optix', 'MSI'),
(40, 'PC MSI Gaming', 'PC gaming MSI', 'MSI'),
(41, 'PC Asus ROG', 'PC gaming Asus ROG', 'Asus'),
(42, 'Headphone Asus ROG', 'Tai nghe gaming Asus ROG', 'Asus'),
(43, 'Headphone Razer Kraken', 'Tai nghe gaming Razer Kraken', 'Razer'),
(44, 'iPad Apple iPad', 'Máy tính bảng Apple iPad', 'Apple'),
(45, 'Laptop Acer Nitro', 'Laptop Acer Nitro', 'Acer'),
(46, 'Laptop Asus ROG', 'Laptop gaming Asus ROG', 'Asus'),
(47, 'Laptop Dell XPS', 'Laptop Dell XPS', 'Dell'),
(48, 'Laptop Gigabyte Aorus', 'Laptop gaming Gigabyte Aorus', 'Gigabyte'),
(49, 'Laptop Lenovo Legion', 'Laptop gaming Lenovo Legion', 'Lenovo'),
(50, 'Laptop Apple MacBook', 'Laptop Apple MacBook', 'Apple'),
(51, 'Laptop MSI Stealth', 'Laptop gaming MSI Stealth', 'MSI'),
(52, 'Phone Apple iPhone', 'Điện thoại Apple iPhone', 'Apple'),
(53, 'Phone Samsung Galaxy', 'Điện thoại Samsung Galaxy', 'Samsung'),
(54, 'Phone Xiaomi Redmi', 'Điện thoại Xiaomi Redmi', 'Xiaomi');

-- ============================================
-- INSERT PRODUCTS
-- ============================================
INSERT INTO products (name, description, unit_price, quantity, percentage, status, category_id, image_url) VALUES
('Bàn phím Daeru Gaming RGB', 'Bàn phím cơ Daeru với đèn LED RGB, thiết kế gaming hiện đại và chất lượng cao', 60, 15, 0, 'AVAILABLE', 1, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/az7qtmaceztgwfgtdiu9.webp'),
('Bàn phím Daeru Rainbow', 'Bàn phím cơ Daeru với đèn LED Rainbow đa sắc, switch độ nhạy cao', 67.5, 12, 0, 'AVAILABLE', 1, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/b20qggd6xgi6a9fzzpmz.webp'),
('Bàn phím Daeru Pro RGB', 'Bàn phím cơ Daeru Pro với LED RGB có thể tùy chỉnh, keycap bền bỉ', 75, 10, 0, 'AVAILABLE', 1, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/cdctucvigeuvosjlxuvf.webp'),
('Bàn phím Daeru Black RGB', 'Bàn phím cơ Daeru màu đen với đèn LED RGB, thiết kế tối giản', 62.5, 18, 0, 'AVAILABLE', 1, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/fzjnplkw7yl33aashqx6.webp'),
('Bàn phím Daeru Pink', 'Bàn phím cơ Daeru màu hồng với đèn LED, thiết kế dễ thương cho game thủ', 72.5, 8, 0, 'AVAILABLE', 1, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/kwt3mp3wbib1swrlkcav.webp'),
('Bàn phím Aula Gaming RGB', 'Bàn phím cơ Aula với đèn LED RGB, thiết kế chuyên gaming', 55, 20, 0, 'AVAILABLE', 2, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/az7qtmaceztgwfgtdiu9.webp'),
('Bàn phím Aula Rainbow', 'Bàn phím cơ Aula với đèn LED Rainbow, switch độ bền cao', 65, 15, 0, 'AVAILABLE', 2, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/b20qggd6xgi6a9fzzpmz.webp'),
('Bàn phím Aula RGB Pro', 'Bàn phím cơ Aula RGB Pro với đèn LED RGB full, keycap độ bền cao', 77.5, 12, 0, 'AVAILABLE', 2, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/cdctucvigeuvosjlxuvf.webp'),
('Bàn phím Aula RGB Compact', 'Bàn phím cơ Aula thiết kế nhỏ gọn với đèn LED RGB', 47.5, 25, 0, 'AVAILABLE', 2, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/fzjnplkw7yl33aashqx6.webp'),
('Bàn phím Rapoo Gaming RGB', 'Bàn phím cơ Rapoo với đèn LED RGB, thiết kế chuyên gaming', 82.5, 10, 0, 'AVAILABLE', 3, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/az7qtmaceztgwfgtdiu9.webp'),
('Bàn phím Rapoo White RGB', 'Bàn phím cơ Rapoo màu trắng với đèn LED RGB đa sắc', 85, 8, 0, 'AVAILABLE', 3, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/b20qggd6xgi6a9fzzpmz.webp'),
('Bàn phím Rapoo Blue LED', 'Bàn phím cơ Rapoo với đèn LED màu xanh, switch độ bền cao', 80, 12, 0, 'AVAILABLE', 3, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/cdctucvigeuvosjlxuvf.webp'),
('Bàn phím Rapoo Red Gaming', 'Bàn phím cơ Rapoo với đèn LED màu đỏ, thiết kế gaming', 77.5, 15, 0, 'AVAILABLE', 3, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/fzjnplkw7yl33aashqx6.webp'),
('Bàn phím Asus ROG RGB', 'Bàn phím cơ Asus ROG với đèn LED RGB, thiết kế gaming cao cấp', 125, 10, 0, 'AVAILABLE', 4, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/az7qtmaceztgwfgtdiu9.webp'),
('Bàn phím Asus ROG Azoth', 'Bàn phím cơ Asus ROG Azoth với đèn LED RGB, switch độ nhạy cao', 135, 8, 0, 'AVAILABLE', 4, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/b20qggd6xgi6a9fzzpmz.webp'),
('Bàn phím Asus ROG Falchion', 'Bàn phím cơ Asus ROG Falchion với đèn LED RGB, thiết kế nhỏ gọn', 115, 12, 0, 'AVAILABLE', 4, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/cdctucvigeuvosjlxuvf.webp'),
('Bàn phím Asus TUF Gaming', 'Bàn phím cơ Asus TUF Gaming với đèn LED RGB đa sắc', 97.5, 15, 0, 'AVAILABLE', 4, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/fzjnplkw7yl33aashqx6.webp'),
('Bàn phím Logitech G Pro X', 'Bàn phím cơ Logitech G Pro X với đèn LED RGB, switch GX có thể thay đổi', 140, 10, 0, 'AVAILABLE', 5, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/az7qtmaceztgwfgtdiu9.webp'),
('Bàn phím Logitech G Pro', 'Bàn phím cơ Logitech G Pro với đèn LED RGB, thiết kế tối giản', 130, 12, 0, 'AVAILABLE', 5, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/BanPhim/b20qggd6xgi6a9fzzpmz.webp'),
('Chuột Daeru EM911X RGB', 'Chuột gaming Daeru EM911X với đèn LED RGB, DPI cao và thiết kế công thái học', 22.5, 20, 0, 'AVAILABLE', 6, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/a4lrzmfxzuepvgicfg1d.webp'),
('Chuột Daeru EM901X', 'Chuột gaming Daeru EM901X không dây với cảm biến độ nhạy cao', 27.5, 15, 0, 'AVAILABLE', 6, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/hyosii3in5jhchxaoo3b.webp'),
('Chuột Daeru EM908', 'Chuột gaming Daeru EM908 với đèn LED RGB và cảm biến PAW3335', 32.5, 12, 0, 'AVAILABLE', 6, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/iysem1c0kcmb90ejtdxt.webp'),
('Chuột Daeru A918', 'Chuột gaming Daeru A918 không dây với thời lượng pin dài', 37.5, 10, 0, 'AVAILABLE', 6, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/n9jrn60k8scernimz8ci.webp'),
('Chuột Daeru EM945', 'Chuột gaming Daeru EM945 với DPI 16000 và thiết kế công thái học', 42.5, 8, 0, 'AVAILABLE', 6, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/nvbbldoizwgfwr5fwk5z.webp'),
('Chuột MSI Clutch GM08', 'Chuột gaming MSI Clutch GM08 với đèn LED RGB và cảm biến chuẩn xác', 37.5, 15, 0, 'AVAILABLE', 7, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/a4lrzmfxzuepvgicfg1d.webp'),
('Chuột MSI Clutch GM30', 'Chuột gaming MSI Clutch GM30 với đèn LED RGB và Switch OMRON', 42.5, 12, 0, 'AVAILABLE', 7, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/hyosii3in5jhchxaoo3b.webp'),
('Chuột MSI Clutch GM31', 'Chuột gaming MSI Clutch GM31 không dây với thời lượng pin dài', 60, 10, 0, 'AVAILABLE', 7, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/iysem1c0kcmb90ejtdxt.webp'),
('Chuột Logitech G Pro X Superlight', 'Chuột gaming Logitech G Pro X Superlight siêu nhẹ với cảm biến HERO', 140, 10, 0, 'AVAILABLE', 8, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/a4lrzmfxzuepvgicfg1d.webp'),
('Chuột Logitech G502 X', 'Chuột gaming Logitech G502 X với cảm biến HERO 25K và 11 nút có thể lập trình', 110, 15, 0, 'AVAILABLE', 8, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/hyosii3in5jhchxaoo3b.webp'),
('Chuột Logitech G Pro', 'Chuột gaming Logitech G Pro có dây với cảm biến HERO và thiết kế nhẹ', 75, 20, 0, 'AVAILABLE', 8, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/iysem1c0kcmb90ejtdxt.webp'),
('Chuột Rapoo V16 Pro', 'Chuột gaming Rapoo V16 Pro với đèn LED RGB và cảm biến PixArt', 27.5, 25, 0, 'AVAILABLE', 9, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/a4lrzmfxzuepvgicfg1d.webp'),
('Chuột Rapoo VT200', 'Chuột gaming Rapoo VT200 không dây với Pin sạc và đèn RGB', 37.5, 15, 0, 'AVAILABLE', 9, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/hyosii3in5jhchxaoo3b.webp'),
('Chuột Rapoo V280', 'Chuột gaming Rapoo V280 với cảm biến PMW3389 và DPI 16000', 32.5, 18, 0, 'AVAILABLE', 9, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/iysem1c0kcmb90ejtdxt.webp'),
('Chuột Rapoo V320', 'Chuột gaming Rapoo V320 với đèn LED RGB và 8 nút có thể lập trình', 42.5, 12, 0, 'AVAILABLE', 9, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/n9jrn60k8scernimz8ci.webp'),
('Chuột Rapoo V330', 'Chuột gaming Rapoo V330 với thiết kế công thái học và cảm biến chuẩn xác', 47.5, 10, 0, 'AVAILABLE', 9, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/nvbbldoizwgfwr5fwk5z.webp'),
('Chuột Razer DeathAdder V3', 'Chuột gaming Razer DeathAdder V3 với công nghệ Razer Focus+ và công thái học tối ưu', 125, 10, 0, 'AVAILABLE', 10, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/a4lrzmfxzuepvgicfg1d.webp'),
('Chuột Razer Basilisk V3', 'Chuột gaming Razer Basilisk V3 với 11 nút có thể lập trình và con lăn đa năng', 110, 12, 0, 'AVAILABLE', 10, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/hyosii3in5jhchxaoo3b.webp'),
('Chuột Razer Viper Ultimate', 'Chuột gaming Razer Viper Ultimate không dây với cảm biến Focus+ và công nghệ HyperSpeed', 160, 8, 0, 'AVAILABLE', 10, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/iysem1c0kcmb90ejtdxt.webp'),
('Chuột Razer Pink Edition', 'Chuột gaming Razer phiên bản màu hồng với đèn LED Chroma RGB', 90, 15, 0, 'AVAILABLE', 10, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/n9jrn60k8scernimz8ci.webp'),
('Chuột Razer Viper V2 Pro', 'Chuột gaming Razer Viper V2 Pro siêu nhẹ với cảm biến Focus Pro 30K', 175, 5, 0, 'AVAILABLE', 10, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/Chuot/nvbbldoizwgfwr5fwk5z.webp'),
('Tay cầm PS5 DualSense', 'Tay cầm Sony PS5 DualSense chính hãng với phản hồi xúc giác và cò adaptive', 90, 20, 0, 'AVAILABLE', 14, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/GamingGear/diqo0mmsxcafmtolqune.webp'),
('Máy PlayStation 5 Slim', 'Máy chơi game Sony PlayStation 5 Slim chính hãng với bộ nhớ 825GB SSD', 675, 8, 0, 'AVAILABLE', 14, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/GamingGear/mfiymausdwwgomaawoml.webp'),
('Tay cầm Daeru H105', 'Tay cầm chơi game Daeru H105 không dây với Pin sạc và chức năng rung', 42.5, 13, 0, 'AVAILABLE', 16, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/GamingGear/diqo0mmsxcafmtolqune.webp'),
('Lenovo Legion Go', 'Máy chơi game cầm tay Lenovo Legion Go với màn hình 8.8 inch và chip AMD Ryzen Z1 Extreme', 925, 5, 0, 'AVAILABLE', 15, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/GamingGear/diqo0mmsxcafmtolqune.webp'),
('Case Xigmatek Alpha M-3GF', 'Vỏ case máy tính Xigmatek Alpha M-3GF với thiết kế gaming, hỗ trợ đèn RGB và tản nhiệt tốt', 75, 10, 0, 'AVAILABLE', 17, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/LinhKien/Case/acms5tpwguvenxxjvnky.webp'),
('Case Cougar MX410', 'Vỏ case máy tính Cougar MX410 với mặt trước trong suốt, hỗ trợ LED RGB', 82.5, 8, 0, 'AVAILABLE', 17, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/LinhKien/Case/ex6llbmiukqy3rh6fnnd.webp'),
('Case Corsair 4000D', 'Vỏ case máy tính Corsair 4000D Airflow với thiết kế tối ưu luồng không khí', 110, 12, 0, 'AVAILABLE', 17, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/LinhKien/Case/ggzstzmiqdio6tbczc4z.webp'),
('Case Cooler Master TD500', 'Vỏ case máy tính Cooler Master TD500 Mesh với mặt trước lưới tản nhiệt', 97.5, 15, 0, 'AVAILABLE', 17, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/LinhKien/Case/kvrpzx9hnhcrem2dhhcu.webp'),
('Case NZXT H510', 'Vỏ case máy tính NZXT H510 với thiết kế tối giản, chất lượng cao', 105, 10, 0, 'AVAILABLE', 17, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/LinhKien/Case/smu8d1qhwa9rawuzczpe.webp'),
('Case Thermaltake H350', 'Vỏ case máy tính Thermaltake H350 TG RGB với mặt hông kính cường lực', 92.5, 12, 0, 'AVAILABLE', 17, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/LinhKien/Case/vqtq6que4rzky6hvdbut.webp'),
('Case Thermaltake V250', 'Vỏ case máy tính Thermaltake V250 TG ARGB với đèn LED RGB mặt trước', 87.5, 14, 0, 'AVAILABLE', 17, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/LinhKien/Case/w8lwo01xqxqjhcarmzyd.webp'),
('CPU AMD Ryzen 7 7800X3D', 'Bộ vi xử lý AMD Ryzen 7 7800X3D với 8 nhân 16 luồng, 96MB cache và xung nhịp tối đa 5.0GHz', 625, 10, 0, 'AVAILABLE', 18, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/LinhKien/CPU/bc6jrftefeobuobbv4y0.webp'),
('CPU AMD Ryzen 7 7800X', 'Bộ vi xử lý AMD Ryzen 7 7800X với 8 nhân 16 luồng và xung nhịp tối đa 5.4GHz', 560, 12, 0, 'AVAILABLE', 18, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/LinhKien/CPU/cb80q7amrhcq49xdlsjw.webp'),
('CPU AMD Ryzen 9', 'Bộ vi xử lý AMD Ryzen 9 với nhiều nhân cao và hiệu năng mạnh mẽ', 775, 8, 0, 'AVAILABLE', 18, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/LinhKien/CPU/i9bxuhciwebcovjne3if.webp'),
('CPU AMD Ryzen 5', 'Bộ vi xử lý AMD Ryzen 5 với hiệu năng tốt cho gaming và đa nhiệm', 425, 15, 0, 'AVAILABLE', 18, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/LinhKien/CPU/paddwnlbqzmqkrizusof.webp'),
('CPU Intel Core i9-14900K', 'Bộ vi xử lý Intel Core i9-14900K với 24 nhân (8P+16E), 32 luồng và xung nhịp tối đa 6.0GHz', 825, 8, 0, 'AVAILABLE', 19, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/LinhKien/CPU/bc6jrftefeobuobbv4y0.webp'),
('CPU Intel Core i7', 'Bộ vi xử lý Intel Core i7 với hiệu năng cao cho gaming và công việc chuyên nghiệp', 625, 12, 0, 'AVAILABLE', 19, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/LinhKien/CPU/cb80q7amrhcq49xdlsjw.webp'),
('CPU Intel Core i5', 'Bộ vi xử lý Intel Core i5 với hiệu năng tốt cho gaming và công việc hàng ngày', 445, 14, 0, 'AVAILABLE', 19, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/LinhKien/CPU/i9bxuhciwebcovjne3if.webp'),
('Bo mạch chủ Asus ROG Strix Z790-E', 'Bo mạch chủ Asus ROG Strix Z790-E Gaming WiFi với chipset Intel Z790, hỗ trợ DDR5 và PCIe 5.0', 625, 10, 0, 'AVAILABLE', 20, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033654/ReactNew/anh/Computer/LinhKien/Main/qkrji5vtwlhfyrovjf9k.webp'),
('Bo mạch chủ Asus ROG Strix B760', 'Bo mạch chủ Asus ROG Strix B760 với chipset Intel B760 và hỗ trợ CPU Intel thế hệ 13', 375, 15, 0, 'AVAILABLE', 20, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033654/ReactNew/anh/Computer/LinhKien/Main/ip2i5abglayzokyq35tw.webp'),
('Bo mạch chủ Asus ROG Strix X670E', 'Bo mạch chủ Asus ROG Strix X670E với chipset AMD X670 và hỗ trợ CPU AMD Ryzen thế hệ mới', 575, 12, 0, 'AVAILABLE', 20, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033654/ReactNew/anh/Computer/LinhKien/Main/sq11u5xydhsypycxqokh.webp'),
('Bo mạch chủ Asus TUF Gaming B650', 'Bo mạch chủ Asus TUF Gaming B650 với chipset AMD B650 và thiết kế bền bỉ', 325, 18, 0, 'AVAILABLE', 20, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033653/ReactNew/anh/Computer/LinhKien/Main/zfhiuh46smpgi8ml6hpr.webp'),
('Bo mạch chủ Asus Prime Z790', 'Bo mạch chủ Asus Prime Z790 với chipset Intel Z790 và thiết kế tối giản', 425, 14, 0, 'AVAILABLE', 20, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033653/ReactNew/anh/Computer/LinhKien/Main/vviwe4ni23bbno91niwo.webp'),
('Bo mạch chủ Gigabyte Z790 Aorus Elite', 'Bo mạch chủ Gigabyte Z790 Aorus Elite với chipset Intel Z790, hỗ trợ DDR5 và PCIe 5.0', 475, 12, 0, 'AVAILABLE', 21, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033653/ReactNew/anh/Computer/LinhKien/Main/m12qsqdecuiooi614ohb.webp'),
('Bo mạch chủ Gigabyte B650 Aorus Elite', 'Bo mạch chủ Gigabyte B650 Aorus Elite với chipset AMD B650 và hỗ trợ CPU AMD Ryzen', 340, 15, 0, 'AVAILABLE', 21, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033653/ReactNew/anh/Computer/LinhKien/Main/zx3rbakwhjq4r2zosjca.webp'),
('Bo mạch chủ Gigabyte Z790 Aorus Master', 'Bo mạch chủ Gigabyte Z790 Aorus Master với thiết kế cao cấp và nhiều tính năng', 725, 8, 0, 'AVAILABLE', 21, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033653/ReactNew/anh/Computer/LinhKien/Main/ywghx08nrdibqpoequr0.webp'),
('Bo mạch chủ Gigabyte B760 Aorus Elite', 'Bo mạch chủ Gigabyte B760 Aorus Elite với chipset Intel B760', 290, 18, 0, 'AVAILABLE', 21, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033652/ReactNew/anh/Computer/LinhKien/Main/b3t5xq17hz1bkvay05js.webp'),
('Bo mạch chủ Gigabyte X670E Aorus Master', 'Bo mạch chủ Gigabyte X670E Aorus Master với chipset AMD X670E cao cấp', 675, 10, 0, 'AVAILABLE', 21, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033652/ReactNew/anh/Computer/LinhKien/Main/bkcvchcftxzbgl3wh4yi.webp'),
('Bo mạch chủ MSI MPG Z790 Carbon', 'Bo mạch chủ MSI MPG Z790 Carbon WiFi với chipset Intel Z790, hỗ trợ DDR5 và PCIe 5.0', 575, 10, 0, 'AVAILABLE', 22, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033652/ReactNew/anh/Computer/LinhKien/Main/jdjuds7quen49i0nhrev.webp'),
('Bo mạch chủ MSI MPG B650 Carbon', 'Bo mạch chủ MSI MPG B650 Carbon WiFi với chipset AMD B650', 425, 15, 0, 'AVAILABLE', 22, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033652/ReactNew/anh/Computer/LinhKien/Main/sat5ripbukeocpdubfah.jpg'),
('Bo mạch chủ MSI MEG Z790 Ace', 'Bo mạch chủ MSI MEG Z790 Ace với thiết kế cao cấp và nhiều tính năng', 925, 5, 0, 'AVAILABLE', 22, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033652/ReactNew/anh/Computer/LinhKien/Main/phjmtres4dtg5p2ekl5y.webp'),
('Bo mạch chủ MSI MAG B760 Tomahawk', 'Bo mạch chủ MSI MAG B760 Tomahawk WiFi với chipset Intel B760', 325, 18, 0, 'AVAILABLE', 22, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033652/ReactNew/anh/Computer/LinhKien/Main/xfld5wxegrlcffne5t4i.webp'),
('Nguồn Asus ROG Strix 850W', 'Nguồn máy tính Asus ROG Strix 850W 80 Plus Gold với hiệu suất cao và hoạt động êm ái', 175, 15, 0, 'AVAILABLE', 23, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033657/ReactNew/anh/Computer/LinhKien/Nguon/kkvxrpe87rir1pa4qurt.webp'),
('Nguồn Asus ROG Thor 1000W', 'Nguồn máy tính Asus ROG Thor 1000W 80 Plus Platinum với màn hình OLED hiển thị công suất', 275, 10, 0, 'AVAILABLE', 23, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033656/ReactNew/anh/Computer/LinhKien/Nguon/xbkuougm3kmqdk5wabyi.webp'),
('Nguồn Asus TUF Gaming 750W', 'Nguồn máy tính Asus TUF Gaming 750W 80 Plus Bronze với độ bền cao', 125, 20, 0, 'AVAILABLE', 23, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033656/ReactNew/anh/Computer/LinhKien/Nguon/v6rboryzpwloyaarwblr.webp'),
('Nguồn Asus ROG Strix 1000W', 'Nguồn máy tính Asus ROG Strix 1000W 80 Plus Gold với dây cáp có thể tháo rời', 240, 12, 0, 'AVAILABLE', 23, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033656/ReactNew/anh/Computer/LinhKien/Nguon/i8bg9cfccqds1k47vuit.webp'),
('Nguồn Asus TUF Gaming 650W', 'Nguồn máy tính Asus TUF Gaming 650W 80 Plus Bronze với giá thành hợp lý', 110, 25, 0, 'AVAILABLE', 23, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033656/ReactNew/anh/Computer/LinhKien/Nguon/ylzo86jgqkfaqqqsnla5.webp'),
('Nguồn Corsair RM750x', 'Nguồn máy tính Corsair RM750x 80 Plus Gold với dây cáp đen nguyên khối và hoạt động êm ái', 160, 18, 0, 'AVAILABLE', 24, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033655/ReactNew/anh/Computer/LinhKien/Nguon/crmitbpyirxgck4t80qf.webp'),
('Nguồn Corsair RM850x', 'Nguồn máy tính Corsair RM850x 80 Plus Gold với hiệu suất cao và tụ nhôm chất lượng Nhật Bản', 190, 15, 0, 'AVAILABLE', 24, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033655/ReactNew/anh/Computer/LinhKien/Nguon/deyzmiprrfvuetz90zzh.webp'),
('Nguồn Corsair CX650M', 'Nguồn máy tính Corsair CX650M 80 Plus Bronze với giá thành hợp lý', 100, 25, 0, 'AVAILABLE', 24, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033655/ReactNew/anh/Computer/LinhKien/Nguon/qxoo2zotyroajtbbpkyg.webp'),
('Nguồn Corsair HX1000', 'Nguồn máy tính Corsair HX1000 80 Plus Platinum với hiệu suất cực cao', 260, 10, 0, 'AVAILABLE', 24, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033655/ReactNew/anh/Computer/LinhKien/Nguon/aqmqshnq5fgqcdophuw2.webp'),
('Nguồn Deepcool PQ650M', 'Nguồn máy tính Deepcool PQ650M 80 Plus Gold với thiết kế nhỏ gọn', 90, 20, 0, 'AVAILABLE', 25, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033655/ReactNew/anh/Computer/LinhKien/Nguon/uuppd9fi8xdusqomhors.webp'),
('Nguồn Deepcool DQ850-M', 'Nguồn máy tính Deepcool DQ850-M 80 Plus Gold với dây cáp có thể tháo rời', 125, 18, 0, 'AVAILABLE', 25, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033655/ReactNew/anh/Computer/LinhKien/Nguon/rc1zcm9iaxurqgxrwk3w.webp'),
('Nguồn Deepcool PF650', 'Nguồn máy tính Deepcool PF650 80 Plus Platinum với hiệu suất cao', 160, 15, 0, 'AVAILABLE', 25, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033655/ReactNew/anh/Computer/LinhKien/Nguon/siecbrg2wnut7calyivv.jpg'),
('Nguồn Deepcool PQ750M', 'Nguồn máy tính Deepcool PQ750M 80 Plus Gold với quạt 120mm', 110, 18, 0, 'AVAILABLE', 25, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033655/ReactNew/anh/Computer/LinhKien/Nguon/enp86kvowbpnygsktz3f.webp'),
('Nguồn MSI MPG A750GF', 'Nguồn máy tính MSI MPG A750GF 80 Plus Gold với dây cáp đen nguyên khối', 140, 15, 0, 'AVAILABLE', 26, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033654/ReactNew/anh/Computer/LinhKien/Nguon/fg68t0bomljyueiamh4x.webp'),
('Nguồn MSI MPG A850GF', 'Nguồn máy tính MSI MPG A850GF 80 Plus Gold với hiệu suất chuyển đổi cao', 175, 12, 0, 'AVAILABLE', 26, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033654/ReactNew/anh/Computer/LinhKien/Nguon/zylmpbgvdgiwh8cb63e8.webp'),
('Nguồn MSI MAG A650BN', 'Nguồn máy tính MSI MAG A650BN 80 Plus Bronze với giá thành hợp lý', 75, 25, 0, 'AVAILABLE', 26, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033654/ReactNew/anh/Computer/LinhKien/Nguon/dlrskfg1qalbuhyvozzm.webp'),
('Nguồn MSI MPG A1000G', 'Nguồn máy tính MSI MPG A1000G 80 Plus Gold với công suất cao', 225, 10, 0, 'AVAILABLE', 26, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033654/ReactNew/anh/Computer/LinhKien/Nguon/y3iyijfdvl2mezbkuwwo.webp'),
('Nguồn MSI MAG A550BN', 'Nguồn máy tính MSI MAG A550BN 80 Plus Bronze cho hệ thống entry level', 65, 30, 0, 'AVAILABLE', 26, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033654/ReactNew/anh/Computer/LinhKien/Nguon/ihwx9gqo5qzt7j5ysiit.webp'),
('SSD Kingston NV2 1TB', 'Ổ cứng SSD Kingston NV2 1TB PCIe 4.0 NVMe với tốc độ đọc/ghi cao', 97.5, 20, 0, 'AVAILABLE', 27, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033658/ReactNew/anh/Computer/LinhKien/OCung/bt2fc8mmzuzvgmzmjzcm.webp'),
('SSD Kingston KC3000 2TB', 'Ổ cứng SSD Kingston KC3000 2TB PCIe 4.0 NVMe với hiệu năng cực cao', 225, 10, 0, 'AVAILABLE', 27, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033658/ReactNew/anh/Computer/LinhKien/OCung/klrjb5lfsuloqoawzjfv.webp'),
('SSD Kingston A400 480GB', 'Ổ cứng SSD Kingston A400 480GB SATA 3 với giá thành hợp lý', 47.5, 30, 0, 'AVAILABLE', 27, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033658/ReactNew/anh/Computer/LinhKien/OCung/c0ykaerwlbndzgaztlmh.webp'),
('SSD Kingston NV1 500GB', 'Ổ cứng SSD Kingston NV1 500GB PCIe 3.0 NVMe với tốc độ cao', 60, 25, 0, 'AVAILABLE', 27, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033658/ReactNew/anh/Computer/LinhKien/OCung/ssjqlcakrlixaisi0hry.webp'),
('SSD Kingston KC3000 1TB', 'Ổ cứng SSD Kingston KC3000 1TB PCIe 4.0 NVMe với tản nhiệt aluminum', 125, 18, 0, 'AVAILABLE', 27, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033658/ReactNew/anh/Computer/LinhKien/OCung/oyicez8tmysp5xzwpcs6.webp'),
('SSD Samsung 990 PRO 2TB', 'Ổ cứng SSD Samsung 990 PRO 2TB PCIe 4.0 NVMe với tốc độ đọc/ghi lên đến 7450/6900 MB/s', 275, 12, 0, 'AVAILABLE', 28, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033658/ReactNew/anh/Computer/LinhKien/OCung/twrjrv2llt5uwf7jxlpe.webp'),
('SSD Samsung 990 PRO 1TB', 'Ổ cứng SSD Samsung 990 PRO 1TB PCIe 4.0 NVMe với controller Samsung Elpis', 160, 18, 0, 'AVAILABLE', 28, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033657/ReactNew/anh/Computer/LinhKien/OCung/ijyhgygmhk656orspdhg.webp'),
('SSD Samsung 870 EVO 1TB', 'Ổ cứng SSD Samsung 870 EVO 1TB SATA 3 với độ bền cao', 115, 25, 0, 'AVAILABLE', 28, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033657/ReactNew/anh/Computer/LinhKien/OCung/nhj6wfhycpi9yxuv0laj.webp'),
('SSD Samsung 980 PRO 2TB', 'Ổ cứng SSD Samsung 980 PRO 2TB PCIe 4.0 NVMe với tản nhiệt', 240, 15, 0, 'AVAILABLE', 28, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033657/ReactNew/anh/Computer/LinhKien/OCung/sklgycvnkgc8bfunxrat.webp'),
('SSD Samsung 980 1TB', 'Ổ cứng SSD Samsung 980 1TB PCIe 3.0 NVMe với giá thành hợp lý', 110, 22, 0, 'AVAILABLE', 28, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033657/ReactNew/anh/Computer/LinhKien/OCung/qin79lsktocivcchlk3j.webp'),
('SSD WD Blue SN570 1TB', 'Ổ cứng SSD Western Digital Blue SN570 1TB PCIe 3.0 NVMe với tốc độ đọc lên đến 3500MB/s', 105, 20, 0, 'AVAILABLE', 29, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033657/ReactNew/anh/Computer/LinhKien/OCung/gl8mkb7rzufkgwd5nnxs.webp'),
('SSD WD Black SN850X 2TB', 'Ổ cứng SSD Western Digital Black SN850X 2TB PCIe 4.0 NVMe với hiệu năng cực cao', 260, 10, 0, 'AVAILABLE', 29, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033657/ReactNew/anh/Computer/LinhKien/OCung/a64mf6z39ronxcdj0wvl.webp'),
('SSD WD Green 480GB', 'Ổ cứng SSD Western Digital Green 480GB SATA 3 với giá thành hợp lý', 45, 30, 0, 'AVAILABLE', 29, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033657/ReactNew/anh/Computer/LinhKien/OCung/gcwfga6cdmgyrckka6s6.webp'),
('SSD WD Black SN770 1TB', 'Ổ cứng SSD Western Digital Black SN770 1TB PCIe 4.0 NVMe', 125, 18, 0, 'AVAILABLE', 29, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033657/ReactNew/anh/Computer/LinhKien/OCung/mhw7t9d5g1zgqgjtpciv.webp'),
('SSD WD Blue 3D NAND 1TB', 'Ổ cứng SSD Western Digital Blue 3D NAND 1TB SATA 3', 100, 22, 0, 'AVAILABLE', 29, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033656/ReactNew/anh/Computer/LinhKien/OCung/lrxkpljuvpfzlnywrqdg.webp'),
('Kingston Fury RGB DDR4 16GB 3200MHz', 'Bộ nhớ RAM Kingston Fury RGB DDR4 với hiệu suất cao và đèn LED RGB', 64.5, 50, 0, 'AVAILABLE', 30, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033660/ReactNew/anh/Computer/LinhKien/Ram/mfgxfgfj2v7tt8y0d8at.webp'),
('Kingston Fury Beast DDR4 16GB 3200MHz', 'Bộ nhớ RAM Kingston Fury Beast DDR4 với hiệu suất cao', 62.5, 45, 0, 'AVAILABLE', 30, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033660/ReactNew/anh/Computer/LinhKien/Ram/vckdm9quka8gnm0xmcvo.webp'),
('Kingston Fury Beast RGB DDR4 16GB 3200MHz', 'Bộ nhớ RAM Kingston Fury Beast RGB DDR4 với hiệu suất cao và đèn LED RGB', 67.5, 40, 0, 'AVAILABLE', 30, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033660/ReactNew/anh/Computer/LinhKien/Ram/ou4susdzt37pd7al2ttc.webp'),
('Corsair Vengeance RGB Pro DDR4 16GB 3200MHz', 'Bộ nhớ RAM Corsair Vengeance RGB Pro DDR4 với hiệu suất cao và đèn LED RGB', 74.5, 35, 0, 'AVAILABLE', 31, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033660/ReactNew/anh/Computer/LinhKien/Ram/eytep1zxuzkuq4aykfzp.webp'),
('Corsair Vengeance RGB Pro DDR4 32GB 3200MHz', 'Bộ nhớ RAM Corsair Vengeance RGB Pro DDR4 với hiệu suất cao và đèn LED RGB', 124.5, 30, 0, 'AVAILABLE', 31, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033660/ReactNew/anh/Computer/LinhKien/Ram/jm0xhdwf7uzlqfaiwzxu.webp'),
('Corsair Vengeance RGB RT DDR4 16GB 3600MHz', 'Bộ nhớ RAM Corsair Vengeance RGB RT DDR4 với hiệu suất cao và đèn LED RGB', 79.5, 25, 0, 'AVAILABLE', 31, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033660/ReactNew/anh/Computer/LinhKien/Ram/yfbqnolnesyyy0ycvzwl.webp'),
('Corsair Vengeance LPX DDR4 16GB 3200MHz', 'Bộ nhớ RAM Corsair Vengeance LPX DDR4 với hiệu suất cao', 69.5, 40, 0, 'AVAILABLE', 31, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033660/ReactNew/anh/Computer/LinhKien/Ram/fwcho5igliejgh26kv6p.webp'),
('Corsair Vengeance RGB Pro SL DDR4 32GB 3600MHz', 'Bộ nhớ RAM Corsair Vengeance RGB Pro SL DDR4 với hiệu suất cao và đèn LED RGB', 134.5, 20, 0, 'AVAILABLE', 31, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033660/ReactNew/anh/Computer/LinhKien/Ram/tncot2rl6oliaaxs5fjy.webp'),
('Corsair Dominator Platinum RGB DDR4 32GB 3600MHz', 'Bộ nhớ RAM Corsair Dominator Platinum RGB DDR4 với hiệu suất cao và đèn LED RGB', 164.5, 15, 0, 'AVAILABLE', 31, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033659/ReactNew/anh/Computer/LinhKien/Ram/ehzpigdgypx08xfahwua.webp'),
('PNY XLR8 Gaming RGB DDR4 16GB 3200MHz', 'Bộ nhớ RAM PNY XLR8 Gaming RGB DDR4 với hiệu suất cao và đèn LED RGB', 64.5, 30, 0, 'AVAILABLE', 32, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033659/ReactNew/anh/Computer/LinhKien/Ram/iz3uetg6oyhxdwwav0gm.webp'),
('PNY XLR8 Gaming EPIC-X RGB DDR4 16GB 3200MHz', 'Bộ nhớ RAM PNY XLR8 Gaming EPIC-X RGB DDR4 với hiệu suất cao và đèn LED RGB', 67.5, 25, 0, 'AVAILABLE', 32, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033659/ReactNew/anh/Computer/LinhKien/Ram/qsf4ojcdutmmwmso6zg1.webp'),
('PNY XLR8 Gaming DDR4 16GB 3200MHz', 'Bộ nhớ RAM PNY XLR8 Gaming DDR4 với hiệu suất cao', 59.5, 35, 0, 'AVAILABLE', 32, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033659/ReactNew/anh/Computer/LinhKien/Ram/xzx2ydvttvbdsqjm9yuh.webp'),
('PNY Performance DDR4 16GB 3200MHz', 'Bộ nhớ RAM PNY Performance DDR4 với hiệu suất ổn định', 54.5, 40, 0, 'AVAILABLE', 32, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033659/ReactNew/anh/Computer/LinhKien/Ram/zashtnn8rimiaxmskmcb.webp'),
('PNY XLR8 Gaming MAKO DDR4 32GB 3600MHz', 'Bộ nhớ RAM PNY XLR8 Gaming MAKO DDR4 với hiệu suất cao và đèn LED RGB', 124.5, 20, 0, 'AVAILABLE', 32, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033659/ReactNew/anh/Computer/LinhKien/Ram/cwsymdnehr6v2shyqnt1.webp'),
('ASUS TUF Gaming VG24VQE 24 inch Curved 165Hz', 'Màn hình gaming ASUS TUF 24 inch cong, tần số quét 165Hz, Full HD', 249.5, 14, 0, 'AVAILABLE', 36, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/ManHinh/bdxtg6tr9qtxzt89jrmr.webp'),
('ASUS ROG Strix XG27UQ 27 inch 4K 144Hz', 'Màn hình gaming ASUS ROG Strix 27 inch, 4K, tần số quét 144Hz', 899.5, 10, 0, 'AVAILABLE', 36, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/ManHinh/chkdigc9fja8ihxxtoys.webp'),
('ASUS TUF Gaming VG27AQ 27 inch 165Hz', 'Màn hình gaming ASUS TUF 27 inch, tần số quét 165Hz, IPS, HDR10', 399.5, 12, 0, 'AVAILABLE', 36, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/ManHinh/elccyxddwmntnd86jvok.webp'),
('ASUS ProArt PA278CV 27 inch QHD Professional', 'Màn hình ASUS ProArt 27 inch, QHD, dành cho đồ họa chuyên nghiệp', 499.5, 8, 0, 'AVAILABLE', 36, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/ManHinh/jbouxgzhpeyb8zywj3sr.webp'),
('ASUS TUF Gaming VG259QM 24.5 inch 280Hz', 'Màn hình gaming ASUS TUF 24.5 inch, tần số quét 280Hz, Full HD', 349.5, 15, 0, 'AVAILABLE', 36, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/ManHinh/jqxavmnwxybicbo81vzc.webp'),
('ASUS ROG Swift PG279QM 27 inch 240Hz', 'Màn hình gaming ASUS ROG Swift 27 inch, tần số quét 240Hz, QHD', 749.5, 10, 0, 'AVAILABLE', 36, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/ManHinh/jt50pgnrijpof6uca1tg.webp'),
('Acer Nitro VG240Y 23.8 inch 165Hz', 'Màn hình gaming Acer Nitro 23.8 inch, tần số quét 165Hz, Full HD', 199.5, 20, 0, 'AVAILABLE', 37, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/ManHinh/bdxtg6tr9qtxzt89jrmr.webp'),
('Acer EK241Y 23.8 inch 75Hz', 'Màn hình Acer 23.8 inch, tần số quét 75Hz, Full HD', 149.5, 25, 0, 'AVAILABLE', 37, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/ManHinh/chkdigc9fja8ihxxtoys.webp'),
('Acer Nitro VG270 27 inch 165Hz', 'Màn hình gaming Acer Nitro 27 inch, tần số quét 165Hz, Full HD', 249.5, 18, 0, 'AVAILABLE', 37, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/ManHinh/elccyxddwmntnd86jvok.webp'),
('Acer Predator XB273U 27 inch 170Hz', 'Màn hình gaming Acer Predator 27 inch, tần số quét 170Hz, QHD', 549.5, 12, 0, 'AVAILABLE', 37, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/ManHinh/jbouxgzhpeyb8zywj3sr.webp'),
('Acer Predator X38 38 inch Curved 175Hz', 'Màn hình gaming Acer Predator 38 inch cong, tần số quét 175Hz, UltraWide', 1399.5, 5, 0, 'AVAILABLE', 37, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/ManHinh/jqxavmnwxybicbo81vzc.webp'),
('LG UltraGear 27GP850-B 27 inch 180Hz', 'Màn hình gaming LG UltraGear 27 inch, tần số quét 180Hz, QHD', 449.5, 15, 0, 'AVAILABLE', 38, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/ManHinh/bdxtg6tr9qtxzt89jrmr.webp'),
('LG UltraGear 32GN600-B 32 inch 165Hz', 'Màn hình gaming LG UltraGear 32 inch, tần số quét 165Hz, QHD', 399.5, 12, 0, 'AVAILABLE', 38, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/ManHinh/chkdigc9fja8ihxxtoys.webp'),
('LG UltraGear 27GN800-B 27 inch 144Hz', 'Màn hình gaming LG UltraGear 27 inch, tần số quét 144Hz, QHD', 349.5, 18, 0, 'AVAILABLE', 38, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/ManHinh/elccyxddwmntnd86jvok.webp'),
('MSI Optix G241 24 inch 144Hz', 'Màn hình gaming MSI Optix 24 inch, tần số quét 144Hz, Full HD', 249.5, 20, 0, 'AVAILABLE', 39, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/ManHinh/bdxtg6tr9qtxzt89jrmr.webp'),
('MSI Optix G27C4 27 inch Curved 165Hz', 'Màn hình gaming MSI Optix 27 inch cong, tần số quét 165Hz, Full HD', 299.5, 15, 0, 'AVAILABLE', 39, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/ManHinh/chkdigc9fja8ihxxtoys.webp'),
('MSI MPG Artymis 343CQR 34 inch Curved 165Hz', 'Màn hình gaming MSI MPG Artymis 34 inch cong, tần số quét 165Hz, UltraWide', 749.5, 8, 0, 'AVAILABLE', 39, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/ManHinh/elccyxddwmntnd86jvok.webp'),
('MSI MAG274QRF-QD 27 inch 165Hz', 'Màn hình gaming MSI MAG 27 inch, tần số quét 165Hz, QHD', 549.5, 10, 0, 'AVAILABLE', 39, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/ManHinh/jbouxgzhpeyb8zywj3sr.webp'),
('ASUS ROG Sheath XXL Gaming Mousepad', 'Pad chuột gaming ASUS ROG Sheath XXL kích thước lớn, bề mặt vải cao cấp', 39.5, 30, 0, 'AVAILABLE', 12, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033668/ReactNew/anh/Computer/PadChuot/u9xg0bjhdsod4ipil6xn.webp'),
('ASUS ROG Strix Edge Gaming Mousepad', 'Pad chuột gaming ASUS ROG Strix Edge kích thước lớn, thiết kế đặc biệt', 29.5, 25, 0, 'AVAILABLE', 12, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033668/ReactNew/anh/Computer/PadChuot/xrquqz2q2aq7qumfcn1y.webp'),
('Daeru Gaming Mousepad XL', 'Pad chuột gaming Daeru XL kích thước lớn, bề mặt vải mịn', 14.5, 50, 0, 'AVAILABLE', 11, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033667/ReactNew/anh/Computer/PadChuot/hwy1ngcx8tvayy2l48ub.png'),
('Razer Goliathus Chroma Extended', 'Pad chuột gaming Razer Goliathus Chroma Extended, LED RGB, kích thước lớn', 64.5, 20, 0, 'AVAILABLE', 13, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033668/ReactNew/anh/Computer/PadChuot/lqwyjz4e0ni73ykvz2f6.webp'),
('Razer Sphex V3 Ultra-thin Gaming Surface', 'Pad chuột gaming Razer Sphex V3 siêu mỏng, bề mặt polymer', 24.5, 30, 0, 'AVAILABLE', 13, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033667/ReactNew/anh/Computer/PadChuot/hpfdi3pujb4lynxt6vnq.webp'),
('Razer Gigantus V2 XXL', 'Pad chuột gaming Razer Gigantus V2 XXL kích thước cực lớn, bề mặt vải cao cấp', 44.5, 25, 0, 'AVAILABLE', 13, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033667/ReactNew/anh/Computer/PadChuot/or8uiwmsie04fevmgfnn.webp'),
('MSI MAG Infinite S3 11th i5-11400F RTX 3060', 'PC Gaming MSI MAG Infinite S3, Core i5-11400F, RTX 3060, RAM 16GB, SSD 512GB, HDD 1TB', 1299.5, 8, 0, 'AVAILABLE', 40, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/PC/awhhteai6mvtl8gdqqlm.webp'),
('MSI MAG Codex 5 11th i7-11700 RTX 3060', 'PC Gaming MSI MAG Codex 5, Core i7-11700, RTX 3060, RAM 16GB, SSD 512GB, HDD 1TB', 1499.5, 5, 0, 'AVAILABLE', 40, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/PC/cxcpupg7xyqtktoss8xu.webp'),
('MSI MEG Aegis Ti5 11th i9-11900K RTX 3080', 'PC Gaming MSI MEG Aegis Ti5, Core i9-11900K, RTX 3080, RAM 32GB, SSD 1TB, HDD 2TB', 3149.5, 3, 0, 'AVAILABLE', 40, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/PC/doxgb5025hlpudw9a3qe.webp'),
('MSI MPG Trident 3 10th i7-10700 RTX 3060', 'PC Gaming MSI MPG Trident 3, Core i7-10700, RTX 3060, RAM 16GB, SSD 512GB', 1399.5, 7, 0, 'AVAILABLE', 40, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/PC/k9finsjeihnwlbztp6a5.webp'),
('ASUS TUF Gaming GT501 i7-11700 RTX 3060', 'PC Gaming ASUS TUF GT501, Core i7-11700, RTX 3060, RAM 16GB, SSD 512GB, HDD 1TB', 1499.5, 8, 0, 'AVAILABLE', 41, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/PC/awhhteai6mvtl8gdqqlm.webp'),
('ASUS ROG Strix G15DK R7-5800X RTX 3060', 'PC Gaming ASUS ROG Strix G15DK, Ryzen 7 5800X, RTX 3060, RAM 16GB, SSD 512GB, HDD 1TB', 1649.5, 5, 0, 'AVAILABLE', 41, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/PC/cxcpupg7xyqtktoss8xu.webp'),
('ASUS ROG Strix G35DX R9-5900X RTX 3080', 'PC Gaming ASUS ROG Strix G35DX, Ryzen 9 5900X, RTX 3080, RAM 32GB, SSD 1TB, HDD 2TB', 2999.5, 3, 0, 'AVAILABLE', 41, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/PC/doxgb5025hlpudw9a3qe.webp'),
('Intel NUC 11 Enthusiast Kit i7-1165G7', 'Mini PC Intel NUC 11 Enthusiast Kit, Core i7-1165G7, RAM 16GB, SSD 512GB', 999.5, 10, 0, 'AVAILABLE', 40, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/PC/sxezbccitly3oppgc0ng.webp'),
('Intel NUC 11 Pro Kit i5-1135G7', 'Mini PC Intel NUC 11 Pro Kit, Core i5-1135G7, RAM 8GB, SSD 256GB', 749.5, 12, 0, 'AVAILABLE', 40, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/PC/v6t3u5e0kxkga5uxddtk.webp'),
('Intel NUC 11 Performance Kit i3-1115G4', 'Mini PC Intel NUC 11 Performance Kit, Core i3-1115G4, RAM 8GB, SSD 256GB', 599.5, 15, 0, 'AVAILABLE', 40, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Computer/PC/zbc6tvpsiaqcmvebh1ba.webp'),
('ASUS ROG Cetra True Wireless Gaming Earbuds', 'Tai nghe gaming không dây ASUS ROG Cetra True Wireless, âm thanh nổi', 149.5, 20, 0, 'AVAILABLE', 42, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033671/ReactNew/anh/Computer/Tainghe/tnwcxla3v6mahbsumoyw.webp'),
('ASUS ROG Cetra II Core In-ear Gaming Headphones', 'Tai nghe gaming có dây ASUS ROG Cetra II Core, âm thanh nổi', 64.5, 25, 0, 'AVAILABLE', 42, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033671/ReactNew/anh/Computer/Tainghe/ponl5rjbymkklk9yhgpy.webp'),
('ASUS ROG Delta S Gaming Headset', 'Tai nghe gaming ASUS ROG Delta S, âm thanh vòm 7.1, đèn LED RGB', 249.5, 15, 0, 'AVAILABLE', 42, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033670/ReactNew/anh/Computer/Tainghe/pgkomxybbzlfo7lpujjq.webp'),
('ASUS ROG Strix Go 2.4 Wireless Gaming Headset', 'Tai nghe gaming không dây ASUS ROG Strix Go 2.4, âm thanh vòm, mic có khả năng khử tiếng ồn AI', 199.5, 12, 0, 'AVAILABLE', 42, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033670/ReactNew/anh/Computer/Tainghe/ljpfbdeu3gvszwaudpj8.webp'),
('Razer Kraken Kitty Edition', 'Tai nghe gaming Razer Kraken Kitty Edition, tai mèo LED RGB, âm thanh vòm 7.1', 189.5, 15, 0, 'AVAILABLE', 43, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033670/ReactNew/anh/Computer/Tainghe/txqoctk7fi1xbeajydce.webp'),
('Razer BlackShark V2 Pro Wireless', 'Tai nghe gaming không dây Razer BlackShark V2 Pro, âm thanh vòm THX Spatial Audio', 249.5, 10, 0, 'AVAILABLE', 43, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033670/ReactNew/anh/Computer/Tainghe/t7eq9fgk5j70gogcpdtm.webp'),
('Razer Kraken V3 X', 'Tai nghe gaming Razer Kraken V3 X, âm thanh vòm 7.1, đèn LED RGB', 99.5, 20, 0, 'AVAILABLE', 43, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033670/ReactNew/anh/Computer/Tainghe/zxvmb0ljobsiwkij9kll.webp'),
('Acer Nitro 5 AN515-57', 'Laptop Acer Nitro 5 AN515-57, i5-12450H, RTX 3050, 16GB RAM, 512GB SSD, 15.6" Full HD', 899.5, 9, 0, 'AVAILABLE', 45, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Acer/cz8lmdgrgkzsoq2oonmp.webp'),
('Acer Nitro 5 AN515-58', 'Laptop Acer Nitro 5 AN515-58, i5-12450H, RTX 3050, 16GB RAM, 512GB SSD, 15.6" Full HD', 949.5, 15, 0, 'AVAILABLE', 45, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Acer/gsqrhcy5xnblgfiivv1s.webp'),
('Acer Nitro 5 AN515-57', 'Laptop Acer Nitro 5 AN515-57, i7-12700H, RTX 4050, 16GB RAM, 512GB SSD, 15.6" Full HD', 1099.5, 8, 0, 'AVAILABLE', 45, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Acer/jfelxwzi49m4xqacf0ja.webp'),
('Acer Nitro 5 AN515-58', 'Laptop Acer Nitro 5 AN515-58, i7-12650H, RTX 4050, 16GB RAM, 512GB SSD, 15.6" Full HD', 1149.5, 12, 0, 'AVAILABLE', 45, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Acer/jkdocge6lpfulljn2ufq.webp'),
('Acer Nitro 7 AN715-51', 'Laptop Acer Nitro 7 AN715-51, i7-12650H, RTX 4050, 16GB RAM, 512GB SSD, 15.6" Full HD', 1199.5, 5, 0, 'AVAILABLE', 45, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Acer/naxncjpibsahxxnnnlba.webp'),
('Acer Nitro 5 AN515-58', 'Laptop Acer Nitro 5 AN515-58, i5-12450H, RTX 3050Ti, 16GB RAM, 512GB SSD, 15.6" Full HD', 999.5, 7, 0, 'AVAILABLE', 45, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Acer/ohf0ims7arfe4rgkauvn.webp'),
('Acer Nitro 7 AN715-51', 'Laptop Acer Nitro 7 AN715-51, i7-12700H, RTX 4060, 16GB RAM, 512GB SSD, 15.6" Full HD', 1299.5, 6, 0, 'AVAILABLE', 45, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Acer/pl9jxb6f719vrdfyp0hd.webp'),
('Acer Nitro 5 AN515-58', 'Laptop Acer Nitro 5 AN515-58, i5-12500H, RTX 3060, 16GB RAM, 512GB SSD, 15.6" Full HD', 1049.5, 9, 0, 'AVAILABLE', 45, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Acer/u893yjolgjs9ne1tsvat.webp'),
('Acer Aspire 5', 'Laptop Acer Aspire 5, Intel Core i5-1235U, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 15.6" Full HD', 799.5, 14, 0, 'AVAILABLE', 45, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Acer/w1y9bdq8kemn0szawthd.webp'),
('Asus VivoBook 15', 'Laptop Asus VivoBook 15, i5-12500H, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 15.6" Full HD', 849.5, 20, 0, 'AVAILABLE', 46, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Asus/dllnv0om3qdkmdo9ss97.webp'),
('Asus TUF Gaming F15', 'Laptop Asus TUF Gaming F15, i5-12500H, RTX 3050, 16GB RAM, 512GB SSD, 15.6" Full HD', 999.5, 15, 0, 'AVAILABLE', 46, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Asus/eqzuel3oznvn3fu5et9f.webp'),
('Asus Zenbook 14', 'Laptop Asus Zenbook 14, Core Ultra 5, Intel Arc Graphics, 16GB RAM, 512GB SSD, 14" 3K', 1149.5, 8, 0, 'AVAILABLE', 46, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Asus/fbdhwrkxott0h9qphsf6.webp'),
('Asus ROG Strix G16', 'Laptop Asus ROG Strix G16, i7-13650HX, RTX 4060, 16GB RAM, 1TB SSD, 16" Full HD', 1649.5, 6, 0, 'AVAILABLE', 46, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Asus/jwr33hrjbyqwuxjqqfmn.webp'),
('Asus VivoBook 14 OLED', 'Laptop Asus VivoBook 14 OLED, i5-13500H, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 14" 2.8K OLED', 949.5, 12, 0, 'AVAILABLE', 46, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Asus/rmbueegckqfzktb9k6jf.webp'),
('Asus VivoBook 14', 'Laptop Asus VivoBook 14, i5-13500H, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 14" 2.8K', 899.5, 10, 0, 'AVAILABLE', 46, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Asus/v1bhlwtxv9cixtun3b6c.webp'),
('Asus TUF Gaming A15', 'Laptop Asus TUF Gaming A15, R7-7435HS, RTX 3050, 16GB RAM, 512GB SSD, 15.6" Full HD', 999.5, 7, 0, 'AVAILABLE', 46, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Asus/wd2afbsp40wxcj80ljdb.webp'),
('Asus VivoBook Pro', 'Laptop Asus VivoBook Pro, i7-12700H, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 15.6" 2.8K', 1099.5, 5, 0, 'AVAILABLE', 46, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Asus/xleuxhhx0agskhiiqnwe.webp'),
('Asus Zenbook S13', 'Laptop Asus Zenbook S13, i7-1355U, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 13.3" 2.8K OLED', 1399.5, 4, 0, 'AVAILABLE', 46, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Asus/zpblj5fyzisrzztxtx9m.webp'),
('Dell Inspiron 15', 'Laptop Dell Inspiron 15, i5-1235U, Intel UHD Graphics, 16GB RAM, 512GB SSD, 15.6" Full HD', 849.5, 15, 0, 'AVAILABLE', 47, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Dell/j4rtgdyw5bc6wfmajzm6.webp'),
('Dell Inspiron 14', 'Laptop Dell Inspiron 14, i5-1335U, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 14" Full HD', 899.5, 12, 0, 'AVAILABLE', 47, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Dell/jdbtovwqzyrbazuqc8ye.webp'),
('Dell Inspiron 15', 'Laptop Dell Inspiron 15, i5-1335U, Intel Graphics, 16GB RAM, 512GB SSD, 15.6" Full HD', 924.5, 10, 0, 'AVAILABLE', 47, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Dell/jwxdqvdcxubkfx5ywevq.webp'),
('Dell Vostro 3520', 'Laptop Dell Vostro 3520, i3-1215U, Intel UHD Graphics, 8GB RAM, 512GB SSD, 15.6" Full HD', 699.5, 20, 0, 'AVAILABLE', 47, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Dell/keug0bjhsjpsn0v11pqa.webp'),
('Dell Inspiron 15', 'Laptop Dell Inspiron 15, i7-1355U, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 15.6" Full HD', 999.5, 8, 0, 'AVAILABLE', 47, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Dell/rvrebvuu6vig4bttwraf.webp'),
('Dell XPS 13', 'Laptop Dell XPS 13, i7-1360P, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 13.4" 3K', 1499.5, 5, 0, 'AVAILABLE', 47, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Dell/rwcyr7bwyzlbnxdlk2oc.webp'),
('Dell Inspiron 14', 'Laptop Dell Inspiron 14 2-in-1, i7-1355U, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 14" Full HD Touch', 1099.5, 7, 0, 'AVAILABLE', 47, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Dell/rylhebygwtnvsd21cr00.webp'),
('Dell Inspiron 16', 'Laptop Dell Inspiron 16, i5-13500H, Intel Iris Xe Graphics, 8GB RAM, 256GB SSD, 16" Full HD', 949.5, 9, 0, 'AVAILABLE', 47, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Dell/uv6ebokivofjroorv2ds.webp'),
('Dell Inspiron 15', 'Laptop Dell Inspiron 15, i5-1235U, Intel UHD Graphics, 8GB RAM, 512GB SSD, 15.6" Full HD', 799.5, 11, 0, 'AVAILABLE', 47, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Dell/zcgafzqkqsq9xtcj45ar.webp'),
('Gigabyte AORUS 17', 'Laptop Gigabyte AORUS 17, i9-11980HK, RTX 3080Ti, 16GB RAM, 512GB SSD, 17.3" Full HD', 2499.5, 3, 0, 'AVAILABLE', 48, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Gigabyte/ddmgkem7wfno0rbqevfe.webp'),
('Gigabyte G5', 'Laptop Gigabyte G5, i5-13500H, RTX 4050, 8GB RAM, 512GB SSD, 15.6" Full HD', 1099.5, 10, 0, 'AVAILABLE', 48, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Gigabyte/iinghcztceskrgptzbfm.webp'),
('Gigabyte G5', 'Laptop Gigabyte G5, i5-12500H, RTX 4060, 8GB RAM, 512GB SSD, 15.6" Full HD', 1199.5, 8, 0, 'AVAILABLE', 48, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Gigabyte/kf9ing1idfbo3bafksp5.webp'),
('Gigabyte AORUS 15', 'Laptop Gigabyte AORUS 15, i5-12400H, RTX 4050, 8GB RAM, 512GB SSD, 15.6" Full HD', 1249.5, 7, 0, 'AVAILABLE', 48, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Gigabyte/mib06vwcwwe3agvtbolt.webp'),
('Gigabyte AORUS 17', 'Laptop Gigabyte AORUS 17, i7-14650HX, RTX 4070, 16GB RAM, 1TB SSD, 17" QHD+', 1999.5, 4, 0, 'AVAILABLE', 48, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Gigabyte/nrn147mpli2g1g3mj2ps.webp'),
('Gigabyte G5', 'Laptop Gigabyte G5, i5-13420H, RTX 4050, 16GB RAM, 512GB SSD, 15.6" Full HD', 1149.5, 9, 0, 'AVAILABLE', 48, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Gigabyte/yldtpq6hwzmas9enn582.webp'),
('Gigabyte AORUS 16', 'Laptop Gigabyte AORUS 16, i7-13620H, RTX 4050, 16GB RAM, 1TB SSD, 16" Full HD+', 1449.5, 6, 0, 'AVAILABLE', 48, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Gigabyte/yrsjezs8ciwx26tdq1xz.webp'),
('Gigabyte AORUS 17', 'Laptop Gigabyte AORUS 17, i7-13620H, RTX 4060, 16GB RAM, 1TB SSD, 17" Full HD+', 1649.5, 5, 0, 'AVAILABLE', 48, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Gigabyte/z82faqxibpucqgpbjj0s.webp'),
('Lenovo Legion 5', 'Laptop Lenovo Legion 5, i5-12450HX, RTX 3050, 16GB RAM, 512GB SSD, 15.6" Full HD', 999.5, 12, 0, 'AVAILABLE', 49, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Lenovo/arvzmbmdcyukzd25xqkq.webp'),
('Lenovo Legion 5', 'Laptop Lenovo Legion 5, R7-7635HS, RTX 4060, 16GB RAM, 512GB SSD, 15.6" Full HD', 1299.5, 8, 0, 'AVAILABLE', 49, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Lenovo/balhtaipi85zsqdqjn0r.webp'),
('Lenovo Legion 5 Pro', 'Laptop Lenovo Legion 5 Pro, R7-7645HX, RTX 4060, 24GB RAM, 512GB SSD, 16" Full HD', 1499.5, 6, 0, 'AVAILABLE', 49, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Lenovo/gzj5pelrsvnhaomwxxf1.webp'),
('Lenovo Legion 5i', 'Laptop Lenovo Legion 5i, i5-12450HX, RTX 4050, 16GB RAM, 512GB SSD, 15.6" Full HD', 1149.5, 10, 0, 'AVAILABLE', 49, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Lenovo/iplggkqttcm3quzp3ozj.webp'),
('Lenovo Legion 7', 'Laptop Lenovo Legion 7, i9-13900HX, RTX 4070, 32GB RAM, 1TB SSD, 16" WQXGA', 2499.5, 3, 0, 'AVAILABLE', 49, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Lenovo/m98rvqtxwun7dmjd4hsi.webp'),
('Lenovo IdeaPad Slim 5', 'Laptop Lenovo IdeaPad Slim 5, AMD Ryzen 7 7730U, AMD Radeon Graphics, 16GB RAM, 512GB SSD, 14" WUXGA', 899.5, 15, 0, 'AVAILABLE', 49, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Lenovo/mvv8mgbuh67av6gyi1mn.webp'),
('Lenovo IdeaPad 1', 'Laptop Lenovo IdeaPad 1, R5-7520U, AMD Radeon Graphics, 16GB RAM, 512GB SSD, 14" WUXGA', 749.5, 18, 0, 'AVAILABLE', 49, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Lenovo/obr1vtcz2b42muu6zaae.webp'),
('Lenovo ThinkPad X1 Carbon', 'Laptop Lenovo ThinkPad X1 Carbon, i7-1270P, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 14" Full HD', 1649.5, 5, 0, 'AVAILABLE', 49, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Lenovo/q3dgwhsnzrpfhp1s1djt.webp'),
('Lenovo IdeaPad 3', 'Laptop Lenovo IdeaPad 3, i5-1235U, Intel UHD Graphics, 16GB RAM, 512GB SSD, 14" Full HD', 799.5, 14, 0, 'AVAILABLE', 49, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Lenovo/tojb7e9i2koljx9rqyga.webp'),
('Lenovo Legion 5', 'Laptop Lenovo Legion 5, R5-7535HS, RTX 3050, 12GB RAM, 512GB SSD, 15.6" Full HD', 949.5, 11, 0, 'AVAILABLE', 49, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Lenovo/waigpkro7h2ojcdqogox.webp'),
('Apple MacBook Air M2', 'Laptop Apple MacBook Air M2, 8 CPU cores, 8 GPU cores, 8GB RAM, 512GB SSD, 13.6" Retina', 1449.5, 10, 0, 'AVAILABLE', 50, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Mac/d3zpmgrcum9on2xsibah.webp'),
('Apple MacBook Air M2', 'Laptop Apple MacBook Air M2, 8 CPU cores, 10 GPU cores, 16GB RAM, 512GB SSD, 13.6" Retina', 1599.5, 8, 0, 'AVAILABLE', 50, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Mac/djeq6vwojjjohihyk8wl.webp'),
('Apple MacBook Air M3', 'Laptop Apple MacBook Air M3, 8 CPU cores, 8 GPU cores, 16GB RAM, 256GB SSD, 13.6" Retina', 1499.5, 9, 0, 'AVAILABLE', 50, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Mac/gebsoodcabxngzj0hnq9.webp'),
('Apple MacBook Pro M3', 'Laptop Apple MacBook Pro M3, 8 CPU cores, 10 GPU cores, 16GB RAM, 1TB SSD, 16" Retina', 2249.5, 5, 0, 'AVAILABLE', 50, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Mac/glrduu67osgvqcydbxl6.webp'),
('Apple MacBook Pro M3', 'Laptop Apple MacBook Pro M3, 8 CPU cores, 10 GPU cores, 16GB RAM, 256GB SSD, 13.3" Retina', 1599.5, 7, 0, 'AVAILABLE', 50, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Mac/libpdut7t6gzjlfdhdqk.webp'),
('Apple MacBook Air M3', 'Laptop Apple MacBook Air M3, 8 CPU cores, 10 GPU cores, 16GB RAM, 512GB SSD, 13.3" Retina', 1649.5, 6, 0, 'AVAILABLE', 50, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Mac/lnetofvc9w8vpyci0dvz.webp'),
('Apple MacBook Pro M3', 'Laptop Apple MacBook Pro M3, 12 CPU cores, 18 GPU cores, 16GB RAM, 512GB SSD, 14.2" Retina', 2499.5, 4, 0, 'AVAILABLE', 50, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Mac/mjyicsfs5mjyks4b9zqv.webp'),
('Apple MacBook Pro M2', 'Laptop Apple MacBook Pro M2, 10 CPU cores, 16 GPU cores, 16GB RAM, 256GB SSD, 13.3" Retina', 1699.5, 7, 0, 'AVAILABLE', 50, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Mac/ni3tlvfjhu9vxk2o9qfv.webp'),
('Apple MacBook Air M3', 'Laptop Apple MacBook Air M3, 8 CPU cores, 8 GPU cores, 16GB RAM, 256GB SSD, 13.3" Retina', 1449.5, 9, 0, 'AVAILABLE', 50, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Mac/um48vx9yzygwppfo23ww.webp'),
('Apple MacBook Pro M3', 'Laptop Apple MacBook Pro M3, 12 CPU cores, 18 GPU cores, 24GB RAM, 512GB SSD, 14.2" Retina', 2749.5, 3, 0, 'AVAILABLE', 50, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Mac/vfi6dosjyurj5dhvincl.webp'),
('Apple MacBook Pro M3 Max', 'Laptop Apple MacBook Pro M3 Max, 16 CPU cores, 40 GPU cores, 32GB RAM, 512GB SSD, 14.2" Retina', 3499.5, 2, 0, 'AVAILABLE', 50, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Mac/vhzvmuasmrncqhe5bycz.webp'),
('Apple MacBook Pro M3', 'Laptop Apple MacBook Pro M3, 8 CPU cores, 10 GPU cores, 16GB RAM, 512GB SSD, 13.3" Retina', 1849.5, 5, 0, 'AVAILABLE', 50, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Mac/xub6ayxw33wia7urxnzt.webp'),
('Apple MacBook Pro M2', 'Laptop Apple MacBook Pro M2, 10 CPU cores, 16 GPU cores, 16GB RAM, 256GB SSD, 13.3" Retina', 1649.5, 6, 0, 'AVAILABLE', 50, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/Mac/zn0urcpc9b7y27xhbxh8.webp'),
('MSI Vector GP76', 'Laptop MSI Vector GP76, i7-12650H, RTX 4050, 16GB RAM, 512GB SSD, 15.6" Full HD', 1299.5, 8, 0, 'AVAILABLE', 51, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/MSI/bw8lax3nn1nurrocppzo.webp'),
('MSI Cyborg 15', 'Laptop MSI Cyborg 15, i7-13620H, RTX 4060, 16GB RAM, 1TB SSD, 15.6" Full HD', 1499.5, 7, 0, 'AVAILABLE', 51, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/MSI/dtzyadg3mlgebapcixxj.webp'),
('MSI Pulse 15', 'Laptop MSI Pulse 15, i7-7735HS, RTX 4060, 16GB RAM, 512GB SSD, 15.6" Full HD', 1449.5, 8, 0, 'AVAILABLE', 51, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/MSI/kjen8bdexf4sfu3kxenf.webp'),
('MSI Katana 15', 'Laptop MSI Katana 15, i7-13620H, RTX 3050, 16GB RAM, 1TB SSD, 15.6" Full HD', 1249.5, 10, 0, 'AVAILABLE', 51, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/MSI/mf3w1lhckzra1osxoa03.webp'),
('MSI Cyborg 15', 'Laptop MSI Cyborg 15, i7-13620H, RTX 3050, 16GB RAM, 512GB SSD, 15.6" Full HD', 1199.5, 9, 0, 'AVAILABLE', 51, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/MSI/otqatdfphsqzppyhskig.webp'),
('MSI Stealth 15', 'Laptop MSI Stealth 15, i7-13620H, RTX 4050, 16GB RAM, 512GB SSD, 15.6" Full HD', 1349.5, 6, 0, 'AVAILABLE', 51, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/MSI/rmjap9vy3hds9af6onbk.webp'),
('MSI Thin 15', 'Laptop MSI Thin 15, i5-12450H, RTX 3050, 16GB RAM, 512GB SSD, 15.6" Full HD', 999.5, 12, 0, 'AVAILABLE', 51, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/MSI/t212ir5xdw6jqskvmbkt.webp'),
('MSI Raider GE77', 'Laptop MSI Raider GE77, UE-285VN, RTX 4090, 32GB RAM, 1TB SSD, 17" WQXGA', 3999.5, 2, 0, 'AVAILABLE', 51, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/MSI/tocedvhem2tqfywcfu0u.webp'),
('MSI Modern 15', 'Laptop MSI Modern 15, i5-1235U, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 15.6" Full HD', 899.5, 15, 0, 'AVAILABLE', 51, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Laptop/MSI/vehchnn8lfycsgrgwldz.webp'),
('iPad 10.9-inch', 'Apple iPad 10.9-inch 2022 model', 549.5, 15, 0, 'AVAILABLE', 44, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Ipad/a2ojhusfxdryaqlzyqkt.webp'),
('iPad Air 11-inch', 'Apple iPad Air 11-inch WiFi', 849.5, 10, 0, 'AVAILABLE', 44, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Ipad/dkwp3yxeuyj0qieqfbmq.webp'),
('iPad Air 6 M2', 'Apple iPad Air 6 M2 11-inch 256GB', 999.5, 8, 0, 'AVAILABLE', 44, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Ipad/g3bpc5eodowwpogyeist.webp'),
('iPad Pro 11-inch', 'Apple iPad Pro 11-inch with M-series chip', 1149.5, 5, 0, 'AVAILABLE', 44, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Ipad/lspauaaywhi8x1drjjex.webp'),
('iPhone 11', 'Apple iPhone 11 64GB', 499.5, 12, 0, 'AVAILABLE', 52, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Iphone/bt7anche2pef0m5fhwq3.webp'),
('iPhone 11s', 'Apple iPhone 11s 128GB', 549.5, 10, 0, 'AVAILABLE', 52, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Iphone/cvs5tvmtcetbfuvhx2aq.webp'),
('iPhone 12', 'Apple iPhone 12 128GB', 749.5, 15, 0, 'AVAILABLE', 52, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Iphone/e208b4dnk6r1xcl81mnd.webp'),
('iPhone 12 128GB', 'Apple iPhone 12 128GB', 799.5, 12, 0, 'AVAILABLE', 52, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Iphone/ecn1owflwlz2tjxvabhy.webp'),
('iPhone 14', 'Apple iPhone 14 128GB', 999.5, 10, 0, 'AVAILABLE', 52, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Iphone/gasqrgruu71zfbacabyd.webp'),
('iPhone 14 Plus', 'Apple iPhone 14 Plus 128GB', 1149.5, 8, 0, 'AVAILABLE', 52, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Iphone/hufxfg9olhr55e0i1qfv.webp'),
('iPhone 14 Pro', 'Apple iPhone 14 Pro 256GB', 1299.5, 6, 0, 'AVAILABLE', 52, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Iphone/i02nqcztmzds3mr5lggx.webp'),
('iPhone 14 Pro Max', 'Apple iPhone 14 Pro Max 256GB', 1399.5, 5, 0, 'AVAILABLE', 52, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Iphone/iymk0jead4okk63wnrhp.webp'),
('iPhone 15 Plus', 'Apple iPhone 15 Plus 128GB', 1249.5, 10, 0, 'AVAILABLE', 52, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Iphone/jhbayaem6a8jrlcdna9r.webp'),
('iPhone 15 Pro', 'Apple iPhone 15 Pro 256GB', 1449.5, 8, 0, 'AVAILABLE', 52, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Iphone/klnxhv2oahdntxj985z6.webp'),
('iPhone 15 Pro Max', 'Apple iPhone 15 Pro Max 512GB', 1649.5, 5, 0, 'AVAILABLE', 52, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Iphone/my63kkssorggnrs77t0b.webp'),
('iPhone 16', 'Apple iPhone 16 128GB', 1249.5, 12, 0, 'AVAILABLE', 52, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Iphone/ptzdrbagigzqmaprx7qs.webp'),
('iPhone 16 Plus', 'Apple iPhone 16 Plus 256GB', 1399.5, 10, 0, 'AVAILABLE', 52, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Iphone/totvivvehoekkgdiqoxd.webp'),
('iPhone 16 Pro', 'Apple iPhone 16 Pro 256GB', 1549.5, 8, 0, 'AVAILABLE', 52, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Iphone/txki5cvi9cfq4p1ila5h.webp'),
('iPhone 16 Pro Max', 'Apple iPhone 16 Pro Max 512GB', 1749.5, 5, 0, 'AVAILABLE', 52, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Iphone/u0porfjr8exbvij0mp6a.webp'),
('Samsung Galaxy A05s', 'Samsung Galaxy A05s 6GB 128GB', 199.5, 20, 0, 'AVAILABLE', 53, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Samsum/dg9dmtho9m5b0oeycect.webp'),
('Samsung Galaxy A16', 'Samsung Galaxy A16 128GB', 299.5, 15, 0, 'AVAILABLE', 53, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Samsum/fojjeg1hm9sywm0l5mht.webp'),
('Samsung Galaxy A26', 'Samsung Galaxy A26 6GB 128GB', 349.5, 12, 0, 'AVAILABLE', 53, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Samsum/hxv97vxickojlajqxmws.webp'),
('Samsung Galaxy A36', 'Samsung Galaxy A36 8GB 128GB', 399.5, 10, 0, 'AVAILABLE', 53, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Samsum/l2pwsdkmmjr99xe1tmar.webp'),
('Samsung Galaxy A56', 'Samsung Galaxy A56 8GB 256GB', 499.5, 8, 0, 'AVAILABLE', 53, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Samsum/lws9mmaa9mujvxspfiez.webp'),
('Samsung Galaxy M55', 'Samsung Galaxy M55 5G 128GB', 449.5, 12, 0, 'AVAILABLE', 53, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Samsum/ndxh7hsynmgdfjihwrso.webp'),
('Samsung Galaxy S24 FE', 'Samsung Galaxy S24 FE 8GB 256GB', 749.5, 8, 0, 'AVAILABLE', 53, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Samsum/of3tw7uaenppmiorocv1.webp'),
('Samsung Galaxy S25', 'Samsung Galaxy S25 8GB 256GB', 1049.5, 6, 0, 'AVAILABLE', 53, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Samsum/uso35ywqbzifb2gxocu7.webp'),
('Samsung Galaxy S25 Ultra', 'Samsung Galaxy S25 Ultra 12GB 512GB', 1549.5, 4, 0, 'AVAILABLE', 53, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Samsum/uzckivtfidxpksgmug2u.webp'),
('Samsung Galaxy A15', 'Samsung Galaxy A15 6GB 128GB', 249.5, 15, 0, 'AVAILABLE', 53, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Samsum/woiwtgivqy1vzibb4pej.webp'),
('Samsung Galaxy Z Fold 6', 'Samsung Galaxy Z Fold 6 12GB 512GB', 1999.5, 3, 0, 'AVAILABLE', 53, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Samsum/wzcxhz9rpxa7bw3ljzo4.webp'),
('Samsung Galaxy S24 Ultra', 'Samsung Galaxy S24 Ultra 12GB 512GB', 1499.5, 5, 0, 'AVAILABLE', 53, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/Samsum/xfhm84vyyjg3mslnu0mx.webp'),
('Xiaomi Poco X7 Pro', 'Xiaomi Poco X7 Pro 5G 8GB 256GB', 399.5, 10, 0, 'AVAILABLE', 54, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/xiaomi/albvz6xosso6yad8izkc.webp'),
('Xiaomi Poco X7 Pro 5G', 'Xiaomi Poco X7 Pro 5G 12GB 256GB', 449.5, 8, 0, 'AVAILABLE', 54, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/xiaomi/cz7mjzhkmmqt4stu74dz.webp'),
('Xiaomi 15', 'Xiaomi 15 8GB 256GB', 749.5, 10, 0, 'AVAILABLE', 54, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/xiaomi/ejgdmkla15ap5olbbnrh.webp'),
('Xiaomi 15 Ultra', 'Xiaomi 15 Ultra 12GB 512GB', 1249.5, 5, 0, 'AVAILABLE', 54, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/xiaomi/essve9wv5yrwfktzptnl.webp'),
('Xiaomi Redmi Note 14', 'Xiaomi Redmi Note 14 8GB 128GB', 299.5, 15, 0, 'AVAILABLE', 54, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/xiaomi/f8zfajybvxf0cofbldk9.webp'),
('Xiaomi 14', 'Xiaomi 14 8GB 256GB', 849.5, 8, 0, 'AVAILABLE', 54, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/xiaomi/je0cricbjw1tpqi2frbq.webp'),
('Redmi Note 14 Pro Plus', 'Redmi Note 14 Pro Plus 12GB 256GB', 499.5, 10, 0, 'AVAILABLE', 54, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/xiaomi/jmy1etixoqvhbjyhjuqs.webp'),
('Xiaomi 14T', 'Xiaomi 14T 8GB 256GB', 649.5, 8, 0, 'AVAILABLE', 54, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/xiaomi/kvfwgqvwkwpsrflb6gst.webp'),
('Xiaomi 14T Pro', 'Xiaomi 14T Pro 12GB 512GB', 799.5, 6, 0, 'AVAILABLE', 54, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/xiaomi/nyf7z7z9twbfpt6482pz.webp'),
('Xiaomi Redmi 14C', 'Xiaomi Redmi 14C 4GB 128GB', 174.5, 20, 0, 'AVAILABLE', 54, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/xiaomi/p6h4hsw4atcn5z0skdzp.webp'),
('Xiaomi Redmi Note 13', 'Xiaomi Redmi Note 13 6GB 128GB', 249.5, 15, 0, 'AVAILABLE', 54, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/xiaomi/pe0ezkfesv3cpqiwedg0.webp'),
('Xiaomi Redmi Note 13 Pro', 'Xiaomi Redmi Note 13 Pro 8GB 256GB', 399.5, 12, 0, 'AVAILABLE', 54, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/xiaomi/tth8gvwjikbndeetbscf.webp'),
('Xiaomi Redmi Note 13 Pro Plus', 'Xiaomi Redmi Note 13 Pro Plus 12GB 512GB', 499.5, 10, 0, 'AVAILABLE', 54, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/xiaomi/xclpwp7grwtalfq2fyx1.webp'),
('Xiaomi Redmi Pad SE', 'Xiaomi Redmi Pad SE 4GB 128GB', 224.5, 15, 0, 'AVAILABLE', 54, 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1744874445/reactproject/anh/xiaomi/ybj6jcllysuf9a6mqsoj.webp'),
('taki', '123', 0.6, 10, 0, 'AVAILABLE', 47, 'bwaxvr5cli7vbiusma7h');

-- Scale all product unit prices by 1,000,000
UPDATE products SET unit_price = unit_price * 10000;

-- ============================================
-- GENERATED ADDITIONAL DATA
-- Generated at: 2025-10-14T13:16:57.370Z
-- ============================================

-- ============================================
-- PERMISSIONS
-- ============================================
INSERT INTO permissions (id, name, description) VALUES (1, 'VIEW_PRODUCT', 'Xem sản phẩm');
INSERT INTO permissions (id, name, description) VALUES (2, 'CREATE_PRODUCT', 'Tạo sản phẩm mới');
INSERT INTO permissions (id, name, description) VALUES (3, 'UPDATE_PRODUCT', 'Cập nhật sản phẩm');
INSERT INTO permissions (id, name, description) VALUES (4, 'DELETE_PRODUCT', 'Xóa sản phẩm');
INSERT INTO permissions (id, name, description) VALUES (5, 'VIEW_ORDER', 'Xem đơn hàng');
INSERT INTO permissions (id, name, description) VALUES (6, 'UPDATE_ORDER', 'Cập nhật đơn hàng');
INSERT INTO permissions (id, name, description) VALUES (7, 'VIEW_USER', 'Xem người dùng');
INSERT INTO permissions (id, name, description) VALUES (8, 'CREATE_USER', 'Tạo người dùng');
INSERT INTO permissions (id, name, description) VALUES (9, 'UPDATE_USER', 'Cập nhật người dùng');
INSERT INTO permissions (id, name, description) VALUES (10, 'DELETE_USER', 'Xóa người dùng');
INSERT INTO permissions (id, name, description) VALUES (11, 'MANAGE_DISCOUNT', 'Quản lý khuyến mãi');
INSERT INTO permissions (id, name, description) VALUES (12, 'VIEW_STATISTICS', 'Xem thống kê');
INSERT INTO permissions (id, name, description) VALUES (13, 'CUSTOMER_SUPPORT', 'Hỗ trợ khách hàng');

-- ============================================
-- ROLES
-- ============================================
INSERT INTO roles (id, name, description) VALUES (1, 'ADMIN', 'Quản trị viên hệ thống');
INSERT INTO roles (id, name, description) VALUES (2, 'CUSTOMER_SERVICE', 'Nhân viên chăm sóc khách hàng');
INSERT INTO roles (id, name, description) VALUES (3, 'CUSTOMER', 'Khách hàng');
INSERT INTO roles (id, name, description) VALUES (4, 'GUEST', 'Khách vãng lai - chỉ xem và chat, không mua hàng');

-- ============================================
-- ROLE_PERMISSIONS
-- ============================================
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 1);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 2);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 3);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 4);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 5);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 6);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 7);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 8);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 9);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 10);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 11);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 12);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 13);
INSERT INTO role_permissions (role_id, permission_id) VALUES (2, 1);
INSERT INTO role_permissions (role_id, permission_id) VALUES (2, 5);
INSERT INTO role_permissions (role_id, permission_id) VALUES (2, 13);
INSERT INTO role_permissions (role_id, permission_id) VALUES (3, 1);
-- GUEST role - chỉ có quyền VIEW_PRODUCT
INSERT INTO role_permissions (role_id, permission_id) VALUES (4, 1);

-- ============================================
-- USERS
-- ============================================
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (1, 'Nguyễn Văn Admin', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'admin@shoponline.com', 'MALE', '123 Võ Văn Ngân, Thủ Đức, TP.HCM', '0901234567', '1990-01-15', 'ACTIVE', 0, 1, 9999, 0);

-- role_id = 2 (CSKH)
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (2, 'Lê Văn CSKH', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'support1@shoponline.com', 'MALE', '789 Xa lộ Hà Nội, Quận 2, TP.HCM', '0903456789', '1993-07-10', 'ACTIVE', 0, 2, 50, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (3, 'Đặng Thị Mai', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'support2@shoponline.com', 'FEMALE', '456 Hoàng Diệu, Quận 4, TP.HCM', '0903456790', '1994-11-25', 'ACTIVE', 0, 2, 50, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (4, 'Bùi Quốc Hùng', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'support3@shoponline.com', 'MALE', '123 Nguyễn Trãi, Quận 5, TP.HCM', '0903456791', '1995-02-14', 'ACTIVE', 0, 2, 50, 0);

-- role_id = 3 (CUSTOMER)
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (5, 'Vũ Hải Quân', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'thachjeager@gmail.com', 'FEMALE', '623 Xa lộ Hà Nội, Quận 2, TP.HCM', '0941418473', '1998-12-19', 'ACTIVE', 4879, 3, 10, 5);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (6, 'Lý Thu Thắng', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'phulam03@gmail.com', 'MALE', '831 Lê Văn Việt, Thủ Đức, TP.HCM', '0917316060', '2000-06-16', 'ACTIVE', 1834, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (7, 'Phạm Thị Vinh', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'haidang210804@gmail.com', 'MALE', '249 Lý Thái Tổ, Quận 10, TP.HCM', '0991753492', '2001-05-01', 'ACTIVE', 170, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (8, 'Nguyễn Văn Toàn', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer4@gmail.com', 'FEMALE', '484 Nguyễn Văn Cừ, Quận 5, TP.HCM', '0975386729', '1990-12-15', 'ACTIVE', 4354, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (9, 'Võ Thu Toàn', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer5@gmail.com', 'FEMALE', '991 Lý Chính Thắng, Quận 3, TP.HCM', '0998744176', '1998-12-25', 'ACTIVE', 1154, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (10, 'Võ Thu Sơn', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer6@gmail.com', 'FEMALE', '175 Hai Bà Trưng, Quận 3, TP.HCM', '0972736572', '1993-06-14', 'ACTIVE', 4352, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (11, 'Phạm Quốc Phong', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer7@gmail.com', 'FEMALE', '32 Xa lộ Hà Nội, Quận 2, TP.HCM', '0995671508', '1999-06-07', 'ACTIVE', 4276, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (12, 'Lê Anh Thảo', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer8@gmail.com', 'MALE', '435 Xa lộ Hà Nội, Quận 2, TP.HCM', '0980173930', '1991-01-04', 'ACTIVE', 3662, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (13, 'Nguyễn Minh Thảo', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer9@gmail.com', 'MALE', '718 Hai Bà Trưng, Quận 3, TP.HCM', '0908141146', '2004-01-14', 'ACTIVE', 597, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (14, 'Lý Thu Nam', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer10@gmail.com', 'MALE', '572 Nguyễn Văn Cừ, Quận 5, TP.HCM', '0990130737', '2002-06-06', 'ACTIVE', 119, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (15, 'Đỗ Quốc Hoa', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer11@gmail.com', 'FEMALE', '967 Lý Thái Tổ, Quận 10, TP.HCM', '0934391388', '1995-09-03', 'ACTIVE', 3116, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (16, 'Hoàng Thu Cường', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer12@gmail.com', 'MALE', '648 Lý Chính Thắng, Quận 3, TP.HCM', '0997626523', '1991-02-01', 'ACTIVE', 1409, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (17, 'Đặng Thanh Vinh', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer13@gmail.com', 'MALE', '691 Trần Hưng Đạo, Quận 5, TP.HCM', '0971887739', '2004-09-18', 'ACTIVE', 562, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (18, 'Hồ Đức Linh', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer14@gmail.com', 'MALE', '369 Điện Biên Phủ, Bình Thạnh, TP.HCM', '0958539232', '1995-05-02', 'ACTIVE', 2507, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (19, 'Bùi Văn Dũng', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer15@gmail.com', 'MALE', '826 Nguyễn Trãi, Quận 5, TP.HCM', '0937206898', '2004-12-12', 'ACTIVE', 2918, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (20, 'Phan Hải Sơn', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer16@gmail.com', 'FEMALE', '57 Bạch Đằng, Bình Thạnh, TP.HCM', '0989807227', '1996-10-23', 'INACTIVE', 3960, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (21, 'Vũ Văn Phương', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer17@gmail.com', 'MALE', '837 Võ Văn Ngân, Thủ Đức, TP.HCM', '0962572329', '2003-01-03', 'ACTIVE', 2217, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (22, 'Hoàng Hồng Quân', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer18@gmail.com', 'FEMALE', '583 Võ Văn Ngân, Thủ Đức, TP.HCM', '0971391199', '1998-12-27', 'ACTIVE', 276, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (23, 'Bùi Quốc Khoa', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer19@gmail.com', 'MALE', '652 Võ Văn Ngân, Thủ Đức, TP.HCM', '0910005986', '1997-10-09', 'ACTIVE', 1403, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (24, 'Vũ Hải Phong', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer20@gmail.com', 'MALE', '492 Trần Hưng Đạo, Quận 5, TP.HCM', '0914994218', '1991-02-11', 'ACTIVE', 1788, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (25, 'Bùi Thu Khoa', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer21@gmail.com', 'FEMALE', '362 Lê Lợi, Quận 1, TP.HCM', '0974445593', '1990-02-04', 'ACTIVE', 4692, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (26, 'Bùi Văn Lan', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer22@gmail.com', 'FEMALE', '610 Hoàng Diệu, Quận 4, TP.HCM', '0919682209', '1998-10-22', 'ACTIVE', 189, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (27, 'Đặng Hải An', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer23@gmail.com', 'MALE', '195 Hoàng Diệu, Quận 4, TP.HCM', '0920999891', '1998-11-17', 'ACTIVE', 3629, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (28, 'Hoàng Thị Phong', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer24@gmail.com', 'MALE', '364 Phạm Ngũ Lão, Quận 1, TP.HCM', '0974229251', '2004-02-02', 'ACTIVE', 3178, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (29, 'Bùi Thanh Thắng', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer25@gmail.com', 'FEMALE', '833 Pasteur, Quận 1, TP.HCM', '0961960930', '2002-02-22', 'ACTIVE', 4668, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (30, 'Dương Thu Bình', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer26@gmail.com', 'FEMALE', '821 Điện Biên Phủ, Bình Thạnh, TP.HCM', '0959647541', '1991-03-07', 'INACTIVE', 4428, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (31, 'Võ Đức Trang', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer27@gmail.com', 'FEMALE', '829 Trần Hưng Đạo, Quận 5, TP.HCM', '0921115021', '1991-11-15', 'ACTIVE', 4158, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (32, 'Võ Đức Nga', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer28@gmail.com', 'MALE', '341 Cộng Hòa, Tân Bình, TP.HCM', '0983282343', '2003-10-23', 'ACTIVE', 1611, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (33, 'Phan Quốc Hương', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer29@gmail.com', 'FEMALE', '584 Lý Thái Tổ, Quận 10, TP.HCM', '0973205791', '2004-06-23', 'ACTIVE', 1770, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (34, 'Võ Thu Sơn', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer30@gmail.com', 'MALE', '609 Lý Thái Tổ, Quận 10, TP.HCM', '0974970495', '1992-01-23', 'ACTIVE', 2540, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (35, 'Bùi Đức Trang', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer31@gmail.com', 'MALE', '914 Pasteur, Quận 1, TP.HCM', '0964220536', '1995-07-11', 'ACTIVE', 2966, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (36, 'Hoàng Quốc Dũng', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer32@gmail.com', 'FEMALE', '192 Cách Mạng Tháng 8, Quận 3, TP.HCM', '0992492087', '1991-08-13', 'ACTIVE', 1615, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (37, 'Lý Quốc An', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer33@gmail.com', 'FEMALE', '460 Hoàng Văn Thụ, Tân Bình, TP.HCM', '0987714379', '2001-06-28', 'ACTIVE', 3793, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (38, 'Trần Thanh Nam', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer34@gmail.com', 'MALE', '917 Lê Lợi, Quận 1, TP.HCM', '0948244570', '1995-01-14', 'ACTIVE', 1295, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (39, 'Đặng Minh Khoa', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer35@gmail.com', 'FEMALE', '462 Lê Văn Việt, Thủ Đức, TP.HCM', '0918077889', '1996-02-03', 'ACTIVE', 980, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (40, 'Nguyễn Thu Tú', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer36@gmail.com', 'MALE', '387 Bạch Đằng, Bình Thạnh, TP.HCM', '0901283437', '1995-12-26', 'ACTIVE', 2179, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (41, 'Vũ Hải Vy', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer37@gmail.com', 'MALE', '12 Bạch Đằng, Bình Thạnh, TP.HCM', '0906831329', '1992-04-14', 'ACTIVE', 698, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (42, 'Dương Thanh Vy', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer38@gmail.com', 'FEMALE', '563 Bạch Đằng, Bình Thạnh, TP.HCM', '0916825679', '1996-08-26', 'ACTIVE', 2027, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (43, 'Phan Đức Thảo', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer39@gmail.com', 'FEMALE', '171 Cộng Hòa, Tân Bình, TP.HCM', '0968214151', '2003-05-09', 'ACTIVE', 1868, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (44, 'Vũ Thu Thắng', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer40@gmail.com', 'MALE', '966 Trần Quốc Toản, Quận 3, TP.HCM', '0911071917', '1995-04-06', 'INACTIVE', 2084, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (45, 'Võ Thu Tú', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer41@gmail.com', 'MALE', '68 Điện Biên Phủ, Bình Thạnh, TP.HCM', '0912816857', '1992-07-22', 'INACTIVE', 3924, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (46, 'Ngô Thu Mai', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer42@gmail.com', 'FEMALE', '605 Lý Thái Tổ, Quận 10, TP.HCM', '0962992731', '1995-03-13', 'ACTIVE', 2471, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (47, 'Vũ Hải Khoa', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer43@gmail.com', 'FEMALE', '321 Cách Mạng Tháng 8, Quận 3, TP.HCM', '0924636716', '2000-05-26', 'ACTIVE', 802, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (48, 'Hồ Hải Nam', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer44@gmail.com', 'MALE', '612 Cộng Hòa, Tân Bình, TP.HCM', '0985583304', '2003-05-21', 'ACTIVE', 1696, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (49, 'Trần Thanh Linh', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer45@gmail.com', 'MALE', '950 Pasteur, Quận 1, TP.HCM', '0993255677', '1992-09-11', 'ACTIVE', 776, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (50, 'Đặng Đức Bình', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer46@gmail.com', 'MALE', '838 Lý Chính Thắng, Quận 3, TP.HCM', '0944290232', '1990-01-19', 'INACTIVE', 1032, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (51, 'Phạm Hồng Thảo', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer47@gmail.com', 'MALE', '640 Phạm Ngũ Lão, Quận 1, TP.HCM', '0965673798', '1998-07-16', 'ACTIVE', 2994, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (52, 'Phạm Đức Dũng', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer48@gmail.com', 'FEMALE', '129 Cách Mạng Tháng 8, Quận 3, TP.HCM', '0941640241', '1991-04-25', 'ACTIVE', 550, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (53, 'Lê Hải Cường', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer49@gmail.com', 'FEMALE', '512 Nguyễn Thị Minh Khai, Quận 1, TP.HCM', '0912724783', '2002-11-18', 'ACTIVE', 2243, 3, 10, 0);
INSERT INTO users (id, full_name, password, email, gender, address, phone_number, dob, status, cumulative_points, role_id, number_of_plays_allowed, number_of_games_played) VALUES (54, 'Dương Đức Mai', '$2a$10$nbIaxMdz94Snj6gHj0N4S.VzqNGXt/5jdvhubQeCpSAY1i/wbG9p2', 'customer50@gmail.com', 'FEMALE', '334 Cách Mạng Tháng 8, Quận 3, TP.HCM', '0916885862', '2001-04-20', 'ACTIVE', 4462, 3, 10, 5);
-- ============================================
-- DISCOUNTS
-- ============================================
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (1, 'Cyber Monday 30%', 'PERCENTAGE', 'Khuyến mãi giảm 30% cho sản phẩm', 0.3, true, '2025-09-01', '2025-09-28', 4);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (2, 'Black Friday 5%', 'PERCENTAGE', 'Khuyến mãi giảm 5% cho sản phẩm', 0.05, true, '2025-09-01', '2025-09-28', 8);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (3, 'Mua 1 tặng 1 25%', 'PERCENTAGE', 'Khuyến mãi giảm 25% cho sản phẩm', 0.25, true, '2025-10-01', '2025-10-28', 12);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (4, 'Sale tháng 2 10%', 'PERCENTAGE', 'Khuyến mãi giảm 10% cho sản phẩm', 0.1, true, '2025-08-01', '2025-08-28', 16);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (5, 'Mua 1 tặng 1 40%', 'PERCENTAGE', 'Khuyến mãi giảm 40% cho sản phẩm', 0.4, true, '2025-11-01', '2025-11-28', 20);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (6, 'Giảm giá mùa hè 20%', 'PERCENTAGE', 'Khuyến mãi giảm 20% cho sản phẩm', 0.2, true, '2025-07-01', '2025-07-28', 24);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (7, 'Khuyến mãi sinh nhật 30%', 'PERCENTAGE', 'Khuyến mãi giảm 30% cho sản phẩm', 0.3, true, '2025-11-01', '2025-11-28', 28);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (8, 'Sale tháng 2 15%', 'PERCENTAGE', 'Khuyến mãi giảm 15% cho sản phẩm', 0.15, true, '2025-08-01', '2025-08-28', 32);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (9, 'Giảm giá đặc biệt 10%', 'PERCENTAGE', 'Khuyến mãi giảm 10% cho sản phẩm', 0.1, false, '2025-02-01', '2025-02-28', 36);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (10, 'Black Friday 10%', 'PERCENTAGE', 'Khuyến mãi giảm 10% cho sản phẩm', 0.1, true, '2025-02-01', '2025-02-28', 30);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (11, 'Giảm giá đặc biệt 25%', 'PERCENTAGE', 'Khuyến mãi giảm 25% cho sản phẩm', 0.25, true, '2025-05-01', '2025-05-28', 34);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (12, 'Giảm giá mùa hè 30%', 'PERCENTAGE', 'Khuyến mãi giảm 30% cho sản phẩm', 0.3, true, '2025-12-01', '2025-12-28', 38);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (13, 'Giảm giá mùa hè 10%', 'PERCENTAGE', 'Khuyến mãi giảm 10% cho sản phẩm', 0.1, false, '2025-08-01', '2025-08-28', 42);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (14, 'Giảm giá mùa hè 20%', 'PERCENTAGE', 'Khuyến mãi giảm 20% cho sản phẩm', 0.2, true, '2025-01-01', '2025-01-28', 46);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (15, 'Ưu đãi thành viên 35%', 'PERCENTAGE', 'Khuyến mãi giảm 35% cho sản phẩm', 0.35, true, '2025-05-01', '2025-05-28', 50);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (16, 'Flash Sale 5%', 'PERCENTAGE', 'Khuyến mãi giảm 5% cho sản phẩm', 0.05, true, '2025-01-01', '2025-01-28', 54);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (17, 'Black Friday 40%', 'PERCENTAGE', 'Khuyến mãi giảm 40% cho sản phẩm', 0.4, true, '2025-07-01', '2025-07-28', 58);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (18, 'Hot deal 10%', 'PERCENTAGE', 'Khuyến mãi giảm 10% cho sản phẩm', 0.1, true, '2025-06-01', '2025-06-28', 62);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (19, 'Black Friday 20%', 'PERCENTAGE', 'Khuyến mãi giảm 20% cho sản phẩm', 0.2, true, '2025-01-01', '2025-01-28', 66);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (20, 'Giảm giá sốc 20%', 'PERCENTAGE', 'Khuyến mãi giảm 20% cho sản phẩm', 0.2, true, '2025-07-01', '2025-07-28', 60);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (21, 'Ưu đãi thành viên 40%', 'PERCENTAGE', 'Khuyến mãi giảm 40% cho sản phẩm', 0.4, true, '2025-05-01', '2025-05-28', 64);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (22, 'Giảm giá đặc biệt 5%', 'PERCENTAGE', 'Khuyến mãi giảm 5% cho sản phẩm', 0.05, true, '2025-08-01', '2025-08-28', 68);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (23, 'Mua 1 tặng 1 25%', 'PERCENTAGE', 'Khuyến mãi giảm 25% cho sản phẩm', 0.25, true, '2025-09-01', '2025-09-28', 72);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (24, 'Khuyến mãi sinh nhật 20%', 'PERCENTAGE', 'Khuyến mãi giảm 20% cho sản phẩm', 0.2, true, '2025-01-01', '2025-01-28', 76);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (25, 'Giảm giá sốc 30%', 'PERCENTAGE', 'Khuyến mãi giảm 30% cho sản phẩm', 0.3, false, '2025-05-01', '2025-05-28', 80);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (26, 'Hot deal 5%', 'PERCENTAGE', 'Khuyến mãi giảm 5% cho sản phẩm', 0.05, true, '2025-12-01', '2025-12-28', 84);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (27, 'Khuyến mãi sinh nhật 35%', 'PERCENTAGE', 'Khuyến mãi giảm 35% cho sản phẩm', 0.35, true, '2025-10-01', '2025-10-28', 88);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (28, 'Sale tháng 2 15%', 'PERCENTAGE', 'Khuyến mãi giảm 15% cho sản phẩm', 0.15, false, '2025-12-01', '2025-12-28', 92);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (29, 'Giảm giá mùa hè 25%', 'PERCENTAGE', 'Khuyến mãi giảm 25% cho sản phẩm', 0.25, true, '2025-07-01', '2025-07-28', 96);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (30, 'Black Friday 20%', 'PERCENTAGE', 'Khuyến mãi giảm 20% cho sản phẩm', 0.2, true, '2025-09-01', '2025-09-28', 90);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (31, 'Siêu khuyến mãi 35%', 'PERCENTAGE', 'Khuyến mãi giảm 35% cho sản phẩm', 0.35, true, '2025-04-01', '2025-04-28', 94);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (32, 'Cyber Monday 5%', 'PERCENTAGE', 'Khuyến mãi giảm 5% cho sản phẩm', 0.05, true, '2025-05-01', '2025-05-28', 98);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (33, 'Hot deal 15%', 'PERCENTAGE', 'Khuyến mãi giảm 15% cho sản phẩm', 0.15, false, '2025-08-01', '2025-08-28', 102);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (34, 'Khuyến mãi cuối tuần 25%', 'PERCENTAGE', 'Khuyến mãi giảm 25% cho sản phẩm', 0.25, false, '2025-09-01', '2025-09-28', 106);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (35, 'Black Friday 10%', 'PERCENTAGE', 'Khuyến mãi giảm 10% cho sản phẩm', 0.1, true, '2025-08-01', '2025-08-28', 110);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (36, 'Ưu đãi thành viên 10%', 'PERCENTAGE', 'Khuyến mãi giảm 10% cho sản phẩm', 0.1, true, '2025-02-01', '2025-02-28', 114);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (37, 'Khuyến mãi cuối tuần 30%', 'PERCENTAGE', 'Khuyến mãi giảm 30% cho sản phẩm', 0.3, true, '2025-10-01', '2025-10-28', 118);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (38, 'Siêu khuyến mãi 20%', 'PERCENTAGE', 'Khuyến mãi giảm 20% cho sản phẩm', 0.2, true, '2025-09-01', '2025-09-28', 122);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (39, 'Siêu khuyến mãi 35%', 'PERCENTAGE', 'Khuyến mãi giảm 35% cho sản phẩm', 0.35, true, '2025-01-01', '2025-01-28', 126);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (40, 'Giảm giá mùa hè 20%', 'PERCENTAGE', 'Khuyến mãi giảm 20% cho sản phẩm', 0.2, true, '2025-03-01', '2025-03-28', 120);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (41, 'Sale tháng 2 25%', 'PERCENTAGE', 'Khuyến mãi giảm 25% cho sản phẩm', 0.25, false, '2025-09-01', '2025-09-28', 124);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (42, 'Khuyến mãi sinh nhật 5%', 'PERCENTAGE', 'Khuyến mãi giảm 5% cho sản phẩm', 0.05, true, '2025-10-01', '2025-10-28', 128);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (43, 'Flash Sale 10%', 'PERCENTAGE', 'Khuyến mãi giảm 10% cho sản phẩm', 0.1, true, '2025-09-01', '2025-09-28', 132);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (44, 'Ưu đãi thành viên 40%', 'PERCENTAGE', 'Khuyến mãi giảm 40% cho sản phẩm', 0.4, true, '2025-05-01', '2025-05-28', 136);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (45, 'Khuyến mãi cuối tuần 25%', 'PERCENTAGE', 'Khuyến mãi giảm 25% cho sản phẩm', 0.25, true, '2025-05-01', '2025-05-28', 140);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (46, 'Hot deal 15%', 'PERCENTAGE', 'Khuyến mãi giảm 15% cho sản phẩm', 0.15, true, '2025-01-01', '2025-01-28', 144);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (47, 'Flash Sale 20%', 'PERCENTAGE', 'Khuyến mãi giảm 20% cho sản phẩm', 0.2, true, '2025-04-01', '2025-04-28', 148);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (48, 'Giảm giá đặc biệt 10%', 'PERCENTAGE', 'Khuyến mãi giảm 10% cho sản phẩm', 0.1, true, '2025-03-01', '2025-03-28', 152);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (49, 'Sale tháng 2 20%', 'PERCENTAGE', 'Khuyến mãi giảm 20% cho sản phẩm', 0.2, true, '2025-01-01', '2025-01-28', 156);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (50, 'Giảm giá mùa hè 30%', 'PERCENTAGE', 'Khuyến mãi giảm 30% cho sản phẩm', 0.3, true, '2025-05-01', '2025-05-28', 150);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (51, 'Mua 1 tặng 1 15%', 'PERCENTAGE', 'Khuyến mãi giảm 15% cho sản phẩm', 0.15, false, '2025-10-01', '2025-10-28', 154);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (52, 'Cyber Monday 25%', 'PERCENTAGE', 'Khuyến mãi giảm 25% cho sản phẩm', 0.25, true, '2025-12-01', '2025-12-28', 158);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (53, 'Ưu đãi thành viên 30%', 'PERCENTAGE', 'Khuyến mãi giảm 30% cho sản phẩm', 0.3, true, '2025-05-01', '2025-05-28', 162);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (54, 'Flash Sale 20%', 'PERCENTAGE', 'Khuyến mãi giảm 20% cho sản phẩm', 0.2, true, '2025-03-01', '2025-03-28', 166);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (55, 'Khuyến mãi cuối tuần 40%', 'PERCENTAGE', 'Khuyến mãi giảm 40% cho sản phẩm', 0.4, false, '2025-06-01', '2025-06-28', 170);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (56, 'Hot deal 10%', 'PERCENTAGE', 'Khuyến mãi giảm 10% cho sản phẩm', 0.1, true, '2025-10-01', '2025-10-28', 174);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (57, 'Khuyến mãi cuối tuần 35%', 'PERCENTAGE', 'Khuyến mãi giảm 35% cho sản phẩm', 0.35, true, '2025-11-01', '2025-11-28', 178);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (58, 'Khuyến mãi sinh nhật 35%', 'PERCENTAGE', 'Khuyến mãi giảm 35% cho sản phẩm', 0.35, true, '2025-04-01', '2025-04-28', 182);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (59, 'Ưu đãi thành viên 40%', 'PERCENTAGE', 'Khuyến mãi giảm 40% cho sản phẩm', 0.4, true, '2025-01-01', '2025-01-28', 186);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (60, 'Flash Sale 10%', 'PERCENTAGE', 'Khuyến mãi giảm 10% cho sản phẩm', 0.1, true, '2025-09-01', '2025-09-28', 180);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (61, 'Ưu đãi thành viên 10%', 'PERCENTAGE', 'Khuyến mãi giảm 10% cho sản phẩm', 0.1, true, '2025-03-01', '2025-03-28', 184);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (62, 'Giảm giá sốc 20%', 'PERCENTAGE', 'Khuyến mãi giảm 20% cho sản phẩm', 0.2, false, '2025-10-01', '2025-10-28', 188);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (63, 'Hot deal 20%', 'PERCENTAGE', 'Khuyến mãi giảm 20% cho sản phẩm', 0.2, false, '2025-03-01', '2025-03-28', 192);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (64, 'Black Friday 5%', 'PERCENTAGE', 'Khuyến mãi giảm 5% cho sản phẩm', 0.05, false, '2025-06-01', '2025-06-28', 196);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (65, 'Ưu đãi thành viên 15%', 'PERCENTAGE', 'Khuyến mãi giảm 15% cho sản phẩm', 0.15, true, '2025-09-01', '2025-09-28', 200);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (66, 'Khuyến mãi cuối tuần 10%', 'PERCENTAGE', 'Khuyến mãi giảm 10% cho sản phẩm', 0.1, true, '2025-01-01', '2025-01-28', 204);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (67, 'Khuyến mãi sinh nhật 10%', 'PERCENTAGE', 'Khuyến mãi giảm 10% cho sản phẩm', 0.1, true, '2025-07-01', '2025-07-28', 208);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (68, 'Mua 1 tặng 1 40%', 'PERCENTAGE', 'Khuyến mãi giảm 40% cho sản phẩm', 0.4, true, '2025-07-01', '2025-07-28', 212);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (69, 'Sale tháng 2 10%', 'PERCENTAGE', 'Khuyến mãi giảm 10% cho sản phẩm', 0.1, true, '2025-04-01', '2025-04-28', 216);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (70, 'Khuyến mãi sinh nhật 15%', 'PERCENTAGE', 'Khuyến mãi giảm 15% cho sản phẩm', 0.15, true, '2025-10-01', '2025-10-28', 210);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (71, 'Mua 1 tặng 1 20%', 'PERCENTAGE', 'Khuyến mãi giảm 20% cho sản phẩm', 0.2, false, '2025-05-01', '2025-05-28', 214);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (72, 'Mua 1 tặng 1 10%', 'PERCENTAGE', 'Khuyến mãi giảm 10% cho sản phẩm', 0.1, true, '2025-12-01', '2025-12-28', 218);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (73, 'Hot deal 40%', 'PERCENTAGE', 'Khuyến mãi giảm 40% cho sản phẩm', 0.4, true, '2025-04-01', '2025-04-28', 222);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (74, 'Flash Sale 35%', 'PERCENTAGE', 'Khuyến mãi giảm 35% cho sản phẩm', 0.35, true, '2025-01-01', '2025-01-28', 226);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (75, 'Sale tháng 2 10%', 'PERCENTAGE', 'Khuyến mãi giảm 10% cho sản phẩm', 0.1, true, '2025-02-01', '2025-02-28', 230);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (76, 'Ưu đãi thành viên 40%', 'PERCENTAGE', 'Khuyến mãi giảm 40% cho sản phẩm', 0.4, true, '2025-06-01', '2025-06-28', 234);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (77, 'Mua 1 tặng 1 5%', 'PERCENTAGE', 'Khuyến mãi giảm 5% cho sản phẩm', 0.05, true, '2025-01-01', '2025-01-28', 238);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (78, 'Hot deal 5%', 'PERCENTAGE', 'Khuyến mãi giảm 5% cho sản phẩm', 0.05, true, '2025-05-01', '2025-05-28', 242);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (79, 'Khuyến mãi cuối tuần 10%', 'PERCENTAGE', 'Khuyến mãi giảm 10% cho sản phẩm', 0.1, false, '2025-07-01', '2025-07-28', 246);
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id) VALUES (80, 'Hot deal 30%', 'PERCENTAGE', 'Khuyến mãi giảm 30% cho sản phẩm', 0.3, true, '2025-10-01', '2025-10-28', 240);

-- ============================================
-- ORDERS
-- ============================================
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (1, 25000, 35087269, '2025-02-18', '831 Lê Văn Việt, Thủ Đức, TP.HCM', 'CANCELLED', NULL, 457, '2025-02-18', 'ONLINE_BANKING', 6);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (2, 30000, 42285617, '2025-02-03', '12 Bạch Đằng, Bình Thạnh, TP.HCM', 'CONFIRMED', 'Để ở bảo vệ', 0, NULL, 'CASH_ON_DELIVERY', 41);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (3, 30000, 23310082, '2025-02-20', '484 Nguyễn Văn Cừ, Quận 5, TP.HCM', 'PROCESSING', 'Gọi trước khi giao', 219, '2025-02-20', 'CASH_ON_DELIVERY', 8);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (4, 25000, 8585416, '2025-02-05', '492 Trần Hưng Đạo, Quận 5, TP.HCM', 'RETURNED', NULL, 0, NULL, 'ONLINE_BANKING', 24);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (5, 30000, 18943153, '2025-02-02', '572 Nguyễn Văn Cừ, Quận 5, TP.HCM', 'SHIPPED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 14);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (6, 25000, 28693775, '2025-02-02', '462 Lê Văn Việt, Thủ Đức, TP.HCM', 'PENDING', 'Giao giờ hành chính', 0, NULL, 'ONLINE_BANKING', 39);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (7, 30000, 42187437, '2025-02-21', '826 Nguyễn Trãi, Quận 5, TP.HCM', 'DELIVERED', 'Gọi trước khi giao', 405, '2025-02-21', 'CASH_ON_DELIVERY', 19);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (8, 25000, 35726587, '2025-01-28', '612 Cộng Hòa, Tân Bình, TP.HCM', 'SHIPPED', NULL, 0, NULL, 'ONLINE_BANKING', 48);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (9, 30000, 20549173, '2025-02-05', '718 Hai Bà Trưng, Quận 3, TP.HCM', 'PROCESSING', NULL, 275, '2025-02-05', 'ONLINE_BANKING', 13);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (10, 25000, 8778702, '2025-02-23', '612 Cộng Hòa, Tân Bình, TP.HCM', 'PENDING', 'Giao hàng nhanh', 0, NULL, 'CASH_ON_DELIVERY', 48);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (11, 30000, 9900172, '2025-02-18', '364 Phạm Ngũ Lão, Quận 1, TP.HCM', 'CANCELLED', NULL, 0, NULL, 'ONLINE_BANKING', 28);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (12, 25000, 33791169, '2025-02-09', '950 Pasteur, Quận 1, TP.HCM', 'CANCELLED', 'Giao giờ hành chính', 0, NULL, 'ONLINE_BANKING', 49);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (13, 30000, 16441852, '2025-02-13', '837 Võ Văn Ngân, Thủ Đức, TP.HCM', 'RETURNED', NULL, 356, '2025-02-13', 'ONLINE_BANKING', 21);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (14, 25000, 47856086, '2025-01-17', '583 Võ Văn Ngân, Thủ Đức, TP.HCM', 'PENDING', NULL, 0, NULL, 'ONLINE_BANKING', 22);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (15, 25000, 13865620, '2025-02-11', '387 Bạch Đằng, Bình Thạnh, TP.HCM', 'CANCELLED', 'Để ở bảo vệ', 49, '2025-02-11', 'CASH_ON_DELIVERY', 40);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (16, 25000, 21714742, '2025-01-03', '68 Điện Biên Phủ, Bình Thạnh, TP.HCM', 'RETURNED', 'Giao buổi tối', 493, '2025-01-03', 'ONLINE_BANKING', 45);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (17, 25000, 23021075, '2025-01-26', '718 Hai Bà Trưng, Quận 3, TP.HCM', 'PROCESSING', 'Giao giờ hành chính', 296, '2025-01-26', 'CASH_ON_DELIVERY', 13);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (18, 25000, 34916478, '2025-01-07', '691 Trần Hưng Đạo, Quận 5, TP.HCM', 'CONFIRMED', NULL, 130, '2025-01-07', 'ONLINE_BANKING', 17);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (19, 25000, 48267784, '2025-02-13', '612 Cộng Hòa, Tân Bình, TP.HCM', 'SHIPPED', 'Gọi trước khi giao', 487, '2025-02-13', 'CASH_ON_DELIVERY', 48);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (20, 30000, 54814451, '2025-01-17', '605 Lý Thái Tổ, Quận 10, TP.HCM', 'PENDING', 'Giao giờ hành chính', 424, '2025-01-17', 'CASH_ON_DELIVERY', 46);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (21, 25000, 11301958, '2025-02-09', '950 Pasteur, Quận 1, TP.HCM', 'CANCELLED', 'Giao hàng nhanh', 0, NULL, 'ONLINE_BANKING', 49);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (22, 25000, 15016285, '2025-01-07', '648 Lý Chính Thắng, Quận 3, TP.HCM', 'DELIVERED', 'Gọi trước khi giao', 28, '2025-01-07', 'ONLINE_BANKING', 16);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (23, 25000, 21191320, '2025-01-13', '966 Trần Quốc Toản, Quận 3, TP.HCM', 'CANCELLED', 'Để ở bảo vệ', 0, NULL, 'ONLINE_BANKING', 44);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (24, 25000, 24326062, '2025-01-22', '32 Xa lộ Hà Nội, Quận 2, TP.HCM', 'PENDING', 'Giao hàng nhanh', 0, NULL, 'ONLINE_BANKING', 11);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (25, 30000, 8612598, '2025-02-25', '249 Lý Thái Tổ, Quận 10, TP.HCM', 'SHIPPED', 'Giao buổi tối', 0, NULL, 'CASH_ON_DELIVERY', 7);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (26, 30000, 16459162, '2025-01-23', '369 Điện Biên Phủ, Bình Thạnh, TP.HCM', 'RETURNED', 'Giao buổi tối', 137, '2025-01-23', 'CASH_ON_DELIVERY', 18);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (27, 25000, 3128705, '2025-02-04', '12 Bạch Đằng, Bình Thạnh, TP.HCM', 'CANCELLED', 'Để ở bảo vệ', 12, '2025-02-04', 'CASH_ON_DELIVERY', 41);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (28, 30000, 43509507, '2025-01-13', '334 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'PROCESSING', 'Giao buổi tối', 34, '2025-01-13', 'ONLINE_BANKING', 54);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (29, 30000, 15320309, '2025-01-24', '640 Phạm Ngũ Lão, Quận 1, TP.HCM', 'DELIVERED', 'Giao buổi tối', 404, '2025-01-24', 'CASH_ON_DELIVERY', 51);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (30, 25000, 1135631, '2025-02-04', '334 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'SHIPPED', NULL, 0, NULL, 'ONLINE_BANKING', 54);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (31, 25000, 26649524, '2025-02-23', '192 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'PENDING', 'Để ở bảo vệ', 266, '2025-02-23', 'CASH_ON_DELIVERY', 36);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (32, 30000, 39658723, '2025-01-03', '435 Xa lộ Hà Nội, Quận 2, TP.HCM', 'PENDING', NULL, 0, NULL, 'CASH_ON_DELIVERY', 12);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (33, 30000, 30603371, '2025-01-15', '171 Cộng Hòa, Tân Bình, TP.HCM', 'DELIVERED', 'Giao hàng nhanh', 0, NULL, 'ONLINE_BANKING', 43);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (34, 30000, 48985752, '2025-01-08', '129 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'PROCESSING', 'Giao buổi tối', 0, NULL, 'ONLINE_BANKING', 52);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (35, 30000, 54103881, '2025-01-26', '914 Pasteur, Quận 1, TP.HCM', 'RETURNED', NULL, 0, NULL, 'ONLINE_BANKING', 35);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (36, 25000, 2807784, '2025-02-20', '512 Nguyễn Thị Minh Khai, Quận 1, TP.HCM', 'DELIVERED', 'Để ở bảo vệ', 0, NULL, 'ONLINE_BANKING', 53);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (37, 30000, 21414141, '2025-02-07', '369 Điện Biên Phủ, Bình Thạnh, TP.HCM', 'RETURNED', NULL, 450, '2025-02-07', 'CASH_ON_DELIVERY', 18);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (38, 30000, 24825606, '2025-01-28', '321 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'CONFIRMED', 'Giao buổi tối', 388, '2025-01-28', 'ONLINE_BANKING', 47);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (39, 25000, 15041140, '2025-01-05', '966 Trần Quốc Toản, Quận 3, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 44);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (40, 30000, 9998661, '2025-01-18', '914 Pasteur, Quận 1, TP.HCM', 'SHIPPED', NULL, 60, '2025-01-18', 'ONLINE_BANKING', 35);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (41, 25000, 34877037, '2025-02-23', '341 Cộng Hòa, Tân Bình, TP.HCM', 'DELIVERED', 'Giao giờ hành chính', 0, NULL, 'ONLINE_BANKING', 32);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (42, 30000, 18072561, '2025-01-09', '837 Võ Văn Ngân, Thủ Đức, TP.HCM', 'CONFIRMED', 'Giao giờ hành chính', 34, '2025-01-09', 'CASH_ON_DELIVERY', 21);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (43, 25000, 43662657, '2025-02-27', '195 Hoàng Diệu, Quận 4, TP.HCM', 'SHIPPED', 'Gọi trước khi giao', 423, '2025-02-27', 'ONLINE_BANKING', 27);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (44, 30000, 3400670, '2025-01-16', '826 Nguyễn Trãi, Quận 5, TP.HCM', 'DELIVERED', 'Giao buổi tối', 0, NULL, 'CASH_ON_DELIVERY', 19);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (45, 30000, 28829420, '2025-01-14', '821 Điện Biên Phủ, Bình Thạnh, TP.HCM', 'RETURNED', NULL, 0, NULL, 'ONLINE_BANKING', 30);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (46, 30000, 13615143, '2025-02-15', '583 Võ Văn Ngân, Thủ Đức, TP.HCM', 'CONFIRMED', 'Giao hàng nhanh', 124, '2025-02-15', 'CASH_ON_DELIVERY', 22);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (47, 30000, 6192616, '2025-02-18', '492 Trần Hưng Đạo, Quận 5, TP.HCM', 'SHIPPED', 'Để ở bảo vệ', 0, NULL, 'ONLINE_BANKING', 24);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (48, 25000, 4210158, '2025-02-20', '718 Hai Bà Trưng, Quận 3, TP.HCM', 'DELIVERED', 'Giao hàng nhanh', 0, NULL, 'ONLINE_BANKING', 13);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (49, 30000, 14014215, '2025-02-04', '718 Hai Bà Trưng, Quận 3, TP.HCM', 'SHIPPED', NULL, 308, '2025-02-04', 'CASH_ON_DELIVERY', 13);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (50, 25000, 16902433, '2025-02-23', '821 Điện Biên Phủ, Bình Thạnh, TP.HCM', 'PENDING', 'Để ở bảo vệ', 0, NULL, 'ONLINE_BANKING', 30);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (51, 25000, 1404442, '2025-01-26', '652 Võ Văn Ngân, Thủ Đức, TP.HCM', 'PROCESSING', 'Để ở bảo vệ', 62, '2025-01-26', 'CASH_ON_DELIVERY', 23);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (52, 25000, 28954760, '2025-01-10', '640 Phạm Ngũ Lão, Quận 1, TP.HCM', 'PENDING', 'Giao buổi tối', 0, NULL, 'ONLINE_BANKING', 51);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (53, 30000, 21712045, '2025-02-22', '192 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'RETURNED', 'Gọi trước khi giao', 418, '2025-02-22', 'CASH_ON_DELIVERY', 36);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (54, 25000, 22622246, '2025-01-07', '462 Lê Văn Việt, Thủ Đức, TP.HCM', 'PENDING', 'Giao giờ hành chính', 0, NULL, 'ONLINE_BANKING', 39);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (55, 25000, 35266870, '2025-01-05', '691 Trần Hưng Đạo, Quận 5, TP.HCM', 'CANCELLED', 'Gọi trước khi giao', 0, NULL, 'CASH_ON_DELIVERY', 17);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (56, 25000, 28421872, '2025-02-09', '362 Lê Lợi, Quận 1, TP.HCM', 'RETURNED', 'Giao buổi tối', 0, NULL, 'ONLINE_BANKING', 25);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (57, 30000, 33540535, '2025-02-07', '484 Nguyễn Văn Cừ, Quận 5, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 8);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (58, 30000, 14366584, '2025-01-01', '718 Hai Bà Trưng, Quận 3, TP.HCM', 'CONFIRMED', 'Để ở bảo vệ', 0, NULL, 'ONLINE_BANKING', 13);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (59, 30000, 8943304, '2025-02-12', '484 Nguyễn Văn Cừ, Quận 5, TP.HCM', 'DELIVERED', 'Để ở bảo vệ', 246, '2025-02-12', 'CASH_ON_DELIVERY', 8);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (60, 30000, 18987392, '2025-01-24', '387 Bạch Đằng, Bình Thạnh, TP.HCM', 'CANCELLED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 40);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (61, 25000, 8389707, '2025-02-18', '32 Xa lộ Hà Nội, Quận 2, TP.HCM', 'DELIVERED', 'Giao hàng nhanh', 436, '2025-02-18', 'ONLINE_BANKING', 11);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (62, 30000, 25786858, '2025-02-05', '584 Lý Thái Tổ, Quận 10, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 33);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (63, 30000, 24251702, '2025-01-11', '718 Hai Bà Trưng, Quận 3, TP.HCM', 'SHIPPED', 'Để ở bảo vệ', 25, '2025-01-11', 'ONLINE_BANKING', 13);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (64, 30000, 7815864, '2025-02-27', '462 Lê Văn Việt, Thủ Đức, TP.HCM', 'PROCESSING', 'Giao giờ hành chính', 0, NULL, 'ONLINE_BANKING', 39);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (65, 30000, 38907739, '2025-02-13', '32 Xa lộ Hà Nội, Quận 2, TP.HCM', 'SHIPPED', 'Giao giờ hành chính', 0, NULL, 'CASH_ON_DELIVERY', 11);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (66, 25000, 27989363, '2025-02-07', '362 Lê Lợi, Quận 1, TP.HCM', 'DELIVERED', 'Gọi trước khi giao', 0, NULL, 'ONLINE_BANKING', 25);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (67, 30000, 19444448, '2025-01-06', '175 Hai Bà Trưng, Quận 3, TP.HCM', 'DELIVERED', 'Giao buổi tối', 0, NULL, 'ONLINE_BANKING', 10);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (68, 25000, 9709564, '2025-02-16', '195 Hoàng Diệu, Quận 4, TP.HCM', 'DELIVERED', 'Giao buổi tối', 0, NULL, 'ONLINE_BANKING', 27);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (69, 30000, 15073329, '2025-02-06', '195 Hoàng Diệu, Quận 4, TP.HCM', 'CANCELLED', NULL, 229, '2025-02-06', 'CASH_ON_DELIVERY', 27);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (70, 30000, 44970156, '2025-02-17', '623 Xa lộ Hà Nội, Quận 2, TP.HCM', 'RETURNED', 'Để ở bảo vệ', 0, NULL, 'CASH_ON_DELIVERY', 5);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (71, 25000, 16406332, '2025-02-19', '950 Pasteur, Quận 1, TP.HCM', 'RETURNED', 'Để ở bảo vệ', 288, '2025-02-19', 'CASH_ON_DELIVERY', 49);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (72, 30000, 20960568, '2025-01-20', '12 Bạch Đằng, Bình Thạnh, TP.HCM', 'CANCELLED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 41);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (73, 30000, 4431236, '2025-02-11', '492 Trần Hưng Đạo, Quận 5, TP.HCM', 'PENDING', 'Giao hàng nhanh', 206, '2025-02-11', 'CASH_ON_DELIVERY', 24);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (74, 30000, 19095373, '2025-02-09', '129 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'PENDING', 'Giao buổi tối', 0, NULL, 'ONLINE_BANKING', 52);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (75, 25000, 40547675, '2025-01-23', '321 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'PENDING', 'Gọi trước khi giao', 0, NULL, 'CASH_ON_DELIVERY', 47);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (76, 30000, 16416361, '2025-01-13', '838 Lý Chính Thắng, Quận 3, TP.HCM', 'SHIPPED', 'Gọi trước khi giao', 170, '2025-01-13', 'CASH_ON_DELIVERY', 50);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (77, 25000, 27058929, '2025-01-16', '175 Hai Bà Trưng, Quận 3, TP.HCM', 'PENDING', 'Giao giờ hành chính', 251, '2025-01-16', 'CASH_ON_DELIVERY', 10);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (78, 30000, 31045302, '2025-01-06', '68 Điện Biên Phủ, Bình Thạnh, TP.HCM', 'PENDING', 'Giao giờ hành chính', 0, NULL, 'ONLINE_BANKING', 45);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (79, 30000, 53945384, '2025-01-10', '171 Cộng Hòa, Tân Bình, TP.HCM', 'SHIPPED', 'Giao buổi tối', 392, '2025-01-10', 'CASH_ON_DELIVERY', 43);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (80, 25000, 25748730, '2025-01-25', '321 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'PROCESSING', 'Giao hàng nhanh', 0, NULL, 'CASH_ON_DELIVERY', 47);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (81, 30000, 5928446, '2025-02-15', '249 Lý Thái Tổ, Quận 10, TP.HCM', 'CONFIRMED', NULL, 172, '2025-02-15', 'CASH_ON_DELIVERY', 7);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (82, 30000, 75669208, '2025-02-26', '321 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'CANCELLED', NULL, 383, '2025-02-26', 'ONLINE_BANKING', 47);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (83, 30000, 27255803, '2025-01-13', '612 Cộng Hòa, Tân Bình, TP.HCM', 'SHIPPED', 'Giao hàng nhanh', 319, '2025-01-13', 'CASH_ON_DELIVERY', 48);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (84, 25000, 22841685, '2025-01-28', '609 Lý Thái Tổ, Quận 10, TP.HCM', 'PROCESSING', 'Giao giờ hành chính', 118, '2025-01-28', 'ONLINE_BANKING', 34);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (85, 25000, 16522267, '2025-02-07', '129 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'PROCESSING', 'Giao hàng nhanh', 153, '2025-02-07', 'ONLINE_BANKING', 52);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (86, 25000, 42041277, '2025-01-18', '950 Pasteur, Quận 1, TP.HCM', 'PENDING', 'Để ở bảo vệ', 124, '2025-01-18', 'CASH_ON_DELIVERY', 49);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (87, 30000, 13606704, '2025-02-21', '967 Lý Thái Tổ, Quận 10, TP.HCM', 'PROCESSING', NULL, 0, NULL, 'ONLINE_BANKING', 15);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (88, 30000, 31032757, '2025-02-27', '572 Nguyễn Văn Cừ, Quận 5, TP.HCM', 'DELIVERED', NULL, 116, '2025-02-27', 'CASH_ON_DELIVERY', 14);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (89, 25000, 35936574, '2025-02-25', '175 Hai Bà Trưng, Quận 3, TP.HCM', 'PROCESSING', 'Để ở bảo vệ', 441, '2025-02-25', 'CASH_ON_DELIVERY', 10);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (90, 30000, 56010031, '2025-01-26', '966 Trần Quốc Toản, Quận 3, TP.HCM', 'PROCESSING', 'Giao hàng nhanh', 201, '2025-01-26', 'CASH_ON_DELIVERY', 44);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (91, 30000, 56456334, '2025-02-18', '32 Xa lộ Hà Nội, Quận 2, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 11);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (92, 25000, 23648468, '2025-02-03', '829 Trần Hưng Đạo, Quận 5, TP.HCM', 'PENDING', 'Giao giờ hành chính', 0, NULL, 'CASH_ON_DELIVERY', 31);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (93, 30000, 61524295, '2025-02-25', '460 Hoàng Văn Thụ, Tân Bình, TP.HCM', 'PROCESSING', NULL, 283, '2025-02-25', 'ONLINE_BANKING', 37);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (94, 25000, 9092883, '2025-02-19', '917 Lê Lợi, Quận 1, TP.HCM', 'SHIPPED', 'Giao hàng nhanh', 0, NULL, 'ONLINE_BANKING', 38);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (95, 25000, 54909786, '2025-01-25', '950 Pasteur, Quận 1, TP.HCM', 'PROCESSING', 'Để ở bảo vệ', 120, '2025-01-25', 'CASH_ON_DELIVERY', 49);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (96, 30000, 11763702, '2025-01-19', '648 Lý Chính Thắng, Quận 3, TP.HCM', 'DELIVERED', 'Giao hàng nhanh', 426, '2025-01-19', 'CASH_ON_DELIVERY', 16);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (97, 30000, 30006006, '2025-02-22', '826 Nguyễn Trãi, Quận 5, TP.HCM', 'PROCESSING', NULL, 0, NULL, 'ONLINE_BANKING', 19);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (98, 30000, 10176664, '2025-01-07', '195 Hoàng Diệu, Quận 4, TP.HCM', 'DELIVERED', 'Gọi trước khi giao', 0, NULL, 'CASH_ON_DELIVERY', 27);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (99, 25000, 26855112, '2025-02-24', '605 Lý Thái Tổ, Quận 10, TP.HCM', 'PROCESSING', 'Để ở bảo vệ', 0, NULL, 'CASH_ON_DELIVERY', 46);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (100, 25000, 33557308, '2025-01-04', '171 Cộng Hòa, Tân Bình, TP.HCM', 'SHIPPED', 'Để ở bảo vệ', 206, '2025-01-04', 'ONLINE_BANKING', 43);

-- ============================================
-- ORDER_DETAILS
-- ============================================
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (1, 3, 4482828, 1, 22);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (2, 3, 4907528, 1, 64);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (3, 1, 6891201, 1, 152);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (4, 3, 4591948, 2, 126);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (5, 1, 4002751, 2, 1);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (6, 2, 5372095, 2, 40);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (7, 2, 6866416, 2, 95);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (8, 1, 2111310, 3, 157);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (9, 1, 6063515, 3, 47);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (10, 3, 4970526, 3, 56);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (11, 1, 193679, 3, 16);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (12, 3, 2853472, 4, 71);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (13, 2, 444815, 5, 211);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (14, 3, 6007841, 5, 226);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (15, 3, 1407963, 6, 250);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (16, 2, 8123148, 6, 172);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (17, 2, 4099295, 6, 107);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (18, 3, 2428173, 7, 252);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (19, 1, 7704183, 7, 173);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (20, 3, 3228476, 7, 260);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (21, 3, 5827769, 7, 215);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (22, 1, 3642993, 8, 261);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (23, 2, 9825300, 8, 11);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (24, 1, 3903631, 8, 63);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (25, 1, 8504363, 8, 241);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (26, 3, 1169586, 9, 65);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (27, 3, 4617438, 9, 130);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (28, 3, 339399, 9, 49);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (29, 1, 2139904, 9, 28);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (30, 1, 1676521, 10, 211);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (31, 1, 2135035, 10, 186);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (32, 3, 1647382, 10, 148);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (33, 2, 4935086, 11, 172);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (34, 1, 9012082, 12, 212);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (35, 3, 4735141, 12, 117);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (36, 2, 5208415, 12, 222);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (37, 1, 131834, 12, 188);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (38, 1, 8527631, 13, 273);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (39, 1, 7884221, 13, 83);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (40, 1, 5287476, 14, 114);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (41, 1, 1054238, 14, 108);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (42, 2, 9514552, 14, 255);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (43, 3, 7486756, 14, 70);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (44, 2, 6920310, 15, 261);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (45, 3, 5484594, 16, 14);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (46, 2, 601619, 16, 14);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (47, 2, 2016361, 16, 254);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (48, 1, 8687075, 17, 107);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (49, 1, 6250068, 17, 238);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (50, 1, 4603141, 17, 149);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (51, 1, 3455791, 17, 172);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (52, 3, 6918315, 18, 221);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (53, 1, 6663837, 18, 37);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (54, 2, 3736348, 18, 153);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (55, 3, 9872058, 19, 33);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (56, 2, 9313305, 19, 43);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (57, 1, 5925247, 20, 114);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (58, 3, 7906653, 20, 123);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (59, 2, 2089913, 20, 226);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (60, 3, 6986473, 20, 270);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (61, 3, 3758986, 21, 96);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (62, 2, 1151159, 22, 219);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (63, 1, 8448156, 22, 267);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (64, 1, 4240811, 22, 79);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (65, 3, 7055440, 23, 16);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (66, 3, 8100354, 24, 6);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (67, 3, 2860866, 25, 30);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (68, 2, 8214581, 26, 261);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (69, 1, 3103705, 27, 129);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (70, 3, 6119434, 28, 200);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (71, 3, 8373735, 28, 165);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (72, 1, 2772381, 29, 37);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (73, 1, 6983236, 29, 229);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (74, 2, 940895, 29, 169);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (75, 3, 1217634, 29, 197);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (76, 1, 1110631, 30, 99);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (77, 1, 10065596, 31, 188);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (78, 3, 3966268, 31, 138);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (79, 1, 4660124, 31, 167);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (80, 3, 7749863, 32, 90);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (81, 2, 8189567, 32, 216);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (82, 2, 8600993, 33, 98);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (83, 3, 570944, 33, 76);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (84, 3, 2913191, 33, 119);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (85, 1, 2918980, 33, 140);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (86, 3, 5883864, 34, 170);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (87, 3, 4028809, 34, 235);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (88, 1, 1110845, 34, 132);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (89, 2, 9053444, 34, 241);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (90, 3, 2401843, 35, 211);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (91, 3, 8161886, 35, 191);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (92, 3, 7460898, 35, 249);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (93, 1, 2782784, 36, 183);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (94, 1, 2659051, 37, 65);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (95, 2, 6432955, 37, 30);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (96, 2, 2657012, 37, 263);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (97, 1, 545156, 37, 271);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (98, 3, 2949017, 38, 42);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (99, 3, 5316185, 38, 57);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (100, 2, 7508070, 39, 97);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (101, 3, 3322887, 40, 96);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (102, 3, 2899967, 41, 90);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (103, 2, 8440212, 41, 110);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (104, 2, 4635856, 41, 244);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (105, 2, 5153071, 42, 229);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (106, 1, 7736419, 42, 52);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (107, 3, 8782369, 43, 143);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (108, 1, 6100979, 43, 92);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (109, 1, 8688252, 43, 273);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (110, 3, 833773, 43, 223);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (111, 1, 3370670, 44, 40);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (112, 2, 4454145, 45, 170);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (113, 2, 9945565, 45, 151);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (114, 3, 4528381, 46, 26);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (115, 1, 5566436, 47, 199);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (116, 2, 298090, 47, 8);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (117, 1, 4185158, 48, 63);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (118, 3, 4661405, 49, 84);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (119, 3, 4430771, 50, 234);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (120, 1, 3585120, 50, 223);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (121, 2, 689721, 51, 48);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (122, 2, 8608544, 52, 54);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (123, 1, 3403068, 52, 101);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (124, 3, 2769868, 52, 106);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (125, 1, 4316277, 53, 6);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (126, 2, 8682884, 53, 17);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (127, 2, 3937676, 54, 188);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (128, 1, 6902867, 54, 153);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (129, 2, 1223156, 54, 130);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (130, 1, 5372715, 54, 237);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (131, 2, 5510659, 55, 45);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (132, 2, 7837116, 55, 203);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (133, 2, 4273160, 55, 272);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (134, 3, 9465624, 56, 62);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (135, 1, 3817070, 57, 45);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (136, 1, 4034276, 57, 181);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (137, 3, 6464476, 57, 243);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (138, 3, 2088587, 57, 263);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (139, 3, 1640864, 58, 144);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (140, 1, 1382060, 58, 211);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (141, 1, 6749042, 58, 246);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (142, 3, 427630, 58, 183);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (143, 2, 4456652, 59, 41);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (144, 1, 6492448, 60, 215);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (145, 1, 2596338, 60, 193);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (146, 2, 4934303, 60, 152);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (147, 1, 8364707, 61, 186);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (148, 2, 2909477, 62, 69);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (149, 2, 9968952, 62, 8);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (150, 1, 2360443, 63, 230);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (151, 1, 6693366, 63, 155);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (152, 3, 3418666, 63, 65);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (153, 1, 4911895, 63, 273);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (154, 3, 2595288, 64, 232);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (155, 2, 9280946, 65, 137);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (156, 2, 3534747, 65, 113);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (157, 3, 4415451, 65, 240);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (158, 3, 1618595, 66, 229);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (159, 1, 3849664, 66, 192);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (160, 2, 9629457, 66, 138);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (161, 2, 4866899, 67, 159);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (162, 1, 9680650, 67, 156);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (163, 2, 923832, 68, 25);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (164, 1, 7836900, 68, 260);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (165, 1, 3933434, 69, 123);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (166, 1, 3551369, 69, 241);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (167, 2, 3779263, 69, 35);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (168, 3, 3128220, 70, 238);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (169, 2, 8199634, 70, 221);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (170, 1, 3236848, 70, 114);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (171, 3, 5306460, 70, 33);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (172, 3, 5460444, 71, 126);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (173, 1, 5973135, 72, 5);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (174, 3, 4985811, 72, 119);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (175, 1, 4401236, 73, 148);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (176, 3, 3201667, 74, 101);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (177, 1, 9460372, 74, 134);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (178, 1, 9956738, 75, 249);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (179, 2, 5323766, 75, 169);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (180, 1, 1133461, 75, 80);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (181, 2, 9392472, 75, 112);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (182, 3, 2759083, 76, 14);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (183, 2, 4054556, 76, 176);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (184, 2, 9840359, 77, 18);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (185, 2, 2300363, 77, 33);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (186, 1, 2752485, 77, 98);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (187, 1, 8814460, 78, 67);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (188, 2, 617835, 78, 250);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (189, 2, 9182905, 78, 22);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (190, 1, 2599362, 78, 17);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (191, 1, 3392618, 79, 247);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (192, 3, 4520522, 79, 207);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (193, 3, 7281635, 79, 226);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (194, 3, 5038765, 79, 47);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (195, 1, 10082268, 80, 101);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (196, 3, 3493371, 80, 37);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (197, 1, 5161349, 80, 103);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (198, 1, 1992865, 81, 117);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (199, 2, 1068441, 81, 41);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (200, 1, 1768699, 81, 231);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (201, 2, 9731777, 82, 96);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (202, 3, 1887583, 82, 202);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (203, 3, 8953304, 82, 230);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (204, 3, 7884331, 82, 154);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (205, 2, 8584806, 83, 10);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (206, 1, 1133792, 83, 131);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (207, 1, 8922399, 83, 137);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (208, 3, 1067180, 84, 119);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (209, 3, 4108142, 84, 129);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (210, 1, 2375730, 84, 250);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (211, 1, 4914989, 84, 64);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (212, 3, 5499089, 85, 97);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (213, 2, 5375761, 86, 219);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (214, 2, 3538647, 86, 235);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (215, 3, 8062487, 86, 108);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (216, 3, 4525568, 87, 78);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (217, 2, 728953, 88, 61);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (218, 1, 7488692, 88, 249);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (219, 3, 7352053, 88, 209);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (220, 2, 2510297, 89, 194);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (221, 3, 9236033, 89, 56);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (222, 1, 3182881, 89, 246);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (223, 2, 9495150, 90, 184);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (224, 2, 9089807, 90, 31);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (225, 3, 6270039, 90, 204);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (226, 3, 9417197, 91, 191);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (227, 3, 9391581, 91, 261);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (228, 1, 1960444, 92, 5);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (229, 3, 7221008, 92, 121);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (230, 1, 3306129, 93, 181);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (231, 2, 9991436, 93, 214);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (232, 3, 6210850, 93, 140);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (233, 2, 9786372, 93, 266);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (234, 1, 9067883, 94, 95);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (235, 1, 7691884, 95, 50);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (236, 3, 7785049, 95, 211);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (237, 1, 4058871, 95, 29);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (238, 2, 9889442, 95, 22);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (239, 1, 4067728, 96, 202);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (240, 2, 3832987, 96, 243);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (241, 3, 9992002, 97, 177);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (242, 3, 178005, 98, 225);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (243, 1, 9612649, 98, 66);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (244, 3, 2594658, 99, 155);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (245, 2, 9523069, 99, 248);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (246, 2, 4915687, 100, 124);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (247, 3, 2427630, 100, 97);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (248, 3, 4900848, 100, 25);
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES (249, 2, 857750, 100, 199);

-- ============================================
-- PRODUCT_REVIEWS
-- ============================================
-- Lưu ý: comment là bình luận của khách hàng, reply là phản hồi của admin
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (1, 5, 'Chất lượng ổn, giá hơi cao', NULL, '2025-01-20T18:05:00', 185, 5, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (2, 5, 'Rất hài lòng', NULL, '2025-02-21T17:46:00', 236, 6, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (3, 1, 'Giá hơi cao so với chất lượng', NULL, '2025-01-06T20:23:00', 64, 7, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (4, 1, 'Chất lượng tuyệt vời', NULL, '2025-02-14T11:48:00', 93, 8, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (5, 4, 'Không như kỳ vọng', NULL, '2025-02-01T15:59:00', 71, 9, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (6, 4, 'Hoàn hảo!', NULL, '2025-01-12T08:47:00', 57, 10, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (7, 1, 'Tuyệt vời, sẽ mua lại!', NULL, '2025-02-16T16:36:00', 54, 11, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (8, 3, 'Không như kỳ vọng', NULL, '2025-02-01T14:30:00', 126, 12, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (9, 2, 'Rất hài lòng', NULL, '2025-01-10T10:31:00', 133, 13, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (10, 5, 'Giá hơi cao so với chất lượng', NULL, '2025-02-27T11:57:00', 50, 14, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (11, 2, 'Sẽ giới thiệu cho bạn bè', NULL, '2025-02-19T14:15:00', 269, 15, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (12, 4, 'Hoàn hảo!', NULL, '2025-02-18T20:58:00', 263, 16, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (13, 2, 'Sản phẩm rất tốt, giao hàng nhanh!', NULL, '2025-01-18T08:52:00', 179, 17, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (14, 4, 'Shop phục vụ tốt', NULL, '2025-01-10T20:13:00', 218, 18, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (15, 3, 'Giá hơi cao so với chất lượng', NULL, '2025-02-10T13:40:00', 7, 19, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (16, 1, 'Giao hàng đúng hẹn', NULL, '2025-02-22T12:19:00', 66, 20, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (17, 4, 'Tuyệt vời, sẽ mua lại!', NULL, '2025-01-23T19:47:00', 124, 21, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (18, 1, 'Sản phẩm tốt nhưng ship hơi lâu', NULL, '2025-02-28T10:03:00', 100, 22, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (19, 2, 'Rất hài lòng', NULL, '2025-01-27T18:57:00', 188, 23, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (20, 4, 'Giá cả hợp lý', NULL,'2025-01-13T13:12:00', 227, 24, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (21, 3, 'Chất lượng tốt, đóng gói cẩn thận', NULL, '2025-02-01T12:38:00', 198, 25, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (22, 5, 'Chất lượng ổn, giá hơi cao', NULL, '2025-01-21T19:46:00', 58, 26, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (23, 2, 'Giá hơi cao so với chất lượng', NULL, '2025-02-06T18:57:00', 111, 27, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (24, 3, 'Chất lượng vượt mong đợi', NULL, '2025-01-26T09:58:00', 72, 28, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (25, 3, 'Chất lượng tuyệt vời', NULL, '2025-01-18T10:35:00', 170, 29, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (26, 4, 'Tạm ổn', NULL, '2025-01-20T13:22:00', 264, 30, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (27, 5, 'Tốt, nhưng có thể cải thiện packaging', NULL, '2025-01-12T11:32:00', 46, 31, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (28, 2, 'Giao hàng đúng hẹn', NULL, '2025-02-20T12:34:00', 88, 32, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (29, 5, 'Giá hơi cao so với chất lượng', NULL, '2025-01-11T21:58:00', 247, 33, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (30, 5, 'Chất lượng tốt, đóng gói cẩn thận', NULL, '2025-02-21T11:09:00', 66, 34, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (31, 1, 'Tạm ổn', NULL, '2025-01-23T15:59:00', 98, 35, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (32, 5, 'Giao hàng đúng hẹn', NULL, '2025-02-01T16:16:00', 126, 36, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (33, 1, 'Tuyệt vời, sẽ mua lại!', NULL, '2025-02-14T09:57:00', 70, 37, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (34, 5, 'Chất lượng tuyệt vời', NULL, '2025-02-11T13:47:00', 23, 38, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (35, 4, 'Đáng tiền!', NULL, '2025-01-28T12:54:00', 186, 39, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (36, 3, 'Bình thường, không có gì đặc biệt', NULL,'2025-02-08T17:47:00', 41, 40, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (37, 2, 'Tuyệt vời, sẽ mua lại!', NULL, '2025-01-18T12:46:00', 188, 41, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (38, 3, 'Tốt, nhưng có thể cải thiện packaging', NULL,'2025-01-07T15:30:00', 110, 42, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (39, 4, 'Không như kỳ vọng', NULL, '2025-01-19T14:09:00', 15, 43, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (40, 1, 'Giá cả hợp lý', NULL, '2025-02-14T19:22:00', 216, 44, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (41, 3, 'Bình thường, không có gì đặc biệt', NULL, '2025-02-05T09:13:00', 59, 45, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (42, 1, 'Sản phẩm đẹp như hình', NULL, '2025-01-12T10:27:00', 77, 46, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (43, 1, 'Sản phẩm rất tốt, giao hàng nhanh!', NULL, '2025-02-17T15:27:00', 199, 47, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (44, 4, 'Tạm ổn', NULL, '2025-02-19T21:36:00', 10, 48, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (45, 2, 'Giao hàng đúng hẹn', NULL, '2025-02-10T10:03:00', 155, 49, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (46, 3, 'Tạm ổn', NULL, '2025-01-12T10:33:00', 115, 50, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (47, 4, 'Tốt, nhưng có thể cải thiện packaging', NULL, '2025-02-13T15:38:00', 211, 51, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (48, 2, 'Shop phục vụ tốt', NULL, '2025-01-03T10:37:00', 254, 52, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (49, 3, 'Giá hơi cao so với chất lượng', NULL, '2025-01-18T08:31:00', 253, 53, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (50, 2, 'Giao hàng đúng hẹn', NULL, '2025-01-09T17:12:00', 101, 54, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (51, 4, 'Giá hơi cao so với chất lượng', NULL, '2025-02-16T11:20:00', 51, 5, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (52, 2, 'Tuyệt vời, sẽ mua lại!', NULL, '2025-02-01T11:23:00', 238, 6, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (53, 5, 'Sản phẩm tốt', NULL, '2025-02-10T11:34:00', 192, 7, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (54, 2, 'Rất hài lòng', NULL, '2025-01-17T10:33:00', 182, 8, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (55, 2, 'Rất đáng mua', NULL, '2025-01-15T10:44:00', 17, 9, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (56, 3, 'Sản phẩm tốt nhưng ship hơi lâu', NULL, '2025-02-10T11:38:00', 143, 10, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (57, 2, 'Bình thường, không có gì đặc biệt', NULL, '2025-01-05T08:07:00', 158, 11, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (58, 3, 'Chất lượng tuyệt vời', NULL, '2025-02-14T12:52:00', 68, 12, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (59, 4, 'Cực kỳ hài lòng với sản phẩm!', NULL, '2025-01-18T11:17:00', 116, 13, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (60, 5, 'Chất lượng ổn, giá hơi cao', NULL, '2025-02-09T21:21:00', 66, 14, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (61, 1, 'Không như kỳ vọng', NULL, '2025-01-11T12:36:00', 112, 15, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (62, 5, 'Tạm ổn', NULL, '2025-02-02T13:03:00', 228, 16, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (63, 5, 'Sẽ giới thiệu cho bạn bè', NULL, '2025-01-24T19:44:00', 115, 17, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (64, 3, 'Sản phẩm như mô tả', NULL, '2025-02-22T10:02:00', 100, 18, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (65, 3, 'Sản phẩm tốt', NULL, '2025-02-03T16:28:00', 177, 19, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (66, 4, 'Sản phẩm như mô tả', NULL, '2025-02-07T17:01:00', 87, 20, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (67, 2, 'Chất lượng tốt, đóng gói cẩn thận', NULL, '2025-02-11T10:58:00', 239, 21, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (68, 3, 'Tạm ổn', NULL, '2025-01-27T20:18:00', 244, 22, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (69, 4, 'Giao hàng đúng hẹn', NULL, '2025-01-15T20:54:00', 46, 23, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (70, 2, 'Tạm ổn', NULL, '2025-01-11T15:22:00', 15, 24, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (71, 4, 'Giá cả hợp lý', NULL, '2025-02-01T09:00:00', 241, 25, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (72, 5, 'Sản phẩm như mô tả', NULL, '2025-01-05T08:45:00', 48, 26, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (73, 3, 'Giá cả hợp lý', NULL, '2025-01-11T16:33:00', 6, 27, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (74, 4, 'Chất lượng vượt mong đợi', NULL, '2025-01-22T14:23:00', 262, 28, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (75, 5, 'Cực kỳ hài lòng với sản phẩm!', NULL, '2025-02-17T15:23:00', 270, 29, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (76, 3, 'Hoàn hảo!', NULL, '2025-01-18T17:45:00', 24, 30, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (77, 4, 'Sản phẩm rất tốt, giao hàng nhanh!', NULL, '2025-02-17T10:27:00', 53, 31, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (78, 3, 'Tuyệt vời, sẽ mua lại!', NULL, '2025-01-11T14:30:00', 152, 32, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (79, 2, 'Giá hơi cao so với chất lượng', NULL, '2025-01-01T17:07:00', 5, 33, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (80, 2, 'Chất lượng ổn, giá hơi cao', NULL, '2025-02-04T13:37:00', 245, 34, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (81, 1, 'Cực kỳ hài lòng với sản phẩm!', NULL, '2025-02-20T11:18:00', 142, 35, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (82, 1, 'Chất lượng ổn, giá hơi cao', NULL, '2025-01-03T12:56:00', 144, 36, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (83, 2, 'Rất đáng mua', NULL, '2025-02-02T13:54:00', 137, 37, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (84, 5, 'Rất hài lòng', NULL, '2025-01-18T18:21:00', 129, 38, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (85, 4, 'Tạm ổn', NULL, '2025-01-13T12:45:00', 29, 39, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (86, 2, 'Sản phẩm tốt', NULL, '2025-01-20T17:16:00', 30, 40, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (87, 3, 'Giá hơi cao so với chất lượng', NULL, '2025-01-03T15:30:00', 48, 41, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (88, 2, 'Tốt, nhưng có thể cải thiện packaging', NULL, '2025-01-06T09:23:00', 17, 42, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (89, 1, 'Chất lượng ổn, giá hơi cao', NULL, '2025-02-22T12:54:00', 24, 43, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (90, 2, 'Đáng tiền!', NULL, '2025-01-06T11:44:00', 202, 44, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (91, 3, 'Sản phẩm rất tốt, giao hàng nhanh!', NULL, '2025-01-02T19:06:00', 215, 45, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (92, 4, 'Sản phẩm như mô tả', NULL, '2025-01-09T13:30:00', 163, 46, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (93, 1, 'Giá cả hợp lý', NULL, '2025-01-23T19:47:00', 234, 47, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (94, 2, 'Sản phẩm rất tốt, giao hàng nhanh!', NULL, '2025-02-28T19:09:00', 111, 48, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (95, 1, 'Rất hài lòng', NULL, '2025-02-04T21:25:00', 202, 49, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (96, 3, 'Rất đáng mua', NULL, '2025-02-28T12:32:00', 35, 50, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (97, 5, 'Bình thường, không có gì đặc biệt', NULL, '2025-01-05T19:48:00', 262, 51, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (98, 3, 'Sản phẩm như mô tả', NULL, '2025-02-02T08:25:00', 231, 52, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (99, 1, 'Giá hơi cao so với chất lượng', NULL, '2025-02-17T08:33:00', 220, 53, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (100, 4, 'Sẽ giới thiệu cho bạn bè', NULL, '2025-02-14T20:27:00', 244, 54, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (101, 3, 'Tuyệt vời, sẽ mua lại!', NULL, '2025-02-23T16:15:00', 3, 5, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (102, 4, 'Sản phẩm tốt nhưng ship hơi lâu', NULL, '2025-01-10T14:45:00', 59, 6, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (103, 2, 'Rất hài lòng', NULL, '2025-02-23T20:30:00', 109, 7, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (104, 5, 'Chất lượng ổn, giá hơi cao', NULL, '2025-02-26T12:26:00', 62, 8, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (105, 2, 'Sẽ giới thiệu cho bạn bè', NULL, '2025-02-18T15:04:00', 160, 9, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (106, 3, 'Sản phẩm rất tốt, giao hàng nhanh!', NULL, '2025-01-07T10:02:00', 208, 10, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (107, 3, 'Chất lượng ổn, giá hơi cao', NULL, '2025-02-28T18:09:00', 107, 11, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (108, 2, 'Chất lượng vượt mong đợi', NULL, '2025-01-17T11:50:00', 106, 12, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (109, 1, 'Sản phẩm tốt', NULL, '2025-01-28T09:53:00', 150, 13, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (110, 5, 'Shop phục vụ tốt', NULL, '2025-01-20T17:05:00', 97, 14, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (111, 2, 'Shop phục vụ tốt', NULL, '2025-02-22T20:54:00', 49, 15, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (112, 1, 'Sản phẩm đẹp như hình', NULL, '2025-01-26T16:25:00', 216, 16, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (113, 3, 'Cực kỳ hài lòng với sản phẩm!', NULL, '2025-01-26T18:43:00', 31, 17, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (114, 5, 'Shop phục vụ tốt', NULL, '2025-01-06T21:15:00', 16, 18, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (115, 5, 'Không như kỳ vọng', NULL, '2025-02-17T14:12:00', 128, 19, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (116, 4, 'Giao hàng đúng hẹn', NULL, '2025-01-09T09:58:00', 39, 20, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (117, 2, 'Bình thường, không có gì đặc biệt', NULL, '2025-01-07T12:18:00', 228, 21, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (118, 4, 'Giao hàng đúng hẹn', NULL, '2025-02-24T21:56:00', 164, 22, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (119, 1, 'Rất hài lòng', NULL, '2025-02-12T10:48:00', 237, 23, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (120, 4, 'Tuyệt vời, sẽ mua lại!', NULL, '2025-01-01T13:46:00', 191, 24, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (121, 2, 'Rất hài lòng', NULL, '2025-02-18T15:33:00', 185, 25, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (122, 5, 'Sẽ giới thiệu cho bạn bè', NULL, '2025-01-11T16:40:00', 263, 26, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (123, 4, 'Giao hàng đúng hẹn', NULL, '2025-02-13T16:35:00', 103, 27, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (124, 4, 'Tốt, nhưng có thể cải thiện packaging', NULL, '2025-01-10T12:45:00', 5, 28, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (125, 1, 'Chất lượng tuyệt vời', NULL, '2025-01-24T13:43:00', 198, 29, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (126, 4, 'Chất lượng ổn, giá hơi cao', NULL, '2025-01-25T14:41:00', 192, 30, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (127, 3, 'Sản phẩm đẹp như hình', NULL, '2025-01-06T14:57:00', 202, 31, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (128, 2, 'Rất hài lòng', NULL, '2025-01-10T09:32:00', 152, 32, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (129, 1, 'Chất lượng vượt mong đợi', NULL, '2025-01-01T14:35:00', 264, 33, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (130, 5, 'Chất lượng tuyệt vời', NULL, '2025-01-13T09:44:00', 273, 34, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (131, 2, 'Chất lượng tốt, đóng gói cẩn thận', NULL, '2025-01-24T15:02:00', 127, 35, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (132, 1, 'Bình thường, không có gì đặc biệt', NULL, '2025-01-26T16:24:00', 207, 36, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (133, 2, 'Cực kỳ hài lòng với sản phẩm!', NULL, '2025-02-10T11:29:00', 249, 37, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (134, 2, 'Bình thường, không có gì đặc biệt', NULL, '2025-01-19T10:36:00', 174, 38, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (135, 2, 'Tốt, nhưng có thể cải thiện packaging', NULL, '2025-02-09T15:38:00', 74, 39, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (136, 1, 'Sẽ giới thiệu cho bạn bè', NULL, '2025-02-05T18:38:00', 263, 40, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (137, 2, 'Chất lượng vượt mong đợi', NULL, '2025-02-12T10:34:00', 84, 41, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (138, 5, 'Rất đáng mua', NULL, '2025-02-16T10:04:00', 219, 42, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (139, 5, 'Rất hài lòng', NULL, '2025-01-07T13:49:00', 207, 43, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (140, 3, 'Bình thường, không có gì đặc biệt', NULL, '2025-02-18T16:38:00', 145, 44, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (141, 2, 'Rất hài lòng', NULL, '2025-02-19T09:34:00', 105, 45, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (142, 3, 'Chất lượng vượt mong đợi', NULL, '2025-01-01T08:04:00', 257, 46, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (143, 2, 'Sản phẩm đẹp như hình', NULL, '2025-02-04T15:56:00', 116, 47, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (144, 4, 'Hoàn hảo!', NULL, '2025-02-19T16:35:00', 231, 48, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (145, 1, 'Rất hài lòng', NULL, '2025-02-14T17:45:00', 45, 49, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (146, 5, 'Sẽ giới thiệu cho bạn bè', NULL, '2025-02-19T08:51:00', 82, 50, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (147, 4, 'Chất lượng ổn, giá hơi cao', NULL, '2025-02-25T21:46:00', 109, 51, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (148, 2, 'Tốt, nhưng có thể cải thiện packaging', NULL, '2025-02-02T18:08:00', 65, 52, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (149, 3, 'Chất lượng ổn, giá hơi cao', NULL, '2025-02-21T20:44:00', 120, 53, 'clean');
INSERT INTO product_reviews (id, rating, comment, reply, created_at, product_id, user_id, is_toxic) VALUES (150, 1, 'Tốt, nhưng có thể cải thiện packaging', NULL, '2025-01-02T16:48:00', 23, 54, 'clean');
-- ============================================
-- BOOKING_APPOINTMENTS
-- ============================================
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (1, 'Muốn tư vấn laptop gaming', '2025-02-15T14:00:00', 44);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (2, 'Tư vấn chuột gaming', '2025-02-24T15:30:00', 12);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (3, 'Tư vấn nâng cấp PC', '2025-02-27T17:00:00', 18);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (4, 'Tư vấn laptop văn phòng', '2025-02-21T13:30:00', 53);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (5, 'Xem sản phẩm bàn phím cơ', '2025-02-27T09:00:00', 18);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (6, 'Muốn xem iPhone mới', '2025-02-25T17:30:00', 39);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (7, 'Xem màn hình 4K', '2025-02-14T16:00:00', 38);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (8, 'Tư vấn phụ kiện gaming', '2025-02-17T13:00:00', 24);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (9, 'Xem sản phẩm bàn phím cơ', '2025-02-25T08:00:00', 21);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (10, 'Muốn tư vấn laptop gaming', '2025-02-18T12:00:00', 23);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (11, 'Muốn xem sản phẩm trực tiếp', '2025-02-24T16:00:00', 6);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (12, 'Tư vấn PC build', '2025-02-17T10:30:00', 25);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (13, 'Tư vấn phụ kiện gaming', '2025-02-18T13:00:00', 44);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (14, 'Xem màn hình 4K', '2025-02-19T09:30:00', 9);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (15, 'Muốn xem iPhone mới', '2025-02-27T16:00:00', 54);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (16, 'Tư vấn phụ kiện gaming', '2025-02-16T08:00:00', 34);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (17, 'Tư vấn iPad', '2025-02-15T13:00:00', 20);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (18, 'Tư vấn phụ kiện gaming', '2025-02-28T14:30:00', 41);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (19, 'Tư vấn phụ kiện gaming', '2025-02-27T10:30:00', 47);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (20, 'Muốn đổi sản phẩm', '2025-02-26T16:00:00', 37);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (21, 'Tư vấn chuột gaming', '2025-02-27T12:00:00', 13);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (22, 'Tư vấn PC build', '2025-02-20T15:00:00', 50);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (23, 'Tư vấn chuột gaming', '2025-02-19T16:30:00', 5);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (24, 'Tư vấn nâng cấp PC', '2025-02-19T14:00:00', 20);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (25, 'Tư vấn phụ kiện gaming', '2025-02-18T13:30:00', 47);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (26, 'Tư vấn laptop văn phòng', '2025-02-17T12:00:00', 23);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (27, 'Tư vấn PC build', '2025-02-20T13:30:00', 18);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (28, 'Muốn đổi sản phẩm', '2025-02-22T17:00:00', 41);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (29, 'Tư vấn iPad', '2025-02-27T09:30:00', 32);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (30, 'Tư vấn iPad', '2025-02-23T16:30:00', 31);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (31, 'Xem Samsung', '2025-02-14T12:00:00', 46);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (32, 'Tư vấn PC build', '2025-02-16T13:00:00', 23);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (33, 'Tư vấn laptop văn phòng', '2025-02-15T15:00:00', 29);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (34, 'Xem sản phẩm bàn phím cơ', '2025-02-20T14:30:00', 13);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (35, 'Tư vấn iPad', '2025-02-24T08:00:00', 38);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (36, 'Xem sản phẩm bàn phím cơ', '2025-02-20T15:30:00', 25);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (37, 'Hỏi về bảo hành', '2025-02-16T14:00:00', 37);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (38, 'Xem sản phẩm bàn phím cơ', '2025-02-20T14:00:00', 23);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (39, 'Tư vấn iPad', '2025-02-24T12:30:00', 42);
INSERT INTO booking_appointments (id, notes, expected_arrival, user_id) VALUES (40, 'Muốn xem iPhone mới', '2025-02-28T09:00:00', 53);

-- ============================================
-- CHAT_CUSTOMER_SERVICES
-- ============================================
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (1, '2025-02-13T09:03:00', '2025-02-13T10:05:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (2, '2025-02-05T17:04:00', NULL, 'ACTIVE');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (3, '2025-02-06T08:18:00', NULL, 'ACTIVE');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (4, '2025-02-01T08:36:00', NULL, 'ACTIVE');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (5, '2025-02-03T12:20:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (6, '2025-02-04T15:36:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (7, '2025-02-04T15:26:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (8, '2025-02-10T09:48:00', '2025-02-10T10:05:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (9, '2025-02-09T09:07:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (10, '2025-02-01T13:55:00', '2025-02-01T14:56:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (11, '2025-02-14T10:17:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (12, '2025-02-09T12:32:00', '2025-02-09T12:59:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (13, '2025-02-14T15:42:00', NULL, 'ACTIVE');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (14, '2025-02-10T15:21:00', NULL, 'ACTIVE');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (15, '2025-02-09T17:36:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (16, '2025-02-11T14:54:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (17, '2025-02-10T08:08:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (18, '2025-02-03T16:56:00', '2025-02-03T17:53:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (19, '2025-02-01T14:51:00', NULL, 'ACTIVE');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (20, '2025-02-13T12:54:00', NULL, 'ACTIVE');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (21, '2025-02-02T11:21:00', NULL, 'ACTIVE');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (22, '2025-02-13T16:12:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (23, '2025-02-04T16:59:00', '2025-02-04T17:49:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (24, '2025-02-04T14:32:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (25, '2025-02-07T14:18:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (26, '2025-02-09T10:29:00', '2025-02-09T11:06:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (27, '2025-02-06T08:37:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (28, '2025-02-06T13:19:00', NULL, 'ACTIVE');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (29, '2025-02-13T12:06:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (30, '2025-02-12T08:46:00', '2025-02-12T09:36:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (31, '2025-02-10T15:00:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (32, '2025-02-08T08:26:00', '2025-02-08T08:47:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (33, '2025-02-09T12:01:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (34, '2025-02-10T12:04:00', NULL, 'ACTIVE');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (35, '2025-02-13T15:06:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (36, '2025-02-04T11:25:00', '2025-02-04T12:34:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (37, '2025-02-10T17:56:00', '2025-02-10T18:40:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (38, '2025-02-06T17:44:00', '2025-02-06T18:53:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (39, '2025-02-06T13:59:00', '2025-02-06T14:19:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (40, '2025-02-10T17:00:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (41, '2025-02-09T17:43:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (42, '2025-02-07T12:44:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (43, '2025-02-06T14:11:00', '2025-02-06T14:58:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (44, '2025-02-06T09:36:00', '2025-02-06T10:42:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (45, '2025-02-02T14:35:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (46, '2025-02-08T12:29:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (47, '2025-02-10T11:38:00', '2025-02-10T12:04:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (48, '2025-02-13T10:07:00', '2025-02-13T10:33:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (49, '2025-02-07T11:10:00', '2025-02-07T12:09:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (50, '2025-02-11T11:07:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (51, '2025-02-12T09:49:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (52, '2025-02-06T14:14:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (53, '2025-02-06T15:34:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (54, '2025-02-09T09:58:00', NULL, 'ACTIVE');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (55, '2025-02-14T12:37:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (56, '2025-02-05T17:45:00', NULL, 'ACTIVE');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (57, '2025-02-07T11:07:00', '2025-02-07T12:14:00', 'CLOSED');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (58, '2025-02-01T10:45:00', NULL, 'ACTIVE');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (59, '2025-02-07T16:16:00', NULL, 'PENDING');
INSERT INTO chat_customer_services (session_id, start_time, end_time, status) VALUES (60, '2025-02-10T15:45:00', NULL, 'PENDING');

-- ============================================
-- CHAT_CUSTOMER_CUSTOMERS
-- ============================================
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (1, 34);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (2, 54);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (3, 6);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (4, 31);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (5, 23);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (6, 48);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (7, 49);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (8, 18);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (9, 39);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (10, 15);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (11, 37);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (12, 12);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (13, 19);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (14, 14);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (15, 52);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (16, 7);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (17, 45);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (18, 25);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (19, 16);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (20, 15);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (21, 20);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (22, 5);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (23, 16);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (24, 25);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (25, 48);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (26, 35);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (27, 38);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (28, 28);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (29, 48);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (30, 9);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (31, 51);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (32, 27);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (33, 41);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (34, 42);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (35, 9);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (36, 16);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (37, 17);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (38, 34);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (39, 11);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (40, 12);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (41, 48);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (42, 31);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (43, 49);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (44, 17);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (45, 32);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (46, 11);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (47, 13);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (48, 52);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (49, 39);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (50, 18);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (51, 15);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (52, 31);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (53, 22);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (54, 10);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (55, 47);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (56, 54);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (57, 38);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (58, 46);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (59, 47);
INSERT INTO chat_customer_customers (chat_id, user_id) VALUES (60, 29);

-- ============================================
-- CHAT_CUSTOMER_STAFFS
-- ============================================
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (1, 3);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (2, 3);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (3, 4);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (4, 4);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (8, 4);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (10, 2);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (12, 3);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (13, 4);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (14, 3);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (18, 3);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (19, 4);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (20, 3);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (21, 3);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (23, 2);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (26, 4);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (28, 2);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (30, 2);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (32, 2);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (34, 4);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (36, 4);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (37, 2);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (38, 3);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (39, 3);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (43, 2);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (44, 3);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (47, 3);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (48, 3);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (49, 4);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (54, 3);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (56, 2);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (57, 4);
INSERT INTO chat_customer_staffs (chat_id, user_id) VALUES (58, 2);

-- ============================================
-- EXTRA SEED FOR ADMIN DASHBOARD COVERAGE
-- Ensures: payment-method distribution, top categories, revenue/trend, FBT(product 1)
-- ============================================

-- More ORDERS in Jan-Feb 2025 across varied weekdays and payment methods
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES
(101, 30000, 12500000, '2025-01-12', '123 Võ Văn Ngân, Thủ Đức, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 5),
(102, 25000, 18900000, '2025-01-19', '456 Hoàng Diệu, Quận 4, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 8),
(103, 25000, 9800000,  '2025-01-24', '789 Xa lộ Hà Nội, Quận 2, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 11),
(104, 30000, 21200000, '2025-02-10', '32 Xa lộ Hà Nội, Quận 2, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 12),
(105, 25000, 15400000, '2025-02-18', '950 Pasteur, Quận 1, TP.HCM', 'DELIVERED', 'Giao giờ hành chính', 0, NULL, 'CASH_ON_DELIVERY', 13);

-- Order details include product_id = 1 co-occurring with other items to power FBT for product 1
INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES
(901, 1, 60000000, 101, 1),   -- product 1
(902, 1, 45000000, 101, 22),
(903, 2, 22000000, 101, 64),
(904, 1, 62500000, 102, 1),   -- product 1 again, different co-occurrence
(905, 1, 56000000, 102, 19),
(906, 1, 42500000, 102, 30),
(907, 1, 62000000, 103, 1),   -- product 1 again
(908, 1, 34900000, 103, 226),
(909, 1, 55000000, 103, 97),
(910, 2, 12500000, 104, 33),
(911, 1, 57500000, 104, 50),
(912, 1, 39900000, 104, 241),
(913, 1, 60000000, 105, 1),   -- product 1 again
(914, 1, 75000000, 105, 270),
(915, 2, 22500000, 105, 123);

-- Extra reviews for product 1 to populate rating distribution (if needed)
INSERT INTO product_reviews (id, rating, comment, created_at, product_id) VALUES
(2001, 5, 'Tuyệt vời cho gaming', '2025-01-15T10:00:00', 1),
(2002, 4, 'Ổn so với giá',       '2025-02-12T09:30:00', 1),
(2003, 3, 'Bình thường',         '2025-02-20T14:45:00', 1);

-- More delivered orders for returning customers and category coverage
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES
(106, 25000, 17800000, '2025-01-05',  '623 Xa lộ Hà Nội, Quận 2, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 5),
(107, 30000, 23100000, '2025-01-08',  '387 Bạch Đằng, Bình Thạnh, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 5),
(108, 30000, 19900000, '2025-01-22',  '171 Cộng Hòa, Tân Bình, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 8),
(109, 25000, 15900000, '2025-02-02',  '914 Pasteur, Quận 1, TP.HCM', 'DELIVERED', 'Giao nhanh', 0, NULL, 'CASH_ON_DELIVERY', 8),
(110, 25000, 26700000, '2025-02-06',  '32 Xa lộ Hà Nội, Quận 2, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 11),
(111, 30000, 12200000, '2025-02-09',  '129 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 11),
(112, 25000, 28800000, '2025-01-14',  '640 Phạm Ngũ Lão, Quận 1, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 12),
(113, 25000, 13400000, '2025-02-14',  '609 Lý Thái Tổ, Quận 10, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 12),
(114, 30000, 19800000, '2025-01-17',  '512 Nguyễn Thị Minh Khai, Quận 1, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 13),
(115, 30000, 23900000, '2025-02-21',  '171 Cộng Hòa, Tân Bình, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 13),
(116, 25000, 18700000, '2025-01-27',  '462 Lê Văn Việt, Thủ Đức, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 21),
(117, 25000, 21800000, '2025-02-18',  '718 Hai Bà Trưng, Quận 3, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 21),
(118, 30000, 14300000, '2025-01-10',  '334 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 25),
(119, 30000, 17600000, '2025-02-12',  '68 Điện Biên Phủ, Bình Thạnh, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 25),
(120, 25000, 26400000, '2025-02-26',  '652 Võ Văn Ngân, Thủ Đức, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 32);

INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES
-- user 5 repeat
(916, 1, 60000000, 106, 1),
(917, 1, 42500000, 106, 30),
(918, 1, 34900000, 107, 226),
(919, 2, 11000000, 107, 211),
-- user 8 repeat
(920, 1, 57500000, 108, 50),
(921, 1, 24000000, 108, 120),
(922, 1, 60000000, 109, 1),
(923, 1, 39900000, 109, 241),
-- user 11 repeat
(924, 1, 11300000, 110, 101),
(925, 2, 12500000, 110, 33),
(926, 1, 9600000, 111, 66),
-- user 12 repeat
(927, 1, 34900000, 112, 235),
(928, 1, 57500000, 112, 97),
(929, 1, 25900000, 113, 193),
-- user 13 repeat
(930, 1, 62000000, 114, 1),
(931, 1, 42500000, 114, 30),
(932, 1, 11200000, 115, 101),
(933, 1, 57500000, 115, 50),
-- user 21 repeat
(934, 2, 3200000, 116, 119),
(935, 1, 6900000, 116, 153),
(936, 1, 3330000, 117, 65),
(937, 1, 6980000, 117, 229),
-- user 25 repeat
(938, 1, 6710000, 118, 264),
(939, 1, 11100000, 118, 231),
(940, 1, 2690000, 119, 170),
(941, 1, 9050000, 119, 241),
-- user 32 order
(942, 1, 8460000, 120, 186),
(943, 1, 2900000, 120, 69);

-- Wide spread extra delivered orders across Jan-Feb 2025 for charts and advanced analytics
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES
(121, 25000, 14500000, '2025-01-01', '171 Cộng Hòa, Tân Bình, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 5),
(122, 30000, 18200000, '2025-01-04', '623 Xa lộ Hà Nội, Quận 2, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 8),
(123, 25000, 21300000, '2025-01-06', '334 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 11),
(124, 30000, 9900000,  '2025-01-09', '914 Pasteur, Quận 1, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 12),
(125, 25000, 24600000, '2025-01-12', '129 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 13),
(126, 25000, 17100000, '2025-01-15', '462 Lê Văn Việt, Thủ Đức, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 21),
(127, 30000, 22800000, '2025-01-18', '68 Điện Biên Phủ, Bình Thạnh, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 25),
(128, 30000, 19500000, '2025-01-21', '640 Phạm Ngũ Lão, Quận 1, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 32),
(129, 25000, 16200000, '2025-01-24', '192 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 36),
(130, 25000, 20900000, '2025-01-27', '387 Bạch Đằng, Bình Thạnh, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 40),
(131, 30000, 18700000, '2025-01-30', '917 Lê Lợi, Quận 1, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 44),
(132, 30000, 23600000, '2025-02-01', '12 Bạch Đằng, Bình Thạnh, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 48),
(133, 25000, 15400000, '2025-02-03', '605 Lý Thái Tổ, Quận 10, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 5),
(134, 25000, 17600000, '2025-02-05', '362 Lê Lợi, Quận 1, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 8),
(135, 30000, 24100000, '2025-02-07', '718 Hai Bà Trưng, Quận 3, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 11),
(136, 30000, 19800000, '2025-02-09', '950 Pasteur, Quận 1, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 12),
(137, 25000, 21200000, '2025-02-11', '171 Cộng Hòa, Tân Bình, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 13),
(138, 25000, 16700000, '2025-02-13', '623 Xa lộ Hà Nội, Quận 2, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 21),
(139, 30000, 23400000, '2025-02-15', '334 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 25),
(140, 30000, 18900000, '2025-02-17', '914 Pasteur, Quận 1, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 32),
(141, 25000, 15500000, '2025-02-20', '129 Cách Mạng Tháng 8, Quận 3, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 36),
(142, 25000, 22600000, '2025-02-23', '387 Bạch Đằng, Bình Thạnh, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 40),
(143, 30000, 20100000, '2025-02-25', '917 Lê Lợi, Quận 1, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'ONLINE_BANKING', 44),
(144, 30000, 24800000, '2025-02-27', '12 Bạch Đằng, Bình Thạnh, TP.HCM', 'DELIVERED', NULL, 0, NULL, 'CASH_ON_DELIVERY', 48);

INSERT INTO order_details (id, amount, unit_price, order_id, product_id) VALUES
(950, 1, 10000000, 121, 186),
(951, 1, 4500000, 121, 119),
(952, 1, 57500000, 122, 50),
(953, 1, 3330000, 122, 65),
(954, 1, 6700000, 123, 264),
(955, 1, 9050000, 123, 241),
(956, 1, 62000000, 124, 1),
(957, 1, 34900000, 124, 226),
(958, 2, 12500000, 125, 33),
(959, 1, 9600000, 125, 66),
(960, 1, 8460000, 126, 186),
(961, 1, 24000000, 127, 120),
(962, 1, 57500000, 127, 97),
(963, 1, 6990000, 128, 229),
(964, 1, 2690000, 128, 170),
(965, 1, 2130000, 129, 48),
(966, 1, 11100000, 129, 231),
(967, 1, 3330000, 130, 76),
(968, 1, 6990000, 130, 229),
(969, 1, 57500000, 131, 50),
(970, 1, 34900000, 131, 235),
(971, 1, 24600000, 132, 200),
(972, 1, 14300000, 132, 37),
(973, 1, 6210000, 133, 155),
(974, 1, 6749000, 133, 246),
(975, 1, 5287000, 134, 114),
(976, 2, 2089000, 134, 226),
(977, 1, 8460000, 135, 186),
(978, 1, 57500000, 135, 97),
(979, 1, 2130000, 136, 48),
(980, 1, 6990000, 136, 229),
(981, 1, 6750000, 137, 178),
(982, 1, 9050000, 137, 241),
(983, 1, 6210000, 138, 155),
(984, 1, 3330000, 138, 65),
(985, 1, 24600000, 139, 200),
(986, 1, 8400000, 139, 99),
(987, 1, 9600000, 140, 66),
(988, 1, 4316000, 140, 6),
(989, 1, 10082268, 141, 101),
(990, 1, 4520522, 141, 97),
(991, 1, 34900000, 142, 226),
(992, 1, 4230000, 142, 16),
(993, 1, 5980000, 143, 232),
(994, 1, 2179000, 143, 36),
(995, 1, 57500000, 144, 50),
(996, 1, 34900000, 144, 235);

-- Additional DELIVERED orders for better statistics
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (997, 25000, 25000000, '2025-01-10', '123 Test Street, District 1, HCMC', 'DELIVERED', 'Test order 1', 0, NULL, 'ONLINE_BANKING', 1);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (998, 30000, 30000000, '2025-01-15', '456 Test Avenue, District 2, HCMC', 'DELIVERED', 'Test order 2', 0, NULL, 'CASH_ON_DELIVERY', 2);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (999, 25000, 20000000, '2025-01-20', '789 Test Road, District 3, HCMC', 'DELIVERED', 'Test order 3', 0, NULL, 'ONLINE_BANKING', 3);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (1000, 30000, 40000000, '2025-02-01', '321 Test Lane, District 4, HCMC', 'DELIVERED', 'Test order 4', 0, NULL, 'CASH_ON_DELIVERY', 4);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (1001, 25000, 35000000, '2025-02-10', '654 Test Boulevard, District 5, HCMC', 'DELIVERED', 'Test order 5', 0, NULL, 'ONLINE_BANKING', 5);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (1002, 30000, 45000000, '2025-02-15', '987 Test Circle, District 6, HCMC', 'DELIVERED', 'Test order 6', 0, NULL, 'CASH_ON_DELIVERY', 6);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (1003, 25000, 28000000, '2025-02-20', '147 Test Square, District 7, HCMC', 'DELIVERED', 'Test order 7', 0, NULL, 'ONLINE_BANKING', 7);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (1004, 30000, 32000000, '2025-02-25', '258 Test Plaza, District 8, HCMC', 'DELIVERED', 'Test order 8', 0, NULL, 'CASH_ON_DELIVERY', 8);

-- Additional revenue data for better charts
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (1005, 25000, 15000000, '2025-01-01', '100 Test Street, District 1, HCMC', 'DELIVERED', 'New Year order', 0, NULL, 'ONLINE_BANKING', 1);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (1006, 30000, 25000000, '2025-01-02', '200 Test Avenue, District 2, HCMC', 'DELIVERED', 'January order', 0, NULL, 'CASH_ON_DELIVERY', 2);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (1007, 25000, 18000000, '2025-01-03', '300 Test Road, District 3, HCMC', 'DELIVERED', 'January order', 0, NULL, 'ONLINE_BANKING', 3);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (1008, 30000, 22000000, '2025-01-04', '400 Test Lane, District 4, HCMC', 'DELIVERED', 'January order', 0, NULL, 'CASH_ON_DELIVERY', 4);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (1009, 25000, 19000000, '2025-01-05', '500 Test Boulevard, District 5, HCMC', 'DELIVERED', 'January order', 0, NULL, 'ONLINE_BANKING', 5);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (1010, 30000, 28000000, '2025-01-06', '600 Test Circle, District 6, HCMC', 'DELIVERED', 'January order', 0, NULL, 'CASH_ON_DELIVERY', 6);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (1011, 25000, 21000000, '2025-01-07', '700 Test Square, District 7, HCMC', 'DELIVERED', 'January order', 0, NULL, 'ONLINE_BANKING', 7);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (1012, 30000, 26000000, '2025-01-08', '800 Test Plaza, District 8, HCMC', 'DELIVERED', 'January order', 0, NULL, 'CASH_ON_DELIVERY', 8);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (1013, 25000, 17000000, '2025-01-09', '900 Test Court, District 9, HCMC', 'DELIVERED', 'January order', 0, NULL, 'ONLINE_BANKING', 9);
INSERT INTO orders (id, payment_fee, total_price, created_date, delivery_address, status, notes, used_point, used_at, payment_method, user_id) VALUES (1014, 30000, 24000000, '2025-01-10', '1000 Test Drive, District 10, HCMC', 'DELIVERED', 'January order', 0, NULL, 'CASH_ON_DELIVERY', 10);



-- ============================================
-- CHAT_SESSION
-- ============================================
INSERT INTO `chat_sessions` (`ended_at`, `id`, `staff_id`, `started_at`, `guest_name`, `guest_phone`, `session_code`, `status`) VALUES
    (NULL, 1, NULL, '2025-10-19 13:56:45.827461', 'Đặng Khôi Nguyên', '0943953779', 'CHAT_1760857005827', 'ACTIVE'),
    (NULL, 2, NULL, '2025-10-19 13:57:47.887733', 'Nguyễn Văn B', '0999777888', 'CHAT_1760857067887', 'ACTIVE');

-- ============================================
-- MESSAGES
-- ============================================
INSERT INTO `messages` (`id`, `sent_at`, `session_id`, `sender_type`, `content`, `sender_name`) VALUES
    (1, '2025-10-19 13:56:49.088777', 1, 'CUSTOMER', 'Hello', 'Đặng Khôi Nguyên'),
    (2, '2025-10-19 13:57:08.744139', 1, 'STAFF', 'xin chào bạn bạn cần hỗ trợ gì không', 'CSKH'),
    (3, '2025-10-19 13:58:01.097167', 2, 'CUSTOMER', 'Xin chào tôi cần hỗ trợ', 'Nguyễn Văn B'),
    (4, '2025-10-19 13:58:16.684351', 2, 'STAFF', 'Bạn cần hỗ trợ về gì nhỉ', 'CSKH'),
    (5, '2025-10-19 13:58:52.237430', 2, 'STAFF', 'Bạn đang chat với nhân viên CSKH', 'CSKH');

-- ============================================
-- CART DATA
-- ============================================

-- Clear existing cart data to avoid conflicts
DELETE FROM cart_items;
DELETE FROM carts;

-- Cart data for customers (users with role_id = 3)
INSERT INTO carts (id, created_at, updated_at, total_amount, total_items, user_id) VALUES
    -- Customer carts (role_id = 3)
    (1, '2025-01-15 10:30:00', '2025-01-15 10:30:00', 0.0, 0, 5),   -- Vũ Hải Quân
    (2, '2025-01-15 11:15:00', '2025-01-15 11:15:00', 0.0, 0, 6),   -- Lý Thu Thắng
    (3, '2025-01-15 12:00:00', '2025-01-15 12:00:00', 0.0, 0, 7),   -- Phạm Thị Vinh
    (4, '2025-01-15 13:45:00', '2025-01-15 13:45:00', 0.0, 0, 8),   -- Nguyễn Văn Toàn
    (5, '2025-01-15 14:20:00', '2025-01-15 14:20:00', 0.0, 0, 9),   -- Võ Thu Toàn
    (6, '2025-01-15 15:10:00', '2025-01-15 15:10:00', 0.0, 0, 10),  -- Võ Thu Sơn
    (7, '2025-01-15 16:00:00', '2025-01-15 16:00:00', 0.0, 0, 11),  -- Phạm Quốc Phong
    (8, '2025-01-15 16:30:00', '2025-01-15 16:30:00', 0.0, 0, 12),  -- Lê Anh Thảo
    (9, '2025-01-15 17:15:00', '2025-01-15 17:15:00', 0.0, 0, 13),  -- Nguyễn Minh Thảo
    (10, '2025-01-15 18:00:00', '2025-01-15 18:00:00', 0.0, 0, 14); -- Lý Thu Nam

-- CartItem data - Using actual product IDs from the products table with VND pricing
INSERT INTO cart_items (id, quantity, unit_price, total_price, created_at, updated_at, cart_id, product_id) VALUES
    -- Cart 1 (User 5 - Vũ Hải Quân) - Gaming keyboards
    (1, 1, 1500000.0, 1500000.0, '2025-01-15 10:30:00', '2025-01-15 10:30:00', 1, 1),   -- Bàn phím Daeru Gaming RGB
    (2, 2, 1800000.0, 3600000.0, '2025-01-15 10:35:00', '2025-01-15 10:35:00', 1, 2), -- Bàn phím Daeru Rainbow
    (3, 1, 2000000.0, 2000000.0, '2025-01-15 10:40:00', '2025-01-15 10:40:00', 1, 3),  -- Bàn phím Daeru Pro RGB
    
    -- Cart 2 (User 6 - Lý Thu Thắng) - Gaming mice
    (4, 1, 1200000.0, 1200000.0, '2025-01-15 11:15:00', '2025-01-15 11:15:00', 2, 6),  -- Chuột Daeru Gaming RGB
    (5, 1, 1500000.0, 1500000.0, '2025-01-15 11:20:00', '2025-01-15 11:20:00', 2, 7),  -- Chuột Daeru Pro RGB
    
    -- Cart 3 (User 7 - Phạm Thị Vinh) - Mousepads
    (8, 1, 600000.0, 600000.0, '2025-01-15 12:00:00', '2025-01-15 12:00:00', 3, 11), -- Mousepad Daeru Gaming RGB
    (9, 1, 800000.0, 800000.0, '2025-01-15 12:05:00', '2025-01-15 12:05:00', 3, 12), -- Mousepad Daeru Pro RGB
    (10, 1, 1000000.0, 1000000.0, '2025-01-15 12:10:00', '2025-01-15 12:10:00', 3, 13), -- Mousepad Daeru Elite RGB
    
    -- Cart 4 (User 8 - Nguyễn Văn Toàn) - Gaming gear
    (11, 1, 2500000.0, 2500000.0, '2025-01-15 13:45:00', '2025-01-15 13:45:00', 4, 14), -- GamingGear Sony PlayStation
    (12, 1, 3000000.0, 3000000.0, '2025-01-15 13:50:00', '2025-01-15 13:50:00', 4, 15), -- GamingGear Lenovo Legion
    (13, 1, 3500000.0, 3500000.0, '2025-01-15 13:55:00', '2025-01-15 13:55:00', 4, 16), -- GamingGear Daeru Pro
    
    -- Cart 5 (User 9 - Võ Thu Toàn) - PC cases
    (14, 1, 3500000.0, 3500000.0, '2025-01-15 14:20:00', '2025-01-15 14:20:00', 5, 17), -- Case T01 Standard
    (15, 1, 4500000.0, 4500000.0, '2025-01-15 14:25:00', '2025-01-15 14:25:00', 5, 18), -- Case T01 Pro RGB
    (16, 1, 5500000.0, 5500000.0, '2025-01-15 14:30:00', '2025-01-15 14:30:00', 5, 19), -- Case T01 Elite RGB
    
    -- Cart 6 (User 10 - Võ Thu Sơn) - CPUs
    (17, 1, 6000000.0, 6000000.0, '2025-01-15 15:10:00', '2025-01-15 15:10:00', 6, 20), -- CPU AMD Ryzen 5
    (18, 1, 8000000.0, 8000000.0, '2025-01-15 15:15:00', '2025-01-15 15:15:00', 6, 21), -- CPU AMD Ryzen 7
    (19, 1, 12000000.0, 12000000.0, '2025-01-15 15:20:00', '2025-01-15 15:20:00', 6, 22), -- CPU AMD Ryzen 9
    
    -- Cart 7 (User 11 - Phạm Quốc Phong) - Motherboards
    (20, 1, 5500000.0, 5500000.0, '2025-01-15 16:00:00', '2025-01-15 16:00:00', 7, 23), -- Main Asus ROG Strix
    (21, 1, 7500000.0, 7500000.0, '2025-01-15 16:05:00', '2025-01-15 16:05:00', 7, 24), -- Main Asus ROG Crosshair
    (22, 1, 9500000.0, 9500000.0, '2025-01-15 16:10:00', '2025-01-15 16:10:00', 7, 25), -- Main Asus ROG Maximus
    
    -- Cart 8 (User 12 - Lê Anh Thảo) - PSUs
    (23, 1, 4500000.0, 4500000.0, '2025-01-15 16:30:00', '2025-01-15 16:30:00', 8, 26), -- PSU Asus ROG Thor
    (24, 1, 6000000.0, 6000000.0, '2025-01-15 16:35:00', '2025-01-15 16:35:00', 8, 27), -- PSU Asus ROG Strix
    (25, 1, 7500000.0, 7500000.0, '2025-01-15 16:40:00', '2025-01-15 16:40:00', 8, 28), -- PSU Asus ROG Loki
    
    -- Cart 9 (User 13 - Nguyễn Minh Thảo) - Storage
    (26, 1, 3000000.0, 3000000.0, '2025-01-15 17:15:00', '2025-01-15 17:15:00', 9, 29), -- HDD Kingston SSD NV1
    (27, 1, 4000000.0, 4000000.0, '2025-01-15 17:20:00', '2025-01-15 17:20:00', 9, 30), -- HDD Kingston SSD KC3000
    (28, 1, 5000000.0, 5000000.0, '2025-01-15 17:25:00', '2025-01-15 17:25:00', 9, 31), -- HDD Kingston SSD Fury
    
    -- Cart 10 (User 14 - Lý Thu Nam) - RAM
    (29, 2, 2500000.0, 5000000.0, '2025-01-15 18:00:00', '2025-01-15 18:00:00', 10, 32), -- RAM Kingston Fury Beast
    (30, 1, 3500000.0, 3500000.0, '2025-01-15 18:05:00', '2025-01-15 18:05:00', 10, 33); -- RAM Kingston Fury Renegade

-- Update cart totals after inserting cart items
UPDATE carts SET 
    total_amount = (
        SELECT COALESCE(SUM(total_price), 0) 
        FROM cart_items 
        WHERE cart_id = carts.id
    ),
    total_items = (
        SELECT COALESCE(SUM(quantity), 0) 
        FROM cart_items 
        WHERE cart_id = carts.id
    );

-- ============================================
-- USER DISCOUNTS TABLE
-- ============================================


-- ============================================
-- SAMPLE USER DISCOUNTS DATA
-- ============================================
-- Assign some discounts to users (assuming users and discounts exist)
INSERT INTO discounts (id, name, type, description, discount_rate, discount_status, start_date, end_date, product_id, point) VALUES
(101, 'Minigame Reward 10%', 'PERCENTAGE', 'Phần thưởng từ minigame - giảm 10% cho đơn hàng', 0.1, true, '2025-01-01', '2025-12-31', NULL, 500),
(102, 'Minigame Reward 15%', 'PERCENTAGE', 'Phần thưởng từ minigame - giảm 15% cho đơn hàng', 0.15, true, '2025-01-01', '2025-12-31', NULL, 1000),
(103, 'Minigame Reward 20%', 'PERCENTAGE', 'Phần thưởng từ minigame - giảm 20% cho đơn hàng', 0.2, true, '2025-01-01', '2025-12-31', NULL, 2000),
(104, 'Minigame Reward 25%', 'PERCENTAGE', 'Phần thưởng từ minigame - giảm 25% cho đơn hàng', 0.25, true, '2025-01-01', '2025-12-31', NULL, 3000),
(105, 'Minigame High Score 30%', 'PERCENTAGE', 'Phần thưởng điểm cao minigame - giảm 30% cho đơn hàng', 0.3, true, '2025-01-01', '2025-12-31', NULL, 3000);

-- ============================================
-- ADDITIONAL DISCOUNTS FOR MINIGAME REWARDS


-- ============================================
-- UPDATE USER_DISCOUNTS WITH MINIGAME REWARDS
-- ============================================
-- Assign minigame reward discounts to some active customers
INSERT INTO user_discounts (user_id, discount_id, is_used, created_at, expires_at) VALUES
-- Customer 5 (Vũ Hải Quân) - has high points, gets good rewards
(5, 101, false, NOW(), '2025-12-31 23:59:59'),
(5, 102, false, NOW(), '2025-12-31 23:59:59'),
(5, 105, false, NOW(), '2025-12-31 23:59:59'),

-- Customer 8 (Nguyễn Văn Toàn) - good customer
(8, 101, false, NOW(), '2025-12-31 23:59:59'),
(8, 103, false, NOW(), '2025-12-31 23:59:59'),

-- Customer 10 (Võ Thu Sơn) - loyal customer
(10, 101, false, NOW(), '2025-12-31 23:59:59'),
(10, 102, false, NOW(), '2025-12-31 23:59:59'),
(10, 104, false, NOW(), '2025-12-31 23:59:59'),

-- Customer 11 (Phạm Quốc Phong) - active customer
(11, 101, false, NOW(), '2025-12-31 23:59:59'),
(11, 103, false, NOW(), '2025-12-31 23:59:59'),

-- Customer 12 (Lê Anh Thảo) - regular customer
(12, 101, false, NOW(), '2025-12-31 23:59:59'),
(12, 102, false, NOW(), '2025-12-31 23:59:59'),

-- Customer 15 (Đỗ Quốc Hoa) - good customer
(15, 101, false, NOW(), '2025-12-31 23:59:59'),
(15, 103, false, NOW(), '2025-12-31 23:59:59'),

-- Customer 18 (Hồ Đức Linh) - active customer
(18, 101, false, NOW(), '2025-12-31 23:59:59'),
(18, 102, false, NOW(), '2025-12-31 23:59:59'),
(18, 104, false, NOW(), '2025-12-31 23:59:59'),

-- Customer 19 (Bùi Văn Dũng) - good customer
(19, 101, false, NOW(), '2025-12-31 23:59:59'),
(19, 103, false, NOW(), '2025-12-31 23:59:59'),

-- Customer 21 (Vũ Văn Phương) - regular customer
(21, 101, false, NOW(), '2025-12-31 23:59:59'),
(21, 102, false, NOW(), '2025-12-31 23:59:59'),

-- Customer 25 (Bùi Thanh Thắng) - high points customer
(25, 101, false, NOW(), '2025-12-31 23:59:59'),
(25, 102, false, NOW(), '2025-12-31 23:59:59'),
(25, 105, false, NOW(), '2025-12-31 23:59:59'),

-- Customer 27 (Võ Đức Trang) - good customer
(27, 101, false, NOW(), '2025-12-31 23:59:59'),
(27, 103, false, NOW(), '2025-12-31 23:59:59'),

-- Customer 28 (Võ Đức Nga) - regular customer
(28, 101, false, NOW(), '2025-12-31 23:59:59'),
(28, 102, false, NOW(), '2025-12-31 23:59:59');
