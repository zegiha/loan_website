import {DetailsContentsSection, TextTable} from "@/components/organisms";
import {IAuthor} from "@/features/postDetail/type";
import PostDetailTextTableRow from "@/features/postDetail/ui/PostDetailTextTableRow";

export default function AuthorSection({
  age,
  isJob,
  monthlyIncome,
  gender
}: IAuthor) {
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
          contents={monthlyIncome}
        />
        <PostDetailTextTableRow
          title={'직업유무'}
          contents={isJob ? '유' : '무'}
        />
      </TextTable>
    </DetailsContentsSection>
  );
}
