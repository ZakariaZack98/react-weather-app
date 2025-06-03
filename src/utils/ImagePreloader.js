import { weatherImageUrls } from "../lib/backgrounds";


class ImagePreloader {
  constructor() {
    this.cache = new Map();
  }

  preload(imageUrl) {
    if (this.cache.has(imageUrl)) {
      return Promise.resolve(this.cache.get(imageUrl));
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      
      img.onload = () => {
        this.cache.set(imageUrl, img);
        resolve(img);
      };
      
      img.onerror = reject;
    });
  }

  preloadAll() {
    const imageUrls = Object.values(weatherImageUrls);
    return Promise.all(imageUrls.map(url => this.preload(url)));
  }
}

export const imagePreloader = new ImagePreloader();
