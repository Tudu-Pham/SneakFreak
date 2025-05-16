-- CreateTable
CREATE TABLE `secondhand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `phone` INTEGER NULL,
    `brand` VARCHAR(255) NULL,
    `model_name` VARCHAR(255) NULL,
    `size` INTEGER NULL,
    `condition` VARCHAR(255) NULL,
    `box` VARCHAR(255) NULL,
    `yearPurchase` INTEGER NULL,
    `retailPrice` INTEGER NULL,
    `desiredPrice` INTEGER NULL,
    `images` VARCHAR(255) NULL,
    `comment` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
