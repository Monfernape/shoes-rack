"use server";
import { NextResponse } from "next/server";
import { uploadFile } from "@/app/(app)/attendance-report/components/storePdf";

// Typing for the handler function
export async function handler(req: Request) {
  if (req.method === "GET") {
    try {

      const uploadResponse = await uploadFile();

      return NextResponse.json({
        message: "PDF generated and uploaded successfully!",
        file: uploadResponse, 
      });
    } catch (error) {
      console.error("Error generating or uploading PDF:", error);
      return NextResponse.json(
        { error: "Failed to generate or upload PDF" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }
}

export { handler as GET, handler as POST };
