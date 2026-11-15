import ProfileHeader from "@/components/ProfileHeader";
import LinkList from "@/components/LinkList";
import { profile, links } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-6 pb-20 pt-16 sm:px-8 sm:pt-24">
      <ProfileHeader profile={profile} />
      <LinkList links={links} />
    </main>
  );
}
