import {ReactNode} from "react";
import {NoData} from "@/components/molecules";

export default function DataProvider({
  children,
  available
}: {
  children: ReactNode
  available: {
    isAvailable?: boolean
    notAvailableContents: string
  }
}) {
  if(available.isAvailable) {
    return <>{children}</>
  } else {
    return <NoData contents={available.notAvailableContents}/>
  }
}
