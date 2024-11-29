type shareType = {
  location: string;
  title: string;
}

export type TRegisterStatus = shareType & {
  companyName: string;
  loanLimit: string | undefined;
}
export type TRealTimeLoan = shareType & {
  createdAt: string;
}
