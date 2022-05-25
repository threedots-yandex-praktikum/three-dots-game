import React from 'react';
import { fireEvent, render, waitFor, screen, cleanup } from '@testing-library/react';
import { Register } from '../Register';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import {store} from "store/store";


const Wrapper = () => (
  <Provider store={store}>
    <Register/>
  </Provider>
);

beforeEach(() => render(<Wrapper/>));
afterEach(cleanup);


describe('Страница с формой регистрации', () => {
  it('Корректно отрисовывается пустое поле логина', () => {
    const loginInput = screen.getByLabelText('Логин');

    expect(loginInput).toBeInTheDocument();
    expect(loginInput).toBeVisible();
    expect(loginInput).toBeEmptyDOMElement();
  });

  it('Корректно отрисовывается пустое поле email', () => {
    const emailInput = screen.getByLabelText('Почта');

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeVisible();
    expect(emailInput).toBeEmptyDOMElement();
  });

  it('Корректно отрисовывается пустое поле имени', () => {
    const nameInput = screen.getByLabelText('Имя');

    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toBeVisible();
    expect(nameInput).toBeEmptyDOMElement();
  });

  it('Корректно отрисовывается пустое поле фамилии', () => {
    const lastNameInput = screen.getByLabelText('Фамилия');

    expect(lastNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeVisible();
    expect(lastNameInput).toBeEmptyDOMElement();
  });

  it('Корректно отрисовывается пустое поле телефона', () => {
    const phoneInput = screen.getByLabelText('Телефон');

    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput).toBeVisible();
    expect(phoneInput).toBeEmptyDOMElement();
  });

  it('Корректно отрисовывается пустое поле пароля', () => {
    const passwordInput = screen.getByLabelText('Пароль');

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toBeVisible();
    expect(passwordInput).toBeEmptyDOMElement();
  });

  it('Корректно отрисовывается пустое поле повтора пароля', () => {
    const passwordRepeatInput = screen.getByLabelText('Пароль (ещё раз)');

    expect(passwordRepeatInput).toBeInTheDocument();
    expect(passwordRepeatInput).toBeVisible();
    expect(passwordRepeatInput).toBeEmptyDOMElement();
  });

  it('Корректно отрисовывается доступная кнопка назад', () => {
    const goBackBtn = screen.getByText('Назад');

    expect(goBackBtn).toBeInTheDocument();
    expect(goBackBtn).toBeVisible();
    expect(goBackBtn).not.toBeDisabled();
  });

  it('Корректно отрисовывается задизейбленная кнопка сабмита', () => {
    const submitBtn = screen.getByText('Зарегистрироваться');

    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeVisible();
    expect(submitBtn).toBeDisabled();
  });

  it('При вводе валидных значений кнопка сабмита становится доступной', async() => {
    const loginInput = screen.getByLabelText('Логин');
    const emailInput = screen.getByLabelText('Почта');
    const nameInput = screen.getByLabelText('Имя');
    const lastNameInput = screen.getByLabelText('Фамилия');
    const phoneInput = screen.getByLabelText('Телефон');
    const passwordInput = screen.getByLabelText('Пароль');
    const passwordRepeatInput = screen.getByLabelText('Пароль (ещё раз)');
    const submitBtn = screen.getByText('Зарегистрироваться');

    fireEvent.change(loginInput, { target: { value: 'TestUser' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(emailInput, { target: { value: 'aaaaa@gmail.com' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(nameInput, { target: { value: 'TestUser' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(lastNameInput, { target: { value: 'TestUser' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(phoneInput, { target: { value: '111111111111' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(passwordInput, { target: { value: '11111111A' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(passwordRepeatInput, { target: { value: '11111111A' } });

    await waitFor(() => {
      expect(submitBtn).not.toBeDisabled();
    });
  });

  it('При вводе невалидного логина кнопка сабмита остается недоступной', async() => {
    const loginInput = screen.getByLabelText('Логин');
    const emailInput = screen.getByLabelText('Почта');
    const nameInput = screen.getByLabelText('Имя');
    const lastNameInput = screen.getByLabelText('Фамилия');
    const phoneInput = screen.getByLabelText('Телефон');
    const passwordInput = screen.getByLabelText('Пароль');
    const passwordRepeatInput = screen.getByLabelText('Пароль (ещё раз)');
    const submitBtn = screen.getByText('Зарегистрироваться');

    fireEvent.change(loginInput, { target: { value: 'F' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(emailInput, { target: { value: 'aaaaa@gmail.com' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(nameInput, { target: { value: 'TestUser' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(lastNameInput, { target: { value: 'TestUser' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(phoneInput, { target: { value: '111111111111' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(passwordInput, { target: { value: '11111111A' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(passwordRepeatInput, { target: { value: '11111111A' } });

    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });
  });

  it('При вводе невалидного значения в поле подтверждения пароля кнопка сабмита остается недоступной', async() => {
    const loginInput = screen.getByLabelText('Логин');
    const emailInput = screen.getByLabelText('Почта');
    const nameInput = screen.getByLabelText('Имя');
    const lastNameInput = screen.getByLabelText('Фамилия');
    const phoneInput = screen.getByLabelText('Телефон');
    const passwordInput = screen.getByLabelText('Пароль');
    const passwordRepeatInput = screen.getByLabelText('Пароль (ещё раз)');
    const submitBtn = screen.getByText('Зарегистрироваться');

    fireEvent.change(loginInput, { target: { value: 'TestUser' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(emailInput, { target: { value: 'aaaaa@gmail.com' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(nameInput, { target: { value: 'TestUser' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(lastNameInput, { target: { value: 'TestUser' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(phoneInput, { target: { value: '111111111111' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(passwordInput, { target: { value: '11111111A' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(passwordRepeatInput, { target: { value: '9' } });

    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });
  });
});

