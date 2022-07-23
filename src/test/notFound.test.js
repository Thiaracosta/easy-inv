import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../pages/NotFound'


describe('Testando a página não encotrada - ERROR 404', () => {

  it('1. Teste se existe os componentes na tela', () => {

    const { history } = renderWithRouter(<NotFound />);
    history.push('/naoencontrada');
		const imagEl = screen.getByRole('img', {
      name: /erro 404/i
    })
		expect(imagEl).toBeInTheDocument();
	});
});