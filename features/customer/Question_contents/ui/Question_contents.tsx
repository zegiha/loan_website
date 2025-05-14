"use client";

import InputSection from "@/components/molecules/Layout/inputSection/InputSection";
import { Col } from "@/components/atoms/layout";
import {
  BaseButton,
  BaseTextInput,
  button,
} from "@/components/molecules/inputs";
import Typo from "@/components/atoms/typo/Typo";
import {
  formatting_phone_number,
  is_correct_phone_number,
  is_typed,
} from "@/shared/helper";
import { useState } from "react";
import { useContactControllerCreate } from "@/entities/api/contact/contact";

export default function Question_contents() {
  const [title, set_title] = useState<string>("");
  const [name, set_name] = useState<string>("");
  const [phone, set_phone] = useState<string>("");
  const [contents, set_contents] = useState<string>("");

  const { mutate: create_question } = useContactControllerCreate();

  const handle_question = () => {
    create_question({
      data: {
        title,
        author: name,
        tel: phone,
        contents,
      },
    });

    alert(
      "질문 등록이 완료되었어요!\n처리 후 입력하신 휴대전화로 문자를 보내드릴게요"
    );
  };
  return (
    <InputSection title={"1:1 문의하기"} style={{ width: "100%" }}>
      <Col gap={32} width={"fill"}>
        <Col gap={16} width={"fill"}>
          <Col gap={4} width={"fill"}>
            <Typo.Caption color={"dim"}>제목</Typo.Caption>
            <BaseTextInput
              width={"fill"}
              size={"normal"}
              value={title}
              placeholder={"제목을 입력해주세요"}
              onChangeAction={(v) => set_title(v)}
              checkError={[is_typed]}
            />
          </Col>
          <Col gap={4} width={"fill"}>
            <Typo.Caption color={"dim"}>작성자 이름</Typo.Caption>
            <BaseTextInput
              width={"fill"}
              size={"normal"}
              value={name}
              placeholder={"작성자 이름을 입력해주세요"}
              onChangeAction={(v) => set_name(v)}
              checkError={[is_typed]}
            />
          </Col>
          <Col gap={4} width={"fill"}>
            <Typo.Caption color={"dim"}>휴대폰 번호</Typo.Caption>
            <BaseTextInput
              width={"fill"}
              size={"normal"}
              value={phone}
              placeholder={"휴대폰 번호를 입력해주세요"}
              onChangeAction={(v) => set_phone(formatting_phone_number(v))}
              checkError={[is_typed, is_correct_phone_number]}
            />
          </Col>
          {/*<Col gap={4} width={'fill'}>*/}
          {/*  <typo.caption color={'dim'}>*/}
          {/*    인증번호*/}
          {/*  </typo.caption>*/}
          {/*  <basetextinput*/}
          {/*    width={'fill'}*/}
          {/*    size={'normal'}*/}
          {/*    value={title}*/}
          {/*    placeholder={'제목을 입력해주세요'}*/}
          {/*    onchangeaction={(v) => set_title(v)}*/}
          {/*    checkerror={[is_typed]}*/}
          {/*  />*/}
          {/*</col>*/}
          <Col gap={4} width={"fill"}>
            <Typo.Caption color={"dim"}>내용</Typo.Caption>
            <BaseTextInput
              inputType={"textarea"}
              width={"fill"}
              height={240}
              size={"normal"}
              value={contents}
              placeholder={"내용을 입력해주세요"}
              onChangeAction={(v) => set_contents(v)}
              checkError={[is_typed]}
            />
          </Col>
        </Col>
        <BaseButton
          className={button.primary_button36}
          onClick={handle_question}
        >
          <Typo.Contents color={"onPrimary"} emphasize>
            질문 보내기
          </Typo.Contents>
        </BaseButton>
      </Col>
    </InputSection>
  );
}
