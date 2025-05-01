import express from 'express';
import upload from '../services/multer.js';
import uploadFile from '../services/upload_file.js';
import VerifyToken from '../middleware/verifyToken.js';

const FilesManagment = express.Router();    

FilesManagment.post('/api/files/upload', VerifyToken , upload,async (req, res) => {
    for (const file of req.files) {
        const s3Key = `/${req.sessionData.id}/uploads/${Date.now()}_${file.originalname}`;
        await uploadFile(file.path, s3Key);
    }
    res.json({message: 'Images uploaded successfully'}); 
});


export default FilesManagment;
