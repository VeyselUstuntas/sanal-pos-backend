-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `Payments_paymentDirectCardId_fkey`;

-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `Payments_paymentStoredCardId_fkey`;

-- DropIndex
DROP INDEX `Payments_paymentDirectCardId_fkey` ON `payments`;

-- DropIndex
DROP INDEX `Payments_paymentStoredCardId_fkey` ON `payments`;

-- AlterTable
ALTER TABLE `payments` MODIFY `paymentDirectCardId` INTEGER NULL,
    MODIFY `paymentStoredCardId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Payments` ADD CONSTRAINT `Payments_paymentDirectCardId_fkey` FOREIGN KEY (`paymentDirectCardId`) REFERENCES `PaymentDirectCard`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payments` ADD CONSTRAINT `Payments_paymentStoredCardId_fkey` FOREIGN KEY (`paymentStoredCardId`) REFERENCES `PaymentStoredCard`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
