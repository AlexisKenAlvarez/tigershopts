import { NextApiRequest, NextApiResponse } from 'next';
const cloudinary = require( '../../../utils/cloudinary')

import clientPromise from "../../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const image = req.body.image

    try {
        const client = await clientPromise;
        const db = client.db("?retryWrites=true&w=majority");

        const post = db.collection("Products").updateOne(
            {org: "csso"},
            {$pull: {products: {image: image } } }
        )

        await cloudinary.uploader.destroy(req.body.public_id)

        

        res.status(200).json({message: "success"});

    } catch (e) {
        console.error(e);
        res.status(400).json({message: e});
    }


}