import {IProduct_banner_info_input} from "@/components/organisms/ad_input_sections";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton, BaseTextInput, button, File_input} from "@/components/molecules/inputs";
import {is_typed, to_won} from "@/shared/helper";
import Select from "@/components/molecules/inputs/select/Select";
import {loan_production_list, location_list} from "@/shared/constants";
import style from "@/features/my/new_ads/ui/buy_new/buy_new_ads.module.scss";
import {Upload_icon} from "@/components/atoms/icons";
import React, {useEffect} from "react";

export default function Product_banner_info_input({
	banner_info,
	set_banner_info,
	available_productions,
	set_available_productions,
	check_available_productions,
	set_check_available_productions,
	production_num,
	set_production_num,
	production_num_string,
	set_production_num_string,
	available_location,
	set_available_location,
  prevImg,
}: IProduct_banner_info_input){
	const handle_apply_production_num_string = () => {
		const processed_input: number = Number(production_num_string)
		if(processed_input >= 3 && processed_input <= 27) {
			set_production_num(processed_input)
		} else {
			if(processed_input < 3)   {
				alert('상품 카테고리 최소 갯수는 3개입니다')
				set_production_num_string('3')
				set_production_num(3)
			}
			else {
				alert('상품 카테고리 최대 개수는 27개입니다')
				set_production_num_string('27')
				set_production_num(27)
			}
		}
	}

  useEffect(() => {
    set_banner_info(p => ({
      ...p,
      loan_available_location: available_location.map(v => location_list[v])
    }))
  }, [available_location]);

	return (
		<>
			<Col gap={4} width={'fill'}>
				<Typo.Caption color={'dim'}>제목</Typo.Caption>
				<BaseTextInput
					width={'fill'}
					size={'normal'}
					value={banner_info.title}
					checkError={[is_typed]}
					onChangeAction={(v) => set_banner_info(prev => ({...prev, title: v}))}
					placeholder={'제목을 입력해주세요'}
				/>
			</Col>
			<Col gap={4} width={'fill'}>
				<Typo.Caption color={'dim'}>소제목</Typo.Caption>
				<BaseTextInput
					width={'fill'}
					size={'normal'}
					value={banner_info.subtitle}
					checkError={[is_typed]}
					onChangeAction={(v) => (set_banner_info(prev => ({...prev, subtitle: v})))}
					placeholder={'소제목을 입력해주세요'}
				/>
			</Col>
			<Col gap={4} width={'fill'}>
				<Typo.Caption color={'dim'}>상품 개수</Typo.Caption>
				<Row width={'fill'} gap={8}>
					<BaseTextInput
						width={'fill'}
						size={'normal'}
						value={production_num_string}
						inputType={'number'}
						onChangeAction={v => set_production_num_string(v)}
						placeholder={'상품 카테고리 개수를 입력해주세요'}
					/>
					<BaseButton
						className={button.grayButton36}
						onClick={handle_apply_production_num_string}
					>
						<Typo.Contents width={'hug'}>적용</Typo.Contents>
					</BaseButton>
				</Row>
			</Col>
			<Col gap={4} width={'fill'}>
				<Typo.Caption color={'dim'}>대출 가능 지역</Typo.Caption>
				<Select
					placeholder={'대출 가능 지역을 선택해주세요'}
					option={location_list}
					selected_idx={available_location}
					set_selected_idx={set_available_location}
					max_option_item_show={5}
          selectNumber={location_list.length}
				/>
			</Col>
      <Col gap={4} width={'fill'}>
        <Typo.Caption color={'dim'}>{`상품 카테고리, ${production_num}개`}</Typo.Caption>
        <Select
          placeholder={`상품 카테고리 ${production_num}개를 선택해주세요`}
          option={loan_production_list}
          selected_idx={available_productions}
          set_selected_idx={set_available_productions}
          max_option_item_show={5}
          selectNumber={production_num}
        />
      </Col>
			<Col gap={4} width={'fill'}>
				<Typo.Contents color={'dim'}>배너 이미지, 필수가 아닙니다</Typo.Contents>
				<File_input
					className={style.banner_file_input}
					set_data={(v) => {set_banner_info(prev => ({...prev, banner_cover_img: v}))}}
					placeholder={`배너 이미지를 끌어올리거나\n이 박스를 눌러 선택해주세요`}
					placeholder_icon={<Upload_icon color={'dim'} size={64}/>}
          prev_img={prevImg}
				/>
			</Col>
      <Col gap={4} width={'fill'}>
        <Typo.Caption color={'dim'}>대출한도</Typo.Caption>
        <BaseTextInput
          width={'fill'}
          size={'normal'}
          value={banner_info.loan_limit}
          onChangeAction={(v) => set_banner_info(prev => ({...prev, loan_limit: to_won(v)}))}
          placeholder={'대출한도를 입력해주세요'}
          TypingIcon={<Typo.Contents color={'dim'}>₩</Typo.Contents>}
        />
      </Col>
		</>
	)
}
