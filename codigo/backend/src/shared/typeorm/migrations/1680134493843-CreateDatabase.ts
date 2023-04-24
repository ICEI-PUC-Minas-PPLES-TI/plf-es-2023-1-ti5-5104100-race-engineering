import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1680134493843 implements MigrationInterface {
  name = 'CreateDatabase1680134493843';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "User" (
        "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "name" text,
        "email" text,
        "password" text,
        "role" text,
        "lastLoginAt" timestamptz,
        "createdAt" timestamptz,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz
      );
      
      CREATE TABLE "Team" (
        "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "name" text,
        "category" text,
        "createdAt" timestamptz,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz
      );
      
      CREATE TABLE "Driver" (
        "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "number" int,
        "userId" int,
        "teamId" int,
        "isActive" boolean,
        "nationality" text,
        "bestLapTime" decimal,
        "bestRaceTime" decimal,
        "totalRaceTime" decimal,
        "totalRaceKm" decimal,
        "createdAt" timestamptz,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz
      );
      
      CREATE TABLE "Circuit" (
        "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "name" text,
        "local" text,
        "trackSize" decimal,
        "safetyMargin" decimal,
        "createdAt" timestamptz,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz
      );
      
      CREATE TABLE "Lap" (
        "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "raceId" int,
        "driverId" int,
        "lapTime" interval,
        "lapNumber" int,
        "createdAt" timestamptz,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz
      );
      
      CREATE TABLE "Race" (
        "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "name" text,
        "circuitId" int,
        "analystId" int,
        "startDate" timestamptz,
        "endDate" timestamptz,
        "firstPlaceId" int,
        "totalLaps" int,
        "createdAt" timestamptz,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz
      );
      
      CREATE TABLE "Race_Team" (
        "raceId" int,
        "teamId" int,
        PRIMARY KEY ("raceId", "teamId")
      );
      
      CREATE TABLE "Race_Driver" (
        "raceId" int,
        "driverId" int,
        PRIMARY KEY ("raceId", "driverId")
      );
      
      CREATE TABLE "Race_Mechanic" (
        "raceId" int,
        "mechanicId" int,
        PRIMARY KEY ("raceId", "mechanicId")
      );
      
      CREATE TABLE "Car" (
        "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        "teamId" int,
        "driverId" int,
        "totalFuel" decimal,
        "currentFuel" decimal,
        "createdAt" timestamptz,
        "updatedAt" timestamptz,
        "deletedAt" timestamptz
      );
      
      COMMENT ON COLUMN "Lap"."raceId" IS 'Ao apagar uma Race, realizar um ON DELETE CASCADE';
      
      ALTER TABLE "Driver" ADD FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE;
      
      ALTER TABLE "Driver" ADD FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL;
      
      ALTER TABLE "Lap" ADD FOREIGN KEY ("raceId") REFERENCES "Race" ("id") ON DELETE CASCADE;
      
      ALTER TABLE "Lap" ADD FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE CASCADE;
      
      ALTER TABLE "Race" ADD FOREIGN KEY ("circuitId") REFERENCES "Circuit" ("id") ON DELETE SET NULL;
      
      ALTER TABLE "Race" ADD FOREIGN KEY ("analystId") REFERENCES "User" ("id") ON DELETE SET NULL;
      
      ALTER TABLE "Race" ADD FOREIGN KEY ("firstPlaceId") REFERENCES "Driver" ("id") ON DELETE SET NULL;
      
      ALTER TABLE "Race_Team" ADD FOREIGN KEY ("raceId") REFERENCES "Race" ("id") ON DELETE CASCADE;
      
      ALTER TABLE "Race_Team" ADD FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE;
      
      ALTER TABLE "Race_Driver" ADD FOREIGN KEY ("raceId") REFERENCES "Race" ("id") ON DELETE CASCADE;
      
      ALTER TABLE "Race_Driver" ADD FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE CASCADE;
      
      ALTER TABLE "Race_Mechanic" ADD FOREIGN KEY ("raceId") REFERENCES "Race" ("id") ON DELETE CASCADE;
      
      ALTER TABLE "Race_Mechanic" ADD FOREIGN KEY ("mechanicId") REFERENCES "User" ("id") ON DELETE CASCADE;
      
      ALTER TABLE "Car" ADD FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL;
      
      ALTER TABLE "Car" ADD FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE SET NULL;
    `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase('race_engineering');
  }
}
