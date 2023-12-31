import express from "express";
import { UserReg ,UserLogin,GenerateLink,UploadFile,GetFile,sendEmail,test} from "../controller/UserController";
import { userAuth } from "../middleware/auth";
import multer from "multer";
import path from "path";
import { Request,Response } from "express";
const router=express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/upload'));                              // if check local then local path
    },
    filename: (req, file, cb) => {
        return cb(null, Date.now() + '_' + file.originalname);    
    }
});
const upload=multer({storage:storage});
// console.log(upload);

router.post('/register',UserReg);
router.post('/login',UserLogin);
router.post("/generatelink",userAuth,GenerateLink);
router.post("/upload/:id",upload.single("file"),UploadFile);
router.get("/getfile",GetFile);
router.get("/sendemail/:id",userAuth,sendEmail);
router.get("/test",test);

export default router;