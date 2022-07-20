import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListActions from '../pages/ListActions';
import { Router } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';

describe('Testando a página de ListActions', () => {
  
  it('1. Verifica-se existe impresso na tela "Sing In"', () => {
    renderWithRouter(<ListActions/>);

  });
});