import { NextApiRequest, NextApiResponse } from 'next';

import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async (req: NextApiRequest, res: NextApiResponse) => {

    var json = [
        {
            id: req.body.id,
            image: req.body.image,
            name: req.body.name,
            desc: req.body.desc,
            stock: req.body.stock
        },

    ] as Prisma.JsonArray

    try {
        // Check if this organization already exist
        const exist = await prisma.products.findMany({
            where: {
                org: req.body.org
            }
        })



        if (exist.length > 0) {
            const arr = exist[0].products as Prisma.JsonArray

            var json = [
                {
                    id: req.body.id,
                    image: req.body.image,
                    name: req.body.name,
                    desc: req.body.desc,
                    stock: req.body.stock
                },
                ...arr,

            ] as Prisma.JsonArray

            const append = await prisma.products.updateMany({
                where: {
                    org: req.body.org
                },
                data: {
                    products: [
                        ...json
                    ]
                }
            })

            res.status(200).json({ message: "Success" })

        } else {

            // Create new if it doesnt exist
            const addProd = await prisma.products.create({
                data: {
                    org: req.body.org,
                    products: json
                }
            })

            res.status(200).json({ message: "Success" })
        }

        console.log("success");
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "There was an error" })

    }

}


