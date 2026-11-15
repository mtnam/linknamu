import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="rounded-full bg-white/60 p-1.5 shadow-[0_18px_40px_-14px_rgba(176,96,48,0.45),0_2px_6px_rgba(176,96,48,0.12)] ring-1 ring-white/80 backdrop-blur-sm dark:bg-white/10 dark:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.7)] dark:ring-white/10">
        <Image
          src={profile.image}
          alt={`${profile.name} 프로필 사진`}
          width={128}
          height={128}
          priority
          unoptimized
          className="h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32"
        />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{profile.name}</h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-[#3a2a20]/60 text-balance dark:text-[#f4e9df]/60">
        {profile.bio}
      </p>
    </header>
  );
}
