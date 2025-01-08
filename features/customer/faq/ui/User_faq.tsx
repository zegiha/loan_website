import {Col} from "@/components/atoms/layout";
import user_faq_data from "@/features/customer/faq/lib/user_faq_data";
import Faq_item from "@/features/customer/faq/ui/Faq_item";

export default function User_faq() {
  return (
    <Col width={'fill'} gap={24}>
      {user_faq_data.map((v, i) =>
        <Faq_item key={i} {...v}/>
      )}
    </Col>
  )
}
