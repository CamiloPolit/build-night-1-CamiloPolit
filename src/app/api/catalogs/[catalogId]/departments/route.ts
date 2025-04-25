import { NextRequest, NextResponse } from "next/server";
import { getDepartments } from "@/lib/catalog";

export async function GET(
  request: NextRequest,
  { params }: { params: { catalogId: string } }
) {
  try {
    const { catalogId } = params;

    if (!catalogId) {
      return NextResponse.json(
        { success: false, error: "Catalog ID is required" },
        { status: 400 }
      );
    }

    const departments = await getDepartments(catalogId);

    if (!departments) {
      return NextResponse.json(
        { success: false, error: `Catalog ${catalogId} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: departments,
    });
  } catch (error) {
    console.error(
      `Error fetching departments for catalog ${params.catalogId}:`,
      error
    );
    return NextResponse.json(
      { success: false, error: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}
