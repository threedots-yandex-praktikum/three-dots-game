import { Box, Divider, Flex, Heading, Stack, StackDivider } from "@chakra-ui/layout"
import React, { FC, useEffect } from "react"
import { getDateString } from "../../../utils/getDateString"
import { TCurrentTopicProps } from "../types"
import { MessageForm } from "./MessageForm"

const mockMessages = [
    {
        messageId: 1,
        userName: "USER_1_LONG_LONG_LONG_LONG_LONG",
        time: new Date().getTime(),
        text: "lorem lorem lorem lorem lorem lorem lorem lorem lorem "
    },
    {
        messageId: 2,
        userName: "USER_2",
        time: new Date().getTime(),
        text: "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
    },
    {
        messageId: 3,
        userName: "USER_3",
        time: new Date().getTime(),
        text: "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
    },
    {
        messageId: 4,
        userName: "USER_1",
        time: new Date().getTime(),
        text: "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
    },
    {
        messageId: 5,
        userName: "USER_5",
        time: new Date().getTime(),
        text: "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem "
    },
    {
        messageId: 6,
        userName: "USER_2",
        time: new Date().getTime(),
        text: "lorem "
    },
]
const mockData = {
    countMessages: 5,
    title: "topic title"
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
                                {message.userName}

                            </Box>
                            <Box>
                                {getDateString(message.time)}
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
            >
                <Stack
                    direction="column"
                    w="240px"
                >
                    <Box>

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
