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
      "myActions": [{ 
          "company":"AMBEV",
          "sector": "Alimentos",
          "quantity": 1,
          "price": 64.00,
        },
        { 
          "company":"ASSAI",
          "sector": "Varejo",
          "quantity": 1,
          "price": 52.00,
        }],
      "name": 'Usuário:XPTO',
      "actions": [],
    }));

    renderWithRouter(<ListActions />)

    const buttonSaldoEl = screen.getByRole('button', {name: 'Saldo'});
    expect(buttonSaldoEl).toBeInTheDocument();
    const buttonUsuarioEl = screen.getByRole('button', {name: 'Usuário:XPTO'});
    expect(buttonUsuarioEl).toBeInTheDocument();
    const mylistaEl = screen.queryByRole('heading', { level: 3, name: 'Minhas Ações:'});
    expect(mylistaEl).toBeInTheDocument();
    const actionsEl = screen.queryByRole('heading', { level: 3, name: 'Disponíveis para investir:'});
    expect(actionsEl).toBeInTheDocument();
    const buttonContaEl = screen.getByRole('button', {name: 'Depósito/Retirada'});
    expect(buttonContaEl).toBeInTheDocument();


    const tableMyActions = screen.queryByTestId('table-myAction')
    expect(tableMyActions).toBeInTheDocument();
    const tableActions = screen.getByTestId('table-action')
    expect(tableActions).toBeInTheDocument();

    const myActionsASSAI = screen.getByTestId("myActions-ASSAI")
    expect(myActionsASSAI).toBeInTheDocument();

    const myActionsAMBEV = screen.getByTestId("myActions-AMBEV")
    expect(myActionsAMBEV).toBeInTheDocument();
   
    const buttonCEl = screen.getAllByRole('button', {name: 'C'});
    expect(buttonCEl.length).toBe(25);

    const btnCmyAction = screen.getByTestId("buttonC-myActions-AMBEV")
    expect(btnCmyAction).toBeInTheDocument();

    const btnVmyAction = screen.getByTestId("buttonV-myActions-AMBEV")
    expect(btnVmyAction).toBeInTheDocument();
    
  });
});