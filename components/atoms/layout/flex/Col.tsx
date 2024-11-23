import {IRowAndCol} from "@/components/atoms/layout/flex/type";
import Flex from "@/components/atoms/layout/flex/Flex";

export default function Col(prop: IRowAndCol) {
  return <Flex flexDir="col" {...prop}>
    {prop.children}
  </Flex>
}
