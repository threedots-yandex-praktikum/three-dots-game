import {  Container } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import './style.scss';
import { TForumProps } from './types';
import { InteractivePanel } from './components/InteractivePanel';
import { FORUM_ROUTE } from 'constants/routes';
import { ListOfThems } from './components/ListOfThems';
import { CreateTheme } from './components/CreateTheme';
import { CurrentTopic } from './components/CurrentTopic';

const mockThemList = [
  {
    themId: 1,
    title: "TITLE_1",
    date: new Date().getTime(),
    lastMessage: {
      userName: 'User1',
      message: "Lorem Lorem Lorem Lorem Lorem Lorem Lorem "

    },
  },
  {
    themId: 2,
    title: "TITLE_2",
    date: new Date().getTime(),
    lastMessage: {
      userName: 'User2',
      message: "1"

    },
  },
  {
    themId: 3,
    title: "TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3",
    date: new Date().getTime(),
    lastMessage: null
  },
  {
    themId: 4,
    title: "TITLE_33",
    date: new Date().getTime(),
    lastMessage: {
      userName: 'User33',
      message: "Lorem Lorem Lorem1231231321231321 Lorem Lorem Lorem Lorem "

    },
  },
]

export const Forum: FC<TForumProps> = () => {

  const [currentTopicTitle, setCurrentTheme] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  let urlParam = parseInt(location.pathname.split('/').pop()as string)
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    //получение тем
  })

  useEffect(() => {
    urlParam = parseInt(location.pathname.split('/').pop()as string)
    if (location.pathname === FORUM_ROUTE) {
      setCurrentTheme('')
      setIsSelected(false)
    }
    if(urlParam){
      const topicTitle = mockThemList.find(i=>i.themId === urlParam)?.title
      if(!topicTitle) throw new Error('Темы с таким ID нет')
      setIsSelected(true)
      setCurrentTheme(topicTitle as string)
    }
  },[location.pathname, currentTopicTitle])

  return (
    <Container 
      w="100%" 
      bg="gray.200" 
      m="0" 
      p="10px" 
      centerContent 
      maxW="full" 
      minH="100vh"
    >
      <InteractivePanel themName={currentTopicTitle} onOpen={()=>setIsOpen(true)} />
      {isSelected 
      //TODO currentThem
      ? <CurrentTopic topicId={urlParam}/>
      :<ListOfThems thems={mockThemList} setTitle={setCurrentTheme} setIsSelected={setIsSelected}/>

      }
      <CreateTheme 
        isOpen={isOpen} 
        onClose={()=>setIsOpen(false)} 
       />
    </Container>
  )
}

