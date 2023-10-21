const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
const faker = require('faker');


async  function main()
{
 for (let i=0; i<5 ; i++){
     await prisma.categorie.create({

         data:{

             name: faker.name.findName()
         }
     });

 }


}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
