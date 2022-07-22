import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import "@testing-library/jest-dom/extend-expect";
import { mockLocalStorage } from './mockLocalStorage'
import InvProvider from '../context/InvProvider';
import ListActions from '../pages/ListActions';
import BuyAndSell from '../pages/BuyAndSell';
;

const { getItemMock } = mockLocalStorage();

describe('Testando a página BuyAndSell', () => {
  beforeEach(() => {
    getItemMock.mockReturnValue(JSON.stringify({
      "account": 100,
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
      "name": 'Usuário',
      "company": 'ASSAI',
    }))}); 

  afterEach(() => {
    localStorage.clear();
  });

  it('1. Teste se existe os componentes na tela', async () => {
    renderWithRouter(<BuyAndSell />);

    const titleBeS = screen.getByTestId('h1-buyandSell');
    expect(titleBeS).toBeInTheDocument();

    const titleh1 = screen.queryByRole('heading', { name: /comprar\/vender ações/i});
    expect(titleh1).toBeInTheDocument();

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

    it('2. Verifica se é possível comprar a ação', async () => {
    renderWithRouter(<BuyAndSell />);
  
    const textComprar = screen.getByText('Comprar')

    userEvent.click(textComprar);
  
    const inputEl = screen.getByTestId(/input-buy/i);

    userEvent.type(inputEl, '1');
  
    const confirmar = screen.queryByRole('button', { name: 'Confirmar'});
    userEvent.click(confirmar);

    const message = screen.getByText(/compra feita com sucesso/i)
    expect(message).toBeInTheDocument();
    });

    it('3. Verifica se não é possível fazer a compra - saldo insuficiente', async () => {
    renderWithRouter(<BuyAndSell />);
    
    const textComprar = screen.getByText('Comprar')
  
    userEvent.click(textComprar);
    
    const inputEl = screen.getByTestId(/input-buy/i);
  
    userEvent.type(inputEl, '9');
    
    const confirmar = screen.queryByRole('button', { name: 'Confirmar'});
    userEvent.click(confirmar);
  
    const message = screen.getByText(/saldo insuficente/i)
    expect(message).toBeInTheDocument();
  });

  it('4. Verifica se é possível fazer uma venda', async () => {
    renderWithRouter(<BuyAndSell />);
    
    const textComprar = screen.getByText('Comprar')
  
    userEvent.click(textComprar);
    
    const inputEl = screen.getByTestId(/input-sell/i);
  
    userEvent.type(inputEl, '1');
    
    const confirmar = screen.queryByRole('button', { name: 'Confirmar'});
    userEvent.click(confirmar);
  
    const message = screen.getByText(/venda feita com sucesso/i)
    expect(message).toBeInTheDocument();
  });

  it('5. Verifica se não é possível fazer uma venda de mais ações que possui', async () => {
    renderWithRouter(<BuyAndSell />);
    
    const textComprar = screen.getByText('Comprar')
  
    userEvent.click(textComprar);
    
    const inputEl = screen.getByTestId(/input-sell/i);
  
    userEvent.type(inputEl, '9');
    
    const confirmar = screen.queryByRole('button', { name: 'Confirmar'});
    userEvent.click(confirmar);
  
    const message = screen.getByText(/você não possui essa quantidade de ações/i)
    expect(message).toBeInTheDocument();
  });

  it('7. Verifica se não é possível fazer uma venda - se não possi essa ação', async () => {
    getItemMock.mockReturnValue(JSON.stringify({
      "account": 100,
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
      "name": 'Usuário',
      "company": 'AZUL',
    })); 

    renderWithRouter(<BuyAndSell />);
    
    const textComprar = screen.getByText('Comprar')
  
    userEvent.click(textComprar);
    
    const inputEl = screen.getByTestId(/input-sell/i);
  
    userEvent.type(inputEl, '1');
    
    const confirmar = screen.queryByRole('button', { name: 'Confirmar'});
    userEvent.click(confirmar);
  
    const message = screen.getByText(/não possui nenhuma ação dessa companhia/i)
    expect(message).toBeInTheDocument();
  });
});