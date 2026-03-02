import { useEffect, useState } from 'react';
import './Lightbox.css';

export default function Lightbox({ isOpen, imageSrc, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>×</button>
      <img 
        src={imageSrc} 
        alt="Full view" 
        className="lightbox-image"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}