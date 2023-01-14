import { NextApiRequest, NextApiResponse } from 'next';
const cloudinary = require( '../../../utils/cloudinary')
import formidable from 'formidable'

export const config = {
    api: {
      bodyParser: false
    }
  }

export default async (req:NextApiRequest, res:NextApiResponse) => {

    
    try {
        const form = formidable({multiples: true});
        form.parse(req, async (err: any, fields: any, files: any) => {

            console.log(fields)

            const data = await cloudinary.uploader.unsigned_upload(files.file.filepath, fields.upload_preset, {folder: fields.org});
            res.status(200).json(data);
        });


    } catch (error) {
        console.log(error)
        res.status(400).json("There was an error")
    }


}