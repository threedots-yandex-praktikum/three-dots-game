import { InfoSectionTextItem } from 'client/pages/Home/InfoSectionTextItem';
import { InfoSectionImageItem } from 'client/pages/Home/InfoSectionImageItem';

const bg = '/img/bg.png';
export const MOCKED_REVIEW_DATA = [
  {
    id: 1,
    size: 3,
    author: 'Пользователь 1',
    content: 'Текст смешного отзыва среднего размера',
    rating: 5,
  },
  {
    id: 2,
    size: 2,
    author: 'Пользователь 1',
    content: 'Текст смешного отзыва среднего размера',
    rating: 5,
  },
  {
    id: 3,
    size: 3,
    author: 'Пользователь 1',
    content: 'Текст смешного отзыва среднего размера',
    rating: 4,
  },
  {
    id: 4,
    size: 2,
    author: 'Пользователь 1',
    content: 'Текст смешного отзыва маленького размера',
    rating: 4,
  },
  {
    id: 5,
    size: 4,
    author: 'Пользователь 1',
    content: 'Текст смешного отзыва большого размера',
    rating: 5,
  },
  {
    id: 6,
    size: 2,
    author: 'Пользователь 1',
    content: 'Текст смешного отзыва маленького размера',
    rating: 5,
  },
  {
    id: 7,
    size: 3,
    author: 'Пользователь 1',
    content: 'Текст смешного отзыва среднего размера',
    rating: 2,
  },
  {
    id: 8,
    size: 2,
    author: 'Пользователь 1',
    content: 'Текст смешного отзыва маленького размера',
    rating: 3,
  },
];



const bgSrc = `url('${bg}')`;

export const INFO_SECTION_SCHEMA = [
  {
    id: 1,
    Component: InfoSectionTextItem,
    componentProps: {
      title: 'ЧТО?',
      text: 'Самая интересная игра на планете',
    },
  },
  {
    id: 2,
    Component: InfoSectionImageItem,
    componentProps: {
      src: bgSrc,
    },
  },
  {
    id: 3,
    Component: InfoSectionImageItem,
    componentProps: {
      src: bgSrc,
    },
  },
  {
    id: 4,
    Component: InfoSectionTextItem,
    componentProps: {
      title: 'КАК?',
      text: 'Управляй своей точкой и ешь другие',
    },
  },
  {
    id: 5,
    Component: InfoSectionTextItem,
    componentProps: {
      title: 'ПОЧЕМУ?',
      text: 'Это очень весело!',
    },
  },
  {
    id: 6,
    Component: InfoSectionImageItem,
    componentProps: {
      src: bgSrc,
    },
  },
];
