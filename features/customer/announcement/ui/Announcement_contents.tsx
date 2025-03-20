'use client'

import {Col} from "@/components/atoms/layout";
import Announcement_table from "@/features/customer/announcement/ui/Announcement_table";
import Typo from "@/components/atoms/typo/Typo";

export default function Announcement_contents() {
  return (
    <Col width={'fill'} gap={16}>
      <Typo.Body emphasize color={'variable'}>
        공지사항
      </Typo.Body>
      <Col width={'fill'} gap={12}>
        <Announcement_table/>
      </Col>
    </Col>
  );
}
