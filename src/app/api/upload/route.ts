// File: app/api/upload/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { parse } from "csv-parse/sync";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("csvFile") as File;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded." }, { status: 400 });
    }

    if (file.type !== "text/csv") {
        return NextResponse.json({ message: "Invalid file type. Please upload a CSV." }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const records = parse(fileBuffer, {
      columns: true,
      skip_empty_lines: true,
    });
    
    if (!records || records.length === 0) {
        return NextResponse.json({ message: "CSV file is empty or invalid." }, { status: 400 });
    }

    // === CRUCIAL PART ===
    // Make sure your return statement sends the 'data' property
    return NextResponse.json({ 
        message: `Successfully processed ${records.length} rows from ${file.name}.`,
        data: records // <-- YEH LINE SAB SE ZAROORI HAI
    }, { status: 200 });

  } catch (error: any) {
    console.error("UPLOAD_API_ERROR", error);
    return NextResponse.json({ message: "An unexpected error occurred during upload." }, { status: 500 });
  }
}