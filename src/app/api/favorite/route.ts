import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { favoriteModel } from "@/model/favorite.model";
import { connectDB } from "@/lib/connectDB";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: `Unauthenticated` },
        { status: 401 }
      );
    }
    const id = session.user._id;
    const data = await favoriteModel.find(
      { userID: id },
      { userID: 0, __v: 0, addedAt: 0, _id: 0 }
    );
    if (data.length === 0) {
      return NextResponse.json(
        { success: true, message: `No favorite found` },
        { status: 200 }
      );
    }
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.log(`Error at Favorite GET ${error}`);
    return NextResponse.json(
      { success: false, message: `Internal server error` },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const { tmdbID, mediaType, title, posterPath } = await req.json();
    console.log(`Data: ${title}`);
    if (!tmdbID || !mediaType || !title || !posterPath) {
      return NextResponse.json(
        { success: false, message: `Fill all required fields` },
        { status: 400 }
      );
    }
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: `Unauthenticated` },
        { status: 401 }
      );
    }
    const data = await favoriteModel.create({
      userID: session.user._id,
      tmdbID,
      mediaType,
      title,
      posterPath,
      addedAt: Date.now(),
    });
    if (!data) {
      return NextResponse.json(
        { success: false, message: `Something went wrong` },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: true, message: `Successfully added to favorite list` },
      { status: 201 }
    );
  } catch (error) {
    console.log(`Error at Favorite POST ${error}`);
    return NextResponse.json(
      { success: false, message: `Internal server error` },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await connectDB();
    const { tmdbID } = await req.json();
    if (!tmdbID) {
      return NextResponse.json(
        { success: false, message: `ID must required` },
        { status: 400 }
      );
    }
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: `Unauthenticated` },
        { status: 401 }
      );
    }
    const data = await favoriteModel.deleteOne({ tmdbID });
    if (!data) {
      return NextResponse.json(
        { success: false, message: `Something went wrong` },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: true, message: `Successfully deleted from favorite list` },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error at Favorite DELETE ${error}`);
    return NextResponse.json(
      { success: false, message: `Internal server error` },
      { status: 500 }
    );
  }
};
