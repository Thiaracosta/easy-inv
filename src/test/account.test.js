import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Account from '../pages/Account'
import { mockLocalStorage } from './mockLocalStorage'

const { getItemMock } = mockLocalStorage();

describe('Testando a página de Account', () => {
  it('1. Teste se existe os componentes na tela', () => {
  getItemMock.mockReturnValue(JSON.stringify({
    "account": 0,
    "date": "2022-07-20T03:04:30.256Z",
    "email": "thiara@gmail.com",
    "myActions": [],
    "name": 'Usuário:XPTO',
    "actions": [],
  }));

  renderWithRouter(<Account />)
    const buttonSaldoEl = screen.getByRole('button', {name: 'Saldo'});
    expect(buttonSaldoEl).toBeInTheDocument();

    const textEl = screen.queryByText('Saldo em conta: R$0.00');
    expect(textEl).toBeInTheDocument();

    const buttonUsuarioEl = screen.getByRole('button', {name: 'Usuário:XPTO'});
    expect(buttonUsuarioEl).toBeInTheDocument();

    const depositoEl = screen.getByLabelText('Depósito');
    expect(depositoEl).toBeInTheDocument();

    const retiradaEl = screen.getByLabelText('Retirada');
    expect(retiradaEl).toBeInTheDocument();

    const inputValorEl = screen.getByPlaceholderText(/Informe o valor/i);
    expect(inputValorEl).toBeInTheDocument();

    const buttonVoltarEl = screen.getByRole('button', {name: 'Voltar'});
    expect(buttonVoltarEl).toBeInTheDocument();

    const buttonConfirmarEl = screen.getByRole('button', {name: 'Confirmar'});
    expect(buttonConfirmarEl).toBeInTheDocument();
  });

  it('2 - Testa Rota de depósito de dinheiro de 100 reais', () => {
    getItemMock.mockReturnValue(JSON.stringify({
      "account": 0,
      "date": "2022-07-20T03:04:30.256Z",
      "email": "thiara@gmail.com",
      "myActions": [],
      "name": 'Usuário:XPTO',
      "actions": [],
    }));

    renderWithRouter(<Account />)
    
    const depositoEl = screen.getByLabelText('Depósito');
    userEvent.click(depositoEl);

    const inputValorEl = screen.getByPlaceholderText(/Informe o valor/i);
    userEvent.type(inputValorEl, '100');

    const buttonConfirmarEl = screen.getByRole('button', {name: 'Confirmar'});
    userEvent.click(buttonConfirmarEl);

    const buttonSaldoEl = screen.getByRole('button', {name: 'Saldo'});
    expect(buttonSaldoEl).toBeInTheDocument();

    userEvent.click(buttonSaldoEl);

    const message = screen.getByRole('heading', { level: 1, name: /Depósito feito com sucesso/i})
    expect(message).toBeInTheDocument();
  });

  it('3 - Testa Rota retirada de dinheiro de 100 reais sem saldo', () => {
    getItemMock.mockReturnValue(JSON.stringify({
      "account": 100,
      "date": "2022-07-20T03:04:30.256Z",
      "email": "thiara@gmail.com",
      "myActions": [],
      "name": 'Usuário:XPTO',
      "actions": [],
    }));

    renderWithRouter(<Account />)

    const retiradaEl = screen.queryByLabelText('Retirada');
    userEvent.click(retiradaEl);

    const inputValorEl = screen.getByPlaceholderText(/Informe o valor/i);
    userEvent.type(inputValorEl, '100');
    
    const buttonConfirmarEl = screen.getByRole('button', {name: 'Confirmar'});
    userEvent.click(buttonConfirmarEl);

    const message = screen.getByRole('heading', { level: 1, name: /Retirada feita com sucesso/i})
    expect(message).toBeInTheDocument();
  });

  it('4 - Testa Rota de saque quando não tem dinheiro na conta', () => {
    getItemMock.mockReturnValue(JSON.stringify({
      "account": 0,
      "date": "2022-07-20T03:04:30.256Z",
      "email": "thiara@gmail.com",
      "myActions": [],
      "name": 'Usuário:XPTO',
      "actions": [],
    }));

    renderWithRouter(<Account />)
    
    const depositoEl = screen.getByLabelText('Retirada');
    userEvent.click(depositoEl);

    const inputValorEl = screen.getByPlaceholderText(/Informe o valor/i);
    userEvent.type(inputValorEl, '100');

    const buttonConfirmarEl = screen.getByRole('button', {name: 'Confirmar'});
    userEvent.click(buttonConfirmarEl);

    const buttonSaldoEl = screen.getByRole('button', {name: 'Saldo'});
    expect(buttonSaldoEl).toBeInTheDocument();

    userEvent.click(buttonSaldoEl);

    const message = screen.getByRole('heading', { level: 1, name: /Saldo insuficiente/i})
    expect(message).toBeInTheDocument();
  });

  it('5 - Testa Rota quando não digita valor', () => {
    getItemMock.mockReturnValue(JSON.stringify({
      "account": 0,
      "date": "2022-07-20T03:04:30.256Z",
      "email": "thiara@gmail.com",
      "myActions": [],
      "name": 'Usuário:XPTO',
      "actions": [],
    }));

    renderWithRouter(<Account />)
    
    const depositoEl = screen.getByLabelText('Retirada');
    userEvent.click(depositoEl);

    const inputValorEl = screen.getByPlaceholderText(/Informe o valor/i);
    userEvent.type(inputValorEl, '');

    const buttonConfirmarEl = screen.getByRole('button', {name: 'Confirmar'});
    userEvent.click(buttonConfirmarEl);

    const buttonSaldoEl = screen.getByRole('button', {name: 'Saldo'});
    expect(buttonSaldoEl).toBeInTheDocument();

    userEvent.click(buttonSaldoEl);

    const message = screen.getByRole('heading', { level: 1, name: /Informe um valor/i})
    expect(message).toBeInTheDocument();
  });

});