import {Table} from "@/components/organisms";
import React from "react";
import Typo from "@/components/atoms/typo/Typo";
import {useSelect_context} from "@/features/my/new_ads/context/select_context";
import {Row} from "@/components/atoms/layout";
import {ContentCopy} from "@/components/atoms/icons";
import style from '../style.module.scss';
import {BaseTextInput} from "@/components/molecules/inputs";
import Buy_table_row from "@/features/my/new_ads/ui/buy_new/Buy_table_row";

export default function Buy_table_section({
  depositor,
  setDepositor
}: {
  depositor: string
  setDepositor: React.Dispatch<React.SetStateAction<string>>
}) {

  const {select} = useSelect_context()

  const get_total_price = () => {
    let res = 0;
    select.forEach(v => {
      res += v.price
    })
    return res.toLocaleString();
  }

  return (
    <Table className={style.buy_table}>
      <Buy_table_row key={`${select}`} title={'총 결제금액'} contents={
        <Typo.Contents width={'fill'}>
          {get_total_price()}원
        </Typo.Contents>
      }/>
      <Buy_table_row title={'입금 계좌'} contents={
        <Row
          width={'fill'}
          alignItems={'center'}
          gap={4}
          onClick={() => {
            window.navigator.clipboard.writeText('국민은행 77390101562750').then(() => {
              alert('복사되었습니다')
            })
          }}
          style={{cursor: 'pointer'}}
        >
          <Typo.Contents
            width={'fill'}
            isPre={'wrap'}
            className={style.account_number}
          >
            국민은행 773901-01-562750 강진우
          </Typo.Contents>
          <ContentCopy color={'normal'} fill={false} size={16}/>
        </Row>
      }/>
      <Buy_table_row title={'입금자명'} contents={
        <BaseTextInput
          size={'normal'}
          maxWidth={200}
          placeholder={'입금자명을 입력해주세요'}
          value={depositor}
          onChangeAction={(v) => setDepositor(v)}
        />
      }/>
    </Table>
  );
}
