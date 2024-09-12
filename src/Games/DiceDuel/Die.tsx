import React, { forwardRef } from 'react'

const Die = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div className="dice" ref={ref}>
            <div className="face dice-front"></div>
            <div className="face dice-back"></div>
            <div className="face dice-top"></div>
            <div className="face dice-bottom"></div>
            <div className="face dice-right"></div>
            <div className="face dice-left"></div>
        </div>
    )
})

export default Die;