'use client'

import {Section} from "@/components/molecules";
import {BaseButton, button} from "@/components/molecules/inputs";
import style from './detailsTitleSection.module.scss';
import {Col, Row} from "@/components/atoms/layout";
import {ArrowIcon} from "@/components/atoms/icons";
import Typo from "@/components/atoms/typo/Typo";
import {TPrimaryAndGenericColorString} from "@/shared/type";
import {semantic} from "@/shared/color";
import {useState} from "react";
import Modal from "@/components/molecules/modal/Modal";
import {useRouter} from "next/navigation";

interface ILoanDetailsTitleSectionProps {
  type: 'loan'| 'post';
  title: TPrimaryAndGenericColorString;
  createdAt?: string;
}

export default function DetailsTitleSection({
  type,
  title,
  createdAt
}: ILoanDetailsTitleSectionProps) {
  const [isOpenWarning, setIsOpenWarning] = useState<boolean>(false)
  const router = useRouter()

  return (
    <Section backgroundColor={'surface'}>
      <BaseButton
        className={style.backButtonContainer}
        onClick={() => router.back()}
      >
        <Row gap={12} alignItems={'center'}>
          <ArrowIcon color={'dim'} deg={180}/>
          <Typo.SubBody color={'dim'}>돌아가기</Typo.SubBody>
        </Row>
      </BaseButton>
      {type === 'loan' && (
        <Typo.Contents emphasize color={'primary'}>
          대출정보를 보고 연락했다고 하시면 대출이 더욱 쉬워집니다!
        </Typo.Contents>
      )}
      <Row width={'fill'} gap={16}>
        <Typo.Title emphasize width={'fill'} textOverflowLine={2}>
          {title.map((v, i) => (
            v.type === 'primary' ? (
              <span
                key={i}
                className={semantic.onGenericOnGenericPrimary}
              >
                {v.contents}
              </span>
            ) : (v.contents)
          ))}
        </Typo.Title>
        {type === 'loan' && (
          <BaseButton
            className={button.grayButton44}
            onClick={() => setIsOpenWarning(true)}
          >
            <Typo.Contents>
              대출 시 주의사항 보기
            </Typo.Contents>
          </BaseButton>
        )}
      </Row>
      {type === 'post' && (
        <Typo.SubBody color={'dim'}>
          {createdAt}
        </Typo.SubBody>
      )}
      <Modal isOpen={isOpenWarning} setIsOpen={setIsOpenWarning}>
        <div onClick={e => e.stopPropagation()}>
          <Col width={'fill'} gap={24} className={style.warningContainer}>
            <Typo.Body emphasize>
              대출 시 주의사항
            </Typo.Body>
            <WarningModalContents/>
            <Row width={'fill'} justifyContents={'center'}>
              <BaseButton
                className={style.submitButton}
                onClick={() => setIsOpenWarning(false)}
              >
                <Typo.Contents emphasize color={'onPrimary'}>
                  전부 확인하신 후 눌러주세요
                </Typo.Contents>
              </BaseButton>
            </Row>
          </Col>
        </div>
      </Modal>
    </Section>
  );
}

const warningModalContentsData = [
  '대출 상담시 본인이 대출한 업체를 잊지 않기 위해 정확히 해당업체 상호명, 연락처 등 꼭 메모·저장 하시기 바랍니다.',
  {contents: '직접만나 대출상담시 다시 한 번 넷프로대출에 기재된 해당업체의 광고 전화번호로 통화해 직원 및 상호명이 맞는지 확인 후 진행 하시기 바랍니다.', subContents: '(업체상호명, 연락처 등 넷프로대출 홈페이지에서 검색 가능합니다.)'},
  '은행 등의 대출을 알선한다고 하면서 작업비, 선입금을 요구하는 행위는 100% 사기입니다.',
  '대면 미팅 명목으로 대출거래 진행 여부와 상관없이 출장비, 수수료를 고객에게 요구하는 행위는 불법입니다.',
  '휴대폰, 통장을 매매 혹은 양도하는 행위는 명백한 불법행위입니다.',
  '휴대폰, 통장, 신용카드, 체크카드, 신분증 등 송부를 요구하는 경우 절대 응하지 말 것!',
  '위임장, 인감증명서, 신분증 등 명의가 도용될 수 있는 서류를 상대방에게 보낼 때는 신중을 기할 것!',
  '신용확인등을 목적으로 첫거래 조건부 대출(급전)을 강요하는 행위는 고금리(불법이자)가능성이 있으며 급전 이용 후 월변으로 필요금액을 대출해주겠다는 말은 사기 가능성이 높습니다.',
  '법적 최대 연 이자율은 20% 입니다.',
]
function WarningModalContents() {
  return (
    <Col width={'fill'} gap={12}>
      {warningModalContentsData.map((v, i) => (
        <Row key={i} gap={8} alignItems={'center'}>
          <div className={style.warningNumberingBox}>
            <Typo.Contents>{i + 1}</Typo.Contents>
          </div>
          {typeof v === 'string' ? (
            <Typo.Contents>{v}</Typo.Contents>
          ) : (
            <Typo.Contents>
              {v.contents}
              <br/>
              <span className={semantic.onGenericOnGenericDim}>
                {v.subContents}
              </span>
            </Typo.Contents>
          )}
        </Row>
      ))}
    </Col>
  );
}
