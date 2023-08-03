const AWS = require('aws-sdk');

const s3 = new AWS.S3();

async function createFolderAndUploadFile(bucketName, folderName, fileContent) {
  try {
    const params = {
      Bucket: bucketName,
      Key: `${folderName}/${"thumbnail-image"}`,
      Body: fileContent,
    };

    await s3.putObject(params).promise();
    console.log(`File  uploaded to folder "${folderName}" in bucket "${bucketName}"`);
  } catch (err) {
    console.error('Error uploading the file:', err);
    throw err;
  }
}

module.exports = {
    uploadToS3: createFolderAndUploadFile
}
