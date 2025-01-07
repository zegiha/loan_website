'use client'

import {Col, Row} from "@/components/atoms/layout";
import {BaseTextInput} from "@/components/molecules/inputs";
import SearchTypeTextInput from "@/components/molecules/inputs/textInputs/searchTypeTextInput/SearchTypeTextInput";
import {useState} from "react";
import Announcement_table from "@/features/customer/announcement/ui/Announcement_table";
import style from './style.module.scss'
import Typo from "@/components/atoms/typo/Typo";

const SEARCHTYPE = ['제목 및 내용', '제목', '내용', '금액']

export default function Announcement_contents() {
  const [search, setSearch] = useState<string>('')

  const [activeSearchType, setActiveSearchType] = useState<string>('제목 및 내용')

  return (
    <Col width={'fill'} gap={16}>
      <Typo.Body emphasize color={'variable'}>
        공지사항
      </Typo.Body>
      <Col width={'fill'} gap={12}>
        <Row width={'fill'} gap={16} className={style.topTableControlSection}>
          <Row width={'fill'}>
            <BaseTextInput
              placeholder={'검색어를 입력해주세요'}
              size={'normal'}
              value={search}
              onChangeAction={(v) => setSearch(v)}
              SelectType={<SearchTypeTextInput
                size={'normal'}
                active={activeSearchType}
                setActiveType={setActiveSearchType}
                searchType={SEARCHTYPE}
              />}
            />
          </Row>
        </Row>
        <Announcement_table/>
      </Col>
    </Col>
  );
}
