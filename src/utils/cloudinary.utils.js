import { v2 as cloudinary } from "cloudinary";

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME,
} from "./env.js";

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const uploadFile = async (files) => {
  //here files are an array of images
  const takePromises = files.map(async (file) => {
    return await uploader(file); // uploader should return a promise
  });

  return await Promise.all(takePromises);
};

//uploader here its return works on a buffer
const uploader = async (buffer) => {
  if (!buffer) {
    return Promise.reject(new Error("Buffer is required for upload"));
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "bizsphere/services",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );
    stream.end(buffer);
  });
};
