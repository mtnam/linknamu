import { NextResponse } from "next/server";
import { getClicksCollection } from "@/lib/mongodb";
import { links } from "@/data/profile";

export const dynamic = "force-dynamic";

/** 모든 링크의 클릭 수를 한 번에 반환합니다. 예: { counts: { github: 42 } } */
export async function GET() {
  try {
    const clicks = await getClicksCollection();
    const ids = links.map((link) => link.id);
    const docs = await clicks.find({ _id: { $in: ids } }).toArray();

    const counts: Record<string, number> = Object.fromEntries(
      ids.map((id) => [id, 0]),
    );
    for (const doc of docs) counts[doc._id] = doc.count;

    return NextResponse.json({ counts });
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return NextResponse.json(
      { error: "클릭 수를 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}
