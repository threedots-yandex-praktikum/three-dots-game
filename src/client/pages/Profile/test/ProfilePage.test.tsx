import React from 'react';
import { fireEvent, render, screen, cleanup, waitFor } from '@testing-library/react';
import { Profile } from '../Profile';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from 'client/store/store';


const Wrapper = () => (
  <Provider store={store}>
    <Profile/>
  </Provider>
);

beforeEach(() => render(<Wrapper/>));
afterEach(cleanup);


describe('Страница с формой редактирования профиля', () => {
  it('Корректно отрисовывается поле логина в режиме чтения', () => {
    const loginInput = screen.getByLabelText('Логин');

    expect(loginInput).toBeInTheDocument();
    expect(loginInput).toBeVisible();
    expect(loginInput).toHaveAttribute('readonly');
    expect(loginInput).toBeEmptyDOMElement();
  });

  it('Корректно отрисовывается поле email в режиме чтения', () => {
    const emailInput = screen.getByLabelText('Почта');

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeVisible();
    expect(emailInput).toHaveAttribute('readonly');
    expect(emailInput).toBeEmptyDOMElement();
  });

  it('Корректно отрисовывается поле имени в режиме чтения', () => {
    const nameInput = screen.getByLabelText('Имя');

    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toBeVisible();
    expect(nameInput).toHaveAttribute('readonly');
    expect(nameInput).toBeEmptyDOMElement();
  });

  it('Корректно отрисовывается поле фамилии в режиме чтения', () => {
    const lastNameInput = screen.getByLabelText('Фамилия');

    expect(lastNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeVisible();
    expect(lastNameInput).toHaveAttribute('readonly');
    expect(lastNameInput).toBeEmptyDOMElement();
  });


  it('Корректно отрисовывается поле никнейма в режиме чтения', () => {
    const displayNameInput = screen.getByLabelText('Никнейм');

    expect(displayNameInput).toBeInTheDocument();
    expect(displayNameInput).toBeVisible();
    expect(displayNameInput).toHaveAttribute('readonly');
    expect(displayNameInput).toBeEmptyDOMElement();
  });

  it('Корректно отрисовывается поле телефона в режиме чтения', () => {
    const phoneInput = screen.getByLabelText('Телефон');

    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput).toBeVisible();
    expect(phoneInput).toHaveAttribute('readonly');
    expect(phoneInput).toBeEmptyDOMElement();
  });

  it('Не отрисовывается поле выбора файла аватара', () => {
    const buttons = screen.getAllByRole('button');

    const fileUploadButton = buttons.find(button => button.className === 'rc-upload profile__upload');

    expect(fileUploadButton).toBeUndefined();
  });

  it('Корректно отрисовывается доступная кнопка выхода', () => {
    const goBackBtn = screen.getByText('Выйти');

    expect(goBackBtn).toBeInTheDocument();
    expect(goBackBtn).toBeVisible();
    expect(goBackBtn).not.toBeDisabled();
  });

  it('Корректно отрисовывается доступная кнопка изменения пароля', () => {
    const editBtn = screen.getByText('Редактировать');

    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toBeVisible();
    expect(editBtn).not.toBeDisabled();
  });

  // -------- активен режим редактирования -------

  it('Корректно отрисовывается доступная кнопка отмены', () => {
    const editBtn = screen.getByText('Редактировать');
    fireEvent.click(editBtn);

    const goBackBtn = screen.getByText('Отмена');
    expect(goBackBtn).toBeInTheDocument();
    expect(goBackBtn).toBeVisible();
    expect(goBackBtn).not.toBeDisabled();
  });

  it('Корректно отрисовывается доступная кнопка изменения пароля', () => {
    const editBtn = screen.getByText('Редактировать');
    fireEvent.click(editBtn);

    const editPasswordBtn = screen.getByText('Изменить пароль');
    expect(editPasswordBtn).toBeInTheDocument();
    expect(editPasswordBtn).toBeVisible();
    expect(editPasswordBtn).not.toBeDisabled();
  });

  it('Корректно отрисовывается поле логина', () => {
    const editBtn = screen.getByText('Редактировать');
    fireEvent.click(editBtn);

    const loginInput = screen.getByLabelText('Логин');
    expect(loginInput).toBeInTheDocument();
    expect(loginInput).toBeVisible();
    expect(loginInput).not.toHaveAttribute('readonly');
  });

  it('Корректно отрисовывается поле email', () => {
    const editBtn = screen.getByText('Редактировать');
    fireEvent.click(editBtn);

    const emailInput = screen.getByLabelText('Почта');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeVisible();
    expect(emailInput).not.toHaveAttribute('readonly');
  });

  it('Корректно отрисовывается поле имени', () => {
    const editBtn = screen.getByText('Редактировать');
    fireEvent.click(editBtn);

    const nameInput = screen.getByLabelText('Имя');
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toBeVisible();
    expect(nameInput).not.toHaveAttribute('readonly');
  });

  it('Корректно отрисовывается поле фамилии', () => {
    const editBtn = screen.getByText('Редактировать');
    fireEvent.click(editBtn);

    const lastNameInput = screen.getByLabelText('Фамилия');
    expect(lastNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeVisible();
    expect(lastNameInput).not.toHaveAttribute('readonly');
  });


  it('Корректно отрисовывается поле никнейма', () => {
    const editBtn = screen.getByText('Редактировать');
    fireEvent.click(editBtn);

    const displayNameInput = screen.getByLabelText('Никнейм');
    expect(displayNameInput).toBeInTheDocument();
    expect(displayNameInput).toBeVisible();
    expect(displayNameInput).not.toHaveAttribute('readonly');
  });

  it('Корректно отрисовывается поле телефона', () => {
    const editBtn = screen.getByText('Редактировать');
    fireEvent.click(editBtn);

    const phoneInput = screen.getByLabelText('Телефон');
    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput).toBeVisible();
    expect(phoneInput).not.toHaveAttribute('readonly');
  });

  it('Корректно отрисовывается поле выбора файла аватара', () => {
    const editBtn = screen.getByText('Редактировать');
    fireEvent.click(editBtn);

    const buttons = screen.getAllByRole('button');

    const fileUploadButton = buttons.find(button => button.className === 'rc-upload profile__upload');

    expect(fileUploadButton).toBeInTheDocument();
    expect(fileUploadButton).toBeVisible();
  });

  it('После входа в режим редактирования и ввода невалидного логина кнопка сабмита задизейблена', async() => {
    const editBtn = screen.getByText('Редактировать');
    fireEvent.click(editBtn);

    const loginInput = screen.getByLabelText('Логин');
    fireEvent.change(loginInput, { target: { value: '2' } });

    await waitFor(() => {
      const submitBtn = screen.getByText('Сохранить');
      expect(submitBtn).toBeInTheDocument();
      expect(submitBtn).toBeVisible();
      expect(submitBtn).toBeDisabled();
    });
  });

  it('После входа в режим редактирования и изменения значения логина на валидное значение кнопка сабмита доступна', async() => {
    const editBtn = screen.getByText('Редактировать');
    fireEvent.click(editBtn);

    const loginInput = screen.getByLabelText('Логин');
    fireEvent.change(loginInput, { target: { value: 'NewLogin' } });

    await waitFor(() => {
      const submitBtn = screen.getByText('Сохранить');
      expect(submitBtn).toBeInTheDocument();
      expect(submitBtn).toBeVisible();
      expect(submitBtn).not.toBeDisabled();
    });
  });
});

