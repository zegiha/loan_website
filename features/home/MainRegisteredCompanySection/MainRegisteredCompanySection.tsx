import Section from "@/components/molecules/section/Section";
import {Col} from "@/components/atoms/layout";
import CompanyCard from "@/components/molecules/companyCard/CompanyCard";
import style from './mainRegisteredCompanySection.module.scss'

export default function MainRegisteredCompanySection() {
  return (
    <Section backgroundColor={'surfaceDim'}>
      <Col alignItems={'center'} width={'fill'}>
        <Col width={'fill'} gap={24} style={{maxWidth: 1440}}>
          <div className={style.companyCardGrid}>
            {getDummies(12).map((v, i) => (
              <CompanyCard
                key={i}
                {...v}
              />
            ))}
          </div>
        </Col>
      </Col>
    </Section>
  );
}

interface IDummy {
  type: 'image' | 'vipText' | 'text';
  imgUrl?: string;
  variableTitle?: string;
  title: string | Array<{type: 'primary' | 'variable', data: string}>;
  phone: string;
  location: string;
  name: string;
}

function getDummies(dummyN: number | undefined = 5): Array<IDummy>{
  const item:IDummy = {
    type: 'image',
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlROcXWBsxzaZwXERUSfV6eD92_-KLFAvjbg&s',
    variableTitle: '무방문 무서류 당일 대출',
    title: '지역 시간 장소 제약X 월별 당일승인 당일송금',
    phone: '010-4612-4593',
    location: '전국',
    name: '스피드 대출',
  };
  const res: Array<IDummy> = [];
  while(dummyN--) {
    res.push(item);
  }
  return res;
}
