'use client'

import {CompanyCardGrid} from "@/components/organisms";
import Section from "@/components/molecules/Layout/section/Section";
import {
  adsPublicControllerSearchAds,
  useAdsPublicControllerSearchAds
} from '@/entities/api/advertisement-public/advertisement-public'
import {userControllerProfileById} from '@/entities/api/user/user'
import {AdResponseDto, UserResponseDto} from '@/entities/const'
import {useFetch} from "@/shared/hooks";
import {get_company_banner} from "@/shared/api";
import {Banner} from "@/components/molecules";
import {useEffect, useState} from "react";
import {ICompany_banner_data} from "@/shared/type";
import dynamic from "next/dynamic";
import load from '@/public/assets/load_dot_120.json'

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(m => m.Player),
  {ssr: false}
)

export default function MainRegisteredCompanySection() {
  const [target, set_target] = useState<HTMLDivElement | null>(null)
  const [ads, setAds] = useState<Array<AdResponseDto> | null>(null)
  const [data, setData] = useState<Array<ICompany_banner_data> | null>(null)

  const handleAds = async () => {
    try {
      const res = await adsPublicControllerSearchAds('메인 배너광고',)
      setAds(res)
    } catch(e) {
      console.error('search ads error: ', e)
    }
  }

  useEffect(() => {
    handleAds()
  }, [])

  useEffect(() => {
    if(ads) {
      const res: Array<ICompany_banner_data> = []
      ads.forEach(v => {
        let bannerImage = v.cover_img ?? v.image_url
        if(bannerImage?.includes('example') || !bannerImage)
          bannerImage = "https://d3b0fhpuvmp33e.cloudfront.net/96737f14-e2ac-4ae7-ac7c-04146a4be6bd.png"
        res.push({
          id: v.id,
          title: v.title ?? '',
          subtitle: v.sub_title ?? '',
          name: 'dummy',
          img_url: bannerImage,
          // phone: user.advertisementTel,
          phone: 'dummy',
          location: v.loan_available_location ?
            v.loan_available_location.join(', ') :
            '전체'
        })
      })
      setData(p => {
        if(p) return [...p, ...res]
        return [...res]
      })
    }
  }, [ads]);

  // const observer = new IntersectionObserver((entries) => {
  //   entries.forEach((entry) => {
  //     if(entry.isIntersecting) {
  //       // refetch()
  //     }
  //   })
  // }, {
  //   root: document.querySelector('#scrollArea'),
  //   rootMargin: '0px',
  //   threshold: 0.3,
  // })

  return (
    <Section backgroundColor={'surfaceDim'}>
      <CompanyCardGrid>
        {data !== null && data.map((v, i) => (
          <Banner
            key={i}
            {...v}
          />
        ))}
      </CompanyCardGrid>
      <div ref={set_target} style={{width: '100%'}}>
        {/*{is_loading && <Player src={load} autoplay loop style={{height: 24}} />}*/}
      </div>
    </Section>
  );
}


