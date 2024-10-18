const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");

dotenv.config({path:"./config.env"})

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY ,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

const uploadImg = async(folder,file)=>{

    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Body: file.buffer,
        Key: `the-coffee-house/${folder}/${Date.now()}_${file.originalname}`,
    };

    const cmd = new PutObjectCommand(params)
    await s3Client.send(cmd) 

    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`
}
module.exports = {uploadImg}