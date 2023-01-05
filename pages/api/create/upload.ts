import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer'
import path from 'path';

import nextConnect from 'next-connect';
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


interface MulterRequest extends Request {
    file: any;
}

// The following should be exported from your API route file
export const config = {
    api: { bodyParser: false },
};

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(process.cwd(), "public", "uploads"));
        },
        filename: function (req, file, cb) {
            cb(null, new Date().getTime() + "-" + file.originalname);
        },
    }),
});

const apiRoute = nextConnect<MulterRequest, NextApiResponse>({
    // Handle any other HTTP method
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
}).use(upload.single('image')).post(async (req, res) => {

    const obj = JSON.parse(JSON.stringify(req.body))

    var json = [
        {
            image: (req as MulterRequest).file.filename,
            name: obj.name,
            desc: obj.desc,
            stock: obj.stock
        },

    ] as Prisma.JsonArray

    try {
        // Check if this organization already exist
        const exist = await prisma.products.findMany({
            where: {
                org: obj.org
            }
        })



        if (exist.length > 0) {
            const arr = exist[0].products as Prisma.JsonArray

            var json = [
                {
                    image: (req as MulterRequest).file.filename,
                    name: obj.name,
                    desc: obj.desc,
                    stock: obj.stock
                },
                ...arr,
        
            ] as Prisma.JsonArray

            const append = await prisma.products.updateMany({
                where: {
                    org: obj.org
                },
                data: {
                    products: [
                        ...json
                    ]
                }
            })

            res.status(200).json({ req: req.body, file: (req as MulterRequest).file })

        } else {

            // Create new if it doesnt exist
            const addProd = await prisma.products.create({
                data: {
                    org: obj.org,
                    products: json
                }
            })

            res.status(200).json({ req: req.body, file: (req as MulterRequest).file })

        }

        console.log("success");
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "There was an error" })

    }

});


export default apiRoute;

