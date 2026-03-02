import { useEffect, useRef, useState } from 'react';
import Lightbox from './Lightbox.jsx';
import './DualMarqueeGallery.css';

export default function DualMarqueeGallery({ topImages, bottomImages }) {
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const animationRef = useRef(null);
  const pausedRef = useRef(false);

  const top = topImages || [];
  const bottom = bottomImages || [];

  useEffect(() => {
    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;

    if (!topRow || !bottomRow || top.length === 0 || bottom.length === 0) return;

    let topPosition = 0;
    let bottomPosition = -(bottomRow.scrollWidth / 2); // Start from negative
    const speed = 0.5;

    function animate() {
      if (!pausedRef.current) {
        // Top row moves left (decreasing x)
        topPosition -= speed;
        const topWidth = topRow.scrollWidth / 2;
        if (Math.abs(topPosition) >= topWidth) {
          topPosition = 0;
        }
        topRow.style.transform = `translateX(${topPosition}px)`;

        // Bottom row moves right (increasing x toward 0)
        bottomPosition += speed;
        if (bottomPosition >= 0) {
          bottomPosition = -(bottomRow.scrollWidth / 2); // Reset to start
        }
        bottomRow.style.transform = `translateX(${bottomPosition}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);

    // Add click handlers to all items
    const handleClick = (e) => {
      const item = e.target.closest('.marquee-item');
      if (item) {
        const img = item.querySelector('img');
        if (img && img.src) {
          pausedRef.current = true;
          setLightboxImage(img.src);
          setLightboxOpen(true);
        }
      }
    };

    topRow.addEventListener('click', handleClick);
    bottomRow.addEventListener('click', handleClick);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      topRow.removeEventListener('click', handleClick);
      bottomRow.removeEventListener('click', handleClick);
    };
  }, [top, bottom]);

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    pausedRef.current = false;
  };

  // Duplicate images for infinite scroll
  const topImagesDoubled = [...top, ...top];
  const bottomImagesDoubled = [...bottom, ...bottom];

  return (
    <>
      <div className="dual-marquee-gallery">
        {/* Top Row - Scrolls Left */}
        <div className="marquee-row">
          <div ref={topRowRef} className="marquee-content">
            {topImagesDoubled.map((img, index) => (
              <div 
                key={`top-${index}`}
                className="marquee-item"
                data-src={img}
              >
                <img src={img} alt={`Training photo ${index + 1}`} draggable="false" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - Scrolls Right */}
        <div className="marquee-row">
          <div ref={bottomRowRef} className="marquee-content">
            {bottomImagesDoubled.map((img, index) => (
              <div 
                key={`bottom-${index}`}
                className="marquee-item"
                data-src={img}
              >
                <img src={img} alt={`Training photo ${index + top.length + 1}`} draggable="false" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Lightbox 
        isOpen={lightboxOpen}
        imageSrc={lightboxImage}
        onClose={handleCloseLightbox}
      />
    </>
  );
}