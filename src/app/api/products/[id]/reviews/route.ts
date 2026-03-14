import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const reviews = await prisma.productReview.findMany({
      where: {
        productId: id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { rating, comment } = await req.json();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
    }

    if (!comment || comment.trim() === "") {
      return NextResponse.json(
        { error: "Comment is required" },
        { status: 400 }
      );
    }

    // Check if the user has already reviewed the product
    const existingReview = await prisma.productReview.findFirst({
      where: {
        productId: id,
        userId: session.user.id,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this product" },
        { status: 400 }
      );
    }

    // Check if user has purchased the product
    const purchase = await prisma.order.findFirst({
      where: {
        userId: session.user.id,
        status: "completed",
        items: {
          some: {
            productId: id,
          },
        },
      },
    });

    if (!purchase) {
      return NextResponse.json(
        { error: "You must purchase this product before reviewing it" },
        { status: 403 }
      );
    }

    const newReview = await prisma.productReview.create({
      data: {
        rating: Number(rating),
        comment: comment.trim(),
        productId: id,
        userId: session.user.id,
      },
    });

    // Update product average rating and review count
    const productReviews = await prisma.productReview.findMany({
      where: { productId: id },
      select: { rating: true },
    });

    const totalReviews = productReviews.length;
    const averageRating =
      productReviews.reduce((acc: number, curr: { rating: number }) => acc + curr.rating, 0) / totalReviews;

    await prisma.product.update({
      where: { id: id },
      data: {
        rating: averageRating,
        reviews: totalReviews,
      },
    });

    return NextResponse.json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
