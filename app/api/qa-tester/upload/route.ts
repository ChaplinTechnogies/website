import { NextResponse } from "next/server";
import { saveQATestReport, sanitizeExcelData } from "@/lib/models/qaTesterModels";
import * as XLSX from "xlsx";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const uploadBy = formData.get("uploadBy") as string;
    const testPhase = formData.get("testPhase") as string;

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(sheet);

    const validatedData = sanitizeExcelData(rawData);

    // Calculate metrics
    const totalTests = validatedData.length;
    const passedTests = validatedData.filter((d) => d.Status === "Passed").length;
    const failedTests = validatedData.filter((d) => d.Status === "Failed").length;
    const bugCount = validatedData.filter((d) => d.BugID).length;

    const id = await saveQATestReport({
      uploadBy,
      fileName: file.name,
      testPhase,
      totalTests,
      passedTests,
      failedTests,
      bugCount,
      remarks: "Validated & auto-mapped Excel upload",
      rawData: validatedData,
    });

    return NextResponse.json({ success: true, id });
  } catch (err: any) {
    console.error("Upload Error:", err);
    return NextResponse.json({ error: "Failed to upload report" }, { status: 500 });
  }
}


