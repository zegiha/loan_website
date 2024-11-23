import Flex from "@/components/atoms/layout/flex/Flex";
import {IRowAndCol} from "@/components/atoms/layout/flex/type";

export default function Row(props: IRowAndCol) {
  return <Flex flexDir='row' {...props}>
    {props.children}
  </Flex>
}
