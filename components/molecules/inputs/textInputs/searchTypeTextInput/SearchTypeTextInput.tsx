import Typo from "@/components/atoms/typo/Typo";
import {Col, Row} from "@/components/atoms/layout";
import {ArrowIcon} from "@/components/atoms/icons";
import {useEffect, useRef, useState} from "react";
import CheckIcon from "@/components/atoms/icons/CheckIcon";
import style from './searchTypeTextInput.module.scss'

interface ISearchTypeTextInput {
  searchType: Array<string>
  size: 'normal' | 'big'
  active: string,
  setActiveType: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchTypeTextInput({
  searchType,
  size,
  active,
  setActiveType
}: ISearchTypeTextInput) {
  const Text = size === 'normal' ? Typo.Contents : Typo.SubBody
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseleave = () => setIsOpen(false);
    if(ref.current) {
      ref.current.addEventListener('mouseleave',handleMouseleave)
    }
    return () => {
      ref.current?.removeEventListener('mouseleave', handleMouseleave)
    }
  }, []);

  return (
    <Col
      ref={ref}
      className={style.container}
    >
      <Row
        gap={4}
        alignItems={'center'}
        onClick={() => setIsOpen(true)}
        style={{cursor: 'pointer'}}
      >
        <Text color={'dim'} isPre>
          {active}
        </Text>
        <ArrowIcon
          size={20}
          color={'dim'}
          deg={90}
        />
      </Row>
      {isOpen && (
        <Row className={style.accordionContainer}>
          <Col className={style.accordionWrapper} gap={8} width={160}>
            {searchType.map((v) => (
            <Row
              key={v}
              width={'fill'}
              justifyContents={'space-between'}
              className={style.accordion}
              onClick={() => {
                setActiveType(v)
              }}
            >
              <Typo.Contents emphasize={v === active}>
                {`${v}`}
              </Typo.Contents>
              <CheckIcon
                size={20}
                color={v === active ? 'primary' : 'none'}
              />
            </Row>
            ))}
          </Col>
        </Row>
      )}
    </Col>
  );
}
