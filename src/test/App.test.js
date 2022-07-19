import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

/* test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */

describe('Testando a página de Login', () => {
  it('1. Verifica-se existe impresso na tela "Sing In"', () => {
    render(<App/>);
    
   /*  const h1Element = screen.getByRole('button')
    expect(h1Element).toBeInTheDocument(); */
  })
})