import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';


describe('Testando a página de ListActions', () => {
  it('1. Teste se existe os componentes na tela', () => {
    renderWithRouter(<App />)
    const inputEmailEl = screen.getByPlaceholderText(/e-mail/i);
    const inputSenhaEl = screen.getByPlaceholderText(/senha/i);
    const buttonEl = screen.getByRole('button', {name: 'Acessar'});

    userEvent.type(inputEmailEl, 'teste@teste.com');
    userEvent.type(inputSenhaEl, '123456');
    userEvent.click(buttonEl)

    const buttonSaldoEl = screen.getByRole('button', {name: 'Saldo'});
    expect(buttonSaldoEl).toBeInTheDocument();
    const buttonUsuarioEl = screen.getByRole('button', {name: 'Usuário:XPTO'});
    expect(buttonUsuarioEl).toBeInTheDocument();
    const textEl = screen.queryByText('Você não possui ações. Que tal investir?');
    expect(textEl).toBeInTheDocument();
    const mylistaEl = screen.queryByRole('heading', { level: 3, name: 'Minhas Ações'});
    expect(mylistaEl).toBeInTheDocument();
    const actionsEl = screen.queryByRole('heading', { level: 3, name: 'Lista de Ações'});
    expect(actionsEl).toBeInTheDocument();
    const buttonContaEl = screen.getByRole('button', {name: 'Depósito/Retirada'});
    expect(buttonContaEl).toBeInTheDocument();
  });
  it('2 - Testa Rota de depósito de dinheiro', () => {
    renderWithRouter(<App />)
    const inputEmailEl = screen.getByPlaceholderText(/e-mail/i);
    const inputSenhaEl = screen.getByPlaceholderText(/senha/i);
    const buttonEl = screen.getByRole('button', {name: 'Acessar'});

    userEvent.type(inputEmailEl, 'teste@teste.com');
    userEvent.type(inputSenhaEl, '123456');
    userEvent.click(buttonEl);

    const buttonContaEl = screen.getByRole('button', {name: 'Depósito/Retirada'});
    userEvent.click(buttonContaEl);

    const depositoEl = screen.getByLabelText('Depósito');
    userEvent.click(depositoEl);
    const inputValorEl = screen.getByPlaceholderText(/Informe o valor/i);
    userEvent.type(inputValorEl, '100');

    const buttonConfirmarEl = screen.getByRole('button', {name: 'Confirmar'});
    userEvent.click(buttonConfirmarEl);

    const buttonSaldoEl = screen.getByRole('button', {name: 'Saldo'});
    expect(buttonSaldoEl).toBeInTheDocument();

    userEvent.click(buttonSaldoEl);

    const buttonValorSaldoEl = screen.getByRole('button', {name: 'R$ 100'});
    expect(buttonValorSaldoEl).toBeInTheDocument();
  });
});