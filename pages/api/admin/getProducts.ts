import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "../../../lib/mongodb";


export default async (req:NextApiRequest, res:NextApiResponse) => {

    const { org } = req.body
    try {
        const client = await clientPromise;
        const db = client.db("?retryWrites=true&w=majority");

        const products = await db.collection("Products").findOne({org: org}, {})
        res.status(200).json({message: "success", data: products})
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "There was an error"})
        
    }


}