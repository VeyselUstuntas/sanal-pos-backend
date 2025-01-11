-- CreateTable
CREATE TABLE `TestCards` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `card_no` VARCHAR(191) NOT NULL,
    `bank` VARCHAR(191) NOT NULL,
    `card_type` VARCHAR(191) NOT NULL,
    `is_valid` BOOLEAN NOT NULL,

    UNIQUE INDEX `TestCards_card_no_key`(`card_no`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
