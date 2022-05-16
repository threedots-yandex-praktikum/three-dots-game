import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Login } from '../Login';
import '@testing-library/jest-dom';


describe('Страница с формой логина', () => {
  it('Корректно отрисовывается пустое поле логина', () => {
    const LoginFormMarkup = render(<Login/>);

    const loginInput = LoginFormMarkup.getByLabelText('Логин');

    expect(loginInput).toBeInTheDocument();
    expect(loginInput).toBeVisible();
    expect(loginInput).toBeEmptyDOMElement();
  });

  it('Корректно отрисовывается пустое поле пароля', () => {
    const LoginFormMarkup = render(<Login/>);

    const passwordInput = LoginFormMarkup.getByLabelText('Пароль');

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toBeVisible();
    expect(passwordInput).toBeEmptyDOMElement();
  });

  it('Корректно отрисовывается задизейбленная кнопка сабмита', () => {
    const LoginFormMarkup = render(<Login/>);

    const submitBtn = LoginFormMarkup.getByText('Войти');

    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeVisible();
    expect(submitBtn).toBeDisabled();
  });

  it('При вводе валидных значений кнопка сабмита становится доступной', async() => {
    const LoginFormMarkup = render(<Login/>);

    const loginInput = LoginFormMarkup.getByLabelText('Логин');
    const passwordInput = LoginFormMarkup.getByLabelText('Пароль');
    const submitBtn = LoginFormMarkup.getByText('Войти');

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
    const LoginFormMarkup = render(<Login/>);

    const loginInput = LoginFormMarkup.getByLabelText('Логин');
    const passwordInput = LoginFormMarkup.getByLabelText('Пароль');
    const submitBtn = LoginFormMarkup.getByText('Войти');

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
    const LoginFormMarkup = render(<Login/>);

    const loginInput = LoginFormMarkup.getByLabelText('Логин');
    const passwordInput = LoginFormMarkup.getByLabelText('Пароль');
    const submitBtn = LoginFormMarkup.getByText('Войти');

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

