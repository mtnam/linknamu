import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

// 개발 모드의 핫 리로드 때마다 새 연결이 쌓이지 않도록 전역에 캐시합니다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

export function getMongoClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다.");
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
    // 연결에 실패하면 다음 요청에서 다시 시도할 수 있도록 캐시를 비웁니다.
    globalForMongo._mongoClientPromise.catch(() => {
      globalForMongo._mongoClientPromise = undefined;
    });
  }
  return globalForMongo._mongoClientPromise;
}

export type ClickDoc = { _id: string; count: number };

/** 링크별 클릭 수를 저장하는 컬렉션 (DB 이름은 MONGODB_URI의 경로를 따름) */
export async function getClicksCollection() {
  const client = await getMongoClient();
  return client.db().collection<ClickDoc>("clicks");
}
