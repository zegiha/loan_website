'use client'

import React, {useRef, useState} from "react";
import Typo from "@/components/atoms/typo/Typo";
import style from './style.module.scss'
import {Chevron_icon} from "@/components/atoms/icons";
import {Col, Row} from "@/components/atoms/layout";

export default function Select({
  placeholder,
	option,
  selected_idx,
	set_selected_idx,
	max_option_item_show,
}: {
	placeholder: string
	option: Array<string>
	selected_idx: number | null
	set_selected_idx:
		(data: number | null) => void |
		React.Dispatch<React.SetStateAction<number | null>>
	max_option_item_show?: number
}) {
	const [is_open, set_is_open] = useState<boolean>(false)

	return (
		<div className={style.wrapper}>
			<button
				className={`${style.selection_container} ${is_open && style.selection_container_active}`}
				onClick={() => {set_is_open(prev => !prev)}}>
				<Typo.Contents
					width={'fill'}
					textAlign={'start'}
					color={selected_idx !== null ? 'generic' : 'dim'}
				>
					{selected_idx !== null ? option[selected_idx] : placeholder}
				</Typo.Contents>
				<Chevron_icon
					color={'dim'}
					size={20}
					deg={is_open ? -90 : 90}
				/>
			</button>
			<Option_container
				is_open={is_open}
				set_is_open={set_is_open}
				option={option}
				set_selected_idx={set_selected_idx}
				max_option_item_show={max_option_item_show}
				selected_idx={selected_idx}
			/>
		</div>
	)
}

function Option_container({
	is_open,
	set_is_open,
	option,
	set_selected_idx,
	max_option_item_show,
	selected_idx,
}:{
	is_open: boolean
	set_is_open: React.Dispatch<React.SetStateAction<boolean>>
	option: Array<string>
	set_selected_idx:
		(data: number | null) => void |
		React.Dispatch<React.SetStateAction<number | null>>
	max_option_item_show?: number
	selected_idx: number | null
}) {
	const ref = useRef<HTMLDivElement | null>(null)

	if(is_open)return (
		<Col
			ref={ref}
			width={'fill'}
			gap={2}
			className={`${style.option_container}`}
			style={{
				height: max_option_item_show ?
					`${(39.2 * max_option_item_show) + 18 + ((max_option_item_show-1)*2)}px` :
					undefined,
			}}
		>
			{option.map((v, i) => (
				<Row
					key={i}
					width={'fill'}
					className={i === selected_idx ? style.option_item_active : style.option_item}
					onClick={() => {
						set_selected_idx(i)
						set_is_open(false)
					}}
					onTransitionEnd={e => e.stopPropagation()}
				>
					<Typo.Contents>{v}</Typo.Contents>
				</Row>
			))}
		</Col>
	)
}
