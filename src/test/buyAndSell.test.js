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
  beforeEach(() => {
    const setHookState = (newState) =>
     jest.fn().mockImplementation(() => [
      newState,
      () => {},
    ]);
  
    reactMock.useState = setHookState(
      [{company: 'ASSAI', quantity: 1, price: 52.00}]);

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
  })

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

  it('1. Teste se existe os componentes na tela', () => {

    const { history } = renderWithRouter(<App />);
    history.push('/listActions');

    const btnCAction = screen.getByTestId("buttonC-actions-ASSAI")
    expect(btnCAction).toBeInTheDocument();

    userEvent.click(btnCAction);

    const titleBeS = screen.queryByRole('heading', { level: 1, name: 'Comprar/Vender Ações'});
    expect(titleBeS).toBeInTheDocument();

    const tableAction = screen.getByRole('table');
    expect(tableAction).toBeInTheDocument();

    const company = screen.queryByText('ASSAI')
    expect(company).toBeInTheDocument();

    const textComprar = screen.getByText('Comprar')
    expect(textComprar).toBeInTheDocument();

    const textVender = screen.getByText('Vender')
    expect(textVender).toBeInTheDocument();

    const inputEl = screen.getAllByPlaceholderText(/Informe a quantidade de ações/i);
    expect(inputEl.length).toBe(2);

    const confirmar = screen.queryByRole('button', { name: 'Confirmar'});
    expect(confirmar).toBeInTheDocument();
    });

    it('2. Verifica se faz uma Venda de uma ação', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/listActions');
  
      const btnCAction = screen.getByTestId("buttonC-actions-ASSAI")
  
      userEvent.click(btnCAction);
  
      const inputEl = screen.getAllByPlaceholderText(/Informe a quantidade de ações/i);
  
      const confirmar = screen.queryByRole('button', { name: 'Confirmar'});
  
      userEvent.type(inputEl[0], 1)
      userEvent.click(confirmar)
  
      const title = screen.queryByText('Você nnão possui ações. Que tal investir?');
      expect(title).toBeInTheDocument();
      });

      it('3. Verifica se não faz uma Venda - quando não tem ações suficientes', () => {
        const { history } = renderWithRouter(<App />);
        history.push('/listActions');
    
        const btnCAction = screen.getByTestId("buttonC-actions-ASSAI")
    
        userEvent.click(btnCAction);
    
        const inputEl = screen.getAllByPlaceholderText(/Informe a quantidade de ações/i);
    
        const confirmar = screen.queryByRole('button', { name: 'Confirmar'});
    
        userEvent.type(inputEl[0], 2)
        userEvent.click(confirmar)
    
        const title = screen.queryByText('ASSAI');
        expect(title).toBeInTheDocument();
        });
});
/* describe('Testando a página BuyAndSell', () => {
  beforeEach(() => {
    const setHookState = (newState) =>
     jest.fn().mockImplementation(() => [
      newState,
      () => {},
    ]);
  
    reactMock.useState = setHookState(
      [{company: 'ASSAI', quantity: 1, price: 52.00}]);

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
  })

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });
 */