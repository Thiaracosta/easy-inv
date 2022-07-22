import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import "@testing-library/jest-dom/extend-expect";
import { mockLocalStorage } from './mockLocalStorage'
import InvProvider from '../context/InvProvider';
import ListActions from '../pages/ListActions';
//import BuyAndSell from '../pages/BuyAndSell';
;

const { getItemMock } = mockLocalStorage();

describe('Testando a página BuyAndSell', () => {
  /* beforeEach(() => {
    /* const setHookState = (newState) =>
     jest.fn().mockImplementation(() => [
      newState,
      () => {},
    ]);
  
    reactMock.useState = setHookState(
      [{company: 'ASSAI', quantity: 1, price: 52.00}]); */

   /*  getItemMock.mockReturnValue(JSON.stringify({
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
  }) */

  /* afterEach(() => {
    // jest.restoreAllMocks();
    localStorage.clear();
  });  */

  it('1. Teste se existe os componentes na tela', async () => {
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
    }));
 const { history } = renderWithRouter(
    <InvProvider>
      <ListActions />
    </InvProvider>)

  const btnCAction = screen.getByTestId("buttonC-actions-ASSAI")
  expect(btnCAction).toBeInTheDocument();

  userEvent.click(btnCAction);

  console.log(history.location.pathname);

  const titleBeS = screen.getByText(/comprar\/vender ações/i)
  expect(titleBeS).toBeInTheDocument();

 /*  const titleBeS = screen.queryByRole('heading', { name: /comprar\/vender ações/i});
    expect(titleBeS).toBe(true); */

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

  /* it('2. Verifica se faz uma Venda de uma ação', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/listActions');
  
      const btnCAction = screen.getByTestId("buttonC-actions-ASSAI")
  
      userEvent.click(btnCAction);
  
      const inputEl = screen.getByTestId(/input-sell/i);

  
      const confirmar = screen.queryByRole('button', { name: 'Confirmar'});
  
      userEvent.type(inputEl, 1)
      userEvent.click(confirmar)
  
      const message = screen.getByRole('heading', { level: 1, name: /Venda feita com sucesso/i})
      expect(message).toBeInTheDocument();
    });

  it('3. Verifica se não faz uma Venda - quando não tem ações suficientes', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/listActions');
    
    const btnCAction = screen.getByTestId("buttonC-actions-ASSAI")
    
    userEvent.click(btnCAction);
    
    const inputEl = screen.getByTestId(/input-sell/i);
    
    const confirmar = screen.queryByRole('button', { name: 'Confirmar'});
    
    userEvent.type(inputEl, 2)
    userEvent.click(confirmar)
    
    const message = screen.getByRole('heading', { level: 1, name: /Você não possui essa quantidade de ações/i})
    expect(message).toBeInTheDocument();
  }); */
});
