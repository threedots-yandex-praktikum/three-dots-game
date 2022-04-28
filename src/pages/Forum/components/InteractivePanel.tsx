import { Button } from '@chakra-ui/button';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { FORUM_ROUTE } from 'constants/routes';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { TInteractivePanelProps } from '../types';


export const InteractivePanel: FC<TInteractivePanelProps> = ({ themName,onOpen }) => {


    return (
        <Flex p="10px" my="15px" boxShadow="dark-lg" bg="#ffffff" w="100%">
            <Box flexGrow={1}>
                <Text as="span">
                    <span>{" > "} </span>
                    <Link className="nav-link" to={FORUM_ROUTE} >
                        Форум
                    </Link>
                </Text>
                {themName &&
                    <Text display="inline">
                        {" > "}{themName}
                    </Text>
                }
            </Box>
            <Box w="25%" ml="5px">
                {themName
                    ? <Button colorScheme="red">Закрыть тему &times;</Button>
                    : <Button onClick={onOpen} colorScheme="purple">Создать тему +</Button>
                }
            </Box>
        </Flex>
    )
}
