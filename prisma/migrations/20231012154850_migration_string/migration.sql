-- AlterTable
ALTER TABLE `Commentaire` MODIFY `rating` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Order` MODIFY `total` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Produit` MODIFY `prix` VARCHAR(191) NOT NULL,
    MODIFY `nbrestock` VARCHAR(191) NOT NULL,
    MODIFY `like` VARCHAR(191) NULL;
