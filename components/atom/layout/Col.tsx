import {IRowAndCol} from "@/components/atom/layout/type";
import Flex from "@/components/atom/layout/Flex";

export function Col(prop: IRowAndCol) {
  return <Flex flexDir="col" {...prop}>
    {prop.children}
  </Flex>
}
