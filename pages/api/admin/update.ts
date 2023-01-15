import { NextApiRequest, NextApiResponse } from 'next';
const cloudinary = require('../../../utils/cloudinary')

import clientPromise from "../../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const org = req.body.org
    const oldId = req.body.oldId

    // Product new values
    const { name, desc, stock, newId, newImage, imageChanged, price } = req.body

    try {
        await cloudinary.uploader.destroy(oldId)

        const client = await clientPromise;
        const db = client.db("?retryWrites=true&w=majority");

        if (imageChanged) {
            db.collection("Products").updateOne({
                org: org,
                "products.id": oldId
            }, {
                $set: {
                    "products.$.name": name,
                    "products.$.desc": desc,
                    "products.$.stock": stock,
                    "products.$.id": newId,
                    "products.$.image": newImage,
                    "products.$.price": price
                }
            })
        } else {
            db.collection("Products").updateOne({
                org: org,
                "products.id": oldId
            }, {
                $set: {
                    "products.$.name": name,
                    "products.$.desc": desc,
                    "products.$.stock": stock,
                    "products.$.price": price

                }
            })
            console.log(price);
        }

        res.status(200).json({ message: "success" });

    } catch (e) {
        console.error(e);
        res.status(400).json({ message: e });
    }


}