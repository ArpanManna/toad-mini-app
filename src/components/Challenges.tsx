import React, { useEffect, useState } from 'react'
import { fetchData } from '../api'

const userId = window.Telegram.WebApp?.initDataUnsafe?.user?.id ? window.Telegram.WebApp?.initDataUnsafe?.user?.id : '1745606996'
const userName = window.Telegram.WebApp?.initDataUnsafe?.user?.username ? window.Telegram.WebApp?.initDataUnsafe?.user?.username : 'Beelionair'

export default function Challenges() {
  const [tasks, setTasks] = useState({
    isLoading: false,
    result: [],
  })


  useEffect(() => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}/tasks/get?userId=${userId}`,
      headers: {}
    };
    (async () => {
      setTasks(prevValue => ({ ...prevValue, isLoading: true }))
      const response = await fetchData(config);
      console.log(response);
      setTasks(({
        result: response.tasks,
        isLoading: false
      }))
    })()
  }, [])

  return (
    < div className=' p-2 text-[#fcfcfd] flex flex-col gap-4'>
      <h2 className=' font-semibold text-[24px]'>Tasks</h2>
      <div className='flex flex-col gap-2'>
        {
          tasks.result.map((item) => {
            return <>
              <div className=' flex flex-1 w-full justify-between items-center card'>
                <div className=' flex flex-col gap-[2px]'>
                  <div className=' text-[18px]'>{item.title}</div>
                  <div className=' text-[14px] text-green-300'>+{item.score} TOAD</div>
                </div>
                <button type='button' className='bg-[#fcfcfd] px-4 py-2 rounded-2xl text-[#000] font-[500]'>
                  Start
                </button>
              </div>
            </>
          })
        }

      </div>
    </ div>
  )
}
