import React, { useCallback, useState } from 'react'
import { TabPropsType } from '../Challenges'

export default function Tab({ tabList, onChange, defaultValue }: { tabList: TabPropsType[], onChange?: (value: string) => void, defaultValue: string }) {
  const [tab, setTab] = useState('')
  const handleClickTab = useCallback((value: string) => {
    setTab(value)
    onChange?.(value)
  }, [tabList])

  return (
    <div className='flex justify-between gap-1'>
      {
        tabList.map((tabItem: TabPropsType, index) => {
          return (
            <div key={index} className={`flex-1 hover:text-[--color-type-2] text-center  cursor-pointer p-2 rounded-lg ${tab.length ? tab === tabItem.value ? 'bg-[--color-type-4]' : '' : defaultValue === tabItem.value && 'bg-[--color-type-4]'} ${tabItem?.className ?? ''}`} onClick={() => handleClickTab(tabItem.value)}>
              {
                tabItem.value
              }
            </div>
          )
        })
      }
    </div>
  )
}
