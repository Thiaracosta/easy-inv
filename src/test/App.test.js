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
    const headingEl = screen.getByRole('heading', { level: 1, name: /Sing in/i});
    expect(headingEl).toBeInTheDocument();
  })
  it('2. Verifica-se existe um input Email', () => {
    render(<App/>);
    const inputEmailElement = screen.getByPlaceholderText(/e-mail/i);
    expect(inputEmailElement).toBeInTheDocument();
  })
})