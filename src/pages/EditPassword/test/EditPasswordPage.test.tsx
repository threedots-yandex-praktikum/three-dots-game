import React from 'react';
import { fireEvent, render, waitFor, screen, cleanup } from '@testing-library/react';
import { EditPassword } from '../EditPassword';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from 'store/store';


const Wrapper = () => (
  <Provider store={store}>
    <EditPassword/>
  </Provider>
);

beforeEach(() => render(<Wrapper/>));
afterEach(cleanup);


describe('Страница с формой изменения пароля', () => {
  it('Корректно отрисовывается пустое поле старого пароля', () => {
    const oldPasswordInput = screen.getByLabelText('Старый пароль');

    expect(oldPasswordInput).toBeInTheDocument();
    expect(oldPasswordInput).toBeVisible();
    expect(oldPasswordInput).toBeEmptyDOMElement();
  });

  it('Корректно отрисовывается пустое поле нового пароля', () => {
    const newPasswordInput = screen.getByLabelText('Новый пароль');

    expect(newPasswordInput).toBeInTheDocument();
    expect(newPasswordInput).toBeVisible();
    expect(newPasswordInput).toBeEmptyDOMElement();
  });

  it('Корректно отрисовывается пустое поле повторения нового пароля', () => {
    const newPasswordRepeatInput = screen.getByLabelText('Новый пароль (ещё раз)');

    expect(newPasswordRepeatInput).toBeInTheDocument();
    expect(newPasswordRepeatInput).toBeVisible();
    expect(newPasswordRepeatInput).toBeEmptyDOMElement();
  });

  it('Корректно отрисовывается доступная кнопка назад', () => {
    const goBackBtn = screen.getByText('Назад');

    expect(goBackBtn).toBeInTheDocument();
    expect(goBackBtn).toBeVisible();
    expect(goBackBtn).not.toBeDisabled();
  });

  it('Корректно отрисовывается задизейбленная кнопка сабмита', () => {
    const submitBtn = screen.getByText('Сохранить');

    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeVisible();
    expect(submitBtn).toBeDisabled();
  });

  it('При вводе валидных значений кнопка сабмита становится доступной', async() => {
    const oldPasswordInput = screen.getByLabelText('Старый пароль');
    const newPasswordInput = screen.getByLabelText('Новый пароль');
    const newPasswordRepeatInput = screen.getByLabelText('Новый пароль (ещё раз)');
    const submitBtn = screen.getByText('Сохранить');

    fireEvent.change(oldPasswordInput, { target: { value: '11111111A' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(newPasswordInput, { target: { value: '11111111B' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(newPasswordRepeatInput, { target: { value: '11111111B' } });
    await waitFor(() => {
      expect(submitBtn).not.toBeDisabled();
    });
  });

  it('При вводе невалидного значения повторения нового пароля кнопка сабмита остается задизейбленной', async() => {
    const oldPasswordInput = screen.getByLabelText('Старый пароль');
    const newPasswordInput = screen.getByLabelText('Новый пароль');
    const newPasswordRepeatInput = screen.getByLabelText('Новый пароль (ещё раз)');
    const submitBtn = screen.getByText('Сохранить');

    fireEvent.change(oldPasswordInput, { target: { value: '11111111A' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(newPasswordInput, { target: { value: '11111111B' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    fireEvent.change(newPasswordRepeatInput, { target: { value: '11111111' } });
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });
  });

});

