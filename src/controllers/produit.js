const {PrismaClient} = require('@prisma/client')
const {log} = require("prisma/prisma-client/generator-build");
const prisma = new PrismaClient()
const upload = require('../../helpers/multiConfig')


const produitController = {

    all: async (req, res) => {

        try {

            const produit = await prisma.produit.findMany({


                orderBy: {
                    createdAt: 'asc'
                },
                include: {
                    images: {
                        select: {
                            name: true
                        }
                    }
                }
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

                images: {
                    select: {
                        name: true
                    }
                }
            })
            return res.json({success: true, message: `Produit find`, produit})
        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }

    },
    create: async (req, res) => {

        try {
            upload.single('images')(req, res, async function (err) {

                const {name, description, prix, nbrestock, userId, categorieId, like} = req.body

                const file = req.file;
                if (!file) return res.status(400).send('No image in the request')

                const fileName = file.filename
                const basePath = "http://localhost:5000/public/upload/";

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
                                    name: `${basePath}${fileName}`
                                }
                            }

                        },
                        user: {
                            connect: {
                                id: parseInt(userId)
                            }
                        },
                        categorie: {
                            connect: {
                                id: parseInt(categorieId)
                            }
                        }
                    },


                })
                return res.json({success: true, message: 'Produit add', produit})
            });
        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }

    },

    update: async (req, res) => {

        try {
            upload.single('images')(req, res, async function (err) {

                const {name, description, prix, nbrestock, userId, categorieId, like} = req.body

                const file = req.file;
                if (!file) return res.status(400).send('No image in the request')
                const prodId = +req.params.id
                const fileName = file.filename
                const basePath = "http://localhost:5000/public/upload/";


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
                                        id: parseInt(userId)
                                    }
                                },
                                categorie: {
                                    connect: {
                                        id: parseInt(categorieId)
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
                                name: `${basePath}${fileName}`
                            }
                        }
                    )


                ])


                return res.json({success: true, message: `Produit update`})

            });
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
