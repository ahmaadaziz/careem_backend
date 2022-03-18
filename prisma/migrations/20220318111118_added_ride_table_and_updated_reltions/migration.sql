-- DropIndex
DROP INDEX "Rating_captainId_key";

-- DropIndex
DROP INDEX "Rating_userId_key";

-- CreateTable
CREATE TABLE "Ride" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startAddress" TEXT NOT NULL,
    "dropOffAddress" TEXT NOT NULL,
    "fare" INTEGER NOT NULL,
    "captainId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "ratingId" INTEGER NOT NULL,
    CONSTRAINT "Ride_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ride_captainId_fkey" FOREIGN KEY ("captainId") REFERENCES "Captain" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ride_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ride_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Ride_vehicleId_key" ON "Ride"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "Ride_ratingId_key" ON "Ride"("ratingId");
