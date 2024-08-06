"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const canvas_1 = require("canvas");
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
cloudinary_1.v2.config({
    cloud_name: 'dajjk6jl1',
    api_key: '419941971342633',
    api_secret: '2qo51Bszn9s9o1hSN5FdAqA2fEw'
});
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
app.post('/upload', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    try {
        const result = yield new Promise((resolve, reject) => {
            var _a;
            const stream = cloudinary_1.v2.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error)
                    reject(error);
                resolve(result);
            });
            stream.end((_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer);
        });
        res.status(200).json({ url: result === null || result === void 0 ? void 0 : result.secure_url });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
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
app.post('/generate-og-image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, imageUrl } = req.body;
    try {
        const canvas = (0, canvas_1.createCanvas)(1200, 630);
        const ctx = canvas.getContext('2d');
        // Draw background
        if (imageUrl) {
            // Draw background image if provided
            const image = yield (0, canvas_1.loadImage)(imageUrl);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
        else {
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
        const result = yield cloudinary_1.v2.uploader.upload(dataUrl, { resource_type: 'image' });
        res.status(200).json({ url: result.secure_url });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
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
