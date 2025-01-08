import {Col} from "@/components/atoms/layout";
import Faq_item from "@/features/customer/faq/ui/Faq_item";
import company_faq_data from "@/features/customer/faq/lib/company_faq_data";

export default function Company_faq() {
  return (
    <Col width={'fill'} gap={24}>
      {company_faq_data.map((v, i) => (
        <Faq_item key={i} {...v}/>
      ))}
    </Col>
  )
}
