import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={profile.image}
        alt={`${profile.name} 프로필 사진`}
        width={176}
        height={176}
        priority
        className="h-36 w-36 rounded-full border border-black/10 object-cover sm:h-44 sm:w-44 dark:border-white/15"
      />
      <h1 className="mt-6 text-xl font-semibold">{profile.name}</h1>
      <p className="mt-2 text-base text-black/60 dark:text-white/60">
        {profile.bio}
      </p>
    </header>
  );
}
