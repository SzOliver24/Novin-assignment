-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `customer_userId_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `item_customerId_fkey`;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
