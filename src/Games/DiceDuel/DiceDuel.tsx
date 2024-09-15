import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Die from '../DiceDuel/Die';
import DiceOption from './DiceOption';
import Confetti from 'react-confetti'
import toast from 'react-hot-toast';
import { GameLoss, SelectIcon } from '../../assets/svg';
import { sleep } from '../../services';
import Header from '../Header';
import Icons from '../../icons/icons';
import axios from 'axios';
import { udpateGame } from '../../api';
import { config } from '../../../config';

export default function DiceDuel() {
    const userId = window.Telegram.WebApp?.initDataUnsafe?.user?.id ? window.Telegram.WebApp?.initDataUnsafe?.user?.id : '1745606996'
    const userName = window.Telegram.WebApp?.initDataUnsafe?.user?.username ? window.Telegram.WebApp?.initDataUnsafe?.user?.username : 'Beelionair'
    const [num, setNum] = useState({ selectedNum: null, randomNum: null, isWon: false, isLoading: false })
    const diceSelectOptions = useMemo(() => {
        const MAX_SIZE = 11
        return new Array(MAX_SIZE).fill(0).map((item, index) => ({ value: index + 2, className: num.selectedNum === index + 2 ? 'box-selected' : 'box' }))
    }, [num.selectedNum])
    const handleClick = useCallback((val: number) => {
        if (num.selectedNum !== val && !num.isLoading) {
            setNum(prevValue => ({ ...prevValue, selectedNum: val }))
        }
        else {
            if (num.isLoading) {
                toast(<div className='font-mono font-[600] text-[14px]'>Rolling...</div>, {
                    duration: 2000,
                    position: 'top-center',
                })
            }
        }
    }, [num])

    const diceRef = useRef([])
    const rollDice = useCallback(async (random: number, index: number) => {
        return new Promise((res) => {
            (diceRef.current[index] as HTMLElement).style.animation = 'rolling 4s';
            setTimeout(() => {
                switch (random) {
                    case 1:
                        (diceRef.current[index] as HTMLElement).style.transform = 'rotateX(0deg) rotateY(0deg)';
                        break;

                    case 6:
                        (diceRef.current[index] as HTMLElement).style.transform = 'rotateX(180deg) rotateY(0deg)';
                        break;

                    case 2:
                        (diceRef.current[index] as HTMLElement).style.transform = 'rotateX(-90deg) rotateY(0deg)';
                        break;

                    case 5:
                        (diceRef.current[index] as HTMLElement).style.transform = 'rotateX(90deg) rotateY(0deg)';
                        break;

                    case 3:
                        (diceRef.current[index] as HTMLElement).style.transform = 'rotateX(0deg) rotateY(90deg)';
                        break;

                    case 4:
                        (diceRef.current[index] as HTMLElement).style.transform = 'rotateX(0deg) rotateY(-90deg)';
                        break;

                    default:
                        break;
                }
                (diceRef.current[index] as HTMLElement).style.animation = 'none';
                res(random)
            }, 4050);
        })

    }, [])
    const randomDice = useCallback(async () => {
        if (num.selectedNum && !num.isWon && !num.isLoading) {
            const randomDiceNum1 = Math.floor(Math.random() * 6) + 1
            const randomDiceNum2 = Math.floor(Math.random() * 6) + 1
            setNum(prevValue => ({ ...prevValue, isLoading: true }))
            const resp: number[] = await Promise.all([rollDice(randomDiceNum1, 0), rollDice(randomDiceNum2, 1)])
            await sleep(1000)
            setNum(prevValue => ({ ...prevValue, randomNum: resp[0] + resp[1], isWon: prevValue.selectedNum === resp[0] + resp[1], isLoading: false }))
            if (num.selectedNum === resp[0] + resp[1]) {
                toast.success(`You Won! +${config.diceDual} TOAD has been credited to your ID`, {
                    duration: 3000
                });
                const data = JSON.stringify({
                    "userId": userId,
                    "userName": userName,
                    "meta": "Games",
                    "score": config.diceDual
                });

                udpateGame(data)
                setTimeout(() => {
                    setNum({ selectedNum: null, randomNum: null, isWon: false, isLoading: false })
                }, 4000);
            }
            else {
                toast(<div className=' font-mono font-[600] text-[14px] text-rose-500'>You Lose! Better Luck next Time</div>, {
                    icon: <GameLoss />,
                    duration: 2000,
                    position: 'top-center'
                })
            }
        }
        else {
            if (!num.isLoading) {
                toast(<div className=' font-mono font-[600] text-[14px]'>You can select your lucky number!</div>, {
                    duration: 2000,
                    position: 'top-center',
                    icon: <SelectIcon />
                })
            }
            else {
                toast(<div className='font-mono font-[600] text-[14px]'>Rolling...</div>, {
                    duration: 2000,
                    position: 'top-center',
                })
            }
        }
    }, [num])

    useLayoutEffect(() => {
        const dices = document.querySelectorAll('.dice')
        diceRef.current = [...dices]
    }, [])
    const infoHandleClick = useCallback(() => {
        toast(
            <div>
                <span className=' font-[700] font-mono text-[16px]'>
                    How to Play?
                </span>
                <ul className=' font-mono text-[14px] list-disc font-[600] pl-[12px]'>
                    <li>Select your lucky number.</li>
                    <li>Test your luck by clicking on roll dice.</li>
                    <li>If you win, {config.diceDual} TOAD will be credited.</li>
                </ul>
            </div>
        )
    }, [])
    return (
        <>
            {
                num.isWon && <Confetti />
            }
            <div className=' flex flex-col gap-4 num-bg h-full'>
                <Header handleClick={infoHandleClick} title={'Dice Duel'} svgKey={'diceIcon'} />
                <DiceOption diceSelectOptions={diceSelectOptions} handleClick={handleClick} />
                <div className=' flex gap-[48px] items-center justify-center'>
                    <Die ref={diceRef[0]} />
                    <Die ref={diceRef[1]} />
                </div>
                <button type='button' onClick={randomDice} className={`${num.isLoading && 'box-selected'} self-center px-4 py-2 rounded-lg flex gap-4 items-center justify-center bg-[#fcfcfd] font-mono font-[600] text-[20px] w-fit !h-[unset]`}>
                    <div className=' h-[48px] w-[48px] mx-auto'>{num.isLoading ? Icons['animateDice'] : Icons['diceIcon']}</div>
                    <div>Roll Dice</div>
                </button>
            </div>
        </>
    )
}
