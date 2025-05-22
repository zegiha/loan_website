import {AccordionSectionTitle, Section} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import {createContext, useContext, useEffect, useState} from "react";
import {Col, Row} from "@/components/atoms/layout";
import {BaseButton, BaseTextInput} from "@/components/molecules/inputs";
import SearchTypeTextInput from "@/components/molecules/inputs/textInputs/searchTypeTextInput/SearchTypeTextInput";
import style from './loanPostTableSection.module.scss'
import {PlusIcon} from "@/components/atoms/icons";
import PostTable from "@/features/postList/ui/loanPostTableSection/PostTable";
import {useRouter} from "next/navigation";
import {semantic_object} from "@/shared/color";
import react_state_action from "@/shared/type/react_state_action";
import {useSearch} from "@/shared/hooks";

const accordionData = ['10', '15', '20', '30']

const PaginationProvider = createContext<{
  limit: number
  page: number, setPage: react_state_action<number>
  search: string
} | null>(null)

export function usePagination() {
  const data = useContext(PaginationProvider)
  if(data === null) throw new Error("pagination provider's value is null ")
  return data
}

export default function LoanPostTableSection({
  activeLoanTypeCategories,
  activeLocationCategories,
  is_display
}: {
  activeLoanTypeCategories: Set<string>,
  activeLocationCategories: Set<string>,
  is_display?: boolean,
}) {
  const [activeAccordionNumber, setActiveAccordionNumber] = useState<string>(!is_display ? '15' : '5')

  const {
    search,
    prevSearch, setPrevSearch,
  } = useSearch()

  const [limit, setLimit] = useState<number>(!is_display ? 15 : 5)
  const [page, setPage] = useState<number>(1)

  const paginationDefault = {
    limit,
    page, setPage,
    search,
  }

  useEffect(() => {
    setLimit(Number(activeAccordionNumber))
  }, [activeAccordionNumber]);

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

  const router = useRouter()

  return (
    <Section backgroundColor={'surface'}>
      <AccordionSectionTitle
        title={
          <Typo.Body emphasize color={'variable'}>
            {formatLocationCategory() !== ' ' && (
              <>
                <span style={{color: semantic_object.onGeneric.onGenericPrimary}}>
                  {formatLocationCategory()}
                </span>
                {`지역 `}
              </>
            )}
            {formatLoanTypeCategory() !== '' && (
              <span style={{color: semantic_object.onGeneric.onGenericPrimary}}>
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
              placeholder={'제목으로 검색해주세요'}
              size={'normal'}
              value={prevSearch}
              onChangeAction={(v) => setPrevSearch(v)}
            />
          </Row>
          <BaseButton
            className={style.addPostButton}
            onClick={() => router.push('/post/create')}
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
        <PaginationProvider value={paginationDefault}>
          <PostTable
            key={`${activeAccordionNumber}`}
            dataNumber={Number(activeAccordionNumber)}
            is_display={is_display}
            activeLoanTypeCategories={activeLoanTypeCategories}
            activeLocationCategories={activeLocationCategories}
          />
        </PaginationProvider>
      </Col>
    </Section>
  );
}
