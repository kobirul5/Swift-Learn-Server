import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config();

/**
 * Cloudinary configuration
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Multer configuration
 * Using memoryStorage so file buffer can be uploaded to Cloudinary
 */
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * Multer helpers
 */
const uploadSingle = upload.single("profileImage");
const uploadFile = upload.single("file");

const uploadMultipleImage = upload.fields([
  { name: "images", maxCount: 15 },
]);

const updateProfile = upload.fields([
  { name: "profile", maxCount: 1 },
  { name: "banner", maxCount: 1 },
]);

/**
 * Upload file to Cloudinary using buffer stream
 */
const uploadToCloudinary = async (
  file: Express.Multer.File
): Promise<{ Location: string; public_id: string }> => {
  if (!file) {
    throw new Error("File is required for uploading.");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "uploads",
        resource_type: "auto",
        use_filename: true,
        unique_filename: false,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve({
          Location: result?.secure_url || "",
          public_id: result?.public_id || "",
        });
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};

/**
 * Exported uploader utilities
 */
export const fileUploader = {
  upload,
  uploadSingle,
  uploadMultipleImage,
  updateProfile,
  uploadFile,
  uploadToCloudinary,
};
