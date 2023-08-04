const UserService = require('../service/UserService');
const { decodeBase64Image } = require('../utils/base64Utility');
const { uploadToS3, deleteObject } = require('../service/helpers/ObjectStorageService');
const { encodePassword, comparePassword } = require('../service/helpers/EncryptionService');
const { v4: uuidv4 } = require('uuid');

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
        await UserService.createUser(data);
        res.status(201);
        res.send("User Created Succesfully!");
    }catch(error){
        await deleteObject(process.env.S3_BUCKET,uuid);
        console.log("Error:",error);
        res.status(500);
        res.send(error.message);
    }
}

const login = async (req,res)=>{
    try{
        const  userResult = await UserService.getUser(req.body.username);
        const user = userResult?.[0];
        const isMatch = await comparePassword(req.body.password, user.password);
        if(!isMatch){
            throw  new Error("Invalid password!");
        }
        const result = {
            _id: user.id,
            username: user.username,
            thumbnailUrl: user.thumbnailUrl
        };
        res.status(200);
        res.send(result);
    }catch(error){
        console.log("Error:",error);
        res.status(500);
        res.send(error.message);
    }
}

module.exports = {
    signup,
    login
}
