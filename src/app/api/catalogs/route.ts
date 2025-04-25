import { NextRequest, NextResponse } from "next/server";
import { getCatalogIds } from "@/api/catalog";

export async function GET(request: NextRequest) {
  try {
    const catalogs = await getCatalogIds();

    return NextResponse.json({
      success: true,
      data: catalogs,
    });
  } catch (error) {
    console.error("Error fetching catalogs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch catalogs" },
      { status: 500 }
    );
  }
}
