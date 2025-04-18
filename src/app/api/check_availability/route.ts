import { connectDB } from "@/lib/connectDB";
import { userModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  await connectDB();
  try {
    if (!name) {
      return NextResponse.json(
        { success: false, message: `Name is required!` },
        { status: 400 }
      );
    }
    const list = await userModel.find({ name });
    const isInclude = list.some(x=>x.name===name)
    if (isInclude) {
      return NextResponse.json(
        { success: true, isIncluded: true },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: true, isIncluded: false },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error at the check availability GET route ${error}`);
    return NextResponse.json(
      { success: false, message: `Internal server error` },
      { status: 500 }
    );
  }
};
