// 보여주기용 더미 데이터입니다. 실제 내용으로 교체하세요.

export type Profile = {
  name: string;
  bio: string;
  image: string;
};

export type LinkIconName = "github" | "linkedin" | "blog";

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  icon: LinkIconName;
};

export const profile: Profile = {
  name: "남문태",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  image: "https://placehold.co/176x176/orange/white",
};

export const links: LinkItem[] = [
  {
    id: "github",
    title: "GitHub",
    url: "https://github.com/mtnam",
    icon: "github",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    url: "https://kr.linkedin.com/in/%EB%AC%B8%ED%83%9C-%EB%82%A8-7a32a7377?trk=people-guest_people_search-card",
    icon: "linkedin",
  },
  {
    id: "blog",
    title: "Blog",
    url: "https://blog.naver.com/skaansxo1",
    icon: "blog",
  },
];
