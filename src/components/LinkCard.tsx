import type { LinkItem } from "@/data/profile";
import LinkIcon from "@/components/LinkIcon";

type LinkCardProps = {
  link: LinkItem;
  count: number;
  onClick?: () => void;
};

export default function LinkCard({ link, count, onClick }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="relative flex w-full items-center justify-center rounded-2xl border border-white/70 bg-white/45 px-20 py-4 text-[15px] font-semibold shadow-[0_8px_24px_-12px_rgba(150,85,40,0.28)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-[0_14px_30px_-14px_rgba(150,85,40,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8a67c]/60 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] dark:hover:bg-white/10"
    >
      <span className="absolute left-5 opacity-80">
        <LinkIcon name={link.icon} />
      </span>
      <span>{link.title}</span>
      <span className="absolute right-5 text-xs font-medium tabular-nums opacity-50">
        <span className="sr-only">클릭 </span>
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
