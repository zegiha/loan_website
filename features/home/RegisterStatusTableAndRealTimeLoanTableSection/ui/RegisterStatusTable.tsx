'use client'

import getRegisterCompany from "@/shared/api/getRegisterCompany";
import Typo from "@/components/atoms/typo/Typo";
import {TableHead, TableRow} from "@/components/molecules";
import {TRegisterStatus} from "@/shared/type";
import {Table} from "@/components/organisms";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {Row} from "@/components/atoms/layout";
import {set} from "immutable";

export default function RegisterStatusTable() {
  const [visible_company_name, set_visible_company_name] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null);

  const handleResize = () => {
    if(ref.current) {
      set_visible_company_name(ref.current.offsetWidth > 500);
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []);

  return (
    <Row ref={ref}>
      <Table
        head={<RegisterStatusTableHead visible_company_name={visible_company_name}/>}
      >
        {getRegisterCompany().map((v, i) => (
          <RegisterStatusTableRow
            key={i}
            {...v}
            visible_company_name={visible_company_name}
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
  location,
  title,
  companyName,
  visible_company_name,
}: TRegisterStatus) {
  return <Link href={`/loan/${companyName}`}>
    <TableRow>
      <Typo.Contents width={70}>
        {location}
      </Typo.Contents>
      <Typo.Contents width={'fill'} textOverflowLine={1}>
        {title}
      </Typo.Contents>
      {visible_company_name && (
        <Typo.Contents width={100} color={'dim'} textOverflowLine={1}>
          {companyName}
        </Typo.Contents>
      )}
    </TableRow>
  </Link>
}
