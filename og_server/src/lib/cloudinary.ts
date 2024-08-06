import { v2 as cloudinary } from 'cloudinary';
import { CLOUDNERY_API_KEY, CLOUDNERY_API_SECRET, CLOUDNERY_CLOUD_NAME } from '../config';
import multer from 'multer';


 cloudinary.config({
    cloud_name: CLOUDNERY_CLOUD_NAME,
    api_key: CLOUDNERY_API_KEY,
    api_secret: CLOUDNERY_API_SECRET
  });
  

  const storage = multer.memoryStorage();
  
  export const upload = multer({ storage });