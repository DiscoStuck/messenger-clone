import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    // Delete all data from all tables
    await prisma.user.deleteMany();
    await prisma.account.deleteMany();
    await prisma.conversation.deleteMany();
    await prisma.message.deleteMany();

    // Create users
    const users = [
      {
        name: 'John',
        email: 'john@gmail.com',
        image: 'https://res.cloudinary.com/dqunjerlj/image/upload/v1691482972/pexels-photo-220453_hv5shk.webp',
      },
      {
        name: 'Jane',
        email: 'jane@gmail.com',
        image: 'https://res.cloudinary.com/dqunjerlj/image/upload/v1691482972/photo-1438761681033-6461ffad8d80_twh6mn.jpg',
      },
      {
        name: 'Lydia',
        email: 'lydia@gmail.com',
        image: 'https://res.cloudinary.com/dqunjerlj/image/upload/v1691482972/pexels-photo-415829_qaivyk.webp',
      },
    ];

    for (const user of users) {
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          image: user.image,
        },
      });
    }

    // Disconnect Prisma Client
    await prisma.$disconnect();

    res.status(200).json({ message: 'Database reset successful' });
  }
