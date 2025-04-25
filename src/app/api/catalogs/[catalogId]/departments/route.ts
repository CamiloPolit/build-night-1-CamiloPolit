import { NextRequest, NextResponse } from "next/server";
import { getCatalog } from "@/api/catalog";

export async function GET(
  request: NextRequest,
  { params }: { params: { catalogId: string } }
) {
  try {
    const { catalogId } = await params;

    if (!catalogId) {
      return NextResponse.json(
        { success: false, error: "Catalog ID is required" },
        { status: 400 }
      );
    }

    const catalog = await getCatalog(catalogId);

    if (!catalog) {
      return NextResponse.json(
        { success: false, error: `Catalog ${catalogId} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: catalog,
    });
  } catch (error) {
    console.error(`Error fetching catalog:`, error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch catalog" },
      { status: 500 }
    );
  }
}
