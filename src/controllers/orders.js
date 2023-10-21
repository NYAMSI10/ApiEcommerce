const {PrismaClient} = require('@prisma/client')
const {log} = require("prisma/prisma-client/generator-build");
const prisma = new PrismaClient()
const upload = require('../../helpers/multiConfig')
const fs = require('fs')

const ordersController = {

    all: async (req, res) => {

        try {

            const order = await prisma.order.findMany({


                orderBy: {
                    createdAt: 'asc'
                },
                include: {
                    produits:true,
                    user: true
                }
            })

            return res.json({success: true, order})
        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }

    },

    create: async (req, res) => {

        try {


            const {userId, produitIds} = req.body

            const produits = await prisma.produit.findMany({
                where: {
                    id: {in: produitIds},
                },
            });

            // Calculez le prix total
            const total = produits.reduce((acc, produit) => {
                return acc + parseFloat(produit.prix);
            }, 0);

             const order = await prisma.order.create({
                   data: {
                       user:{
                           connect:{
                               id: parseInt(userId)
                           }
                       },
                       produits: {
                           connect: produitIds.map((id) => ({ id })),
                       },
                       total: total.toString(),
                   },
               });

            return res.json({success: true, message: 'Produit add'})

        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }

    },


}


module.exports = ordersController
