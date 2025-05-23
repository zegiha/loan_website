import {Col, Divider, Row} from '@/components/atoms/layout'
import Typo from '@/components/atoms/typo/Typo'
import style from '@/components/organisms/layout/footer/footer.module.scss'
import LogoImage from '@/public/assets/colorLogo.png'
import Image from 'next/image'

import img1 from '@/public/img/footer/1.png'
import img2 from '@/public/img/footer/2.png'
import img3 from '@/public/img/footer/3.png'
import img4 from '@/public/img/footer/4.png'
import img5 from '@/public/img/footer/5.png'
import Link from 'next/link'

const imgs = [
  {img: img1, href: 'https://www.fsc.go.kr/'},
  {img: img2, href: 'https://www.fss.or.kr/'},
  {img: img3, href: 'https://www.clfa.or.kr/'},
  {img: img4, href: 'https://www.ccrs.or.kr/'},
  {img: img5, href: 'https://www.credit.co.kr/'},
]

export default function TopSection() {
  return (
    <Col width={'fill'}>
      <Row
        width={'fill'}
        className={style.footerContainer}
        gap={16}
      >
        <div className={style.section}>
          <Image
            src={LogoImage}
            alt={'풋터 로고 이미지'}
            width={142}
            height={36}
          />
          <Col gap={12}>
            <Typo.SubBody emphasize color={'variable'}>
              고객센터
            </Typo.SubBody>
            <Col gap={8}>
              <Col gap={4}>
                <Typo.Contents emphasize>
                  정보
                </Typo.Contents>
                <Typo.Contents>
                  직통번호 : 070-8080-1728
                </Typo.Contents>
                <Typo.Contents>
                  351-1306-9323-03 옹양훈(MNG)대부중개
                </Typo.Contents>
              </Col>
              <Col gap={4}>
                <Typo.Contents emphasize>
                  영업시간
                </Typo.Contents>
                <Typo.Contents>
                  평일 9:30 - 18:00 / 점심시간 12:00 - 13:00
                </Typo.Contents>
                <Typo.Contents>
                  국경일 및 토, 일 휴무
                </Typo.Contents>
              </Col>
            </Col>
          </Col>
        </div>
        <Col gap={12} width={'fill'}>
          <Row gap={32} width={'fill'} className={style.section}>
            <Typo.Contents width={'fill'} color={'variable'} isPre>
              사이트명 : 대출센터{'\n'}
              상호명 : (MnG)대부중개{'\n'}
              대표자 : 옹양훈{'\n'}
              개인정보책임자 : 옹양훈{'\n'}
              주소 : 경기도 광주시 초월읍 산수로 497, 대보빌딩 4층{'\n'}
            </Typo.Contents>
            <Typo.Contents width={'fill'} color={'variable'} isPre>
              사업자등록번호 : 393-74-00636{'\n'}
              대부중개업등록번호 : 2024-경기광주-0002{'\n'}
              대부업등록기관 : 경기 광주 지방자치단체 031-760-4733{'\n'}
              통신판매업 신고 : 2024-경기이천-0577{'\n'}
              계좌번호 안내 : 농협은행 351-1306-9323-03 옹양훈(MNG)대부중개{'\n'}
            </Typo.Contents>
          </Row>
          <Typo.Contents>
            COPYRIGHT ⓒ 2025. (MnG)대부중개 ALL RIGHTS RESERVED.
          </Typo.Contents>
        </Col>
      </Row>
      <Divider/>
      <Row
        width={'fill'}
        className={style.footerContainer}
        alignItems={'center'}
        gap={16}
      >
        {imgs.map((v, i) => (
          <Link
            href={v.href}
            target={'_blank'}
            className={style.imgWrapper}
            key={i}
          >
            <Image
              src={v.img}
              alt={`footerImage-${i+1}`}
              fill
              objectFit={'contain'}
            />
          </Link>
        ))}
      </Row>
    </Col>
  )
}