import axios from 'axios';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Weather conditions and their image URLs
const weatherImages = {
  Clear: "https://cdn.wallpapersafari.com/33/68/4lqsxp.jpg",
  Clouds: "https://images.pexels.com/photos/158827/field-corn-air-frisch-158827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  Rain: "https://static.vecteezy.com/system/resources/previews/042/146/565/non_2x/ai-generated-beautiful-rain-day-view-photo.jpg",
  Snow: "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c25vd3xlbnwwfHwwfHx8MA%3D%3D",
  Thunderstorm: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGh1bmRlcnN0b3JtfGVufDB8fDB8fHww",
  Drizzle: "https://images.unsplash.com/photo-1556485689-33e55ab56127?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJpenpsZXxlbnwwfHwwfHx8MA%3D%3D",
  Mist: "https://images.unsplash.com/photo-1543968996-ee822b8176ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWlzdHxlbnwwfHwwfHx8MA%3D%3D"
};

const ORIGINAL_DIR = path.join(dirname(dirname(__filename)), '/public/weather-backgrounds/original');
const THUMBNAIL_DIR = path.join(dirname(dirname(__filename)), '/public/weather-backgrounds/thumbnail');

async function ensureDirectories() {
  await fs.mkdir(ORIGINAL_DIR, { recursive: true });
  await fs.mkdir(THUMBNAIL_DIR, { recursive: true });
  console.log('✅ Created directories:', ORIGINAL_DIR, THUMBNAIL_DIR);
}

async function downloadAndOptimizeImage(url, condition) {
  try {
    console.log(`\n📥 Downloading ${condition} weather image from ${url}...`);
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);

    // Save original (optimized)
    const originalPath = path.join(ORIGINAL_DIR, `${condition.toLowerCase()}.jpg`);
    await sharp(buffer)
      .jpeg({ quality: 80, progressive: true })
      .toFile(originalPath);
    console.log(`💾 Saved optimized original to: ${originalPath}`);

    // Save thumbnail
    const thumbnailPath = path.join(THUMBNAIL_DIR, `${condition.toLowerCase()}.jpg`);
    await sharp(buffer)
      .resize(400) // smaller size for quick loading
      .blur(20) // blur for progressive loading effect
      .jpeg({ quality: 30 })
      .toFile(thumbnailPath);
    console.log(`💾 Saved thumbnail to: ${thumbnailPath}`);

    console.log(`✅ ${condition} images processed successfully`);
  } catch (error) {
    console.error(`❌ Error processing ${condition}:`, error.message);
  }
}

console.log('🚀 Starting weather background image optimization...');

// Use async IIFE to be able to use await at the top level
(async () => {
  try {
    await ensureDirectories();
    
    for (const [condition, url] of Object.entries(weatherImages)) {
      await downloadAndOptimizeImage(url, condition);
    }
    
    console.log('\n✨ All images processed successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
