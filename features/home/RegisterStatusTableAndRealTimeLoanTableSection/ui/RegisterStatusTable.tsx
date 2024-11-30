'use server'
import getRegisterCompany from "@/shared/api/getRegisterCompany";
import Typo from "@/components/atoms/typo/Typo";
import {TableHead, TableRow} from "@/components/molecules";
import {TRegisterStatus} from "@/shared/type";
import {Table} from "@/components/organisms";
import Link from "next/link";

export default async function RegisterStatusTable() {
  return (
    <Table
      head={<RegisterStatusTableHead/>}
    >
      {getRegisterCompany().map((v, i) => (
        <RegisterStatusTableRow
          key={i}
          {...v}
        />
      ))}
    </Table>
  );
}

async function RegisterStatusTableHead() {
  return <TableHead>
    <Typo.Contents width={70}>
      지역
    </Typo.Contents>
    <Typo.Contents width={'fill'}>
      제목
    </Typo.Contents>
    <Typo.Contents width={100}>
      업체명
    </Typo.Contents>
  </TableHead>
}
async function RegisterStatusTableRow({
  location,
  title,
  companyName,
}: TRegisterStatus) {
  return <Link href={`/loan/${companyName}`}>
    <TableRow>
      <Typo.Contents width={70}>
        {location}
      </Typo.Contents>
      <Typo.Contents width={'fill'} textOverflowLine={1}>
        {title}
      </Typo.Contents>
      <Typo.Contents width={100} color={'dim'} textOverflowLine={1}>
        {companyName}
      </Typo.Contents>
    </TableRow>
  </Link>
}
