import {AccordionSectionTitle, Section} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import {semantic} from "@/shared/color";
import {useState} from "react";
import {Col, Row} from "@/components/atoms/layout";
import {BaseButton, BaseTextInput} from "@/components/molecules/inputs";
import SearchTypeTextInput from "@/components/molecules/inputs/textInputs/searchTypeTextInput/SearchTypeTextInput";
import style from './loanPostTableSection.module.scss'
import {PlusIcon} from "@/components/atoms/icons";
import PostTable from "@/features/postList/ui/loanPostTableSection/PostTable";

const accordionData = ['10', '15', '20', '30']
const SEARCHTYPE = ['제목 및 내용', '제목', '내용', '금액']

export default function LoanPostTableSection({
  activeLoanTypeCategories,
  activeLocationCategories,
}: {
  activeLoanTypeCategories: Set<string>,
  activeLocationCategories: Set<string>,
}) {
  const [activeAccordionNumber, setActiveAccordionNumber] = useState<string>('15')

  const [search, setSearch] = useState<string>('');

  const [activeSearchType, setActiveSearchType] = useState<string>('제목 및 내용')

  const formatLocationCategory = () => {
    let res = ''
    activeLocationCategories.forEach((v) => {
      if(v !== '전체') res += `${v}, `;
    })
    res = res.slice(0, res.length - 2) + ' '
    return res;
  }
  const formatLoanTypeCategory = () => {
    let res = ''
    activeLoanTypeCategories.forEach((v) => {
      if(v !== '전체') res = v;
    })
    return res;
  }
  return (
    <Section backgroundColor={'surface'}>
      <AccordionSectionTitle
        title={
          <Typo.Body emphasize color={'variable'}>
            {formatLocationCategory() !== ' ' && (
              <>
                <span className={semantic.onGenericOnGenericPrimary}>
                  {formatLocationCategory()}
                </span>
                {`지역 `}
              </>
            )}
            {formatLoanTypeCategory() !== '' && (
              <span className={semantic.onGenericOnGenericPrimary}>
                {`${formatLoanTypeCategory()} `}
              </span>
            )}
            대출 문의글
          </Typo.Body>
        }
        accordionData={accordionData}
        activeAccordion={activeAccordionNumber}
        measurement={'개'}
        onAccordionActiveChangeAction={(newActiveAccordion) => setActiveAccordionNumber(newActiveAccordion)}
        lastComment={'( 최대 )'}
      />
      <Col width={'fill'} gap={12}>
        <Row width={'fill'} gap={16} className={style.topTableControlSection}>
          <Row width={'fill'}>
            <BaseTextInput
              placeholder={'검색어를 입력해주세요'}
              size={'normal'}
              value={search}
              onChangeAction={(e) => setSearch(e.target.value)}
              SelectType={<SearchTypeTextInput
                size={'normal'}
                active={activeSearchType}
                setActiveType={setActiveSearchType}
                searchType={SEARCHTYPE}
              />}
            />
          </Row>
          <BaseButton
            className={style.addPostButton}
            onClick={() => console.log('add post')}
          >
            <PlusIcon
              size={24}
              color={'white'}
            />
            <Typo.Contents
              emphasize
              color={'onPrimary'}
              isPre={'nowrap'}
            >
              글 작성하기
            </Typo.Contents>
          </BaseButton>
        </Row>
        <PostTable key={`${activeAccordionNumber}`} dataNumber={Number(activeAccordionNumber)}/>
      </Col>
    </Section>
  );
}
