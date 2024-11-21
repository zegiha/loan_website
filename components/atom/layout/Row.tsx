import Flex from "@/components/atom/layout/Flex";
import {IRowAndCol} from "@/components/atom/layout/type";

export default function Row(props: IRowAndCol) {
  return <Flex flexDir='row' {...props}>
    {props.children}
  </Flex>
}
