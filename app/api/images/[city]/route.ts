import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ city: string }> },
) {
  try {
    const { city } = await params;

    // Path to the city's image folder
    const imagesPath = path.join(process.cwd(), "public", "assets", city);

    // Check if directory exists
    if (!fs.existsSync(imagesPath)) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    // Read all files from the directory
    const files = fs.readdirSync(imagesPath);

    // Filter for image files only
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".JPG",
        ".JPEG",
        ".PNG",
      ].includes(ext);
    });

    // Convert to full URLs
    const imageUrls = imageFiles.map((file) => `/assets/${city}/${file}`);

    return NextResponse.json({
      city,
      images: imageUrls,
      count: imageUrls.length,
    });
  } catch (error) {
    console.error("Error reading images:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
