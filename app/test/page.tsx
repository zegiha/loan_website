'use client'

import Select from '@/components/molecules/inputs/select/Select'
import {useState} from 'react'

export default function Page() {
  const [selected, setSelected] = useState<Array<number>>([])

  return (
    <div style={{width: '100%'}}>
      <Select
        option={['a', 'b', 'c']}
        placeholder={'test'}
        selected_idx={selected}
        set_selected_idx={setSelected}
        selectNumber={3}
      />
    </div>
  )
}