import React from 'react';
import { Button } from './ui/button';

interface RedditPostProps {
  imageUrl: string;
  imageAlt: string;
  postUrl: string;
  title: string;
  content: string;
  logoUrl: string;
  username: string;
}

const RedditPost: React.FC<RedditPostProps> = ({ imageUrl, imageAlt, postUrl, title, content, logoUrl, username }) => {
  const handleShareClick = () => {
    window.open(postUrl, '_blank');
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-md mx-auto relative">
      <img
        src={logoUrl}
        alt="Logo"
        className="absolute top-4 right-4 h-10 w-10 rounded-full border border-gray-300"
      />
      <div className="p-4 border-b">
        <div className="flex items-center mb-2">
          <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2">
          
          </div>
          <span className="text-gray-600 text-sm font-serif">{username}</span>
        </div>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 text-sm">{content}</p>
      </div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-auto"
        />
      )}
      <div className="p-4 border-t text-center">
        <Button
        variant='outline'
          onClick={handleShareClick}
          className="px-4 py-2 rounded hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Share OG Image
        </Button>
      </div>
    </div>
  );
};

export default RedditPost;
