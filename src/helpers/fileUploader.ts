import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Single and Multiple file upload handlers
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
 * Upload file to Cloudinary using buffer stream.
 * NOTE: upload_stream cannot auto-detect filename from a buffer,
 * so we explicitly set a unique public_id using the original filename + timestamp.
 */
const uploadToCloudinary = async (
  file: Express.Multer.File
): Promise<{ Location: string; public_id: string }> => {
  if (!file) {
    throw new Error("File is required for uploading.");
  }

  // Build a unique public_id: sanitized original name + timestamp
  const originalName = file.originalname
    .replace(/\.[^/.]+$/, "")          // remove extension
    .replace(/[^a-zA-Z0-9_-]/g, "_")  // replace special chars with _
    .substring(0, 60);                  // limit length

  const uniquePublicId = `${originalName}_${Date.now()}`;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "swiftLearn",
        resource_type: "auto",
        public_id: uniquePublicId,       // explicit unique name per upload
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
