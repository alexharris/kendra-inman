'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import CachedVideo from '../CachedVideo';
import './FullscreenVideoPlayer.scss';

function getVimeoId(url) {
  const match = url.match(/vimeo\.com\/(?:video\/|channels\/[^/]+\/)?(\d+)/);
  return match ? match[1] : null;
}

export default function FullscreenVideoPlayer({ videoUrl, vimeoUrl, onClose, alt = 'Fullscreen video' }) {
  const vimeoId = vimeoUrl ? getVimeoId(vimeoUrl) : null;
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Handle ESC key to close
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Handle backdrop click to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div 
      className="fullscreen-video-overlay bg-black"
      onClick={handleBackdropClick}
    >
      <div className="fullscreen-video-container">
        <button
          className="fullscreen-video-close"
          onClick={onClose}
          aria-label="Close video player"
        >
          <svg className="fill-beige stroke-beige" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        {vimeoId ? (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
            className="fullscreen-video"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={alt}
          />
        ) : (
          <CachedVideo
            src={videoUrl}
            alt={alt}
            autoPlay
            controls
            className="fullscreen-video"
          />
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
