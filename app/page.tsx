import {Col} from "@/components/atoms/layout";
import {
  DisplaySection,
  PremiumBannerAndRealTimeLoanSection,
  MainRegisteredCompanySection,
} from "@/features/home";
import RegisterStatusTableAndRealTimeLoanTableSection
  from "@/features/home/RegisterStatusTableAndRealTimeLoanTableSection/ui/RegisterStatusTableAndRealTimeLoanTableSection";
import style from './home.module.scss';

export default function Home() {
  return (
    <Col width={'fill'}>
      <DisplaySection/>
      <PremiumBannerAndRealTimeLoanSection/>
      <MainRegisteredCompanySection/>
      <div className={style.divide_design_img}/>
      <RegisterStatusTableAndRealTimeLoanTableSection/>
    </Col>
  );
}
