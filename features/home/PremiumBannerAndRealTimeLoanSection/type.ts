import {TPrimaryAndGenericColorString} from "@/shared/type";

export type TPremiumCard = {
  title: TPrimaryAndGenericColorString,
  location: string,
  name: string,
}

export type TRealTimeLoan = {
  location: string,
  title: string,
  createdAt: string;
}
