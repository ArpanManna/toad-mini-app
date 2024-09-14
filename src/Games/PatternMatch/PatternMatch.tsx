import React, { useCallback, useRef, useState } from 'react'
import Header from '../Header'
import toast from 'react-hot-toast'
import Pattern from './Pattern'
import Icons from '../../icons/icons'
import { GameLoss } from '../../assets/svg'
import Confetti from 'react-confetti'
import { udpateGame } from '../../api'
import { config } from '../../../config'

export default function PatternMatch() {
    const userId = window.Telegram.WebApp?.initDataUnsafe?.user?.id ? window.Telegram.WebApp?.initDataUnsafe?.user?.id : '1745606996'
    const userName = window.Telegram.WebApp?.initDataUnsafe?.user?.username ? window.Telegram.WebApp?.initDataUnsafe?.user?.username : 'Beelionair'
    const bulbRef = useRef(null)
    const [gameData, setGameData] = useState({
        isLoading: false,
        isWon: false,
        randomSequence: [],
        userSequence: [],
        lightNumberOfBulbs: 0
    })
    const infoHandleClick = useCallback(() => {
        toast(
            <div>
                <span className=' font-[700] font-mono text-[16px]'>
                    How to Play?
                </span>
                <ul className=' font-mono text-[14px] list-disc font-[600] pl-[12px]'>
                    <li>Click on start challenge.</li>
                    <li>After viewing the sequence, tap on the bulb to match exact same seqeunce.</li>
                    <li>You can try new challenge, if you missed to see the sequence.</li>
                    <li>If you exactly match the pattern, Depending the Game level TOADs will be credited.</li>
                </ul>
            </div>
            , {
                duration: 5000
            })
    }, [])
    const generateRandomSequence = useCallback(() => {
        const resultantRandomSequence: number[] = [];
        const randomNumBulb = Math.floor(Math.random() * 5) + 4; // number of bulbs needs to be generated.
        while (resultantRandomSequence.length <= randomNumBulb - 1) {
            const randomNum = Math.floor(Math.random() * 8);
            if (!resultantRandomSequence.includes(randomNum)) {
                resultantRandomSequence.push(randomNum);
            }
        }
        if (randomNumBulb < 6) {
            toast(<div className=' font-bold font-mono flex flex-col'>
                <span>
                    Level: Easy
                </span>
                <span>
                    Choose: {randomNumBulb} Bulb
                </span>
                <span>
                    Score: {config['patternMatchEasy']}
                </span>
            </div>, {
                position: 'bottom-center'
            })
        }
        else if (randomNumBulb > 6) {
            toast(<div className=' font-bold font-mono flex flex-col'>
                <span>
                    Level: Hard
                </span>
                <span>
                    Choose: {randomNumBulb} Bulb
                </span>
                <span>
                    Score: {config['patternMatchHard']}
                </span>
            </div>, {
                position: 'bottom-center'
            })
        }
        else {
            toast(<div className=' font-bold font-mono flex flex-col'>
                <span>
                    Level: Medium
                </span>
                <span>
                    Choose: {randomNumBulb} Bulb
                </span>
                <span>
                    Score: {config['patternMatchMedium']}
                </span>
            </div>, {
                position: 'bottom-center'
            })
        }

        return { randomSequence: resultantRandomSequence, randomNumBulb: randomNumBulb };
    }, []);
    const clearClassInSequence = async (bulb: HTMLElement) => {
        return new Promise((res) => {
            setTimeout(() => {
                bulb.classList.remove('light-bulb')
                res(1)
            }, 900);
        })
    }
    const handleClearLight = useCallback(() => {
        const bulbNodes = (bulbRef.current as HTMLElement).childNodes
        for (let index = 0; index < bulbNodes.length; index++) {
            (bulbNodes[index] as HTMLElement).classList.remove('light-bulb')
        }
    }, [])
    const handleShowSequence = useCallback(() => {
        if (gameData.isLoading) {
            toast(<div className=' font-mono font-[600] text-[14px] text-green-500'>Please wait untill the sequence is generated.</div>, {
                duration: 2000,
                position: 'top-center'
            })
        }
        else if (gameData.isWon) {
            setGameData({
                isLoading: false,
                isWon: false,
                randomSequence: [],
                userSequence: [],
                lightNumberOfBulbs: 0
            })
            handleClearLight()
        }
        else {
            const bulbNodes = (bulbRef.current as HTMLElement).childNodes

            const { randomSequence, randomNumBulb } = generateRandomSequence();
            setGameData((prevData) => ({
                ...prevData,
                randomSequence: [...randomSequence],
                isLoading: true,
                lightNumberOfBulbs: randomNumBulb
            }));
            let index = 0;
            const intervalId = setInterval(async () => {
                (bulbNodes[randomSequence[index]] as HTMLElement).classList.add('light-bulb')
                await clearClassInSequence(bulbNodes[randomSequence[index]] as HTMLElement)
                index++;
                if (index === randomNumBulb) {
                    toast(<div className=' font-mono font-[600] text-[14px] text-green-500'>Try lighting up the bulbs in the sequence generated or you can generate a new sequence.</div>, {
                        duration: 3000,
                        position: 'top-center'
                    })
                    clearInterval(intervalId)
                    setGameData(prevData => ({ ...prevData, isLoading: false }))
                }
            }, 1500);
        }
    }, [gameData])

    const handleBulbClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget as HTMLDivElement;
        const index = Number(target.id) - 1
        const bulbNodes = (bulbRef.current as HTMLElement).childNodes;
        if (gameData.isWon) {
            toast(<div className=' font-mono font-[600] text-[14px] text-green-500'>Try new challenge?</div>, {
                duration: 3000,
                position: 'top-center'
            })
        }
        else if (gameData.isLoading) {
            toast(<div className=' font-mono font-[600] text-[14px] text-green-500'>Please wait till the sequence is generated.</div>, {
                duration: 2000,
                position: 'top-center'
            })
        }
        else if (index === gameData.randomSequence[gameData.userSequence.length]) {
            (bulbNodes[index] as HTMLElement).classList.add('light-bulb')
            setGameData(prevValue => ({
                ...prevValue,
                userSequence: [...prevValue.userSequence, index]
            }))
            if (gameData.userSequence.length === gameData.lightNumberOfBulbs - 1) { //winnning condition
                const data = JSON.stringify({
                    "userId": userId,
                    "userName": userName,
                    "meta": "Games",
                    "score": config[gameData.lightNumberOfBulbs > 6 ? 'patternMatchHard': gameData.lightNumberOfBulbs < 6 ? 'patternMatchEasy' : 'patternMatchMedium']
                });
                udpateGame(data)

                toast.success(`You Won! ${config[gameData.lightNumberOfBulbs > 6 ? 'patternMatchHard': gameData.lightNumberOfBulbs < 6 ? 'patternMatchEasy' : 'patternMatchMedium']} TOAD has been credited to your ID`, {
                    duration: 3000
                });
                setGameData(prevData => ({
                    ...prevData,
                    isWon: true,
                }))
                setTimeout(() => {
                    setGameData({
                        isLoading: false,
                        isWon: false,
                        randomSequence: [],
                        userSequence: [],
                        lightNumberOfBulbs: 0
                    })
                    handleClearLight()
                }, 5000);
            }
        }
        else {
            if (gameData.randomSequence.length) {
                handleClearLight()
                setGameData({
                    isLoading: false,
                    isWon: false,
                    randomSequence: [],
                    userSequence: [],
                    lightNumberOfBulbs: 0
                })
                toast(<div className=' font-mono font-[600] text-[14px] text-rose-500'>You Lose! Better Luck next Time</div>, {
                    icon: <GameLoss />,
                    duration: 2000,
                    position: 'top-center'
                })
            }
            else {
                toast(<div className=' font-mono font-[600] text-[14px] text-green-500'>Click on start challenge.</div>, {
                    duration: 2000,
                    position: 'top-center'
                })
            }
        }
    }, [gameData])

    return (
        <>
            {
                gameData.isWon && <Confetti />
            }
            <div className=' flex flex-col gap-8 num-bg h-full'>
                <Header handleClick={infoHandleClick} title={'Pattern Match'} svgKey={'matchPattern'} />
                <Pattern ref={bulbRef} handleBulbClick={handleBulbClick} />
                <button type='button' onClick={handleShowSequence} className={`${gameData.isLoading && 'box-selected'} self-center px-4 py-2 rounded-lg flex gap-4 items-center justify-center bg-[#fcfcfd] font-mono font-[600] text-[20px] w-fit !h-[unset]`}>
                    <div className=' [&>div]:h-[24px] [&>div]:w-[24px] mx-auto'>{Icons['matchPattern']}</div>
                    <div>{
                        gameData.randomSequence.length ? gameData.isLoading ? 'Loading...' : 'Try new challenge' : 'Start challenge'
                    }</div>
                </button>
            </div>
        </>
    )
}
