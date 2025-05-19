'use client'

import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import React, {useState} from "react";
import test from './file_input_style.module.scss'
import {reader} from "next/dist/experimental/testmode/fetch";

export default function File_input({
	className,
	set_data,
	placeholder,
	placeholder_icon,
  prev_img: defaultImg,
}: {
	className?: string
	set_data:
		(data: File) => void |
		React.Dispatch<React.SetStateAction<File | null>> |
		React.Dispatch<React.SetStateAction<File | undefined>>
	placeholder?: string
	placeholder_icon?: React.ReactNode,
  prev_img?: string | File,
}) {
  const parseDefaultImg = (img: string | File | undefined | null) => {
    if(img === undefined || img === null) return null
    if(typeof img === 'string') return img
    const reader = new FileReader()
    reader.readAsDataURL(img)
    return reader.onload = () => reader.result
  }

	const [prev_img, set_prev_img] = useState<string | ArrayBuffer | null>(parseDefaultImg(defaultImg))
	return (
		<div className={`${className && className} ${test.input_file_container}`}>
			<input
				className={test.input_file}
				type="file"
				accept="image/*"
				onChange={e => {
					const file = e.target.files?.[0]
					if (file) {
						const reader = new FileReader()
						reader.readAsDataURL(file)
						set_data(file)
						reader.onload = () => set_prev_img(reader.result)
					}
				}}
			/>
			<Col
				className={test.input_file_placeholder}
				justifyContents={'center'}
				alignItems={'center'}
				gap={4}
			>
				{prev_img ? (
					<img
						className={test.input_file_prev_img}
						src={prev_img.toString()}
						alt="brokerage prev img"
					/>
				) : (
					<>
						{placeholder_icon && placeholder_icon}
						<Typo.Caption
							color={'dim'}
							width={'hug'}
							textAlign={'center'}
							isPre
						>
							{placeholder && placeholder}
						</Typo.Caption>
					</>
				)}
			</Col>
		</div>
	)
}
