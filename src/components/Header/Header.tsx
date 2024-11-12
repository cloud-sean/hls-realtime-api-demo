import React, { useState } from 'react';
import { Edit } from 'react-feather';
import { Button } from '../button/Button';
import './Header.scss';

interface HeaderProps {
  apiKey: string;
  isLocalServer: boolean;
  onResetApiKey: () => void;
  localRelayServerUrl: string;
}

const VALID_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

export const Header: React.FC<HeaderProps> = ({ 
  apiKey, 
  isLocalServer,
  onResetApiKey,
  localRelayServerUrl
}) => {
  const [isLogoMenuOpen, setIsLogoMenuOpen] = useState(false);
  const [isTitleMenuOpen, setIsTitleMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen-1024x376.jpg");
  const [newLogoUrl, setNewLogoUrl] = useState("");
  const [title, setTitle] = useState("HLS Contoso Realtime Call Center Agent");
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState("");

  const handleLogoClick = () => {
    setIsLogoMenuOpen(!isLogoMenuOpen);
    setError("");
  };

  const isValidImageUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return VALID_IMAGE_EXTENSIONS.some(ext => 
        urlObj.pathname.toLowerCase().endsWith(ext)
      );
    } catch {
      return false;
    }
  };

  const handleLogoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogoUrl) {
      setError("Please enter a URL");
      return;
    }
    
    if (!isValidImageUrl(newLogoUrl)) {
      setError("Please enter a direct link to an image (ending in .jpg, .png, etc.)");
      return;
    }

    setLogoUrl(newLogoUrl);
    setNewLogoUrl("");
    setError("");
    setIsLogoMenuOpen(false);
  };

  const handleTitleClick = () => {
    setIsTitleMenuOpen(!isTitleMenuOpen);
    setNewTitle(title);
  };

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      setTitle(newTitle.trim());
      setNewTitle("");
      setIsTitleMenuOpen(false);
    }
  };

  return (
    <div className="content-top">
      <div className="content-title">
        <div className="logo-container">
          <img 
            src={logoUrl}
            alt="Company Logo" 
            onClick={handleLogoClick}
            className="clickable-logo"
          />
          {isLogoMenuOpen && (
            <div className="logo-menu">
              <form onSubmit={handleLogoSubmit}>
                <input
                  type="text"
                  placeholder="Enter new logo URL"
                  value={newLogoUrl}
                  onChange={(e) => {
                    setNewLogoUrl(e.target.value);
                    setError("");
                  }}
                />
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Update Logo</button>
              </form>
            </div>
          )}
        </div>
        <div className="title-container">
          <span 
            onClick={handleTitleClick}
            className="clickable-title"
          >
            {title}
          </span>
          {isTitleMenuOpen && (
            <div className="title-menu">
              <form onSubmit={handleTitleSubmit}>
                <input
                  type="text"
                  placeholder="Enter new title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <button type="submit">Update Title</button>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="content-api-key">
        {!localRelayServerUrl && (
          <Button
            icon={Edit}
            iconPosition="end"
            buttonStyle="flush"
            label={`api key: ${apiKey.slice(0, 3)}...`}
            onClick={onResetApiKey}
          />
        )}
      </div>
    </div>
  );
};
