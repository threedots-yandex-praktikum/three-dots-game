import React from 'react';
import { cleanup, fireEvent, render, waitFor, screen } from '@testing-library/react';
import { Login } from '../Login';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';


const Wrapper = () => (
  <Provider store={store}>
    <Login/>
  </Provider>
);

beforeEach(() => render(<Wrapper/>));
afterEach(cleanup);

describe('Страница с формой логина', () => {
  it('Корректно отрисовывается пустое поле логина', () => {
    const loginInput = screen.getByLabelText('Логин');

    expect(loginInput).toBeInTheDocument();
    expect(loginInput).toBeVisible();
    expect(loginInput).toBeEmptyDOMElement();
  });

  it('Корректно отрисовывается пустое поле пароля', () => {
    const passwordInput = screen.getByLabelText('Пароль');

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toBeVisible();
    expect(passwordInput).toBeEmptyDOMElement();
  });

  it('Корректно отрисовывается задизейбленная кнопка сабмита', () => {
    const submitBtn = screen.getByText('Войти');

    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeVisible();
    expect(submitBtn).toBeDisabled();
  });

  it('При вводе валидных значений кнопка сабмита становится доступной', async() => {
    const loginInput = screen.getByLabelText('Логин');
    const passwordInput = screen.getByLabelText('Пароль');
    const submitBtn = screen.getByText('Войти');

    fireEvent.change(loginInput, { target: { value: 'TestUser' } });

    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(passwordInput, { target: { value: '11111111A' } });

    await waitFor(() => {
      expect(submitBtn).not.toBeDisabled();
    });
  });

  it('При вводе невалидного логина кнопка сабмита остается недоступной', async() => {
    const loginInput = screen.getByLabelText('Логин');
    const passwordInput = screen.getByLabelText('Пароль');
    const submitBtn = screen.getByText('Войти');

    fireEvent.change(loginInput, { target: { value: '45' } });

    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(passwordInput, { target: { value: '11111111A' } });

    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });
  });

  it('При вводе невалидного пароля кнопка сабмита остается недоступной', async() => {
    const loginInput = screen.getByLabelText('Логин');
    const passwordInput = screen.getByLabelText('Пароль');
    const submitBtn = screen.getByText('Войти');

    fireEvent.change(loginInput, { target: { value: 'TestUser' } });

    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(passwordInput, { target: { value: 'ffd4' } });

    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });
  });
});

