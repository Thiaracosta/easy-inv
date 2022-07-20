import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import ListActions from '../pages/ListActions'
import { mockLocalStorage } from './mockLocalStorage'

const { getItemMock } = mockLocalStorage();

describe('Testando a página de ListActions', () => {
  it('1. Teste se existe os componentes na tela', () => {
    getItemMock.mockReturnValue(JSON.stringify({
      "account": 0,
      "date": "2022-07-20T03:04:30.256Z",
      "email": "thiara@gmail.com",
      "myActions": [],
      "name": 'Usuário:XPTO',
      "actions": [],
    }));
    renderWithRouter(<ListActions />)

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
    const tableActions = screen.getByRole('table')
    expect(tableActions).toBeInTheDocument();
    const actionAMBEVEl = screen.queryByText(/AMBEV/i);
    expect(actionAMBEVEl).toBeInTheDocument();
    const actionASSAIEl = screen.queryByText(/ASSAI/i);
    expect(actionASSAIEl).toBeInTheDocument();
    const buttonCEl = screen.getAllByRole('button', {name: 'C'});
    expect(buttonCEl.length).toBe(23);
  });
});