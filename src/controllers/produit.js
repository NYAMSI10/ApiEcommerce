const {PrismaClient} = require('@prisma/client')
const {log} = require("prisma/prisma-client/generator-build");
const prisma = new PrismaClient()
const upload = require('../../helpers/multiConfig')
const fs = require('fs')

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
            upload.array('images',5)(req, res, async function (err) {

                const {name, description, prix, nbrestock, userId, categorieId, like} = req.body

                const produitexist = await prisma.produit.findFirst({where: {name}})
                if (produitexist) return res.json({success: false, message: `Produit ${name} already exist`})

                const files = req.files;
                let imagesPaths = [];
                const basePath = "public/uploads/";


                if(files) {
                    files.map(file =>{
                        imagesPaths.push({
                            name : `${basePath}${file.filename}`});
                    })
                }



                const produit = await prisma.produit.create({
                    data: {
                        name,
                        description,
                        prix,
                        nbrestock,
                        like,
                        images: {
                            createMany:  {
                                data: imagesPaths
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
                    include: {
                        images: true
                    }

                })
                return res.json({success: true, message: 'Produit add', produit})
            });
        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }

    },

    update: async (req, res) => {

        try {

            upload.array('images',5)(req, res, async function (err) {

                const {name, description, prix, nbrestock, userId, categorieId, like} = req.body

                const prodId = +req.params.id;

                const files = req.files;
                let imagesPaths = [];
                const basePath = "http://localhost:5000/public/upload/";


                if(files) {
                    files.map(file =>{
                        imagesPaths.push({
                            name : `${basePath}${file.filename}`});
                    })
                }



                const produit = await prisma.produit.update({

                    where: {

                        id: prodId
                    },
                    data: {
                        name,
                        description,
                        prix,
                        nbrestock,
                        like,
                        images: {
                            createMany:  {
                                data: imagesPaths
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
                    include: {
                        images: true
                    }

                })
                return res.json({success: true, message: 'Produit update', produit})
            });        } catch (error) {
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
                        },

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

    deleteimage: async (req, res)=>{

        try
        {
              const imgId = +req.params.id
              const image = await prisma.image.findFirst({ where: {id:imgId} })

            if (!image) return res.json({ sucess: false, message: 'Image non trouvée' })

            // Supprimer l'image du répertoire
              fs.unlinkSync('public/uploads/9(imp).jpeg-1697541352170.jpeg');

            // Supprimer l'enregistrement de l'image de la base de données
         await prisma.image.delete({
                where: { id:imgId },
            });
            return res.json({ sucess: true, message: 'Image delete' })

        }catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }




    }

}


module.exports = produitController
