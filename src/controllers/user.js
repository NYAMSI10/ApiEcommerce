const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userController = {

    all: async (req, res) => {
        try {

            const user = await prisma.user.findMany({
                orderBy: {
                    createdAt: 'asc'
                },

            })
            return res.json({success: true, user})

        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }


    },

    findById: async (req, res) => {
        try {
            const userId = +req.params.id

            const user = await prisma.user.findFirst({

                where: {
                    id: userId
                },

                include: {
                    _count: {
                        select: {
                            produits: true
                        }
                    }
                }

            })
            return res.json({success: true, user})

        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }


    },
    create: async (req, res) => {

        try {
            const {name, email, phone, password, isAdmin} = req.body
            const userexist = await prisma.user.findFirst({where: {email}})
            if (userexist) return res.json({success: false, message: `Email ${email} already exist`})

            const user = await prisma.user.create({data: {name, email, phone, password, isAdmin}})
            return res.json({success: true, message: `User add`, user})
        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }
    },

    update: async (req, res) => {

        try {
            const {name, email, phone, password, isAdmin} = req.body
            const userId = +req.params.id

            const user = await prisma.user.update(
                {
                    where: {
                        id: userId
                    },
                    data: {
                        name,
                        email,
                        phone,
                        password: bcrypt.hashSync(password, 10),
                        isAdmin
                    },

                })

            return res.json({success: true, message: `User update`, user})
        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }
    },
    delete: async (req, res) => {

        try {

            const userId = +req.params.id

            const user = await prisma.user.delete({
                where: {
                    id: userId
                },
            })
            return res.json({success: true, message: `User delete`})
        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }

    },

    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const secret = "bb"
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                },
            })

            if (!user) return res.json({success: true, message: `The user not found`})

            if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign(
                    {
                        userId: user.id
                    },
                    secret,
                    {expiresIn: "1d"}
                )

                return res.json({user: user.email, token: token})

            } else {
                return res.json({success: true, message: `password not correct`})

            }


        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }


    },
    register: async (req, res) => {
        try {

            const user = await prisma.user.findMany({
                orderBy: {
                    createdAt: 'asc'
                },

            })
            return res.json({success: true, user})

        } catch (error) {
            return res.status(500).json({success: false, message: error?.message})

        }


    },


}


module.exports = userController
