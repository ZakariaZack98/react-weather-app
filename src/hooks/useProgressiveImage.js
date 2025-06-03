import { useState, useEffect } from 'react';
import { imagePreloader } from '../utils/ImagePreloader';

const useProgressiveImage = (lowQualitySrc, highQualitySrc) => {
  const [src, setSrc] = useState(lowQualitySrc);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset error state when sources change
    setError(false);
    setSrc(lowQualitySrc);

    // If highQualitySrc is already cached, use it immediately
    if (imagePreloader.isImageCached(highQualitySrc)) {
      setSrc(highQualitySrc);
      return;
    }

    // Otherwise load it
    imagePreloader
      .preload(highQualitySrc)
      .then(() => {
        setSrc(highQualitySrc);
      })
      .catch((err) => {
        console.error('Error loading high quality image:', err);
        setError(true);
        // Keep the low quality image if available, otherwise use placeholder
        setSrc(lowQualitySrc || imagePreloader.getPlaceholderImage());
      });
  }, [lowQualitySrc, highQualitySrc]);

  return error ? lowQualitySrc || imagePreloader.getPlaceholderImage() : src;
};

export default useProgressiveImage;
