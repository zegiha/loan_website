import {Col, Row} from "@/components/atoms/layout";
import Image from "next/image";
import LogoImage from "@/public/assets/colorLogo.png";
import {BaseTextInput} from "@/components/molecules/inputs";
import {CampaignIcon, ClockIcon, CompanyIcon, SearchIcon, WarningIcon} from "@/components/atoms/icons";
import {IIcon} from "@/components/atoms/icons/BaseIcon";
import Typo from "@/components/atoms/typo/Typo";
import {useState} from "react";
import style from './headerTop.module.scss';
import Link from "next/link";

type TTopIconNavigation = 'company' | 'adContact' | 'recentlySeenCompany' | 'warnings';
interface ITopIconNavigation {
  icon: TTopIconNavigation,
  label: string,
  onClick: () => void,
}

const topIconNavigation: Array<ITopIconNavigation> = [
  {icon: 'company', label: '업체 로그인', onClick: () => console.log('헤더 업체로그인')},
  {icon: 'adContact', label: '광고 문의', onClick: () => console.log('헤더 광고 문의')},
  {icon: 'recentlySeenCompany', label: '최근 본 업체', onClick: () => console.log('헤더 최근 본 없체')},
  {icon: 'warnings', label: '주의 사항', onClick: () => console.log('헤더 주의 사항')},
];

export default function HeaderTop() {

  const [searchText, setSearchText] = useState('');
  const [companySearchText, setCompanySearchText] = useState('');

  return (
    <div className={style.bigContainer}>
      <Row
        width={'fill'}
        alignItems={'center'}
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
          <BaseTextInput
            width={'fill'}
            maxWidth={440}
            size={'big'}
            placeholder={'검색어를 입력해주세요'}
            PlaceholderIcon={<SearchIcon size={24} color={'dim'}/>}
            value={searchText}
            onChangeAction={(e) => {
              setSearchText(e.target.value)
            }}
          />
          <BaseTextInput
            width={'fill'}
            maxWidth={280}
            size={'big'}
            placeholder={'업체를 검색해주세요'}
            PlaceholderIcon={<CompanyIcon size={24} color={'dim'}/>}
            value={companySearchText}
            onChangeAction={(e) => {
              setCompanySearchText(e.target.value)
            }}
          />
        </Row>
        <Row gap={16}>
          {topIconNavigation.map((v, i) => (
            <TopIconNavigation
              key={i}
              {...v}
            />
          ))}
        </Row>
      </Row>
    </div>
  );
}

function TopIconNavigation({
  icon,
  label,
  onClick
}: ITopIconNavigation) {
  const iconProps: IIcon = {
    color: 'dim',
    size: 48,
    fill: false,
  }
  return (
    <Col
      gap={4}
      alignItems={'center'}
      className={style.topIconNavigation}
      onClick={() => onClick()}
    >
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
              /> :
              <WarningIcon
                {...iconProps}
              />
      }
      <Typo.Contents color={'dim'} width={'hug'}>
        {label}
      </Typo.Contents>
    </Col>
  );
}
