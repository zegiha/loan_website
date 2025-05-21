'use client'

import {Col, Divider} from "@/components/atoms/layout";
import {DetailsTitleSection} from "@/components/organisms";
import AuthorSection from "@/features/postDetail/ui/AuthorSection";
import LoanSection from "@/features/postDetail/ui/LoanSection";
import ContentsSection from "@/features/postDetail/ui/ContentsSection";
import ConsultationAvailableCompaniesSection
  from "@/features/postDetail/ui/ConsultationAvailableCompaniesSection";
import {useLoanboardControllerFindOne} from "@/entities/api/loanboard/loanboard";
import {useParams} from "next/navigation";
import {ILoan_inquiry_detail} from "@/shared/type";
import {use_auth_store} from "@/shared/store/authStore";
import {useEffect} from "react";

export default function PostDetail() {
  const {postId} = useParams<{postId: string}>()
  const {
    data,
  } = useLoanboardControllerFindOne(postId, {
    query: {
      select: data => {
        const res: ILoan_inquiry_detail ={
          id: data.id,
          post: {...data},
          author: {
            ...data,
            monthly_income: data.monthly_income !== null ? data.monthly_income.toString() : undefined,
            is_job: data.job_status
          },
          loan: {
            location: data.available_location,
            amount: data.desired_amount.toString(),
            category: data.type
          }
        }
        return res
      }
    }
  })

  const {
    checkLogin,
  } = use_auth_store()

  useEffect(() => {
    checkLogin()
  }, []);

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
