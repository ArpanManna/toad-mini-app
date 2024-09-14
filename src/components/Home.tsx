import React from 'react';
import { leaderBoard, logo, toadLogo } from '../images';
import Friend from '../icons/Friend';
import Coins from '../icons/Coins';
import { useNavigate } from 'react-router-dom'
import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from '../../config';
import GameList from './GameList';

const initialValue = [{ answerText: '', isCorrect: false }];
const initialEarning = [{ type: 'No earnings till now', score: 0, time: '' }];

export default function Home() {
    const userId = window.Telegram.WebApp?.initDataUnsafe?.user?.id ? window.Telegram.WebApp?.initDataUnsafe?.user?.id : '1745606996'
    const userName = window.Telegram.WebApp?.initDataUnsafe?.user?.username ? window.Telegram.WebApp?.initDataUnsafe?.user?.username : 'Beelionair'
    const [selectedOption, setSelectedOption] = useState(null)
    const [isCorrect, setIsCorrect] = useState(null);
    const [todayQuestion, setTodayQuestion] = useState('')
    const [answerOptions, setAnswerOptions] = useState(initialValue)
    const [earnings, setEarnings] = useState(initialEarning)
    const [attempted, setAttempted] = useState(false)

    useEffect(() => {
        getQuestion()
        getEarnings()
    }, [])


    const getEarnings = async () => {
        try {
            const res = await axios.request({
                method: 'get',
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_API_URL}/earnings?chatId=${userId}&userName=${userName}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (res && res.data) {
                setEarnings(res.data.earnings)
            }
            else {
                WebApp.showAlert("Failed to Fetch Earnings")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getQuestion = async () => {
        const date = new Date().toISOString().replace(/\T.+/, '')
        //const date = '2024-08-30'
        try {
            const res = await axios.request({
                method: 'get',
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_API_URL}/questions/get?date=${date}&chatId=${userId}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log(res)
            if (res && res.data && res.data.success == true) {
                setTodayQuestion(res.data)
                setAnswerOptions(res.data.answerOptions)
            } else {
                WebApp.showAlert("Failed to fetch Today's pick")
            }
        } catch (error) {
            console.log(error)
        }

    }
    const handleTrivia = async (option) => {
        setSelectedOption(option.answerText)
        if (option.isCorrect) {
            setIsCorrect(true)
        }
        else {
            setIsCorrect(false)
        }

        const res = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/response/`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                questionId: todayQuestion.questionId,
                userId: userId.toString(),
                userName: userName.toString(),
                selectedOption: option.answerText.toString(),
                isCorrect: option.isCorrect
            })
        });
        setAttempted(true)
    }

    function getInitials(type) {
        if (!type) return 'A'
        const alphabet = type.slice(0, 1).toUpperCase()
        return alphabet
    }

    function getColor(type) {
        if (!type) return 'bg-blue-500'
        if (type == 'Joining Bonus') return 'bg-green-500'
        if (type == 'Referral') return 'bg-pink-500'
        if (type == 'Trivia') return 'bg-violet-500'
    }
    const getButtonColor = (option) => {
        console.log('selected option:', selectedOption)
        if (todayQuestion.responseStatus.responses.length) {
            if (todayQuestion.responseStatus.responses[0].selectedOption == option.answerText) {
                return option.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }
            else if (option.isCorrect) {
                return 'bg-green-500 text-white'
            }
        } else {
            if (selectedOption) {
                if (selectedOption == option.answerText) {
                    return option.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }
                else if (option.isCorrect) {
                    return 'bg-green-500 text-white'
                }
            }

        }
        return 'bg-blue-500 text-white';
    }

    return (
        <div className="flex flex-col items-center justify-around w-full bg-black text-white p-4">
            <div className='w-[128px] h-[128px] rounded-full bg-white justify-center'>
                <img src={toadLogo} alt="Toad" className=' object-cover w-full h-full rounded-[148px]' />
            </div>
            <div className="text-center mt-4 mb-4">
                <h1 className="text-3xl text-green-300">{todayQuestion.balance ? (todayQuestion.balance).toLocaleString() : 0}</h1>
                <p className="text-xl">TOAD</p>
            </div>
            <GameList />

            {/* <div className="flex flex-col bg-gray-800 p-4 rounded-lg mb-4 min-w-full">
                <div className="text-left">
                    <h2 className="text-xl mb-1">TOAD COMMUNITY</h2>
                    <p className="text-sm mb-2">Home for Telegram OGs</p>
                    <div className='flex justify-between'>
                        <button onClick={joinChannel} className="bg-white text-black py-1 px-4 rounded-full">{member ? 'Open' : 'Join'}</button>
                        {member ? (
                            <p className="text-sm text-green-300">{`+${config.joiningBonus} TOAD`}</p>
                        ) : (
                            <button onClick={checkMemberStatus} className='bg-gray-700 text-white rounded-full py-1 px-4'>{`Claim +${config.joiningBonus}`}</button>
                        )}
                    </div>

                </div>
            </div> */}
            <div className="flex min-w-full mb-4">
                <h2 className="text">🗓️ Today's trivia</h2>

            </div>
            <div className="flex flex-col bg-gray-900 p-6 rounded-lg mb-8 min-w-full card">
                <div>
                    <div className='flex justify-between mb-5'>
                        <p className='flex text-orange-300'>{todayQuestion.question ? `Difficulty: ${todayQuestion.difficulty}` : 'No trivia today'}</p>
                        <p className='flex text-green-300'>{todayQuestion.question ? `+${todayQuestion.score} TOAD` : ''}</p>
                    </div>
                </div>
                {todayQuestion.question ? (
                    <div className="items-center text-center">
                        <p className="mb-3 justify-center p-1 font-bold">{todayQuestion.question}</p>
                        <div className="flex flex-col items-center space-y-2">
                            {answerOptions.map((option) => (
                                // <button
                                //     disabled={attempted || todayQuestion.responseStatus.responses.length != 0}
                                //     key={option}
                                //     onClick={() => handleTrivia(option)}
                                //     className={`py-2 px-4 rounded-lg ${selectedOption === option ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-blue-500 text-white'}`}
                                // >
                                //     {option.answerText}
                                // </button>
                                <button
                                    disabled={attempted || todayQuestion.responseStatus.responses.length != 0}
                                    key={option}
                                    onClick={() => handleTrivia(option)}
                                    className={`py-2 px-4 rounded-lg ${getButtonColor(option)} font-semibold`}
                                >
                                    {option.answerText}
                                </button>
                            ))}
                        </div>
                        {todayQuestion.responseStatus.responses.length != 0 ? (
                            <p className={'mt-4 font-bold text-violet-300'}>
                                Already attempted today
                            </p>
                        ) : (
                            (attempted && selectedOption) ? (
                                <p className={`mt-4 font-bold ${selectedOption === todayQuestion.correctAnswer ? 'text-green-500' : 'text-red-500'}`}>
                                    {isCorrect ? `🎉 Bingo ! You earned ${todayQuestion.score} TOAD` : '😢 Try tomorrow again'}
                                </p>

                            ) : attempted ? (
                                <p className={'mt-4 font-bold text-violet-300'}>
                                    Already attempted today 456!
                                </p>
                            ) : (
                                <p className={'mt-4 font-bold text-violet-300'}>
                                    Select one option
                                </p>
                            )
                        )}

                    </div>
                ) :
                    <p className="mt-4 font-bold text-violet-600">
                        Check back tomorrow
                    </p>}


            </div>
            <div className="flex min-w-full mb-4">
                <h2 className="text">💰 Earnings</h2>
            </div>
            <div className="w-full max-h-[320px] overflow-auto">
                {earnings.map((item, index) => (
                    <div key={index} className="flex items-center justify-between mb-4 card">
                        <div className="flex items-center">
                            <div className={`${getColor(item.type)} text-white w-10 h-10 rounded-full flex items-center justify-center logo-initial`}>
                                {getInitials(item.type)}
                            </div>
                            <div>
                                <p className="ml-6">{item.type}</p>
                                <p className="ml-6 text-gray-400">{item.time}</p>
                            </div>

                        </div>
                        <p>+{item.score ? item.score.toLocaleString() : 0} TOAD</p>
                    </div>
                ))}
            </div>
        </div >
    )
}