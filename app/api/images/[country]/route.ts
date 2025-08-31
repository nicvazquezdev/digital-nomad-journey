import { NextRequest, NextResponse } from "next/server";
import { IMAGE_MAPPING } from "../../../data/images";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ country: string }> },
) {
  try {
    const { country } = await params;

    // Check if country exists in our static mapping
    if (!IMAGE_MAPPING[country]) {
      return NextResponse.json({ error: "Country not found" }, { status: 404 });
    }

    // Get images from static mapping
    const imageUrls = IMAGE_MAPPING[country];

    return NextResponse.json({
      country,
      images: imageUrls,
      count: imageUrls.length,
    });
  } catch (error) {
    console.error("Error getting images:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
