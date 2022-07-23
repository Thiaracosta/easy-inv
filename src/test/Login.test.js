import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando a página de Login', () => {
  
  it('1. Verifica-se existe impresso na tela "Sing In"', () => {
    renderWithRouter(<App/>);
    const headingEl = screen.getByRole('heading', { level: 1, name: /Sing in/i});
    expect(headingEl).toBeInTheDocument();
  })

  it('2. Verifica-se existe um input Email', () => {
    renderWithRouter(<App/>);
    const inputEmailEl = screen.getByPlaceholderText(/e-mail/i);
    expect(inputEmailEl).toBeInTheDocument();
  })

  it('3. Verifica-se existe um input Senha', () => {
    renderWithRouter(<App/>);
    const inputSenhaEl = screen.getByPlaceholderText(/senha/i);
    expect(inputSenhaEl).toBeInTheDocument();
  })

  it('4. Verifica-se existe um Botão de Acessar', () => {
    renderWithRouter(<App/>);
    const buttonEl = screen.getByRole('button', {name: /acessar/i});
    expect(buttonEl).toBeInTheDocument();
  })

  it('5. Verifica se o botão fica desabilidato se a senha tiver menos 6 caracters"', () => {
      renderWithRouter(<App />)
      const inputEmailEl = screen.getByPlaceholderText(/e-mail/i);
      const inputSenhaEl = screen.getByPlaceholderText(/senha/i);
      const buttonEl = screen.getByRole('button', {name: /acessar/i});
  
      userEvent.type(inputEmailEl, 'teste@teste.com');
      userEvent.type(inputSenhaEl, '123');
      expect(buttonEl).toBeDisabled();
    })

  it('6. Verifica se o botão fica desabilidato se o email não tiver o formato"', () => {
    renderWithRouter(<App />)
    const inputEmailEl = screen.getByPlaceholderText(/e-mail/i);
    const inputSenhaEl = screen.getByPlaceholderText(/senha/i);
    const buttonEl = screen.getByRole('button', {name: /acessar/i});
  
    userEvent.type(inputEmailEl, '@teste.com');
    userEvent.type(inputSenhaEl, '123456');
    expect(buttonEl).toBeDisabled();
  })

  it('7. Verifica se o botão fica habilitado se dados estiverem corretos', () => {
    renderWithRouter(<App />)
    const inputEmailEl = screen.getByPlaceholderText(/e-mail/i);
    const inputSenhaEl = screen.getByPlaceholderText(/senha/i);
    const buttonEl = screen.getByRole('button', {name: /acessar/i});
  
    userEvent.type(inputEmailEl, 'teste@teste.com');
    userEvent.type(inputSenhaEl, '123456');
    expect(buttonEl).toBeEnabled();
  })

  it('8. Verifica se ao clicar no botão vai para a páginas de Ações', () => {
    renderWithRouter(<App />)
    const inputEmailEl = screen.getByPlaceholderText(/e-mail/i);
    const inputSenhaEl = screen.getByPlaceholderText(/senha/i);
    const buttonEl = screen.getByRole('button', {name: 'Acessar'});
  
    userEvent.type(inputEmailEl, 'teste@teste.com');
    userEvent.type(inputSenhaEl, '123456');
    userEvent.click(buttonEl);

    const mylistEl = screen.queryByRole('heading', { level: 3, name: 'Minhas Ações:'});
    expect(mylistEl).toBeInTheDocument();

    const textEl = screen.queryByText('Você não possui ações. Que tal investir?');
    expect(textEl).toBeInTheDocument();
  })
})