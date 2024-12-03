import {TPrimaryAndGenericColorString} from "@/shared/type";

export interface IAuthor {
  age: number,
  gender: 'MALE' | 'FEMALE',
  monthlyIncome: string,
  isJob: boolean,
}

export interface ILoan {
  location: string,
  amount: string,
  loanType: '신용' | '담보',
}

export interface IPost {
    title: TPrimaryAndGenericColorString,
    contents: string,
    createdAt: string,
  }
