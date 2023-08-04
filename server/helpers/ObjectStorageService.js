const AWS = require('aws-sdk');

const s3 = new AWS.S3();

async function createFolderAndUploadFile(bucketName, folderName, fileContent,fileType) {
  try {
    const params = {
      Bucket: bucketName,
      Key: `${folderName}/${"thumbnail"}.${fileType}`,
      Body: fileContent,
      ContentType: `image/${fileType}`
    };

    await s3.putObject(params).promise();
    console.log(`File  uploaded to folder "${folderName}" in bucket "${bucketName}"`);
  } catch (err) {
    console.error('Error uploading the file:', err);
    throw err;
  }
}

async function deleteFolderAndUploadedFile(bucketName, folderName) {
  try {
    const listObjectsParams = {
      Bucket: bucketName,
      Prefix: folderName,
    };
    const { Contents } = await s3.listObjects(listObjectsParams).promise();

    const deleteObjectsParams = {
      Bucket: bucketName,
      Delete: {
        Objects: Contents.map(item => ({ Key: item.Key })),
      },
    };

    console.log('deleteObjectsParams',deleteObjectsParams)

    await s3.deleteObjects(deleteObjectsParams).promise();

    console.log(`Folder deleted for ${folderName} successfully`);
  } catch (err) {
    console.error(`Error deleting the folder for ${folderName}:`, err);
  }
}

module.exports = {
    uploadToS3: createFolderAndUploadFile,
    deleteObject: deleteFolderAndUploadedFile
}
