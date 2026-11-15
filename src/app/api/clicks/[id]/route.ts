import { NextResponse } from "next/server";
import { getClicksCollection } from "@/lib/mongodb";
import { links } from "@/data/profile";

/** 해당 링크의 클릭 수를 1 늘리고, 늘어난 값을 반환합니다. */
export async function POST(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  // 등록된 링크만 집계해서 임의의 문서가 생기지 않도록 합니다.
  if (!links.some((link) => link.id === id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 404 });
  }

  try {
    const clicks = await getClicksCollection();
    const doc = await clicks.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return NextResponse.json({ id, count: doc?.count ?? 1 });
  } catch (error) {
    console.error("클릭 수 증가 실패:", error);
    return NextResponse.json(
      { error: "클릭 수를 저장하지 못했습니다." },
      { status: 500 },
    );
  }
}
