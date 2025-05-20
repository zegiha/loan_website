'use client'

import {Col} from "@/components/atoms/layout";
import {TAds_name} from "@/shared/type";
import CommonAds from "@/features/my/ads/ui/ad_contents/CommonAds";
import ConsumableAds from "@/features/my/ads/ui/ad_contents/ConsumableAds";

export interface IMy_ads {
	id: string
	ad_name: TAds_name
	title?: string
	end_date?: Date
}

export default function Ad_contents() {

	return (
    <Col width={'fill'} gap={24}>
      <CommonAds/>
      <ConsumableAds/>
    </Col>
	);
}
