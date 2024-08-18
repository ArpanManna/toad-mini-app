import Hamster from './icons/Hamster'
import Info from './icons/Info';
import Settings from './icons/Settings';
import { binanceLogo, dailyCipher, dailyCombo, dailyReward, dollarCoin, hamsterCoin, mainCharacter, toadIcon, leaderBoard } from '../images';
import Mine from './icons/Mine';
import Friend from '../icons/Friend';
import Coins from '../icons/Coins';
import { useNavigate } from 'react-router-dom'
import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const initialValue = [
        { answerText: '', isCorrect: false }];
    const userId = window.Telegram.WebApp?.initDataUnsafe?.user?.id ? window.Telegram.WebApp?.initDataUnsafe?.user?.id : 'iamAM96'
    const userName = window.Telegram.WebApp?.initDataUnsafe?.user?.username ? window.Telegram.WebApp?.initDataUnsafe?.user?.username : 'iamAM96'
    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState(null)
    const [isCorrect, setIsCorrect] = useState(null);
    const [todayQuestion, setTodayQuestion] = useState('')
    const [answerOptions, setAnswerOptions] = useState(initialValue)

    useEffect(() => {
        getQuestion()
    }, [])


    const getQuestion = async () => {
        // const date = new Date().toISOString().replace(/\T.+/, '')
        // console.log(date)
        const date = '2024-08-01'
        const chatId = '1510838499' //7476023871 5772357885
        const res = await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/questions/get?date=${date}&chatId=${chatId}`,
            headers: {
                'Content-Type': 'application/json'
            },
        });
        // console.log(res.data)
        if (res && res.data && res.data.success == true) {
            // console.log(res.data)
            const todaysPick = res.data
            // console.log(todaysPick)
            setTodayQuestion(todaysPick)
            setAnswerOptions(res.data.answerOptions)
        }
        else {
            WebApp.showAlert("Failed to Generate Invite Link")
        }
        console.log(todayQuestion)
    }

    function navigateFriends() {
        navigate('/friends')
    }
    function navigateHome() {
        navigate('/')
    }
    function navigateLeaderBoard() {
        navigate('/leaderboard')
    }
    function joinChannel() {
        window.Telegram.WebApp.openTelegramLink("https://t.me/pikapiichannel")
    }

    const handleTrivia = async (option) => {
        console.log(todayQuestion)
        console.log(option.answerText)
        console.log(new Date().toISOString().replace(/\T.+/, ''))
        setSelectedOption(option.answerText)
        console.log(option.isCorrect)
        const chatId = '7476023872' //7476023871 5772357885
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
            data: {
                questionId: todayQuestion.questionId,
                userId: chatId,
                selectedOption: selectedOption,
                isCorrect: isCorrect
            }
        });
    }

    return (
        <div className="flex flex-col items-center justify-around h-full bg-black text-white p-4">
            <div>
                <img src={toadIcon} alt="Toad" className="w-24 h-24 rounded-full" />
            </div>
            <div className="text-center mb-4">
                <h1 className="text-3xl">{todayQuestion.balance}</h1>
                <p className="text-xl">TOADs</p>
            </div>

            <div className="flex flex-col bg-gray-800 p-4 rounded-lg mb-4 min-w-full">
                <div className="text-left">
                    <h2 className="text-xl mb-1">TOAD COMMUNITY</h2>
                    <p className="text-sm mb-2">Home for Telegram OGs</p>
                    <button onClick={joinChannel} className="bg-white text-black py-1 px-4 rounded-full">Join</button>
                </div>
            </div>
            <div className="flex min-w-full">
                <h2 className="text">🗓️ Today's trivia</h2>

            </div>

            <div className="flex flex-col bg-gray-800 p-6 rounded-lg mb-8 min-w-full">
                {todayQuestion.question ? (
                    <div className="items-center text-center">
                        <p className="mb-3 justify-center p-1">{todayQuestion.question}</p>
                        <div className="flex flex-col items-center space-y-2">
                            {answerOptions.map((option) => (
                                <button
                                    disabled={todayQuestion.responseStatus.length != 0}
                                    key={option}
                                    onClick={() => handleTrivia(option)}
                                    className={`py-2 px-4 rounded-lg ${selectedOption === option ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-blue-500 text-white'}`}
                                >
                                    {option.answerText}
                                </button>
                            ))}
                        </div>
                        {todayQuestion.responseStatus.length != 0 ? (
                            <p className={'mt-4 font-bold text-violet-700'}>
                                Already attempted today !
                            </p>
                        ) : selectedOption && (
                            <p className={`mt-4 font-bold ${selectedOption === todayQuestion.correctAnswer ? 'text-green-500' : 'text-red-500'}`}>
                                {isCorrect ? `🎉 Bingo ! You earned ${todayQuestion.score} Toads 🐸` : '😢 Try tomorrow again'}
                            </p>
                        )}

                    </div>
                ) :
                    <p className="mt-4 font-bold text-violet-600">
                        Check back tomorrow
                    </p>}


            </div>

            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
                <div onClick={navigateHome} className="text-center text-[#85827d] w-1/5">
                    <Coins className="w-8 h-8 mx-auto" />
                    <p className="mt-1">Earn</p>
                </div>
                <div onClick={navigateLeaderBoard} className="text-center text-[#85827d] w-1/5 bg-[#1c1f24] m-1 p-2 rounded-2xl">
                    <img src={leaderBoard} alt="Exchange" className="w-8 h-8 mx-auto" />
                    <p className="mt-1">Leaderboard</p>
                </div>
                <div onClick={navigateFriends} className="text-center text-[#85827d] w-1/5">
                    <Friend className="w-8 h-8 mx-auto" />
                    <p className="mt-1">Friends</p>
                </div>
            </div>
        </div >
    )
}