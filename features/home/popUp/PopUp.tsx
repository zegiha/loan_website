
'use client'

import {useEffect, useState} from 'react'
import { Col, Divider, Row } from "@/components/atoms/layout";
import style from './style.module.scss'
import Typo from "@/components/atoms/typo/Typo";
import { CloseIcon } from "@/components/atoms/icons";
import { create } from "zustand";
import Flex from "@/components/atoms/layout/flex/Flex";

const p1List = [
  '정책서민금융상품 이용이 가능한지 먼저 확인합니다. (서민금융진흥원 ☎1397)',
  '등록된 대부업체인지 반드시 먼저 확인 후 거래하세요.',
  '등록대부업체에 대출 문의 후 ‘등록 대부업체 통합조회’에 등록되지 않은 전화번호로 연락이 오는 경우 받지 않거나 바로 끊습니다.',
  '출처가 확인되지 않는 대출 관련 홈페이지, SNS 등에는 이름, 연락처 등 개인정보를 남기지 마세요. ',
  '신체사진, 지인 연락처, 휴대폰 애플리케이션 설치를 요구하는 업체는 불법업체이므로 거래를 중단하세요.',
  '연 20% 초과 대출금리 수취는 민·형사상 불법이고 초과분 이자계약은 무효입니다.',
  '대출조건을 꼼꼼히 확인하고 대부계약서를 꼭 요구해서 확인·보관하세요.',
  '통장 또는 휴대폰을 개통하여 넘기거나, 신분증을 대부업체 등 타인에게 맡겨서는 안됩니다. ',
  '채무자대리인 제도 및 경찰(☎112) · 금감원(☎1332+3) 신고를 적극 활용하세요.',
  '채무조정제도의 이용도 고려할 수 있습니다.',
]

const p2List = [
  '대출 상담시 본인이 대출한 업체를 잊지않기 위해 정확히 해당업체 상호명, 연락처 등 꼭 메모·저장 하시기 바랍니다.\n(업체상호명, 연락처 등 대출나라 홈페이지에서 검색 가능)',
  '대출을 목적으로 첫거래 고금리 대출(급전)을 강요하고 기타 수수료를 입금 후 월변등으로 한도를 높여주는 조건은 사기행위입니다.',
  '대출나라 담당자를 사칭하여 대출상담 및 대출을 권유하는 경우 절대 거래 응하지 마시기 바랍니다.\n(대출나라는 직접적인 대출 및 알선/중개를 하지 않습니다.)',
  '대면 미팅 명목으로 고객에게 출장비(거마비) 요구는 사기행위입니다.',
  '대출 알선 또는 대출 처리 비용 (공증비) 명목으로 고객에게 수수료, 선이자, 선입금 요구는 사기행위입니다.',
  '법적 최대 연 이자율은 20% 입니다. (추가, 수수료 비용 포함) 이자율 초과하여 수취 및 요구는 사기행위입니다.',
  '위임장, 인감증명서, 신분증 등 개인 정보가 담긴 중요 서류를 보낼 때는 업체 정보를 (상호,연락처) 다시 한번 확인하고 신중을 기해야 합니다.',
  '공인인증서 (ID, 비밀번호, OTP) 정보 요구시 절대 응하지 마시기 바랍니다.',
  '휴대폰, 통장, 신용카드, 체크카드 매매 혹은 양도 요구시 절대 응하지 마시기 바랍니다.\n(대포통장, 대포폰 사기범행에 이용 될 수 있습니다.)',
  '대출채권 추심자가 소속과 성명을 밝히지 않거나, 확인되지 않는 채권에 대해 일방적 변제 요구 시 절대 응하지 마시기 바랍니다.',
  '각종 연락처, SNS(텔레그렘, 카톡 등)로 접근하여 얼굴 및 신체 사진을 요구하는 경우 절대 응하지 마시길 바랍니다.',
]

interface IUsePopUp {
  p1: boolean | undefined
  setP1: (v: boolean) => void
  p2: boolean | undefined
  setP2: (v: boolean) => void
  initialized: boolean
  setInitialized: (v: boolean) => void
}

const usePopup = create<IUsePopUp>((set) => ({
  p1: undefined,
  setP1: (v) => set({ p1: v }),
  p2: undefined,
  setP2: (v) => set({ p2: v }),
  initialized: false,
  setInitialized: (v) => set({ initialized: v })
}))

export default function PopUp() {
  const { p1, setP1, p2, setP2, initialized, setInitialized } = usePopup()
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    // localStorage에서 초기값 가져오기
    const storedP1 = localStorage.getItem('popup-p1');
    const storedP2 = localStorage.getItem('popup-p2');

    const parsedP1 = storedP1 !== null ? JSON.parse(storedP1) : true;
    const parsedP2 = storedP2 !== null ? JSON.parse(storedP2) : true;

    // zustand 상태 업데이트
    setP1(parsedP1);
    setP2(parsedP2);
    setInitialized(true);
  }, [setP1, setP2, setInitialized]);
  // if (!initialized) return null
  const handleCloseP1 = () => {
    setP1(false);
    localStorage.setItem('popup-p1', JSON.stringify(false));
  };

  const handleCloseP2 = () => {
    setP2(false);
    localStorage.setItem('popup-p2', JSON.stringify(false));
  };

  useEffect(() => {
    const handleMobile = () => {
      if(window.innerWidth < 720) {
        setIsMobile(true)
      } else{
        setIsMobile(false)
      }
    }

    handleMobile()

    window.addEventListener('resize', handleMobile)

    return () => {
      window.removeEventListener('resize', handleMobile)
    }
  }, []);

  if (!initialized) return null

  return (
    <>
      {p1 && (
        <Col className={style.popupContainer} gap={12}>
          <Flex className={style.headerContainer} width={'fill'} justifyContents={'space-between'} alignItems={isMobile ? 'start' : 'end'}>
            {!isMobile ? (
              <Typo.Header color={'variable'} emphasize>
                대부업체 이용시 반드시 기억해야 할 10가지 유의사항
              </Typo.Header>
            ):(
              <Typo.Body color={'variable'} emphasize>
                대부업체 이용시 반드시 기억해야 할 10가지 유의사항
              </Typo.Body>
            )}
            <Typo.Contents color={'dim'}>
              대부중개플랫폼협의회
            </Typo.Contents>
          </Flex>
          <Divider/>
          <Col width={'fill'} gap={8}>
            {p1List.map((v, i) => (
              <Row key={i} width={'fill'} gap={4}>
                <Typo.Contents color={'variable'} emphasize>
                  {i + 1}.
                </Typo.Contents>
                <Typo.Contents>
                  {v}
                </Typo.Contents>
              </Row>
            ))}
          </Col>
          <Divider/>
          <Row width={'fill'} justifyContents={'end'}>
            <Row className={style.closeBox} gap={4} alignItems={'center'} onClick={handleCloseP1}>
              <Typo.Contents color={'dim'}>닫기</Typo.Contents>
              <CloseIcon size={20} color={'dim'} />
            </Row>
          </Row>
        </Col>
      )}
      {p2 && (
        <Col className={`${style.popupContainer} ${style.popupContainerSecond}`} gap={12}>
          <Flex className={style.headerContainer} width={'fill'} justifyContents={'space-between'} alignItems={isMobile ? 'start' : 'end'}>
            {!isMobile ? (
              <Typo.Header color={'variable'} emphasize>
                대출거래 시 주의사항
              </Typo.Header>
            ):(
              <Typo.Body color={'variable'} emphasize>
                대출거래 시 주의사항
              </Typo.Body>
            )}
            <Typo.Contents color={'dim'}>
              대부중개플랫폼협의회
            </Typo.Contents>
          </Flex>
          <Divider/>
          <Col width={'fill'} gap={8}>
            {p2List.map((v, i) => (
              <Row key={i} width={'fill'} gap={4}>
                <Typo.Contents color={'variable'} emphasize>
                  {i + 1}.
                </Typo.Contents>
                <Typo.Contents isPre={'wrap'}>
                  {v}
                </Typo.Contents>
              </Row>
            ))}
          </Col>
          <Divider/>
          <Row width={'fill'} justifyContents={'end'}>
            <Row className={style.closeBox} gap={4} alignItems={'center'} onClick={handleCloseP2}>
              <Typo.Contents color={'dim'}>닫기</Typo.Contents>
              <CloseIcon size={20} color={'dim'} />
            </Row>
          </Row>
        </Col>
      )}
    </>
  )
}
