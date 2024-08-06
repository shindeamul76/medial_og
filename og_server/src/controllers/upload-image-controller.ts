

import { ApiResponse } from "@medial/utils/handlers/api-response-handler";
import { asyncHandler } from "@medial/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@medial/utils/handlers/api-error-handler";
// import { cloudinaryClient } from "@medial/lib/cloudinary";

import { v2 as cloudinary } from 'cloudinary';
import { CLOUDNERY_API_KEY, CLOUDNERY_API_SECRET, CLOUDNERY_CLOUD_NAME } from '../config';


 cloudinary.config({
    cloud_name: CLOUDNERY_CLOUD_NAME,
    api_key: CLOUDNERY_API_KEY,
    api_secret: CLOUDNERY_API_SECRET
  });

export const uploadImage = asyncHandler(async (req: Request, res: Response) => {

    const file = req.file

    if (!file) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Please upload file");
    }


    const result = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error:any, result: any) => {
          if (error) reject(error);
          resolve(result as any);
        });
        stream.end(req.file?.buffer);
      });

  

    return res.status(StatusCodes.OK).json(
        new ApiResponse(
            StatusCodes.OK,
            { url: result?.secure_url },
            "upload success"
        )
    );
});
