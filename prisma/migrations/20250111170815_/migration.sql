/*
  Warnings:

  - You are about to drop the column `card_no` on the `testcards` table. All the data in the column will be lost.
  - You are about to drop the column `card_type` on the `testcards` table. All the data in the column will be lost.
  - You are about to drop the column `is_valid` on the `testcards` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cardNo]` on the table `TestCards` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cardNo` to the `TestCards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardType` to the `TestCards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isValid` to the `TestCards` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `TestCards_card_no_key` ON `testcards`;

-- AlterTable
ALTER TABLE `testcards` DROP COLUMN `card_no`,
    DROP COLUMN `card_type`,
    DROP COLUMN `is_valid`,
    ADD COLUMN `cardNo` VARCHAR(191) NOT NULL,
    ADD COLUMN `cardType` VARCHAR(191) NOT NULL,
    ADD COLUMN `isValid` BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `TestCards_cardNo_key` ON `TestCards`(`cardNo`);
