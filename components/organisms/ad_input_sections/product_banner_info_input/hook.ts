import {IProduct_banner_info_input} from "@/components/organisms/ad_input_sections";
import {useEffect, useState} from "react";
import {IProduct_banner_req} from "@/shared/type";
import TLoan_production_type from "@/shared/type/TLoan_production_type";
import {loan_production_list} from "@/shared/constants";

export default function use_product_banner_info(): IProduct_banner_info_input {
	const [banner_info, set_banner_info] = useState<IProduct_banner_req>({
		title: '',
		subtitle: '',
		phone: '',
		banner_cover_img: null,
		product: null,
		loan_available_location: null,
	})
	const [available_productions, set_available_productions] = useState<Array<number | null>>([])
	const [check_available_productions, set_check_available_productions] = useState<Set<number>>(new Set())
	const [available_location, set_available_location] = useState<number | null>(null)
	const [production_num, set_production_num] = useState<number>(3)
	const [production_num_string, set_production_num_string] = useState<string>('3')

	useEffect(() => {
		set_available_productions(Array.from({length: production_num}).map(() => null))
		set_check_available_productions(new Set())
	}, [production_num])

	useEffect(() => {
		set_banner_info(prev => {
			const new_data = {...prev}
			const new_product: Array<TLoan_production_type> = []
			available_productions.forEach(v => {
				if(v !== null) new_product.push(loan_production_list[v])
			})
			new_data.product = new_product
			return {...new_data}
		})
	}, [available_productions])

	return {
		banner_info, set_banner_info,
		available_productions, set_available_productions,
		check_available_productions, set_check_available_productions,
		available_location, set_available_location,
		production_num, set_production_num,
		production_num_string, set_production_num_string,
	}
}