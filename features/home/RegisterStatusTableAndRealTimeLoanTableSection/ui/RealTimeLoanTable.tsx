'use server'
import Table from "@/components/organisms/table/Table";
import TableHead from "@/components/molecules/table/TableHead";
import Typo from "@/components/atoms/typo/Typo";
import {TRealTimeLoan} from "@/features/home/RegisterStatusTableAndRealTimeLoanTableSection/type";
import getRealTimeLoan from "@/features/home/RegisterStatusTableAndRealTimeLoanTableSection/api/getRealTimeLoan";
import TableRow from "@/components/molecules/table/TableRow";

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
  writedTime,
}: TRealTimeLoan) {
  return <TableRow>
    <Typo.Contents width={70}>
      {location}
    </Typo.Contents>
    <Typo.Contents width={'fill'} textOverflowLine={1}>
      {title}
    </Typo.Contents>
    <Typo.Contents width={60} color={'dim'}>
      {writedTime}
    </Typo.Contents>
  </TableRow>;
}
