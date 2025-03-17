type shareType = {
  id: string;
  location: string;
  title: string;
}

export type TRegisterStatus = shareType & {
  companyName: string;
  loanLimit: string | undefined;
  visible_company_name: boolean;
}