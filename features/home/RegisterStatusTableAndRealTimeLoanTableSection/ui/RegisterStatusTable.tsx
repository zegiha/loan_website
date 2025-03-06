'use client'

import Typo from "@/components/atoms/typo/Typo";
import {TableHead, TableRow} from "@/components/molecules";
import {ICompany_row_having_is_visible_company_name} from "@/shared/type";
import {Table} from "@/components/organisms";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {Row} from "@/components/atoms/layout";
import {useFetch} from "@/shared/hooks";
import {get_company_row} from "@/shared/api";

export default function RegisterStatusTable() {
  const [visible_company_name, set_visible_company_name] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null);
  const {data} = useFetch(() => get_company_row())

  const handleResize = () => {
    if(ref.current) set_visible_company_name(ref.current.offsetWidth > 600);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []);
  useEffect(() => {
    if(data !== null) handleResize()
  }, [data]);

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
        <Typo.Contents width={100} color={'dim'} textOverflowLine={1}>
          {name}
        </Typo.Contents>
      )}
    </TableRow>
  </Link>
}
