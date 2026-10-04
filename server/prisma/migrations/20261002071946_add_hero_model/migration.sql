-- CreateTable
CREATE TABLE `heroes` (
    `id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `subtitle` VARCHAR(300) NULL,
    `description` TEXT NULL,
    `primaryButtonText` VARCHAR(100) NULL,
    `primaryButtonUrl` VARCHAR(500) NULL,
    `secondaryButtonText` VARCHAR(100) NULL,
    `secondaryButtonUrl` VARCHAR(500) NULL,
    `imageUrl` TEXT NULL,
    `avatarUrl` TEXT NULL,
    `resumeUrl` VARCHAR(500) NULL,
    `socials` JSON NULL,
    `layout` JSON NULL,
    `background` JSON NULL,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
