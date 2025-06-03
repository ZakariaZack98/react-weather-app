import { weatherImageUrls, weatherImageThumbnails } from "../lib/backgrounds";

class ImagePreloader {
  constructor() {
    this.cache = new Map();
    this.loadingPromises = new Map();
  }

  preload(imageUrl) {
    // If already cached, return the cached image
    if (this.cache.has(imageUrl)) {
      return Promise.resolve(this.cache.get(imageUrl));
    }

    // If already loading, return the existing promise
    if (this.loadingPromises.has(imageUrl)) {
      return this.loadingPromises.get(imageUrl);
    }

    // Create new loading promise
    const loadPromise = new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.cache.set(imageUrl, img);
        this.loadingPromises.delete(imageUrl);
        resolve(img);
      };
      
      img.onerror = (error) => {
        console.error(`Failed to load image: ${imageUrl}`, error);
        this.loadingPromises.delete(imageUrl);
        // Reject with a more informative error
        reject(new Error(`Failed to load image at ${imageUrl}: ${error.message || 'Unknown error'}`));
      };

      // Set crossOrigin to anonymous for CORS requests
      img.crossOrigin = "anonymous";
      // Set the src last to prevent race conditions
      img.src = imageUrl;
    }).catch(error => {
      console.error('Image loading failed:', error);
      // Remove failed image from cache
      this.cache.delete(imageUrl);
      throw error;
    });

    // Store the loading promise
    this.loadingPromises.set(imageUrl, loadPromise);
    return loadPromise;
  }

  preloadAll() {
    const allUrls = [
      ...Object.values(weatherImageUrls),
      ...Object.values(weatherImageThumbnails)
    ];
    
    return Promise.allSettled(allUrls.map(url => 
      this.preload(url).catch(error => {
        console.warn(`Failed to preload ${url}:`, error);
        return null;
      })
    ));
  }

  // Helper to check if an image is cached
  isImageCached(imageUrl) {
    return this.cache.has(imageUrl);
  }

  // Helper to get base64 placeholder for failed images
  getPlaceholderImage() {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  }
}

export const imagePreloader = new ImagePreloader();
