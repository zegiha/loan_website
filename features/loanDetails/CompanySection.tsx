'use client'

import {DetailsContentsSection, TextTable} from "@/components/organisms";
import {Col, Divider, Row} from "@/components/atoms/layout";
import Image from "next/image";
import LoanDetailsTextTableRow from "@/features/loanDetails/ui/LoanDetailsTextTableRow";
import style from './loanDetails.module.scss'
import {useState} from "react";
import Modal from "@/components/molecules/modal/Modal";
import {CloseIcon} from "@/components/atoms/icons";
import {BaseButton} from "@/components/molecules/inputs";

export default function CompanySection({
  contents
}: {
  contents: Array<{title: string, contents: string}>,
}) {
  const [isOpenImgModal, setIsOpenImgModal] = useState<boolean>(false);

  return (
    <DetailsContentsSection subTitle={'업체'}>
      <Row gap={16} width={'fill'}>
        <TextTable>
          {contents.map((v, i) => (
            i < 3 && <LoanDetailsTextTableRow key={`${i}-first`} {...v}/>
          ))}
          <Divider/>
          {contents.map((v, i) => (
            i >= 3 && <LoanDetailsTextTableRow key={`${i}-second`} {...v}/>
          ))}
        </TextTable>
        <div className={style.imgContainer} onClick={() => setIsOpenImgModal(true)}>
          <Image
            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlROcXWBsxzaZwXERUSfV6eD92_-KLFAvjbg&s'}
            alt={'사업증'}
            width={120}
            height={140.3616}
            style={{objectFit: 'fill', borderRadius: 6}}
          />
        </div>
      </Row>
      <Modal isOpen={isOpenImgModal} setIsOpen={setIsOpenImgModal}>
        <div style={{position: 'relative', height: '100%'}} onClick={e => e.stopPropagation()}>
          <Col alignItems={'end'} gap={8} style={{height:'100%'}}>
            <BaseButton className={style.imgModalCloseButton} onClick={() => setIsOpenImgModal(false)}>
              <CloseIcon size={24} color={'white'}/>
            </BaseButton>
            <div className={style.modalImgContainer}>
              <div className={style.modalImgWrapper}>
                <Image
                  src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlROcXWBsxzaZwXERUSfV6eD92_-KLFAvjbg&s'}
                  alt={'사업증'}
                  fill
                  objectFit={'contain'}
                />
              </div>
            </div>
          </Col>
        </div>
      </Modal>
    </DetailsContentsSection>
  );
}
