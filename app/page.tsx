import {Col} from "@/components/atoms/layout";
import {
  DisplaySection,
  PremiumBannerAndRealTimeLoanSection,
  MainRegisteredCompanySection, PopUp,
} from "@/features/home";
import RegisterStatusTableAndRealTimeLoanTableSection
  from "@/features/home/RegisterStatusTableAndRealTimeLoanTableSection/ui/RegisterStatusTableAndRealTimeLoanTableSection";
import style from './home.module.scss';
import Quickbar_layout from "@/components/organisms/layout/Quickbar_layout";

export default function Home() {
  return (
    <Quickbar_layout>
      <Col width={'fill'}>
        <DisplaySection/>
        <PremiumBannerAndRealTimeLoanSection/>
        <MainRegisteredCompanySection/>
        <div className={style.divide_design_img}/>
        <RegisterStatusTableAndRealTimeLoanTableSection/>
        <PopUp/>
      </Col>
    </Quickbar_layout>
  );
}
