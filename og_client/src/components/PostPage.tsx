import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react'; 
import RedditPost from './RedditPost';
import { useToast } from './ui/use-toast';

const PostPage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [redTitle, setRedTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [redContent, setRedContent] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [ogImageUrl, setOgImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.post(`${BACKEND_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast({
        title: 'File uploaded successfully',
        description: 'Your image has been uploaded.',
        variant: 'default',
      });
      return response.data.data.url;
    } catch (error) {
      toast({
        title: 'File upload failed',
        description: 'An error occurred while uploading the file. Please try again.',
        variant: 'destructive',
      });
      throw new Error("File upload failed");
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      let imageUrl = '';
      if (image) {
        imageUrl = await handleImageUpload(image);
      }
      
      const ogImageUrl = await generateOgImage(title, content, imageUrl);
      setOgImageUrl(ogImageUrl);
      setTitle('');
      setContent('');
      setImage(null);
      toast({
        title: 'OG Image Generated',
        description: 'The Open Graph image has been generated successfully.',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Operation failed',
        description: 'An error occurred while generating the Open Graph image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false); 
    }
  };

  const generateOgImage = async (title: string, content: string, imageUrl: string): Promise<string> => {
    try {
      const response = await axios.post(`${BACKEND_URL}/generate-og-image`, { title, content, imageUrl });
      return response.data.data.url;
    } catch (error) {
      toast({
        title: 'OG Image Generation Failed',
        description: 'An error occurred while generating the Open Graph image.',
        variant: 'destructive',
      });
      throw new Error("OG image generation failed");
    }
  };

  useEffect(() => {
    const removeExistingMetaTags = () => {
      const metaTags = ['og:title', 'og:description', 'og:image'];
      metaTags.forEach((property) => {
        const existingMeta = document.querySelector(`meta[property="${property}"]`);
        if (existingMeta) {
          document.head.removeChild(existingMeta);
        }
      });
    };

    if (ogImageUrl || redTitle || redContent) {
      removeExistingMetaTags();

      if (ogImageUrl) {
        const metaImage = document.createElement('meta');
        metaImage.setAttribute('property', 'og:image');
        metaImage.setAttribute('content', ogImageUrl);
        document.head.appendChild(metaImage);
      }

      if (redTitle) {
        const metaTitle = document.createElement('meta');
        metaTitle.setAttribute('property', 'og:title');
        metaTitle.setAttribute('content', redTitle);
        document.head.appendChild(metaTitle);
      }

      if (redContent) {
        const metaDescription = document.createElement('meta');
        metaDescription.setAttribute('property', 'og:description');
        metaDescription.setAttribute('content', redContent);
        document.head.appendChild(metaDescription);
      }
    }
  }, [ogImageUrl, redTitle, redContent]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Input
        type="text"
        className="block w-full p-2 mb-4 border"
        placeholder="Title"
        value={title}
        onChange={(e) => {setTitle(e.target.value); setRedTitle(e.target.value)}}
      />
      <Textarea
        className="block w-full p-2 mb-4 border"
        placeholder="Content"
        value={content}
        onChange={(e) => {setContent(e.target.value); setRedContent(e.target.value);}}
      />
      <Input
        type="file"
        className="block w-full p-2 mb-4 border"
        onChange={(e) => {
          setImage(e.target.files?.[0] || null);
        }}
      />
      <Button
        className="px-4 py-2 bg-teal-500 text-white flex items-center justify-center"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <Loader2 className='h-5 w-5 animate-spin' /> : 'Generate OG Image'}
      </Button>
      {ogImageUrl && (
        <div className="mt-4">
          <RedditPost
            imageUrl={ogImageUrl}
            imageAlt="OG Image"
            postUrl={ogImageUrl}
            title={redTitle}
            logoUrl='https://seeklogo.com/images/R/reddit-icon-new-2023-logo-3F12137D65-seeklogo.com.png'
            username='Amul'
            content={redContent.slice(0, 100) + '...'}
          />
        </div>
      )}
    </div>
  );
};

export default PostPage;
