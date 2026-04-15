generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model HealthRecord {
  id               Int      @id @default(autoincrement())
  date             DateTime @unique
  steps            Int?
  restingHeartRate Int?
  heartRateAverage Int?
  sleepHours       Float?
  workouts         Int?
  caloriesActive   Int?
  trainingLoad     Int?
  notes            String?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}
