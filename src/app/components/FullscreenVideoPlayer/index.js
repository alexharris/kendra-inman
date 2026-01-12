'use client';

import { useEffect } from 'react';
import CachedVideo from '../CachedVideo';
import './FullscreenVideoPlayer.scss';

export default function FullscreenVideoPlayer({ videoUrl, onClose, alt = 'Fullscreen video' }) {
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

  return (
    <div 
      className="fullscreen-video-overlay"
      onClick={handleBackdropClick}
    >
      <div className="fullscreen-video-container">
        <button 
          className="fullscreen-video-close"
          onClick={onClose}
          aria-label="Close video player"
        >
          ×
        </button>
        <CachedVideo
          src={videoUrl}
          alt={alt}
          autoPlay
          controls
          className="fullscreen-video"
        />
      </div>
    </div>
  );
}
