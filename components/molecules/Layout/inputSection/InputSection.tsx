import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {CSSProperties} from "react";

export default function InputSection({
  title,
  style,
  children,
  isForm,
  formAction,
}: {
  title?: string,
  style?: CSSProperties,
  children: React.ReactNode
  isForm?: boolean
  formAction?: () => void
}) {
  const actual_style_parents: CSSProperties = style ?
    style : {flex: 1, width: '100%', padding: '64px 20px'}
  const actual_style_children: CSSProperties | undefined = !style ? {maxWidth: 320} : undefined

  if(isForm) return (
      <Col
        justifyContents={'center'}
        alignItems={'center'}
        style={actual_style_parents}
      >
        <Col gap={16} width={'fill'} style={actual_style_children}>
          {title && (
            <Typo.Body emphasize color={'variable'}>{title}</Typo.Body>
          )}
          <Col gap={16} width={'fill'}>
            {children}
          </Col>
        </Col>
      </Col>
  )
  else return (
    <Col
      justifyContents={'center'}
      alignItems={'center'}
      style={actual_style_parents}
    >
      <Col gap={16} width={'fill'} style={actual_style_children}>
        {title && (
          <Typo.Body emphasize color={'variable'}>{title}</Typo.Body>
        )}
        <Col gap={16} width={'fill'}>
          {children}
        </Col>
      </Col>
    </Col>
  )
}

