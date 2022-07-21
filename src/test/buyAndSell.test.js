import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import "@testing-library/jest-dom/extend-expect";
import { mockLocalStorage } from './mockLocalStorage'
import App from '../App'
const reactMock = require('react');

const { getItemMock } = mockLocalStorage();

describe('Testando a página BuyAndSell', () => {
  

  it('1. Teste se existe os componentes na tela', () => {
    const setHookState = (newState) =>
  jest.fn().mockImplementation(() => [
    newState,
    () => {},
  ]);

  reactMock.useState = setHookState(
    [{company: 'AMBER', quantity: 1, price: 20}]);

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
    const { history } = renderWithRouter(<App />);
    history.push('/listActions');

    const btnCAction = screen.getByTestId("buttonC-actions-ASSAI")
    expect(btnCAction).toBeInTheDocument();

    userEvent.click(btnCAction);

    const titleBeS = screen.queryByRole('heading', { level: 1, name: 'Comprar/Vender Ações'});
    expect(titleBeS).toBeInTheDocument();

    const tableAction = screen.getByRole('table');
    expect(tableAction).toBeInTheDocument();

    const company = screen.queryByText('AMBER')
    expect(company).toBeInTheDocument();

    const textComprar = screen.getByText('Comprar')
    expect(textComprar).toBeInTheDocument();

    const textVender = screen.getByText('Vender')
    expect(textVender).toBeInTheDocument();

    const inputEl = screen.getAllByPlaceholderText(/Informe a quantidade de ações/i);
    expect(inputEl.length).toBe(2);

    const confirmar = screen.queryByRole('button', { name: 'Confirmar'});
    expect(confirmar).toBeInTheDocument();

    userEvent.type(inputEl[0], 1)
    userEvent.click(confirmar)

    const alert = screen.queryByRole('alert', { name: 'Vendaa feita com sucesso'});



    });

    
});