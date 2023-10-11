const {PrismaClient} = require('@prisma/client')
const {log} = require("prisma/prisma-client/generator-build");
const prisma = new PrismaClient()


const produitController = {

    all: async (req, res) => {

        try {

            const produit = await prisma.produit.findMany({


                orderBy: {
                    createdAt: 'asc'
                },

            })

            return res.json({success: true, produit})
        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }

    },
    findById: async (req, res) => {

        try {
            const prodId = +req.params.id
            const produit = await prisma.produit.findFirst({
                where: {
                    id: prodId
                },

                include:{
                    images:true
                }
            })
            return res.json({success: true, message: `Produit find`, produit})
        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }

    },
    create: async (req, res) => {

        try {
            const {name, description, prix, nbrestock, userId, categorieId, like, image} = req.body
            const produitexist = await prisma.produit.findFirst({where: {name}})
            if (produitexist) return res.json({success: false, message: `Produit ${name} already exist`})

            const produit = await prisma.produit.create({
                data: {
                    name,
                    description,
                    prix,
                    nbrestock,
                    like,
                    images: {
                        createMany: {
                            data: {
                                name: image
                            }
                        }

                    },
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                    categorie: {
                        connect: {
                            id: categorieId
                        }
                    }
                },


            })
            return res.json({success: true, message: `Produit add`, produit})
        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }

    },

    update: async (req, res) => {

        try {
            const {name, description, prix, nbrestock, userId, categorieId, like, image} = req.body

            const prodId = +req.params.id

            const produit = await prisma.$transaction([

                prisma.produit.update(
                    {
                        where: {
                            id: prodId
                        },
                        data: {
                            name,
                            description,
                            prix,
                            nbrestock,
                            like,

                            user: {
                                connect: {
                                    id: userId
                                }
                            },
                            categorie: {
                                connect: {
                                    id: categorieId
                                }
                            }
                        },
                        include: {
                            images: true
                        }
                    }
                ),

                prisma.image.updateMany(
                    {
                        where: {
                            produitId: prodId
                        },
                        data: {
                            name: image
                        }
                    }
                )


            ])


            return res.json({success: true, message: `Produit update`})
        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }

    },
    delete: async (req, res) => {

        try {
            const prodId = +req.params.id
            await prisma.$transaction([

                prisma.produit.delete(
                    {
                        where: {
                            id: prodId
                        }
                    }
                ),

                prisma.image.deleteMany(
                    {
                        where: {
                            produitId: prodId
                        }
                    }
                )


            ])

            return res.json({success: true, message: `Produit delete`})
        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }

    },

}


module.exports = produitController
