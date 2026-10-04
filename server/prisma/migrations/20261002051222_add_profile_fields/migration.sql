-- AlterTable
ALTER TABLE `profiles` ADD COLUMN `myDegree` VARCHAR(200) NULL,
    ADD COLUMN `myDegreeDetails` TEXT NULL,
    ADD COLUMN `myLocation` VARCHAR(150) NULL,
    ADD COLUMN `status` VARCHAR(150) NULL;
