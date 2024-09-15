import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchData, joinTelegramChannel, openLinkInExternalBrowser } from '../api'
import { config } from '../../config'
import { MdDone } from "react-icons/md";
import toast from 'react-hot-toast';
import { toadLogo } from '../images';

type TaskResponseType = {
  score: number,
  taskId: string
}

type TaskDetailType = {
  "_id": string,
  "title": string,
  "meta": {
    "type": string,
    "handle": string,
    "url": string,
  },
  "score": number,
  "responses": [],
  "__v": number,
  taskClicked: boolean,
  taskCompleted: boolean
}
const userId = window.Telegram.WebApp?.initDataUnsafe?.user?.id
const userName = window.Telegram.WebApp?.initDataUnsafe?.user?.username
export default function Challenges() {
  const [tasks, setTasks] = useState({
    isLoading: false,
    result: [],
    claimedData: []
  })
  const [tasksUpdatedCounter, setTasksUpdatedCounter] = useState<number>(0)
  useEffect(() => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}/tasks/get?userId=${userId}`,
      headers: {}
    };
    (async () => {
      setTasks(prevValue => ({ ...prevValue, isLoading: true }))
      try {
        const tasksData = await fetchData(config);
        if (tasksData?.response?.length) {
          const allTasks = tasksData?.tasks
          const allDoneTasks = tasksData?.response[0]?.responses
          const challenges: TaskDetailType[] = [];
          for (let i = 0; i < allTasks?.length; i++) {
            const task: TaskDetailType = allTasks[i];
            const doneTask: TaskResponseType = allDoneTasks.find((item) => task._id === item.taskId)
            if (doneTask) {
              challenges.push({
                ...task,
                taskClicked: false,
                taskCompleted: true
              })
            }
            else {
              challenges.push({
                ...task,
                taskClicked: false,
                taskCompleted: false
              })
            }
          }
          setTasks(prevData => ({
            ...prevData,
            result: challenges
          }))
        }
        else {
          const updatedData = tasksData?.tasks.map(item => ({
            ...item,
            taskClicked: false,
            taskCompleted: false
          }))
          setTasks(({
            result: updatedData,
            isLoading: false,
            claimedData: []
          }))
        }
      } catch (error) {
        console.log(error);
      }
    })()
  }, [tasksUpdatedCounter])
  const handleClick = useCallback(async (e, item: TaskDetailType) => {
    if (item.taskCompleted) {
      toast.success('Rewards credited')
    }
    else if (item.taskClicked) {
      if (item.meta.type === 'telegram') {
        const apiConfig = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${config.telegramApiUrl}/bot${import.meta.env.VITE_BOT_TOKEN}/getChatMember?chat_id=@${item.meta.handle}&user_id=${userId}`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({
            userId: userId.toString(),
            userName: userName ? userName.toString() : '',
          })
        }
        const response = await fetchData(apiConfig)
        console.log(response);
        if (response && response.ok && response.result.status == "member") {
          const data = JSON.stringify({
            "userId": userId,
            "userName": userName,
            "socialTaskId": item._id
          });
          const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/tasks/update`,
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          };
          const resp = await fetchData(config)
          console.log(resp);
          if (resp.success) {
            setTasksUpdatedCounter(prev => prev + 1)
            toast.success('Rewards credited')
          }
        }
      }
      else {
        const data = JSON.stringify({
          "userId": userId,
          "userName": userName,
          "socialTaskId": item._id
        });
        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${import.meta.env.VITE_API_URL}/tasks/update`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };
        const resp = await fetchData(config)
        console.log(resp);
        if (resp.success) {
          setTasksUpdatedCounter(prev => prev + 1)
          toast.success('Rewards credited')
        }
      }
    }
    else {
      const updateTaskData = tasks.result.map((task: TaskDetailType) => (item._id === task._id ? {
        ...task,
        taskClicked: true
      } : task))
      setTasks(prevData => ({
        ...prevData,
        result: updateTaskData
      }))
      if (item.meta.type === 'telegram') {
        openLinkInExternalBrowser(`https://t.me/${item.meta.handle}`)
      }
      else if (item.meta.type === 'x') {
        openLinkInExternalBrowser(item.meta.url)
      }
    }
  }, [tasks])

  const renderArray = useCallback((tasks: TaskDetailType[]) => {
    return tasks.map((item) => {
      return (<div className=' flex flex-1 w-full justify-between items-center card' key={item._id}>
        <div className=' flex flex-col gap-[2px]'>
          <div className=' text-[18px]'>{item.title}</div>
          <div className=' text-[14px] text-green-300'>+ {item.score} TOAD</div>
        </div>
        <button type='button' onClick={(e) => handleClick(e, item)} className='bg-[#fcfcfd] px-4 py-2 rounded-2xl text-[#000] font-[500]'>
          {
            item.taskCompleted ? <MdDone /> : item.taskClicked ? 'Claim' : 'Start'
          }
        </button>
      </div>)
    })
  }, [tasks])


  return (
    <div className='p-4 flex flex-col items-center'>
      <div className='w-[128px] h-[128px] rounded-full bg-white self-center justify-center flex flex-col items-center'>
        <img src={toadLogo} alt="Toad" className=' object-cover w-full h-full rounded-[148px]' />
      </div>
      < div className=' p-2 text-[#fcfcfd] flex flex-col gap-4 w-full'>
        <h2 className=' font-semibold text-[24px] w-full text-center text-green-300'>Tasks</h2>
        <div className='flex flex-col gap-2'>
          {
            renderArray(tasks.result)
          }
        </div>
      </ div>
    </div>
  )
}
