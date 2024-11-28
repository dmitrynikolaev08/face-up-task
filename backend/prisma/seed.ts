import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const INSTITUTION_COUNT = 5;
const REPORTS_PER_INSTITUTION = 10;

async function main() {
  // Clean the database
  await prisma.report.deleteMany();
  await prisma.institution.deleteMany();

  // Seed institutions
  const institutions = await Promise.all(
    Array.from({ length: INSTITUTION_COUNT }, () =>
      prisma.institution.create({
        data: {
          name: faker.company.name(),
        },
      }),
    ),
  );

  // Seed reports
  const reports = await Promise.all(
    institutions.flatMap((institution) =>
      Array.from({ length: REPORTS_PER_INSTITUTION }, () =>
        prisma.report.create({
          data: {
            senderName: faker.person.fullName(),
            senderAge: faker.number.int({ min: 18, max: 80 }),
            message: faker.lorem.paragraphs({ min: 1, max: 3 }),
            institutionId: institution.id,
            files: JSON.stringify(
              Array.from(
                { length: faker.number.int({ min: 0, max: 3 }) },
                () => ({
                  id: faker.string.uuid(),
                  filename: faker.system.fileName(),
                  path: `/uploads/${faker.system.fileName()}`,
                }),
              ),
            ),
          },
        }),
      ),
    ),
  );

  console.log('\n=== Database Seeded Successfully 🌱 ===\n');
  console.log(`📍 Created ${institutions.length} institutions`);
  console.log(`📝 Created ${reports.length} reports`);
  console.log('\nSample institutions:');
  institutions.slice(0, 3).forEach((inst) => {
    console.log(`- ${inst.name}`);
  });
}

main()
  .catch((e) => {
    console.error('\n❌ Seeding failed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
