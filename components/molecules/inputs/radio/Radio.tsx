import {Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import style from "./style.module.scss"

interface IRadio {
  name: string
  contents?: string
  children?: React.ReactNode
}

export default function Radio({
  name,
  contents,
  children,
}: IRadio) {
  return (
    <label>
      <Row
        alignItems={'center'}
        gap={4}
        className={style.container}
      >
        <input type="radio" name={name} className={style.radio}/>
        {contents && (
          <Typo.Contents>
            {contents}
          </Typo.Contents>
        )}
        {children && children}
      </Row>
    </label>
  )
}
