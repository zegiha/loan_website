import {TableHead, TableRow} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import Link from "next/link";

export function RegisteredCompanyTableHead({
  visible_company_name
}: {
  visible_company_name: boolean;
}) {
  return <TableHead>
    <Typo.Contents width={60}>
      지역
    </Typo.Contents>
    <Typo.Contents width={80}>
      대출한도
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

export function RegisteredCompanyTableRow({
  location,
  loanLimit,
  title,
  name,
  visible_company_name,
}: {
  location: string,
  loanLimit: string,
  title: string,
  name: string,
  visible_company_name: boolean,
}) {
  return <Link href={`/loan/${name}`}>
    <TableRow>
      <Typo.Contents width={60}>
        {location}
      </Typo.Contents>
      <Typo.Contents width={80}>
        {loanLimit}
      </Typo.Contents>
      <Typo.Contents width={'fill'} textOverflowLine={1}>
        {title}
      </Typo.Contents>
      {visible_company_name && (
        <Typo.Contents width={100} textOverflowLine={1}>
          {name}
        </Typo.Contents>
      )}
    </TableRow>
  </Link>
}
