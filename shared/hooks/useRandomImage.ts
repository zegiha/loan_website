'use client'

import {useEffect, useState} from 'react'

export default function useRandomImage(defaultImg?: string) {
  const [img, setImg] = useState<string | undefined>(defaultImg === '' || !defaultImg ? undefined : defaultImg)

  useEffect(() => {
    if(img === undefined || img === '') {
      const i = Math.floor(Math.random() * 100)
      setImg(`/img/tmpImgs/${i}.jpg`)
    }
  }, []);

  return {img}
}
