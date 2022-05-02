import { format } from 'util';
import express from 'express';
import Multer from 'multer';
import { Storage } from '@google-cloud/storage';
const uploadRouter = express.Router();

// Instantiate a storage client
const storage = new Storage();

// This middleware is available in Express v4.16.0 onwards
uploadRouter.use(express.json());

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

// A bucket is a container for objects (files).
const bucket = storage.bucket('image_storage_product');

// Process the file upload and upload to Google Cloud Storage.
uploadRouter.post('/', multer.single('image'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(`${Date.now()}.jpg`);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (err) => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});

export default uploadRouter;
