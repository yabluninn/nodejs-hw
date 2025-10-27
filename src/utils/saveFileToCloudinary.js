import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'node:stream';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const saveFileToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { folder: 'avatars', resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    Readable.from(buffer).pipe(upload);
  });
