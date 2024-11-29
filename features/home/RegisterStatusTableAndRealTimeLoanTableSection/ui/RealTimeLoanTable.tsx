'use server'
import Typo from "@/components/atoms/typo/Typo";
import getRealTimeLoan from "@/shared/api/getRealTimeLoan";
import {Table} from "@/components/organisms";
import {TableHead, TableRow} from "@/components/molecules";
import {TRealTimeLoan} from "@/shared/type";

export default async function RealTimeLoanTable() {
  return (
    <Table
      head={<RealTimeLoanTableHead/>}
    >
      {getRealTimeLoan().map((v, i) => (
        <RealTimeLoanTableRow
          key={i}
          {...v}
        />
      ))}
    </Table>
  );
}

async function RealTimeLoanTableHead() {
  return <TableHead>
    <Typo.Contents width={70}>
      지역
    </Typo.Contents>
    <Typo.Contents width={'fill'}>
      제목
    </Typo.Contents>
    <Typo.Contents width={60}>
      작성시간
    </Typo.Contents>
  </TableHead>
}

async function RealTimeLoanTableRow({
  location,
  title,
  createdAt,
}: TRealTimeLoan) {
  return <TableRow>
    <Typo.Contents width={70}>
      {location}
    </Typo.Contents>
    <Typo.Contents width={'fill'} textOverflowLine={1}>
      {title}
    </Typo.Contents>
    <Typo.Contents width={60} color={'dim'}>
      {createdAt}
    </Typo.Contents>
  </TableRow>;
}
