import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import ListActions from '../pages/ListActions'
import { mockLocalStorage } from './mockLocalStorage'
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';

const { getItemMock } = mockLocalStorage();

describe('Testando a página de Perfil', () => {

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
      "name": 'Usuário',
      "actions": [],
    }));

    const { history } = renderWithRouter(<Profile />)

		const h1ProfileEl = screen.getByRole('heading', { level: 1,  name: /atualize seus dados/i	})
		expect(h1ProfileEl).toBeInTheDocument();

		const inputEmailEl = screen.getByPlaceholderText(/e-mail/i);
		expect(inputEmailEl).toBeInTheDocument();

    const inputNomeEl = screen.getByPlaceholderText(/nome/i);
		expect(inputNomeEl).toBeInTheDocument();

		userEvent.type(inputNomeEl, 'Thiara');

		const buttonConfirmarEl = screen.getByRole('button', { name: /confirmar/i })
		expect(buttonConfirmarEl).toBeInTheDocument();

		userEvent.click(buttonConfirmarEl);

		expect(history.location.pathname).toBe('/listActions');

	});
});