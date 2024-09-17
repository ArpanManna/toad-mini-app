import React from 'react'

export default function DiceOption({diceSelectOptions, handleClick}) {
    return (
        <div className=' flex items-center justify-center  p-5'>
            <div className=' grid grid-cols-3 gap-[12px] w-[200px] items-center'>
                {
                    diceSelectOptions.map((item, index) => {
                        return (
                            <button type='button' key={index} onClick={() => handleClick(item.value)} className={`${item.className} flex items-center justify-center text-[18px] text-center font-[600] font-mono`}>
                                {item.value}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}
