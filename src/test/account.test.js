import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';


describe('Testando a página de Account', () => {
  it('1. Teste se existe os componentes na tela', () => {
    renderWithRouter(<App />)
    const inputEmailEl = screen.getByPlaceholderText(/e-mail/i);
    const inputSenhaEl = screen.getByPlaceholderText(/senha/i);
    const buttonEl = screen.getByRole('button', {name: 'Acessar'});

    userEvent.type(inputEmailEl, 'teste@teste.com');
    userEvent.type(inputSenhaEl, '123456');
    userEvent.click(buttonEl);

    const buttonContaEl = screen.getByRole('button', {name: 'Depósito/Retirada'});
    userEvent.click(buttonContaEl);

    const buttonSaldoEl = screen.getByRole('button', {name: 'Saldo'});
    expect(buttonSaldoEl).toBeInTheDocument();

    const textEl = screen.queryByText('Saldo em conta: R$0.00');
    expect(textEl).toBeInTheDocument();

    const buttonUsuarioEl = screen.getByRole('button', {name: 'Usuário:XPTO'});
    expect(buttonUsuarioEl).toBeInTheDocument();

    const depositoEl = screen.getByLabelText('Depósito');
    expect(depositoEl).toBeInTheDocument();

    const retiradaEl = screen.getByLabelText('Retirada');
    expect(retiradaEl).toBeInTheDocument();

    const inputValorEl = screen.getByPlaceholderText(/Informe o valor/i);
    expect(inputValorEl).toBeInTheDocument();

    const buttonVoltarEl = screen.getByRole('button', {name: 'Voltar'});
    expect(buttonVoltarEl).toBeInTheDocument();

    const buttonConfirmarEl = screen.getByRole('button', {name: 'Confirmar'});
    expect(buttonConfirmarEl).toBeInTheDocument();
  });

  it('2 - Testa Rota de depósito de dinheiro de 100 reais', () => {
    renderWithRouter(<App />)
    const inputEmailEl = screen.getByPlaceholderText(/e-mail/i);
    const inputSenhaEl = screen.getByPlaceholderText(/senha/i);
    const buttonEl = screen.getByRole('button', {name: 'Acessar'});

    userEvent.type(inputEmailEl, 'teste@teste.com');
    userEvent.type(inputSenhaEl, '123456');
    userEvent.click(buttonEl);

    const buttonContaEl = screen.getByRole('button', {name: 'Depósito/Retirada'});
    userEvent.click(buttonContaEl);

    const depositoEl = screen.getByLabelText('Depósito');
    userEvent.click(depositoEl);
    const inputValorEl = screen.getByPlaceholderText(/Informe o valor/i);
    userEvent.type(inputValorEl, '100');

    const buttonConfirmarEl = screen.getByRole('button', {name: 'Confirmar'});
    userEvent.click(buttonConfirmarEl);

    const buttonSaldoEl = screen.getByRole('button', {name: 'Saldo'});
    expect(buttonSaldoEl).toBeInTheDocument();

    userEvent.click(buttonSaldoEl);

    const buttonValorSaldoEl = screen.getByRole('button', {name: 'R$ 100'});
    expect(buttonValorSaldoEl).toBeInTheDocument();
  });

  it('2 - Testa Rota de deposito e retirada de dinheiro de 100 reais', () => {
    renderWithRouter(<App />)
    const inputEmailEl = screen.getByPlaceholderText(/e-mail/i);
    const inputSenhaEl = screen.getByPlaceholderText(/senha/i);
    const buttonEl = screen.getByRole('button', {name: 'Acessar'});

    userEvent.type(inputEmailEl, 'teste@teste.com');
    userEvent.type(inputSenhaEl, '123456');
    userEvent.click(buttonEl);

    const buttonContaEl = screen.getByRole('button', {name: 'Depósito/Retirada'});
    userEvent.click(buttonContaEl);

    const depositoEl = screen.getByLabelText('Depósito');
    userEvent.click(depositoEl);
    const inputValorEl = screen.getByPlaceholderText(/Informe o valor/i);
    userEvent.type(inputValorEl, '100');

    const buttonConfirmarEl = screen.getByRole('button', {name: 'Confirmar'});
    userEvent.click(buttonConfirmarEl);

    const buttonSaldoEl = screen.getByRole('button', {name: 'Saldo'});
    expect(buttonSaldoEl).toBeInTheDocument();

    userEvent.click(buttonSaldoEl);

    const buttonValorSaldoEl = screen.getByRole('button', {name: 'R$ 100'});
    expect(buttonValorSaldoEl).toBeInTheDocument();

    userEvent.click(buttonContaEl);

    const retiradaEl = screen.getByLabelText('Retirada');
    userEvent.click(retiradaEl);

    userEvent.type(inputValorEl, '100');
    userEvent.click(buttonConfirmarEl);
    userEvent.click(buttonSaldoEl);

    const buttonSaldozeroEl = screen.getByRole('button', {name: 'R$ 0'});
    expect(buttonSaldozeroEl).toBeInTheDocument();
  });
});