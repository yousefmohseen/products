import { NextResponse } from "next/server";

interface ReviewBody {
  productId?: number;
  rating?: number;
  comment?: string;
  userName?: string;
}

export async function POST(request: Request) {
  try {
    const body: ReviewBody = await request.json();

    if (!body.productId || !body.userName || body.rating === undefined || !body.comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    if (body.comment.trim().length === 0) {
      return NextResponse.json({ error: "Comment cannot be empty" }, { status: 400 });
    }

    const savedReview = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ message: "Review saved successfully", review: savedReview });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }
}

