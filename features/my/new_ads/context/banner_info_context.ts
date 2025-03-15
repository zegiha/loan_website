'use client'

import {createContext, useContext} from "react";
import {TAds_name, TAll_req} from "@/shared/type";

interface IBanner_info_context {
  ad_req_data: Array<{name: TAds_name, req_data: TAll_req}>,
  set_ad_req_data: React.Dispatch<React.SetStateAction<Array<{name: TAds_name, req_data: TAll_req}>>>,
}

export const Banner_info_context = createContext<IBanner_info_context | null>(null);

export function use_banner_info_context() {
  const data = useContext(Banner_info_context);
  if(data === null) {
    throw new Error('초기 값 없이 banner_info_context 사용')
  }
  return data;
}
