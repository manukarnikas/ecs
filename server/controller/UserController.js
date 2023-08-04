const UserService = require('../service/UserService');
const { uploadToS3, deleteObject } = require('../helpers/ObjectStorageService');
const { encodePassword } = require('../helpers/EncryptionService');
const { v4: uuidv4 } = require('uuid');

function decodeBase64Image(base64String) {
    const base64Image = base64String.replace(/^data:image\/(png|jpeg);base64,/, '');
    return Buffer.from(base64Image, 'base64');
}
  
const signup = async (req,res)=>{
    const uuid = uuidv4();  
    try{
        const content = decodeBase64Image(req.body.thumbnailData);
        const type = req.body.type;
        await uploadToS3(process.env.S3_BUCKET,uuid,content,type);
        const encryptedPassword = await encodePassword(req.body.password);
        const data = {
            _id: uuid,
            username: req.body.username,
            password: encryptedPassword,
            thumbnailUrl: `https://${process.env.S3_BUCKET}.s3.${process.env.REGION}.amazonaws.com/${uuid}/thumbnail.${type}`
        }
        await UserService.signup(data);
        res.status(201);
        res.send("User Created Succesfully!");
    }catch(error){
        await deleteObject(process.env.S3_BUCKET,uuid);
        console.log("Error:",error);
        res.status(500);
        res.send(error.message);
    }
}

module.exports = {
    signup
}
