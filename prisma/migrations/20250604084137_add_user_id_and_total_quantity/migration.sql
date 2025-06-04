-- 1. Thêm cột userId với giá trị mặc định tạm thời 0 (để tránh lỗi khi bảng có dữ liệu)
ALTER TABLE `cart_detail` ADD COLUMN `userId` INTEGER NOT NULL DEFAULT 0;

-- 2. Thêm cột totalQuantity vào bảng carts với giá trị mặc định 0
ALTER TABLE `carts` ADD COLUMN `totalQuantity` INTEGER NOT NULL DEFAULT 0;
