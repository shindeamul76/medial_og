import "module-alias/register";
import express from 'express';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { createCanvas, loadImage } from 'canvas';
import { CLOUDNERY_API_KEY, CLOUDNERY_API_SECRET, CLOUDNERY_CLOUD_NAME } from './config';
 

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: CLOUDNERY_CLOUD_NAME,
  api_key: CLOUDNERY_API_KEY,
  api_secret: CLOUDNERY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) reject(error);
        resolve(result as any);
      });
      stream.end(req.file?.buffer);
    });

    res.status(200).json({ url: result?.secure_url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});



app.post('/generate-og-image', async (req, res) => {
  const { title, content, imageUrl } = req.body;
  try {
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');

    // Draw background
    if (imageUrl) {
      // Draw background image if provided
      const image = await loadImage(imageUrl);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    } else {
     
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.fillStyle = '#333333'; 
    ctx.font = 'bold 40px Arial'; 
    ctx.textAlign = 'center';
    ctx.fillText(title || 'Default Title', canvas.width / 2, 100); 

    
    ctx.font = '30px Arial'; 
    ctx.fillText(content ? (content.slice(0, 100) + '...') : 'Default content snippet', canvas.width / 2, 200); // Position as in the post


    const dataUrl = canvas.toDataURL('image/png');
    const result = await cloudinary.uploader.upload(dataUrl, { resource_type: 'image' });

    res.status(200).json({ url: result.secure_url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


