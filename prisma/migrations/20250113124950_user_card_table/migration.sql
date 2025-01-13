-- CreateTable
CREATE TABLE `Cards` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cardAlias` VARCHAR(191) NOT NULL,
    `cardNumber` VARCHAR(191) NOT NULL,
    `expireYear` VARCHAR(191) NOT NULL,
    `expireMonth` VARCHAR(191) NOT NULL,
    `cardHolderName` VARCHAR(191) NOT NULL,
    `cardUserKey` VARCHAR(191) NOT NULL,
    `cardToken` VARCHAR(191) NOT NULL,
    `cardBankName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Cards_cardNumber_key`(`cardNumber`),
    UNIQUE INDEX `Cards_cardToken_key`(`cardToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `cardUserKey` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_cardUserKey_key`(`cardUserKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cards` ADD CONSTRAINT `Cards_cardUserKey_fkey` FOREIGN KEY (`cardUserKey`) REFERENCES `User`(`cardUserKey`) ON DELETE RESTRICT ON UPDATE CASCADE;
