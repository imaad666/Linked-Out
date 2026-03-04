import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/lib/auth";
import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(1).max(160),
  body: z.string().min(1),
  type: z.enum(["WIN", "FAIL", "WEIRD", "LESSON", "OTHER"]),
  mood: z.enum(["LIGHT", "HEAVY", "NEUTRAL", "CHAOTIC", "PROUD", "OTHER"]),
  visibility: z.enum(["PRIVATE", "UNLISTED", "PUBLIC"]).default("PRIVATE"),
  happenedAt: z.coerce.date(),
});

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await prisma.post.findMany({
    where: {
      userId: user.id,
      deletedAt: null,
    },
    orderBy: [
      { happenedAt: "desc" },
      { createdAt: "desc" },
    ],
  });

  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json();
  const parsed = createPostSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  const post = await prisma.post.create({
    data: {
      userId: user.id,
      title: data.title,
      body: data.body,
      type: data.type,
      mood: data.mood,
      visibility: data.visibility,
      happenedAt: data.happenedAt,
    },
  });

  return NextResponse.json({ post }, { status: 201 });
}

