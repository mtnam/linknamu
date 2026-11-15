import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import { profile, links } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-6 pb-20 pt-16 sm:px-8 sm:pt-24">
      <ProfileHeader profile={profile} />

      <ul className="mt-12 flex w-full flex-col gap-4 sm:mt-14 sm:gap-5">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} />
          </li>
        ))}
      </ul>
    </main>
  );
}
