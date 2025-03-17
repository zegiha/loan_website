'use client'

import {Col, Divider} from "@/components/atoms/layout";
import {DetailsTitleSection} from "@/components/organisms";
import AuthorSection from "@/features/postDetail/ui/AuthorSection";
import LoanSection from "@/features/postDetail/ui/LoanSection";
import ContentsSection from "@/features/postDetail/ui/ContentsSection";
import ConsultationAvailableCompaniesSection
  from "@/features/postDetail/ui/ConsultationAvailableCompaniesSection";
import {useFetch} from "@/shared/hooks";
import {get_loan_inquiry_detail} from "@/shared/api";

export default function PostDetail() {
  const {data} = useFetch(() => get_loan_inquiry_detail())

  if(data) return (
    <Col width={'fill'}>
      <DetailsTitleSection
        type={'post'}
        title={data.post.title}
        createdAt={data.post.createdAt}
      />
      <Divider height={8}/>
      <AuthorSection {...data.author}/>
      <Divider height={8}/>
      <LoanSection {...data.loan}/>
      <Divider height={8}/>
      <ContentsSection contents={data.post.contents}/>
      <Divider height={8}/>
      <ConsultationAvailableCompaniesSection id={data.id}/>
    </Col>
  );
}
