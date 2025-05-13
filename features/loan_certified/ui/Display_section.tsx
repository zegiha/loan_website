'use client'
import style from './style.module.scss'
import Typo from "@/components/atoms/typo/Typo";
import {Col, Row} from "@/components/atoms/layout";
import {BaseTextInput} from "@/components/molecules/inputs";
import Image from "next/image";
import BG from '@/public/img/certifiedCompanyBG.webp'
import {useEffect, useState} from "react";

export default function Display_section({
                                          search,
                                          set_search
                                        }: {
  search: string,
  set_search: React.Dispatch<React.SetStateAction<string>>
}) {
  const [prev, setPrev] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (prev !== search) {
        set_search(prev);
      }
    }, 250); // 500ms 동안 입력이 없으면 set_search 호출

    return () => clearTimeout(timeout); // 입력 중이면 타이머 초기화
  }, [prev]);

  return (
    <div className={style.display_section}>
      <Col gap={24} className={style.display_wrapper} width={'fill'}>
        <Col>
          <Row>
            <Typo.Body isPre={'nowrap'} color={'primary'} emphasize>
              {'~~에서 '}
            </Typo.Body>
            <Typo.Body isPre={'nowrap'} color={'variable'} emphasize>
              {'금감원 인증 '}
            </Typo.Body>
            <Typo.Body isPre={'nowrap'}>
              업체 조회로
            </Typo.Body>
          </Row>
          <Row>
            <Typo.Header emphasize color={'variable'} isPre={'nowrap'}>
              {'더욱 '}
            </Typo.Header>
            <Typo.Header emphasize color={'primary'} isPre={'nowrap'}>
              {'안전하게 '}
            </Typo.Header>
            <Typo.Header emphasize color={'variable'} isPre={'nowrap'}>
              대출 받으세요!
            </Typo.Header>
          </Row>
          <Typo.Caption color={'dim'} width={'fill'} isPre={'wrap'}>
            {'본 서비스는 금융위원회와 금융감독원이 제공하는 데이터를 기반으로 제작되었습니다.\n정식 대부업체는 기준금리를 넘거나 광고용 전화번호를 임의로 변경하지 않습니다.\n과도한 빚은 고통의 시작이며 신용불량자가 되는 지름길입니다.'}
          </Typo.Caption>
        </Col>
        <BaseTextInput
          width={'fill'}
          maxWidth={320}
          size={'big'}
          placeholder={'업체명으로 검색할 수 있어요'}
          value={prev}
          onChangeAction={(v) => setPrev(v)}
        />
      </Col>
      <div className={style.display_section_background}>
        <Image
          src={BG}
          alt={'배경이미지'}
          fill
        />
      </div>
      <div className={style.display_section_background_blur}/>
    </div>
  )
}
