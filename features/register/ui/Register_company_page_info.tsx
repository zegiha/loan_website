import CheckIcon from '@/components/atoms/icons/CheckIcon'
import {Col, Row} from '@/components/atoms/layout'
import Typo from '@/components/atoms/typo/Typo'
import {BaseButton, BaseTextInput, button} from '@/components/molecules/inputs'
import Select from '@/components/molecules/inputs/select/Select'
import InputSection from '@/components/molecules/Layout/inputSection/InputSection'
import {useRegister_data} from '@/features/register/context/register_data_context'
import {location_list} from '@/shared/constants'
import {is_typed} from '@/shared/helper'
import React, {useEffect, useState} from 'react'
import useRegister from "@/features/register/model/useRegister";
import dynamic from "next/dynamic";
import loadDot from '@/public/assets/load_dot_32.json'
import {ReloadIcon} from "@/components/atoms/icons";

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(m => m.Player),
  {ssr: false}
)

export default function Register_company_page_info({
  setStep
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>
}) {
  const data = useRegister_data()
  const {
    monthly_interest_rate, set_monthly_interest_rate,
    yearly_interest_rate, set_yearly_interest_rate,
    delinquent_interest_rate, set_delinquent_interest_rate,
    loan_limit, set_loan_limit,
    additional_cost, set_additional_cost,
    early_repayment_fee, set_early_repayment_fee,
    repayment_method, set_repayment_method,
    loan_period, set_loan_period,
    available_location, set_available_location,
    title, set_title,
    contents, set_contents,
  } = data
  const [locationIdx, setLocationIdx] = useState<Array<number>>([0])
  useEffect(() => {
    set_available_location(locationIdx.map(v => location_list[v]))
  }, [locationIdx])

  const {
    handleRegister,
    status
  } = useRegister()

  const handleNext = () => {
    if(
      is_typed(monthly_interest_rate) === null &&
      is_typed(yearly_interest_rate) === null &&
      is_typed(title) === null &&
      is_typed(contents) === null &&
      is_typed(available_location) === null
    ) {
      handleRegister()
    }
  }

  return (
    <InputSection title={'회원가입 - 업체상세 페이지 정보'} isForm formAction={handleNext}>
      <Col gap={32} width={'fill'}>
        <Col gap={16} width={'fill'}>
          {/* 월금리 */}
          <Col gap={4} width={'fill'}>
            <Row gap={4} alignItems={'center'}>
              <Typo.Contents color={'dim'}>
                월금리
              </Typo.Contents>
              <Typo.Caption color={'red'}>
                *필수
              </Typo.Caption>
            </Row>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={monthly_interest_rate}
              onChangeAction={v => set_monthly_interest_rate(v)}
              checkError={[is_typed]}
              placeholder={'월금리를 입력해주세요'}
            />
          </Col>

          {/* 연금리 */}
          <Col gap={4} width={'fill'}>
            <Row gap={4} alignItems={'center'}>
              <Typo.Contents color={'dim'}>
                연금리
              </Typo.Contents>
              <Typo.Caption color={'red'}>
                *필수
              </Typo.Caption>
            </Row>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={yearly_interest_rate}
              onChangeAction={v => set_yearly_interest_rate(v)}
              checkError={[is_typed]}
              placeholder={'연금리를 입력해주세요'}
            />
          </Col>

          {/* 연체 금리 */}
          <Col gap={4} width={'fill'}>
            <Typo.Contents color={'dim'}>
              연체 금리
            </Typo.Contents>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={delinquent_interest_rate}
              onChangeAction={v => set_delinquent_interest_rate(v)}
              // checkError={[is_typed]}
              placeholder={'연체 금리를 입력해주세요'}
            />
            <Typo.Caption color={'dim'}>
              비어있다면 '없음'으로 들어갑니다
            </Typo.Caption>
          </Col>

          {/* 대출한도 */}
          <Col gap={4} width={'fill'}>
            <Typo.Contents color={'dim'}>
              대출한도
            </Typo.Contents>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              TypingIcon={<Typo.Contents color={'dim'}>₩</Typo.Contents>}
              value={loan_limit}
              onChangeAction={v => set_loan_limit(v)}
              // checkError={[is_typed]}
              placeholder={'대출한도를 입력해주세요'}
            />
            <Typo.Caption color={'dim'}>
              비어있다면 '상담 후 결정'으로 들어갑니다
            </Typo.Caption>
          </Col>

          {/* 추가비용 */}
          <Col gap={4} width={'fill'}>
            <Typo.Contents color={'dim'}>
              추가비용
            </Typo.Contents>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              TypingIcon={<Typo.Contents color={'dim'}>₩</Typo.Contents>}
              value={additional_cost}
              onChangeAction={v => set_additional_cost(v)}
              // checkError={[is_typed]}
              placeholder={'추가비용이 있다면 입력해주세요'}
            />
            <Typo.Caption color={'dim'}>
              비어있다면 '없음'으로 들어갑니다
            </Typo.Caption>
          </Col>

          {/* 조기상환 수수료 */}
          <Col gap={4} width={'fill'}>
            <Typo.Contents color={'dim'}>
              조기상환 수수료
            </Typo.Contents>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={early_repayment_fee}
              onChangeAction={v => set_early_repayment_fee(v)}
              // checkError={[is_typed]}
              placeholder={'조기상환 수수료를 입력해주세요'}
            />
            <Typo.Caption color={'dim'}>
              비어있다면 '상담 후 결정'으로 들어갑니다
            </Typo.Caption>
          </Col>

          {/* 상환방식 */}
          <Col gap={4} width={'fill'}>
            <Typo.Contents color={'dim'}>
              상환방식
            </Typo.Contents>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={repayment_method}
              onChangeAction={v => set_repayment_method(v)}
              // checkError={[is_typed]}
              placeholder={'상환 방식을 입력해주세요'}
            />
            <Typo.Caption color={'dim'}>
              비어있다면 '상담 후 결정'으로 들어갑니다
            </Typo.Caption>
          </Col>

          {/* 대출 기간 */}
          <Col gap={4} width={'fill'}>
            <Typo.Contents color={'dim'}>
              대출 기간
            </Typo.Contents>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={loan_period}
              onChangeAction={v => set_loan_period(v)}
              // checkError={[is_typed]}
              placeholder={'대출기간을 입력해주세요'}
            />
            <Typo.Caption color={'dim'}>
              비어있다면 '상담 후 결정'으로 들어갑니다
            </Typo.Caption>
          </Col>

          {/* 대출 가능 지역 */}
          <Col gap={4} width={'fill'}>
            <Typo.Contents color={'dim'}>
              대출 가능 지역
            </Typo.Contents>
            <Select
              placeholder={'지역을 선택해주세요'}
              option={location_list}
              selected_idx={locationIdx}
              set_selected_idx={setLocationIdx}
              max_option_item_show={5}
              selectNumber={location_list.length}
            />
            <Typo.Caption color={'dim'}>
              여러개 선택 가능합니다
            </Typo.Caption>
          </Col>

          {/* 제목 */}
          <Col gap={4} width={'fill'}>
            <Row gap={4} alignItems={'center'}>
              <Typo.Contents color={'dim'}>
                제목
              </Typo.Contents>
              <Typo.Caption color={'red'}>
                *필수
              </Typo.Caption>
            </Row>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={title}
              onChangeAction={v => set_title(v)}
              checkError={[is_typed]}
              placeholder={'제목을 입력해주세요'}
            />
            <Typo.Caption color={'dim'}>
              "대출업체 등록 현황"에 제목으로 뜨는 란 입니다
            </Typo.Caption>
          </Col>

          {/* 부가설명 */}
          <Col gap={4} width={'fill'}>
            <Row gap={4} alignItems={'center'}>
              <Typo.Contents color={'dim'}>
                부가설명
              </Typo.Contents>
              <Typo.Caption color={'red'}>
                *필수
              </Typo.Caption>
            </Row>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              inputType={'textarea'}
              height={240}
              value={contents}
              onChangeAction={v => set_contents(v)}
              checkError={[is_typed]}
              placeholder={'부가설명을 입력해주세요'}
            />
            <Typo.Caption color={'dim'}>
              대출업체 상세 설명글 입니다
            </Typo.Caption>
          </Col>
        </Col>
        <Row width={'fill'} gap={12}>
          <BaseButton
            className={`${button.grayButton36} ${button.one_third_width}`}
            onClick={() => {
              window.scrollTo({top: 0})
              setStep(prev => prev - 1)
            }}
          >
            <Row gap={4} alignItems={'center'}>
              <Typo.Contents color={'dim'}>
                이전
              </Typo.Contents>
            </Row>
          </BaseButton>
          <BaseButton
            className={`${button.primary_button36} ${button.two_third_width}`}
            onClick={() => {handleNext()}}
            disabled={status === 'pending' || status === 'error'}
          >
            <Row gap={4} alignItems={'center'}>
              {status === 'idle' && (
                <>
                  <Typo.Contents emphasize color={'onPrimary'}>
                    완료
                  </Typo.Contents>
                  <CheckIcon color={'white'} />
                </>
              )}
              {status === 'error' && (
                <>
                  <ReloadIcon color={'white'}/>
                  <Typo.Contents emphasize color={'onPrimary'}>
                    다시시도
                  </Typo.Contents>
                </>
              )}
              {status === 'pending' && (
                <Player
                  src={loadDot}
                  style={{height: 16}}
                  autoplay
                  loop
                />
              )}
            </Row>
          </BaseButton>
        </Row>
      </Col>
    </InputSection>
  )
}
