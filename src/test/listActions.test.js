import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando a página de ListActions', () => {
  renderWithRouter(<App />)
  const inputEmailEl = screen.getByPlaceholderText(/e-mail/i);
  const inputSenhaEl = screen.getByPlaceholderText(/senha/i);
  const buttonEl = screen.getByRole('button', {name: 'Acessar'});

  userEvent.type(inputEmailEl, 'teste@teste.com');
  userEvent.type(inputSenhaEl, '123456');
  userEvent.click(buttonEl)
  it('1. Verifica-se existe impresso na tela "Sing In"', () => {
  

  });
});