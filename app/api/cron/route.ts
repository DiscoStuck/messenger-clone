
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();
  const createdUsers = [];
  try {
    // Delete all data from all tables
    const deletedUsers = await prisma.user.deleteMany();
    const deletedAccounts = await prisma.account.deleteMany();
    const deletedConversations = await prisma.conversation.deleteMany();
    const deletedMessages = await prisma.message.deleteMany();

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
      const createdUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          image: user.image,
        },
      });
      createdUsers.push(createdUser);
    }
    await prisma.$disconnect();
  
    return NextResponse.json({
      message: 'Database reset successful',
      dataDeleted: {
        users: deletedUsers.count,
        accounts: deletedAccounts.count,
        conversations: deletedConversations.count,
        messages: deletedMessages.count
      },
      dataSaved: createdUsers
    }, { status: 200 });

  }  catch (error) {
        console.error(error);
        return NextResponse.json( { message: 'Database reset failed' }, { status: 500 } );
    }
}