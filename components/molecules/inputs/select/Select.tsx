'use client'

import React, {useEffect, useRef, useState} from "react";
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
	selectNumber=1,
}: {
	placeholder: string
	option: Array<string>
	selected_idx: Array<number>
	set_selected_idx:
		React.Dispatch<React.SetStateAction<Array<number>>>
	max_option_item_show?: number
	selectNumber?: number
}) {
	const [is_open, set_is_open] = useState<boolean>(false)

	const getSelectContents: () => string = () => {
		let res = '';
		selected_idx.forEach((v, i) => {
			res += option[v]
			if(i < selected_idx.length-1) res += ', '
		})
		if(res === '') return placeholder
		return res
	}

	return (
		<div className={style.wrapper}>
			<button
				className={`${style.selection_container} ${is_open && style.selection_container_active}`}
				onClick={(e) => {
					e.stopPropagation()
					console.log('hoho')
					set_is_open(p => !p)
				}}>
				<Typo.Contents
					width={'fill'}
					textAlign={'start'}
					color={getSelectContents() !== placeholder ? 'generic' : 'dim'}
				>
					{getSelectContents()}
				</Typo.Contents>
				<Chevron_icon
					color={'dim'}
					size={20}
					deg={is_open ? -90 : 90}
				/>
			</button>
			{is_open && (
				<Option_container
					set_is_open={set_is_open}
					option={option}
					set_selected_idx={set_selected_idx}
					max_option_item_show={max_option_item_show}
					selected_idx={selected_idx}
					selectNumber={selectNumber}
				/>
			)}
		</div>
	)
}

function Option_container({
	set_is_open,
	option,
	set_selected_idx,
	max_option_item_show,
	selected_idx,
	selectNumber,
}:{
	set_is_open: React.Dispatch<React.SetStateAction<boolean>>
	option: Array<string>
	set_selected_idx:
		React.Dispatch<React.SetStateAction<Array<number>>>
	max_option_item_show?: number
	selected_idx: Array<number>
	selectNumber: number
}) {
	const ref = useRef<HTMLDivElement | null>(null)

	const checkSelected: (idx: number) => boolean = (idx) => {
		return selected_idx.findIndex(v => v === idx) !== -1
	}

	useEffect(() => {
		const handleClick = () => {
			console.log('hahah')
			set_is_open(false)
		}

		document.body.addEventListener('mouseup', handleClick)

		return () => {
			document.body.removeEventListener('mouseup', handleClick)
		}
	}, []);

	return (
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
					className={checkSelected(i) ? style.option_item_active : style.option_item}
					onClick={e => {
						e.stopPropagation()
						set_selected_idx(p => {
							if(p.findIndex(v => v === i) === -1) {
								if(p.length + 1 > selectNumber)
									p = p.slice(1, p.length)
								p.push(i)
								return [...p]
							}
							return [...p.filter(v => v !== i)]
						})
						if(selectNumber === selected_idx.length)
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
