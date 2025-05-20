import {TAll_req} from "@/shared/type";
import {useState} from "react";
import Editing from "@/features/my/ads/ui/edit_ad/Editing";
import Edit_data_context from "@/features/my/ads/context/edit_data_context";
import Edited from "@/features/my/ads/ui/edit_ad/Edited";
import {
  useAdsPublicControllerFindLineOne,
  useAdsPublicControllerFindOne
} from "@/entities/api/advertisement-public/advertisement-public";
import EditingLine from "@/features/my/ads/ui/edit_ad/EditingLine";

export default function Edit_ad({
	id,
}: {
	id: string
}) {
	const [step, set_step] = useState<0 | 1>(0)

  const {
    data: commonData,
    status: commonStatus,
  } = useAdsPublicControllerFindOne(id)

  const {
    data: lineData,
    status: lineStatus,
  } = useAdsPublicControllerFindLineOne(id)

	const [edit_data, set_edit_data] = useState<TAll_req | null>(null)
	const [validates, set_validates] = useState<Array<{status: boolean, errormessage: string}>>([])
	const [price, set_price] = useState<number>(-1)

	const default_value = {
		edit_data, set_edit_data,
		validates, set_validates,
		price, set_price,
	}

	switch(step) {
		case 0:
			return (
				<Edit_data_context.Provider value={default_value}>
          {commonStatus === 'success' && commonData && (
            <Editing
              adData={commonData}
              ad_name={commonData.ad_name}
              set_step={set_step}
            />
          )}
          {lineStatus === 'success' && lineData && (
            <EditingLine
              adData={lineData}
              set_step={set_step}
            />
          )}
				</Edit_data_context.Provider>
			)
		case 1: return <Edited/>
	}
}
