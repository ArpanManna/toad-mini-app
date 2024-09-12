import React, { forwardRef } from 'react'


type PatternProps = {
    handleBulbClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const Pattern = forwardRef<HTMLDivElement, PatternProps>(({handleBulbClick}, ref) => {
    
    return (
        <div className=' grid grid-cols-2 gap-4' ref={ref}>
            <div className="bulb" id="1" onClick={handleBulbClick}></div>
            <div className="bulb" id="2" onClick={handleBulbClick}></div>
            <div className="bulb" id="3" onClick={handleBulbClick}></div>
            <div className="bulb" id="4" onClick={handleBulbClick}></div>
            <div className="bulb" id="5" onClick={handleBulbClick}></div>
            <div className="bulb" id="6" onClick={handleBulbClick}></div>
            <div className="bulb" id="7" onClick={handleBulbClick}></div>
            <div className="bulb" id="8" onClick={handleBulbClick}></div>
        </div>
    )
})
export default Pattern
