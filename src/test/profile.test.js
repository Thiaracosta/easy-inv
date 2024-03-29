import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { mockLocalStorage } from './mockLocalStorage'
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';

const { getItemMock, setItemMock } = mockLocalStorage();

describe('Testando a página de Perfil', () => {

  beforeEach(() => {
    getItemMock.mockReturnValue(JSON.stringify({
      "account": 100,
      "date": "2022-07-20T03:04:30.256Z",
      "email": "thiara@gmail.com",
      "myActions": [],
      "name": 'Usuário',
      "company": 'ASSAI',
    }))}); 
    
    afterEach(() => {
      localStorage.clear();
    });
    
    it('1. Teste se existe os componentes na tela', () => {
    const { history } = renderWithRouter(<Profile />)

		const h1ProfileEl = screen.getByRole('heading', { level: 1,  name: /perfil/i	})
		expect(h1ProfileEl).toBeInTheDocument();

		const inputEmailEl = screen.getByPlaceholderText(/e-mail/i);
		expect(inputEmailEl).toBeInTheDocument();

    const inputNomeEl = screen.getByPlaceholderText(/nome/i);
		expect(inputNomeEl).toBeInTheDocument();

		userEvent.type(inputNomeEl, 'Thiara');

		const buttonConfirmarEl = screen.getByRole('button', { name: /confirmar/i })
		expect(buttonConfirmarEl).toBeInTheDocument();

		userEvent.click(buttonConfirmarEl);

    expect(setItemMock).toHaveBeenCalledWith('user', "{\"account\":100,\"date\":\"2022-07-20T03:04:30.256Z\",\"email\":\"thiara@gmail.com\",\"myActions\":[],\"name\":\"Thiara\",\"company\":\"ASSAI\"}");

		expect(history.location.pathname).toBe('/listActions');

	});
});

describe('Testando o componente graphic', () => {

  beforeEach(() => {
    getItemMock.mockReturnValue(JSON.stringify({
      "account": 100,
      "date": "2022-07-20T03:04:30.256Z",
      "email": "thiara@gmail.com",
      "myActions": [
        { 
          company:"AMBEV",
          sector: "Alimentos",
          quantity: 10,
          price: 64.00,
        },
        { 
          company:"ASSAI",
          sector: "Varejo",
          quantity: 6,
          price: 52.00,
        },
        { 
          company:"AZUL",
          sector: "Companhia aérea",
          quantity: 3,
          price: 52.00,
        },
      ],
      "name": 'Usuário',
      "company": 'ASSAI',
    }))}); 
    
    afterEach(() => {
      localStorage.clear();
    });

    it('1. Teste se existe componente do titulo do gráfico', () => {
      renderWithRouter(<Profile />)
      const h3TitleGraphicEl = screen.getByText(/Distribuição/i)
		  expect(h3TitleGraphicEl).toBeInTheDocument();
    });
  });

// REFERÊNCIA 
// Para fazer o mock fo localStorange utilizei o link:
// https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests