import { render, screen } from '@testing-library/react';
import App from '../App';

/* test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */

describe('Testando a página de Login', () => {
  render(<App/>);
  it('1. Verifica-se existe impresso na tela "Sing In"', () => {
    const h1Element = screen.getByRole('heading', { level: 1, name: /Sing in/i})
    expect(h1Element).toBeInTheDocument();
  })
})