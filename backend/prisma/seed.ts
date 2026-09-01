import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const now = new Date();

  const users = [
    {
      email: 'admin@vitaforge.com',
      name: 'Admin User',
      password: 'Admin123!',
      role: 'admin',
    },
    {
      email: 'demo@vitaforge.com',
      name: 'Demo User',
      password: 'Demo123!',
      role: 'user',
    },
  ];

  for (const user of users) {
    const existing = await prisma.user.findUnique({ where: { email: user.email } });
    if (!existing) {
      await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          passwordHash: await bcrypt.hash(user.password, 12),
          role: user.role,
          createdAt: now,
          updatedAt: now,
        },
      });
    }
  }

  const resumeProfiles = [
    {
      userId: null,
      payload: { template: 'modern', summary: 'Seed profile for demo user' },
    },
  ];

  for (const profile of resumeProfiles) {
    const existing = await prisma.resumeProfile.findFirst({
      where: {
        payload: profile.payload as any,
      },
    });

    if (!existing) {
      await prisma.resumeProfile.create({
        data: {
          ...profile,
          createdAt: now,
          updatedAt: now,
        },
      });
    }
  }

  console.log('Seed completed with demo auth users.');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
