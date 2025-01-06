import {Col, Divider, Row} from "@/components/atoms/layout";
import Image from "next/image";
import LogoImage from "@/public/assets/colorLogo.png";
import {BaseTextInput} from "@/components/molecules/inputs";
import {
  CampaignIcon,
  ClockIcon,
  CloseIcon,
  CompanyIcon,
  MenuIcon,
  SearchIcon,
  WarningIcon
} from "@/components/atoms/icons";
import {IIcon} from "@/components/atoms/icons/BaseIcon";
import Typo from "@/components/atoms/typo/Typo";
import React, {useEffect, useState} from "react";
import style from './headerTop.module.scss';
import Link from "next/link";
import Modal from "@/components/molecules/modal/Modal";
import {NavigationItem} from "@/components/molecules/Layout/headerBottom/HeaderBottom";
import {usePathname, useRouter} from "next/navigation";
import {use_auth_store} from "@/shared/store/authStore";
import Account_circle from "@/components/atoms/icons/Account_circle";

type TTopIconNavigation = 'company' | 'adContact' | 'recentlySeenCompany' | 'warnings' | 'account_circle';
interface ITopIconNavigation {
  icon: TTopIconNavigation,
  label: string,
  domain: string,
  onClick: () => void,
}

const topIconNavigation: Array<ITopIconNavigation> = [
  {icon: 'company', domain: '/login', label: '업체 로그인', onClick: () => {}},
  {icon: 'adContact', domain: '', label: '광고 문의', onClick: () => console.log('헤더 광고 문의')},
  {icon: 'recentlySeenCompany', domain: '', label: '최근 본 업체', onClick: () => console.log('헤더 최근 본 없체')},
  {icon: 'warnings', domain: '', label: '주의 사항', onClick: () => console.log('헤더 주의 사항')},
  {icon: 'account_circle', domain: '/my/ads', label: '마이페이지', onClick: () => {}}
];

const items =  [
  [
    {domain: '/loan/location', name: '지역별 업체 찾기'},
    {domain: '/loan/product', name: '상품별 업체 찾기'},
    {domain: '/post/list', name: '실시간 대출 문의'},
    // {domain: '/search', name: '맞춤 검색'},
  ],
  [
    // {domain: '/search/scam', name: '사기 번호 조회'},
    {domain: '/search/registered_company', name: '정식 업체 조회'},
    {domain: '/user_guied', name: '이용안내'},
    {domain: '/customer', name: '고객센터'}
  ]
];

export default function HeaderTop() {
  const [searchText, setSearchText] = useState('');
  // const [companySearchText, setCompanySearchText] = useState('');

  const [tabletHeader, setTabletHeader] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setTabletHeader(window.innerWidth < 920);
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={style.bigContainer}>
      <Row
        width={'fill'}
        alignItems={'center'}
        gap={16}
        className={style.bigWrapper}
      >
        <Link href={'/'}>
          <Image
            src={LogoImage}
            alt={'로고 이미지'}
            width={213}
            height={45}
          />
        </Link>
        <Row
          width={'fill'}
          gap={8}
          justifyContents={'center'}
          alignItems={'center'}
        >
          <Row width={'fill'} className={style.inputWrapper}>
            <BaseTextInput
              width={'fill'}
              maxWidth={440}
              size={'big'}
              placeholder={'검색어를 입력해주세요'}
              PlaceholderIcon={<SearchIcon size={24} color={'dim'}/>}
              value={searchText}
              onChangeAction={(v) => {
                setSearchText(v)
              }}
            />
          </Row>
          {/*<BaseTextInput*/}
          {/*  width={'fill'}*/}
          {/*  maxWidth={280}*/}
          {/*  size={'big'}*/}
          {/*  placeholder={'업체를 검색해주세요'}*/}
          {/*  PlaceholderIcon={<CompanyIcon size={24} color={'dim'}/>}*/}
          {/*  value={companySearchText}*/}
          {/*  onChangeAction={(e) => {*/}
          {/*    setCompanySearchText(e.target.value)*/}
          {/*  }}*/}
          {/*/>*/}
        </Row>
        {!tabletHeader && (
          <Row gap={16} className={style.iconNavigationContainer}>
            {topIconNavigation.map((v, i) => (
              <TopIconNavigation
                key={i}
                size={48}
                {...v}
              />
            ))}
          </Row>
        )}
        {tabletHeader && (
          <ModalHeader searchText={searchText} setSearchText={setSearchText}/>
        )}
      </Row>
    </div>
  );
}

function ModalHeader({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [modalHeader, setModalHeader] = useState(false);
  const {isLogin} = use_auth_store();
  return (
    <>
      <Row className={style.topIconNavigation} onClick={() => setModalHeader(true)}>
        <MenuIcon color={'dim'} size={32}/>
      </Row>
      <Modal isOpen={modalHeader}>
        <Col gap={32} className={style.modalHeader}>
          <Col gap={16} width={'fill'}>
            <Row justifyContents={'end'} width={'fill'}>
              {/*<Image*/}
              {/*  src={LogoImage}*/}
              {/*  alt={'로고 이미지'}*/}
              {/*  width={213}*/}
              {/*  height={45}*/}
              {/*/>*/}
              <Row className={style.topIconNavigation} onClick={() => {
                setModalHeader(false);
              }}>
                <CloseIcon/>
              </Row>
            </Row>
            <BaseTextInput
              width={'fill'}
              size={'big'}
              placeholder={'검색어를 입력해주세요'}
              PlaceholderIcon={<SearchIcon size={24} color={'dim'}/>}
              value={searchText}
              onChangeAction={(v) => {
                setSearchText(v)
              }}
            />
          </Col>
          <Col gap={24} width={'fill'}>
            <Col gap={12} width={'fill'}>
              {topIconNavigation.map((v, i) => (
                !(v.domain === '/login' && isLogin) ? !(v.domain === '/my/ads' && !isLogin) ? (
                  <Link href={v.domain} key={i} style={{width: '100%'}} onClick={() => setModalHeader(false)}>
                    <Row
                      width={'fill'}
                      alignItems={'center'}
                      gap={4}
                      className={pathname === v.domain ?
                        style.modalHeader_item_active :
                        style.modalHeader_item
                      }
                    >
                      <TopIcon icon={v.icon} size={20}/>
                      <Typo.Contents color={'dim'}>
                        {v.label}
                      </Typo.Contents>
                    </Row>
                  </Link>
                ) : <div key={i} style={{display: 'none'}}></div>
                  : <div key={i} style={{display: 'none'}}></div>
              ))}
            </Col>
            <Divider/>
            <Col gap={8} width={'fill'}>
              {items.map((v) => (
                v.map((v2) => (
                  <Link key={`${v2.domain}`} href={v2.domain} className={style.modalHeader_item} style={{width: '100%'}} onClick={() => setModalHeader(false)}>
                    <NavigationItem
                      isActive={pathname === v2.domain}
                      onClick={() => {
                        router.push(v2.domain)
                      }}
                      name={v2.name}
                    />
                  </Link>
                ))
              ))}
            </Col>
          </Col>
        </Col>
      </Modal>
    </>
  )
}

interface ITopIconNavigationProps extends ITopIconNavigation {
  size: number
}
function TopIconNavigation({
  icon,
  label,
  size,
  onClick,
  domain
}: ITopIconNavigationProps) {
  const {isLogin} = use_auth_store();
  if(isLogin && domain === '/login') return <></>
  if(!isLogin && domain.includes('/my')) return <></>
  return (
    <Link href={domain}>
      <Col
        gap={4}
        alignItems={'center'}
        className={style.topIconNavigation}
        onClick={() => onClick()}
      >
        <TopIcon
          icon={icon}
          size={size}
        />
        <Typo.Contents color={'dim'} width={'hug'}>
          {label}
        </Typo.Contents>
      </Col>
    </Link>
  );
}
function TopIcon({icon, size}: {icon: TTopIconNavigation, size: number}) {
  const iconProps: IIcon = {
    color: 'dim',
    size: size,
    fill: false,
  }
  return (
    <>
      {
        icon === 'company' ?
          <CompanyIcon
            {...iconProps}
          /> : icon === 'adContact' ?
            <CampaignIcon
              {...iconProps}
            /> : icon === 'recentlySeenCompany' ?
              <ClockIcon
                {...iconProps}
              /> : icon === 'warnings' ?
                <WarningIcon
                  {...iconProps}
                /> :
                  <Account_circle
                    {...iconProps}
                  />
      }
    </>
  );
}
