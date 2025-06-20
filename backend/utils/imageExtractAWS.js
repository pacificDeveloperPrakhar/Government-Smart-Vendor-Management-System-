const {S3Client,GetObjectCommand,PutObjectCommand,ListObjectsV2Command}=require("@aws-sdk/client-s3")
const {getSignedUrl}=require("@aws-sdk/s3-request-presigner")
const appErrors=require("./appErrors")
const catchAsync=require("./catchAsync")
const multer=require("multer")
const multerS3=require("multer-s3")
const path = require('path');
const client=new S3Client({
    region:"ap-south-1",
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    }
})
function getContentType(fileExtension) {
    switch (fileExtension) {
        case ".jpg":
        case ".jpeg":
            return "image/jpeg";
        case ".png":
            return "image/png";
        case ".svg":
            return "image/svg+xml";
        case ".gif":
            return "image/gif";
        case ".webp":
            return "image/webp";
        case ".pdf":
            return "application/pdf";
        default:
            return "application/octet-stream";  // Default if file type is unknown
    }
}
const getObjectUrl=async function getObjectUrl( key) {
    const command = new GetObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: key });
    const url=await getSignedUrl(client, command, { expiresIn: 7 * 24 * 60 * 60  })
    return url
}
const putObjectCommand=async function putObjectCommand({filepath,filename,content_type}){
    const command=new PutObjectCommand({Bucket:process.env.AWS_BUCKET_NAME,Key:`${filepath}/${filename}`,ContentType:content_type})
    const url =getSignedUrl(client,command,{expiresIn:7*24*60*60});
    return url

}
exports.imageExtractAWS=catchAsync(async function imageExtractAWS(req,res,next){
    const key=req.url.split("/").filter((route)=>route!=="storage").join("/")
    console.log(key)
    if(!key) return next(new appErrors("Key is required",400))
        const url=await getObjectUrl(key)
    res.status(200).redirect(url)
})
exports.uploadImageAWS=catchAsync(async function uploadImageAWS(req,res,next){
   const {filepath,filename,content_type}=req.body;
   console.log(req.body)
    if(!filepath || !filename || !content_type) return next(new appErrors("All fields are required",400))
    const url=await putObjectCommand({filepath,filename,content_type})
    res.status(200).send(url);
})

exports.uploadAWS_SERVER=multer({
    storage:multerS3({
        s3:client,
        contentType:(req, file, cb) => {
            const extension = path.extname(file.originalname).toLowerCase();
            const contentType = getContentType(extension);
            console.log(contentType)
        cb(null,contentType);},
        bucket:process.env.AWS_BUCKET_NAME,
        key:(req,file,cb)=>{
            console.log("i am here")
            console.log(file.originalname)
            const extension = path.extname(file.originalname);
            req.url=req.url.split("/").filter((route)=>route!=="storage").join("/");
            const key = req.url + "/" + Math.random().toString(36).substring(7) +Date.now()+ extension;
             // Initialize req.access_url as an object to store multiple fields
             if (!req.access_url) req.access_url = {};
             if (!req.access_url[file.fieldname]) req.access_url[file.fieldname] = [];
             req.access_url[file.fieldname].push(`/storage${key}`);
            return cb(null,key)
        }
    })
})

exports.getObjectUrl=getObjectUrl