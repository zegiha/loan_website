import {Col, Divider, Row} from "@/components/atoms/layout";
import {DetailsTitleSection} from "@/components/organisms";
import {TPrimaryAndGenericColorString} from "@/shared/type";
import DetailsContentsSection from "@/components/organisms/details/detailsContentsSection/DetailsContentsSection";
import TextTable from "@/components/organisms/table/TextTable";
import {TableRow} from "@/components/molecules";
import TextTableRow from "@/components/molecules/table/TextTableRow";
import Typo from "@/components/atoms/typo/Typo";

export default function LoanDetails() {
  const title: TPrimaryAndGenericColorString = [
    {type: 'primary', contents: '無방문 '},
    {type: 'generic', contents: '24시 당일입금 비대면 정식등록업체 간편진행 24시 당일입금 비대면 정식등록업체 간편진행 24시 당일입금 비대면 정식등록업체 간편진행 24시 당일입금 비대면 정식등록업체 간편진행 24시 당일입금 비대면 정식등록업체 간편진행 24시 당일입금 비대면 정식등록업체 간편진행'}
  ]

  const loanDetailsData: {
    title: TPrimaryAndGenericColorString,
    contents: Array<{subTitle: string, contents: Array<{title: string, contents: string}>}>,
  } = {
    title: title,
    contents: [
      {
        subTitle: '업체',
        contents: [
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
        ]
      },
      {
        subTitle: '상품',
        contents: [
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
        ]
      },
    ],
  }

  return (
    <Col width={'fill'}>
      <DetailsTitleSection type={'loan'} title={title}/>
      <Divider height={8}/>
      <DetailsContentsSection subTitle={loanDetailsData.contents[0].subTitle ?? ''}>
        <Row gap={16} width={'fill'}>
          <Col width={'fill'}>
            {loanDetailsData.contents[0].contents.map((v, i) => (
              i === 3 ? (
                <>
                  <Divider key={i}/>
                  <DetailsTextTableRow key={i} {...v}/>
                </>
              ) : (
                <DetailsTextTableRow key={i} {...v}/>
              )
            ))}
          </Col>
        </Row>
      </DetailsContentsSection>
    </Col>
  );
}

function DetailsTextTableRow({
  title,
  contents
}: {title: string, contents: string}) {
  return <TextTableRow>
    <Typo.Contents width={120} color={'dim'}>
      {title}
    </Typo.Contents>
    <Typo.Contents width={'fill'}>
      {contents}
    </Typo.Contents>
  </TextTableRow>
}
