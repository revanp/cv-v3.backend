import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('password', 10);
    await prisma.user.createMany({
      data: [
        {
          email: 'revanp0@gmail.com',
          name: 'Revan Pratama',
          password: hashedPassword,
          username: 'revanp0',
        },
      ],
      skipDuplicates: true,
    });
  } catch (err) {
    console.error(err);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
