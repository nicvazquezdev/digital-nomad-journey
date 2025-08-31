import fs from "fs";
import path from "path";

/**
 * Generates a static mapping of images by country for the digital nomad app.
 * This script runs during build time to avoid filesystem operations in serverless functions.
 */

interface ImageMapping {
  [country: string]: string[];
}

function generateImageMapping(): void {
  console.log("🔄 Generating image mapping...");

  const assetsPath = path.join(process.cwd(), "public", "assets");

  // Check if assets directory exists
  if (!fs.existsSync(assetsPath)) {
    console.error("❌ Assets directory not found:", assetsPath);
    process.exit(1);
  }

  // Get all country directories
  const countries = fs.readdirSync(assetsPath).filter((item) => {
    const itemPath = path.join(assetsPath, item);
    return fs.statSync(itemPath).isDirectory();
  });

  console.log(`📁 Found ${countries.length} countries:`, countries.join(", "));

  // Generate image mapping
  const imageMapping: ImageMapping = {};
  let totalImages = 0;

  countries.forEach((country) => {
    const countryPath = path.join(assetsPath, country);
    const files = fs.readdirSync(countryPath);

    // Filter for image files only
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"].includes(ext);
    });

    // Convert to public URLs
    imageMapping[country] = imageFiles.map(
      (file) => `/assets/${country}/${file}`,
    );
    totalImages += imageFiles.length;

    console.log(`  📸 ${country}: ${imageFiles.length} images`);
  });

  // Generate TypeScript file content
  const outputContent = `// Auto-generated file - DO NOT EDIT MANUALLY
// Generated on: ${new Date().toISOString()}
// Total countries: ${countries.length}
// Total images: ${totalImages}

export interface ImageMapping {
  [country: string]: string[];
}

export const IMAGE_MAPPING: ImageMapping = ${JSON.stringify(
    imageMapping,
    null,
    2,
  )};

export const COUNTRIES = Object.keys(IMAGE_MAPPING);

export const TOTAL_IMAGES = ${totalImages};
`;

  // Write to data file
  const outputPath = path.join(process.cwd(), "app", "data", "images.ts");
  const outputDir = path.dirname(outputPath);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, outputContent);

  console.log("✅ Image mapping generated successfully!");
  console.log(
    `📊 Summary: ${countries.length} countries, ${totalImages} total images`,
  );
  console.log(`💾 Output: ${outputPath}`);
}

// Run the script
if (require.main === module) {
  try {
    generateImageMapping();
  } catch (error) {
    console.error("❌ Error generating image mapping:", error);
    process.exit(1);
  }
}

export { generateImageMapping };
