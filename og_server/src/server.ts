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


// app.post('/generate-og-image', async (req, res) => {
//   const { title, content, imageUrl } = req.body;
//   try {
//     const canvas = createCanvas(1200, 630);
//     const ctx = canvas.getContext('2d');

//     // Draw background
//     ctx.fillStyle = '#ffffff';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Draw image
//     if (imageUrl) {
//       const image = await loadImage(imageUrl);
//       ctx.drawImage(image, 0, 0, 1200, 630);
//     }

//     // Draw branding
//     const logo = await loadImage(imageUrl); 
//     ctx.drawImage(logo, 50, 50, 100, 100);

//     // Draw title
//     ctx.fillStyle = '#000000';
//     ctx.font = 'bold 40px Arial';
//     ctx.fillText(title, 50, 200);

//     // Draw content snippet
//     ctx.font = '30px Arial';
//     ctx.fillText(content.slice(0, 100) + '...', 50, 300);

//     // Convert to data URL and upload to Cloudinary
//     const dataUrl = canvas.toDataURL('image/png');
//     const result = await cloudinary.uploader.upload(dataUrl, { resource_type: 'image' });
//     console.log(result.secure_url, "result")
//     res.status(200).json({ url: result.secure_url });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

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
      // Draw a default background if no image is provided
      ctx.fillStyle = '#f0f0f0'; // Use a color close to the design of the post
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draw title
    ctx.fillStyle = '#333333'; // Example color; use the same as in the original post
    ctx.font = 'bold 40px Arial'; // Use the font style similar to the post
    ctx.textAlign = 'center';
    ctx.fillText(title || 'Default Title', canvas.width / 2, 100); // Position as in the post

    // Draw content snippet
    ctx.font = '30px Arial'; // Match font style of the post
    ctx.fillText(content ? (content.slice(0, 100) + '...') : 'Default content snippet', canvas.width / 2, 200); // Position as in the post

    // Draw any additional elements (e.g., branding or logo) if necessary
    // const logo = await loadImage('path_to_logo'); 
    // ctx.drawImage(logo, 50, 50, 100, 100);

    // Convert to data URL and upload to Cloudinary
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







// import express, { Request, Response } from 'express';


// import puppeteer from 'puppeteer';
// import cors from 'cors';
// import path from 'path';

// const app = express();
// const port = 5000;

// // Middleware
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use(cors());

// // Serve static files (for example, images)
// app.use(express.static(path.join(__dirname, 'public')));

// // Route to generate OG image
// app.post('/api/generate-og-image', async (req: Request, res: Response) => {
//   const { title, content } = req.body;

//   if (!title || !content) {
//     return res.status(400).json({ error: 'Title and content are required' });
//   }

//   // Create browser instance
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Generate HTML
//   const html = `
//     <html>
//     <head>

//       <style>
//         body { width: 1200px; height: 630px; font-family: Arial, sans-serif; color: #333; }
//         .container { padding: 20px; }
//         h1 { font-size: 48px; margin-bottom: 10px; }
//         p { font-size: 24px; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <h1>${title}</h1>
//         <p>${content.substring(0, 200)}...</p>
//       </div>
//     </body>
//     </html>
//   `;

//   // Load HTML in browser
//   await page.setContent(html);
//   const imageBuffer = await page.screenshot({ type: 'jpeg', fullPage: true });
//   await browser.close();

//   // Save the image
//   const imageUrl = `/public/og-images/${Date.now()}.jpg`;
//   const fs = require('fs');
//   fs.writeFileSync(path.join(__dirname, 'public', 'og-images', `${Date.now()}.jpg`), imageBuffer);

//   res.json({ imageUrl: imageUrl });
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
