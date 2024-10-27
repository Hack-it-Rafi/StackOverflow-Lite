import * as Minio from 'minio';

// Initialize MinIO client
const minioClient = new Minio.Client({
  endPoint: '127.0.0.1',
  port: 9000,
  useSSL: false, // Set to true if using HTTPS
  accessKey: process.env.MinIO_ACCESS_KEY,
  secretKey: process.env.MinIO_SECRET_KEY,
});

// Upload function
export const uploadToMinIO = async (bucketName, file) => {
  const bucketExists = await minioClient.bucketExists(bucketName);
  if (!bucketExists) {
    await minioClient.makeBucket(bucketName, 'us-east-1'); // Change 'us-east-1' if needed
  }

  return new Promise((resolve, reject) => {
    minioClient.putObject(
      bucketName,
      file.originalname,      // Use the original name of the file
      file.buffer,             // Pass the file buffer directly
      file.size,               // File size
      (err, objInfo) => {
        if (err) {
          reject(err); // Reject the promise on error
        } else {
          resolve(objInfo); // Resolve with MinIO object info
        }
      }
    );
  });
};
