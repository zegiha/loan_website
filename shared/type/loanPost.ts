export interface ILoanPost {
  type: '공지' | '담보' | '신용';
  postId: string;
  location: string;
  title: string;
  createdAt: string;
  viewCount: number;
}
