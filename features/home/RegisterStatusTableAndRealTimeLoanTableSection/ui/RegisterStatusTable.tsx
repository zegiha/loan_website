import Table from "@/components/organisms/table/Table";
import getRegisterStatus from "@/features/home/RegisterStatusTableAndRealTimeLoanTableSection/api/getRegisterStatus";
import TableHead from "@/components/molecules/table/TableHead";
import Typo from "@/components/atoms/typo/Typo";
import TableRow from "@/components/molecules/table/TableRow";
import {TRegisterStatus} from "@/features/home/RegisterStatusTableAndRealTimeLoanTableSection/type";

export default function RegisterStatusTable() {
  return (
    <Table
      head={<RegisterStatusTableHead/>}
    >
      {getRegisterStatus().map((v, i) => (
        <RegisterStatusTableRow
          key={i}
          {...v}
        />
      ))}
    </Table>
  );
}

function RegisterStatusTableHead() {
  return <TableHead>
    <Typo.Contents width={70}>
      지역
    </Typo.Contents>
    <Typo.Contents width={'fill'}>
      제목
    </Typo.Contents>
    <Typo.Contents width={92}>
      업체명
    </Typo.Contents>
  </TableHead>
}
function RegisterStatusTableRow({
  location,
  title,
  companyName,
}: TRegisterStatus) {
  return <TableRow>
    <Typo.Contents width={70}>
      {location}
    </Typo.Contents>
    <Typo.Contents width={'fill'} textOverflowLine={1}>
      {title}
    </Typo.Contents>
    <Typo.Contents width={92} color={'dim'} textOverflowLine={1}>
      {companyName}
    </Typo.Contents>
  </TableRow>
}
