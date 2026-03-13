
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// PATCH: Update user role
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions as any) as any;
  if (session?.user?.role !== "admin" && session?.user?.role !== "superadmin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { role } = await req.json();

  if (!role || !["user", "admin", "superadmin"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  // Optional: Prevent non-superadmins from promoting to superadmin
  if (role === "superadmin" && session.user.role !== "superadmin") {
    return NextResponse.json({ error: "Only superadmins can create other superadmins" }, { status: 403 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role: role as any },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// DELETE: Remove user
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions as any) as any;
  if (session?.user?.role !== "admin" && session?.user?.role !== "superadmin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Prevent users from deleting themselves
  if (session.user.id === id) {
    return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 });
  }

  try {
    // Check if target user is superadmin
    const targetUser = await prisma.user.findUnique({ where: { id } });
    if (targetUser?.role === "superadmin" && session.user.role !== "superadmin") {
        return NextResponse.json({ error: "Only superadmins can delete other superadmins" }, { status: 403 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
