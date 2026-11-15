"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 모두 0회로 표시합니다.
  const [counts, setCounts] = useState<Counts>(() =>
    Object.fromEntries(links.map((link) => [link.id, 0])),
  );

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져옵니다.
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/clicks", { signal: controller.signal, cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { counts: Counts }) =>
        // 응답 전에 눌린 클릭(낙관적 +1)이 덮어써지지 않도록 큰 값을 유지합니다.
        setCounts((prev) => {
          const next = { ...prev };
          for (const [id, count] of Object.entries(data.counts)) {
            next[id] = Math.max(prev[id] ?? 0, count);
          }
          return next;
        }),
      )
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("클릭 수를 불러오지 못했습니다:", error);
      });
    return () => controller.abort();
  }, []);

  const handleClick = (id: string) => {
    // 화면에는 바로 +1 하고, 서버 응답이 오면 실제 값으로 맞춥니다.
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    fetch(`/api/clicks/${encodeURIComponent(id)}`, {
      method: "POST",
      keepalive: true,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { count: number }) =>
        setCounts((prev) => ({
          ...prev,
          [id]: Math.max(prev[id] ?? 0, data.count),
        })),
      )
      .catch((error) => console.error("클릭 수를 저장하지 못했습니다:", error));
  };

  return (
    <ul className="mt-12 flex w-full flex-col gap-4 sm:mt-14 sm:gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            link={link}
            count={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
