type shareType = {
  location: string;
  title: string;
}

export type TRegisterStatus = shareType & {
  companyName: string;
}
export type TRealTimeLoan = shareType & {
  createdTime: string;
}
