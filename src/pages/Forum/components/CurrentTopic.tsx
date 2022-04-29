import { Box, Divider, Flex, Heading, Stack, StackDivider, Text } from "@chakra-ui/layout"
import { Avatar } from "@chakra-ui/react"
import React, { FC, useEffect } from "react"
import { getDateString } from "../../../utils/getDateString"
import { TCurrentTopicProps } from "../types"
import { MessageForm } from "./MessageForm"




// TODO данные ниже брать из store
const mockMessages = [
    {
        messageId: 1,
        avatarLink: undefined,
        userName: "USER_1_LONG_LONG_LONG_LONG_LONG",
        time: new Date().getTime(),
        text: "lorem lorem lorem lorem lorem lorem lorem lorem lorem "
    },
    {
        messageId: 2,
        avatarLink: undefined,

        userName: "USER_2",
        time: new Date().getTime(),
        text: "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
    },
    {
        messageId: 3,
        avatarLink: undefined,

        userName: "USER_3",
        time: new Date().getTime(),
        text: "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
    },
    {
        messageId: 4,
        avatarLink: undefined,

        userName: "USER_1",
        time: new Date().getTime(),
        text: "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
    },
    {
        messageId: 5,
        userName: "USER_5",
        avatarLink: undefined,

        time: new Date().getTime(),
        text: "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
    },
    {
        messageId: 6,
        avatarLink: undefined,

        userName: "USER_2",
        time: new Date().getTime(),
        text: "lorem "
    },
    {
        messageId: 7,
        avatarLink: undefined,

        userName: "USER_12",
        time: new Date().getTime(),
        text: "lorem "
    },
    {
        messageId: 8,
        avatarLink: undefined,

        userName: "USER_21",
        time: new Date().getTime(),
        text: "lorem "
    },
    {
        messageId: 9,
        avatarLink: undefined,

        userName: "USER_211",
        time: new Date().getTime(),
        text: "lorem "
    },
]
const mockData = {
    countMessages: 5,
    title: "topic title"
}

const my = {
    avatarLink: undefined
}


export const CurrentTopic: FC<TCurrentTopicProps> = ({ topicId }) => {

    useEffect(() => {
        // получить контент по id        
    }, [topicId])

    return (
        <Flex
            boxShadow="dark-lg"
            direction="column"
            m="0"
            w="100%"
            justifyContent="center"
            bg="#ffffff"
            p="10px"
        >
            <Heading textAlign="center" p="6px">
                {mockData.title}
            </Heading>
            <Divider orientation="horizontal" border="2px" />
            {mockMessages.map(message => {
                return (
                    <Stack
                        divider={<StackDivider borderColor='gray.200' />}
                        direction="row"
                        className="message"
                        key={message.messageId}
                    >
                        <Stack
                            direction="column"
                            w="240px"
                        >
                            <Box>
                                <Avatar
                                    bg={message.avatarLink ? 'transparent' : 'purple.500'}
                                    size="lg"
                                    src={message.avatarLink}
                                />
                            </Box>
                            <Box>
                                <Text>{message.userName}</Text>
                            </Box>
                            <Box>
                                <Text textAlign="end" fontSize="13px">{getDateString(message.time)}</Text>
                            </Box>
                        </Stack>
                        <Box
                            flexGrow={1}
                            maxW="70%"
                        >
                            {message.text}
                        </Box>
                    </Stack>
                )
            })}
            <Stack
                divider={<StackDivider borderColor='gray.200' />}
                direction="row"
                className="message"
                height="168px"
            >
                <Stack
                    direction="column"
                    w="240px"
                >
                    <Box>
                        <Avatar
                            bg={my.avatarLink ? 'transparent' : 'purple.500'}
                            size="lg"
                            src={my.avatarLink}
                        />
                    </Box>

                </Stack>
                <Box
                    flexGrow={1}
                    maxW="70%"
                >
                    <MessageForm />
                </Box>
            </Stack>
        </Flex>
    )
} 
