'use client'

import {Col, Divider} from "@/components/atoms/layout";
import Title_section from "@/features/customer/announcement_detail/ui/Title_section";
import {IAnnounccement_post} from "@/features/customer/announcement_detail/lib/type";
import {useEffect, useState} from "react";
import get_announcement_by_id from "@/features/customer/announcement_detail/api/get_announcement_by_id";
import Contents_section from "@/features/customer/announcement_detail/ui/Contents_section";

export default function PostDetail({
                                     params
                                   }: {
  params: {slug: string}
}) {
  const [post, setPost] = useState<IAnnounccement_post | null>(null)

  useEffect(() => {
    console.log(params.slug);
    setPost(get_announcement_by_id(params.slug))
  }, []);

  if(post !== null) {
    return (
      <Col width={'fill'}>
        <Title_section
          title={post.title}
          createdAt={post.created_date}
          view_cnt={post.view_cnt}
        />
        <Divider height={8}/>
        <Contents_section contents={post.contents}/>
      </Col>
    );
  } else {
    return (
      <Col width={'fill'} alignItems={'center'} style={{padding: 64}}>
        로딩 아이콘
      </Col>
    )
  }
}
