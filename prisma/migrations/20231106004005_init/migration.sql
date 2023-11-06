-- CreateTable
CREATE TABLE `Member` (
    `id` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(50) NOT NULL,
    `middlename` VARCHAR(50) NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `memberId` VARCHAR(10) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `image` VARCHAR(200) NULL,
    `phone` VARCHAR(15) NULL,
    `address` VARCHAR(200) NULL,
    `type` ENUM('User', 'Admin') NOT NULL DEFAULT 'User',
    `status` ENUM('Pending', 'Active', 'Disabled') NOT NULL DEFAULT 'Pending',
    `token` VARCHAR(40) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` VARCHAR(50) NULL,

    UNIQUE INDEX `Member_email_key`(`email`),
    UNIQUE INDEX `Member_memberId_key`(`memberId`),
    INDEX `Member_id_memberId_idx`(`id`, `memberId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountNumber` (
    `id` VARCHAR(191) NOT NULL,
    `banker` VARCHAR(100) NOT NULL,
    `accountnumber` VARCHAR(20) NOT NULL,
    `type` ENUM('Savings', 'Current', 'Fixed') NOT NULL DEFAULT 'Savings',
    `accountOwner` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Investment` (
    `id` VARCHAR(191) NOT NULL,
    `banker` VARCHAR(100) NOT NULL,
    `number` INTEGER NOT NULL,
    `type` ENUM('Silver', 'Gold', 'Platinum') NOT NULL DEFAULT 'Silver',
    `status` ENUM('Pending', 'Running', 'Completed', 'Suspended') NOT NULL DEFAULT 'Pending',
    `investorId` VARCHAR(191) NULL,
    `beneficiaryId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Loan` (
    `id` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `loanerId` VARCHAR(191) NULL,
    `status` ENUM('Pending', 'Running', 'Completed', 'Suspended') NOT NULL DEFAULT 'Pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Saving` (
    `id` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `saverId` VARCHAR(191) NULL,
    `status` ENUM('Pending', 'Running', 'Completed', 'Suspended') NOT NULL DEFAULT 'Pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AccountNumber` ADD CONSTRAINT `AccountNumber_accountOwner_fkey` FOREIGN KEY (`accountOwner`) REFERENCES `Member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Investment` ADD CONSTRAINT `Investment_investorId_fkey` FOREIGN KEY (`investorId`) REFERENCES `Member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Investment` ADD CONSTRAINT `Investment_beneficiaryId_fkey` FOREIGN KEY (`beneficiaryId`) REFERENCES `Member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Loan` ADD CONSTRAINT `Loan_loanerId_fkey` FOREIGN KEY (`loanerId`) REFERENCES `Member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Saving` ADD CONSTRAINT `Saving_saverId_fkey` FOREIGN KEY (`saverId`) REFERENCES `Member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
