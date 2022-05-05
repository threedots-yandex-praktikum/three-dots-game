import { Flex, GridItem, Icon, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { FaQuoteLeft, FaRegStar } from 'react-icons/fa';
import { TReviewItemProps } from 'pages/Home/ReviewItem/types';


export const ReviewItem = ({ size, content, author, rating = 1 }: TReviewItemProps) => (
  <GridItem
    bg="blue.300"
    p={8}
    rowSpan={size}
    rounded="lg"
    boxShadow="md"
  >
    <Text
      fontSize="xl"
      h="90%"
    >
      {content}
    </Text>
    <Flex align="center" w="100%">
      <Icon as={FaQuoteLeft} mr={2}/>
      {author}
      <Spacer/>
      <div>
        {
          Array.from((new Array(rating)))
            .map((item, index) => (
              <Icon key={index} as={FaRegStar}/>
            ))
        }
      </div>
    </Flex>
  </GridItem>
);
