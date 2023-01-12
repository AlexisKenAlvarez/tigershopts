import { NextApiRequest, NextApiResponse } from 'next';
const cloudinary = require('../../../utils/cloudinary')

import clientPromise from "../../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const client = await clientPromise;
        const db = client.db("?retryWrites=true&w=majority");

        const { org, productName, fullname, contact, studentno, quantity, amount, facebook } = req.body

        db.collection("Orders").insertOne({
            org,
            productName,
            fullname,
            contact,
            studentno,
            quantity,
            amount,
            facebook,
            createdAt: new Date()
        })
        console.log("Order placed successfuly");
        res.status(200).json({ message: "Order placed successfuly" })

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "There was an error" })

    }



}