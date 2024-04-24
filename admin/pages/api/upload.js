import multiparty from 'multiparty';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
const bucketName = 'ecommerceg5';

export default async function handle(req, res) {
  try {
    await mongooseConnect();
    await isAdminRequest(req, res);

    const form = new multiparty.Form({maxFilesSize: 10 * 1024 * 1024});  // Limit file size to 10MB
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    if (!files.file) {
      throw new Error('No files uploaded');
    }

    const client = new S3Client({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });

    const links = [];
    for (const file of files.file) {
      const contentType = mime.lookup(file.path) || 'application/octet-stream';
      const ext = file.originalFilename.split('.').pop();
      const newFilename = `images/${Date.now()}-${Math.random().toString(16).substring(2)}.${ext}`;

      await client.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        Body: fs.readFileSync(file.path),
        ACL: 'public-read',
        ContentType: contentType,
      }));
      const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
      links.push(link);
    }

    return res.json({ links });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Failed to upload files', details: error.message });
  }
}

export const config = {
  api: { bodyParser: false },
};
