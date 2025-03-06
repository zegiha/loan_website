'use client'

import {CompanyCardGrid} from "@/components/organisms";
import Section from "@/components/molecules/Layout/section/Section";
import {useFetch} from "@/shared/hooks";
import {get_company_banner} from "@/shared/api";
import {Banner} from "@/components/molecules";
import {useEffect, useState} from "react";
import {ICompany_banner_data} from "@/shared/type";

export default function MainRegisteredCompanySection() {
  const [real_data, set_real_data] = useState<Array<ICompany_banner_data> | null>(null)
  const {data, is_loading} = useFetch(() => get_company_banner('home'))
  const [target, set_target] = useState<HTMLDivElement | null>(null)

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        // refetch()
      }
    })
  }, {
    root: document.querySelector('#scrollArea'),
    rootMargin: '0px',
    threshold: 0.3,
  })

  useEffect(() => {
    set_real_data(prev => {
      if(prev === null) return data
      else if(data === null) return prev
      else return prev.concat(data)
    })
    if(target !== null) {
      if(data !== null) {
        observer.observe(target)
      }
      return () => {
        observer.unobserve(target)
      }
    }
  }, [data])

  return (
    <Section backgroundColor={'surfaceDim'}>
      <CompanyCardGrid>
        {real_data !== null && real_data.map((v, i) => (
          <Banner
            key={i}
            {...v}
          />
        ))}
      </CompanyCardGrid>
      <div ref={set_target} style={{width: '100%'}}>
        {is_loading && <div style={{width: '100%', height: 64, backgroundColor: 'red'}}/>}
      </div>
    </Section>
  );
}


