import { NextRequest, NextResponse } from "next/server";
import { getDepartment } from "@/api/catalog";

export async function GET(
  request: NextRequest,
  { params }: { params: { catalogId: string; departmentId: string } }
) {
  try {
    const paramsObject = await params;
    const { catalogId, departmentId } = paramsObject;

    if (!catalogId || !departmentId) {
      return NextResponse.json(
        { success: false, error: "Catalog ID and Department ID are required" },
        { status: 400 }
      );
    }

    const department = await getDepartment(catalogId, departmentId);

    if (!department) {
      return NextResponse.json(
        {
          success: false,
          error: `Department ${departmentId} not found in catalog ${catalogId}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: department,
    });
  } catch (error) {
    console.error(`Error fetching department:`, error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch department" },
      { status: 500 }
    );
  }
}
