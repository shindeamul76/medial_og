


import { ApiResponse } from "@medial/utils/handlers/api-response-handler";
import { asyncHandler } from "@medial/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@medial/utils/handlers/api-error-handler";
import { createCanvas, loadImage } from 'canvas';
// import { cloudinaryClient } from "@medial/lib/cloudinary";

import { v2 as cloudinary } from 'cloudinary';
import { CLOUDNERY_API_KEY, CLOUDNERY_API_SECRET, CLOUDNERY_CLOUD_NAME } from '../config';
import multer from 'multer';


 cloudinary.config({
    cloud_name: CLOUDNERY_CLOUD_NAME,
    api_key: CLOUDNERY_API_KEY,
    api_secret: CLOUDNERY_API_SECRET
  });

export const ogImageGenerator = asyncHandler(async (req: Request, res: Response) => {

    const body = req.body


    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');

    if (body.imageUrl) {
      const image = await loadImage(body.imageUrl);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    
    ctx.fillStyle = '#333333'; 
    ctx.font = 'bold 40px Arial'; 
    ctx.textAlign = 'center';
    ctx.fillText(body.title || 'Default Title', canvas.width / 2, 100); 

    
    ctx.font = '30px Arial'; 
    ctx.fillText(body.content ? (body.content.slice(0, 100) + '...') : 'Default content snippet', canvas.width / 2, 200); // Position as in the post


    const dataUrl = canvas.toDataURL('image/png');
    const result = await cloudinary.uploader.upload(dataUrl, { resource_type: 'image' });

 
  

    return res.status(StatusCodes.OK).json(
        new ApiResponse(
            StatusCodes.OK,
            { url: result.secure_url },
            "upload success"
        )
    );
});
