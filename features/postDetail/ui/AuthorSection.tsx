import {DetailsContentsSection, TextTable} from "@/components/organisms";
import PostDetailTextTableRow from "@/features/postDetail/ui/PostDetailTextTableRow";
import {ILoan_inquiry_detail} from "@/shared/type";

export default function AuthorSection({
  age,
  is_job,
  monthly_income,
  gender,
}: ILoan_inquiry_detail['author']) {
  return (
    <DetailsContentsSection subTitle={'작성자'}>
      <TextTable>
        <PostDetailTextTableRow
          title={'나이'}
          contents={`${age}세`}
        />
        <PostDetailTextTableRow
          title={'성별'}
          contents={gender === 'MALE' ? '남' : '여'}
        />
        <PostDetailTextTableRow
          title={'전화번호'}
          contents={'업체 로그인을 통해 번호를 확인하세요'}
        />
        <PostDetailTextTableRow
          title={'월수입'}
          contents={monthly_income}
        />
        <PostDetailTextTableRow
          title={'직업유무'}
          contents={is_job ? '유' : '무'}
        />
      </TextTable>
    </DetailsContentsSection>
  );
}
