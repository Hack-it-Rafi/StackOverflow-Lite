// import * as Minio from 'minio'
// import * as Fs from 'fs'
// // Initialize MinIO client
// const minioClient = new Minio.Client({
//   endPoint: 'http://127.0.0.1:9001/',
//   port: 9001, 
//   useSSL: false, // Set to true if using HTTPS
//   accessKey: import.meta.env.MinIO_ACCESS_KEY,
//   secretKey: import.meta.env.MinIO_SECRET_KEY
// });

// // Upload function
// export const uploadToMinIO = async (bucketName, file) => {
//   return new Promise((resolve, reject) => {
//     const fileStream = Fs.createReadStream(file)
//     const fileStat = Fs.stat(file, function (err, stats) {
//       if (err) {
//         return console.log(err)
//       }
//       minioClient.putObject(bucketName, file.name, fileStream, stats.size, function (err, objInfo) {
//         if (err) {
//           return console.log(err) // err should be null
//         }
//         console.log('Success', objInfo)
//       })
//     })
//   });
// };
