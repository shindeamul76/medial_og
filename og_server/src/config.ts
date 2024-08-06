import dotenv from 'dotenv';
dotenv.config();

export const CLOUDNERY_CLOUD_NAME = process.env.CLOUDNERY_CLOUD_NAME || ''

export const CLOUDNERY_API_KEY = process.env.CLOUDNERY_API_KEY || ''
export const CLOUDNERY_API_SECRET = process.env.CLOUDNERY_API_SECRET || ''
export const PORT =  process.env.PORT || 5000