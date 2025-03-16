import {Col, Row} from "@/components/atoms/layout";
import Subject_section from "@/features/my/new_ads/ui/Subject_section";
import Typo from "@/components/atoms/typo/Typo";
import React from "react";
import {Table} from "@/components/organisms";
import Buy_table_row from "@/features/my/new_ads/ui/buy_new/Buy_table_row";
import {useSelect_context} from "@/features/my/new_ads/context/select_context";
import get_ads from "@/features/my/new_ads/const/ad_list";
import style from './style.module.scss'
import {TableHead, TableRow} from "@/components/molecules";
import {BaseButton, button} from "@/components/molecules/inputs";
import {useRouter} from "next/navigation";
import {ArrowAltIcon} from "@/components/atoms/icons";

export default function End_new_ads() {
  const router = useRouter();

  const ads = get_ads()

  const {select} = useSelect_context()

  const get_total_price = () => {
    let res = 0;
    select.forEach(v => {
      res += ads[ads.findIndex(e => e.name === v)].price;
    })
    return res.toLocaleString();
  }

  const get_all_ads = () => {
    let res = '';
    select.forEach((v, i) => {
      res += v
      if(i + 1 !== select.length) res += ', '
    })
    return res;
  }

  return (
    <Col gap={16} width={'fill'}>
      <Subject_section step={'end'}/>
      <Col gap={32} width={'fill'}>
        <Col gap={8} width={'fill'}>
          <Typo.Title color={'variable'} emphasize>
            결제 완료됐어요!
          </Typo.Title>
          <Typo.Contents color={'dim'} isPre={'wrap'}>
            입금 확인 후 배너가 적용되요{'\n'}
            배너가 적용되면 확인 문자를 보내드릴게요
          </Typo.Contents>
          <Row width={'fill'} justifyContents={'end'}>
            <BaseButton
              className={button.grayButton44}
              onClick={() => router.push('/my/ads')}
            >
              <Typo.SubBody>
                나의 광고로 돌아가기
              </Typo.SubBody>
              <ArrowAltIcon/>
            </BaseButton>
          </Row>
        </Col>
        <Col gap={16} width={'fill'}>
          <Table className={style.buy_table}>
            <Buy_table_row title={'총 구매금액'} contents={
              <Typo.Contents width={'fill'} isPre={'wrap'}>
                {get_total_price()}
              </Typo.Contents>
            }/>
            <Buy_table_row title={'선택한 광고'} contents={
              <Typo.Contents width={'fill'} isPre={'wrap'}>
                {get_all_ads()}
              </Typo.Contents>
            }/>
          </Table>
          <Table
            className={style.buy_table}
            head={<Ad_table_head/>}
          >
            {select.map(v => {
              const idx = ads.findIndex(e => e.name === v);
              const current_date = new Date();
              const end_date = new Date(current_date);
              end_date.setDate(current_date.getDate() + ads[idx].duration)
              return <Ad_table_row
                key={v}
                name={ads[idx].name}
                price={ads[idx].price}
                end_date={end_date}
              />
            })}
          </Table>
        </Col>
      </Col>
    </Col>
  );
}

function Ad_table_head() {
  return <TableHead>
    <Typo.Contents width={'fill'}>
      이름
    </Typo.Contents>
    <Typo.Contents width={'fill'}>
      금액
    </Typo.Contents>
    <Typo.Contents width={'fill'} isPre={'wrap'}>
      광고 종료일
    </Typo.Contents>
  </TableHead>
}

function Ad_table_row({
  name,
  price,
  end_date
}: {
  name: string,
  price: number,
  end_date: Date
}) {
  const processed_date = `${end_date.getFullYear()}.${end_date.getMonth() + 1}.${end_date.getDate()}`
  return <TableRow className={style.buy_table_row}>
    <Typo.Contents width={'fill'} isPre={'wrap'}>
      {name}
    </Typo.Contents>
    <Typo.Contents width={'fill'} isPre={'wrap'}>
      {price.toLocaleString()}
    </Typo.Contents>
    <Typo.Contents width={'fill'} isPre={'wrap'}>
      {processed_date}
    </Typo.Contents>
  </TableRow>
}
