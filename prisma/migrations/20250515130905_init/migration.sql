/*
  Warnings:

  - You are about to drop the column `address` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `address`,
    DROP COLUMN `name`,
    ADD COLUMN `first_name` VARCHAR(255) NULL,
    ADD COLUMN `last_name` VARCHAR(255) NULL,
    ADD COLUMN `password` VARCHAR(255) NULL;
