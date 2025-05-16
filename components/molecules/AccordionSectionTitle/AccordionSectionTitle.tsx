'use client';

import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {ArrowIcon} from "@/components/atoms/icons";
import {ReactNode, useRef, useState} from "react";
import style from './accordionSectionTitle.module.scss';
import CheckIcon from "@/components/atoms/icons/CheckIcon";

interface IAccordionSectionTitle {
  title: ReactNode | string;
  accordionData: Array<string>;
  activeAccordion: string;
  measurement: string;
  onAccordionActiveChangeAction: (activeData: string) => void;
  lastComment?: string;
}

export default function AccordionSectionTitle({
  title,
  accordionData,
  activeAccordion,
  measurement,
  onAccordionActiveChangeAction,
  lastComment
}: IAccordionSectionTitle) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  return (
    <Row
      ref={ref}
      alignItems={'center'}
      gap={8}
      className={style.sectionTitle}
      onClick={() => {
        setAccordionOpen(true)
      }}
    >
      {title}
      <Row gap={4} alignItems={'center'}>
        <Typo.SubBody color={'dim'}>
          {activeAccordion}
          {measurement}
        </Typo.SubBody>
        <ArrowIcon
          size={16}
          color={'dim'}
          deg={90}
        />
      </Row>
      {accordionOpen && (
        <Row
          className={style.accordionContainer}
        >
          <Col
            gap={8}
            width={160}
            className={style.accordionWrapper}
          >
            {accordionData.map((v, i) => (
              <Row
                key={v}
                width={'fill'}
                justifyContents={'space-between'}
                className={style.accordion}
                onClick={e => {
                  e.stopPropagation()
                  setAccordionOpen(false)
                  onAccordionActiveChangeAction(v)
                }}
              >
                <Typo.Contents emphasize={v === activeAccordion}>
                  {`${v}${measurement}`}
                  {i === accordionData.length-1 && lastComment && lastComment}
                </Typo.Contents>
                <CheckIcon
                  size={20}
                  color={v === activeAccordion ? 'primary' : 'none'}
                />
              </Row>
            ))}
          </Col>
        </Row>
      )}
    </Row>
  );
}
