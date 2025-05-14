import get_temp_image from "@/shared/api/get_temp_image";

export interface ITopAd {
  title: string;
  contents: string;
  name: string;
  imgUrl: string;
}

export default async function getTopAds(): Promise<Array<ITopAd>> {
  const res: Array<ITopAd> = [];
  const tmp: Omit<ITopAd, "imgUrl"> = {
    title: "무방문 무서류 당일 대출",
    contents: "지역 시간 장소 제약 X 월별 당일승인 당일송금",
    name: "대부중개",
  };
  for (let i = 0; i < 3; i++) {
    res.push({
      ...tmp,
      imgUrl: get_temp_image(i * 21783451),
    });
  }

  return res;
}
