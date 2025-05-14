'use client'

import Typo from "@/components/atoms/typo/Typo";
import {TableHead, TableRow} from "@/components/molecules";
import {ICompany_row_having_is_visible_company_name} from "@/shared/type";
import {Table} from "@/components/organisms";
import {useInfiniteQuery} from '@tanstack/react-query'
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {Row} from "@/components/atoms/layout";
import {adsPublicControllerFindLineAds} from "@/entities/api/advertisement-public/advertisement-public";
import {ScrollAdResponseDto} from "@/entities/const";

export default function RegisterStatusTable() {
  const [visible_company_name, set_visible_company_name] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null);

  // const {
  //   data,
  //
  // } = useInfiniteQuery({
  //   queryKey: ['mainLine'],
  //   queryFn: async ({pageParam=1}) => {
  //     const res = await adsPublicControllerFindLineAds('main', '25')
  //     return res
  //   },
  //   get
  // })

  const [data, setData] = useState<Array<ICompany_row_having_is_visible_company_name> | null>(null)

  const scrollAdDtoToICompanyRow = (v: Array<ScrollAdResponseDto>): Array<ICompany_row_having_is_visible_company_name> => {
    const res: Array<ICompany_row_having_is_visible_company_name> = []
    v.forEach(v => {
      res.push({
        id: v.company_id,
        location: v.loan_available_location?.join(', ') ?? '전체',
        loan_limit: v.loan_limit.toString(),
        title: v.title,
        name: v.company_name ?? '',
        is_visible_company_name: true
      })
    })
    return res
  }

  const handleFetchingData = async () => {
    try {
      const res = await adsPublicControllerFindLineAds('main', '25')
      setData(p => {
        if(p === null) return [...scrollAdDtoToICompanyRow(res)]
        return [...p, ...scrollAdDtoToICompanyRow(res)]
      })
    } catch(e) {
      console.error('registerStatusTable1: ', e)
    }
  }


  const handleResize = () => {
    if(ref.current) set_visible_company_name(ref.current.offsetWidth > 600);
  }
  useEffect(() => {
    handleFetchingData()
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Row width={'fill'} ref={ref}>
      <Table
        head={<RegisterStatusTableHead visible_company_name={visible_company_name}/>}
      >
        {data && data.map((v, i) => (
          <RegisterStatusTableRow
            key={i}
            {...v}
            is_visible_company_name={visible_company_name}
          />
        ))}
      </Table>
    </Row>
  );
}

function RegisterStatusTableHead({
  visible_company_name
}: {
  visible_company_name: boolean
}) {
  return <TableHead>
    <Typo.Contents width={70}>
      지역
    </Typo.Contents>
    <Typo.Contents width={'fill'}>
      제목
    </Typo.Contents>
    {visible_company_name && (
      <Typo.Contents width={100}>
        업체명
      </Typo.Contents>
    )}
  </TableHead>
}

function RegisterStatusTableRow({
  id,
  location,
  title,
  name,
  is_visible_company_name
}: ICompany_row_having_is_visible_company_name) {
  return <Link href={`/loan/${id}`} style={{width:'100%'}}>
    <TableRow>
      <Typo.Contents width={70}>
        {location}
      </Typo.Contents>
      <Typo.Contents width={'fill'} textOverflowLine={1}>
        {title}
      </Typo.Contents>
      {is_visible_company_name && (
        <Typo.Contents width={100} color={'dim'} textOverflowLine={1} isPre={'nowrap'}>
          {name}
        </Typo.Contents>
      )}
    </TableRow>
  </Link>
}
