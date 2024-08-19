import React from 'react'

export default function DynamicLogo({style, alphabet}) {
  return (
    <div style={{
        background: 'linear-gradient(180deg, #A0DE7E 0%, #54CB68 100%)'
    }} className={`font-family-sf-pro-display flex items-center justify-center text-white text-[16.2px] font-bold leading-[36px] text-center ${style}`}>{alphabet}</div>
  )
}