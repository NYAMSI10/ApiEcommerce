const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


const categorieController = {

    all: async (req, res) => {

    try {

          const categorie = await prisma.categorie.findMany({

              take:4, // pagination à 4 categorie

              include:{
                  _count:{
                      select:{
                          produits:true,
                      }
                  },

              },
              orderBy:{
                  createdAt: 'asc'
              },

          })
        const lastPostInResults = categorie[3] // Remember: zero-based index! :)
        const myCursor = lastPostInResults.id
        return res.json({success:true,  categorie})
    } catch (error) {
        return res.status(500).json({success: false, message: error?.message})

    }

},
    findById: async (req, res) => {

        try {
            const cateId = +req.params.id
            const categorie = await prisma.categorie.findFirst({where: {id:cateId}})
            return res.json({success:true, message:`Categorie find`, categorie})
        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }

    },
    create: async (req, res) => {

        try {
            const {name} = req.body

            const categorieexist = await prisma.categorie.findFirst({where: {name}})
            if(categorieexist) return res.json({success:false, message:`Categorie ${name} already exist`})
            const categorie = await prisma.categorie.create({data:{name}})
            return res.json({success:true, message:`Categorie add`, categorie})
        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }

    },

    update: async (req, res) => {

        try {
            const {name} = req.body
            const categId = +req.params.id
            const categorieexist = await prisma.categorie.findFirst({where: {name}})
            if(categorieexist) return res.json({success:false, message:`Categorie ${name} already exist`})
            const categorie = await prisma.categorie.update({
                where:{
                    id:categId
                },
                data:{
                    name
                }
            })
            return res.json({success:true, message:`Categorie update`, categorie})
        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }

    },
    delete: async (req, res) => {

        try {
            const categId = +req.params.id

            const categorie = await prisma.categorie.delete({
                where:{
                    id:categId
                },
            })
            return res.json({success:true, message:`Categorie delete`})
        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }

    },

}


module.exports = categorieController
