import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';
import BuyAndSell from '../pages/BuyAndSell';
import App from '../App';
import { mockLocalStorage } from './mockLocalStorage'

const { getItemMock, setItemMock } = mockLocalStorage();

describe('Testando a página de ListActions', () => {
    it('1. Teste se existe os componentes na tela', () => {
      getItemMock.mockReturnValue(JSON.stringify({
          "account": 100,
          "date": "2022-07-20T03:04:30.256Z",
          "email": "thiara@gmail.com",
          "myActions": [],
          "name": 'Usuário:XPTO',
          "actions": [],
      }));
      render(<BuyAndSell />)
    });
});