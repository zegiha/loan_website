'use client'

import {Col, Divider} from "@/components/atoms/layout";
import Title_section from "@/features/customer/announcement_detail/ui/Title_section";
import {IAnnounccement_post} from "@/features/customer/announcement_detail/lib/type";
import Contents_section from "@/features/customer/announcement_detail/ui/Contents_section";
import {useParams} from "next/navigation";
import {useNoticeControllerGetNotice} from "@/entities/api/notice/notice";
import dynamic from "next/dynamic";
import load from '@/public/assets/load_dot_32.json'
import Typo from "@/components/atoms/typo/Typo";

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(m => m.Player),
  {ssr: false}
)

export default function PostDetail() {
  const {post_id} = useParams<{post_id: string}>()

  const {
    data,
    status,
  } = useNoticeControllerGetNotice(post_id, {
    query: {
      select: v => {
        const res: IAnnounccement_post = {
          ...v,
          created_date: new Date(v.updatedAt)
        }
        return res
      }
    }
  })

  if(status === 'success') {
    return (
      <Col width={'fill'}>
        <Title_section
          title={data.title}
          createdAt={data.created_date}
        />
        <Divider height={8}/>
        <Contents_section contents={data.contents}/>
      </Col>
    )
  }
  else return (
    <Col
      width={'fill'}
      style={{height: '60vh'}}
      justifyContents={'center'}
      alignItems={'center'}
    >
      {status === 'pending' ? (
        <Player
          src={load}
          autoplay
          loop
        />
      ): (
        <>
          <Typo.Body color={'dim'} emphasize>
            오류가 발생했습니다
          </Typo.Body>
          <Typo.Body color={'dim'} emphasize>
            새로고침 해주세요
          </Typo.Body>
        </>
      )}
    </Col>
  )
}
