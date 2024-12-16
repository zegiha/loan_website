import {Row} from "@/components/atoms/layout";

interface ICheckbox {
  contents: string
  name: string

}

export default function Checkbox() {
  return (
    <Row alignItems={'center'} gap={4}>
      <input type="checkbox"/>
    </Row>
  )
}
