

import { upload } from '@medial/lib/cloudinary';
import { ogImageGenerator } from '@medial/controllers/og-image-generator-controller';
import { uploadImage } from '@medial/controllers/upload-image-controller';
import express from 'express'

export const router = express.Router();


router.route('/upload').post( upload.single('image'),  uploadImage );

router.route('/generate-og-image').post( ogImageGenerator );

