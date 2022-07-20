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
});