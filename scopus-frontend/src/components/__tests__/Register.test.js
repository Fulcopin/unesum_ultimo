import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../Register';

// Mock antd components
jest.mock('antd', () => require('../../__mocks__/antd'));

const mockAxios = {
  post: jest.fn()
};

jest.mock('axios', () => ({
  default: {
    post: (...args) => mockAxios.post(...args)
  }
}));

describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders registration form', () => {
    render(<Register />);
    expect(screen.getByPlaceholderText('Nombre de usuario')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirmar Contraseña')).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    render(<Register />);
    
    const submitButton = screen.getByText('Registrarse');
    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText('Ingrese un nombre de usuario')).toBeInTheDocument();
  });

  test('submits form successfully', async () => {
    mockAxios.post.mockResolvedValueOnce({ data: { success: true } });
    const mockOnRegisterSuccess = jest.fn();

    render(<Register onRegisterSuccess={mockOnRegisterSuccess} />);

    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), {
        target: { value: 'testuser' }
      });
      fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
        target: { value: 'password123' }
      });
      fireEvent.change(screen.getByPlaceholderText('Confirmar Contraseña'), {
        target: { value: 'password123' }
      });
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'usuario' }
      });
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Registrarse'));
    });

    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/auth/register',
        expect.any(Object)
      );
      expect(mockOnRegisterSuccess).toHaveBeenCalled();
    });
  });

  test('handles registration error', async () => {
    mockAxios.post.mockRejectedValueOnce(new Error('Registration failed'));

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('Confirmar Contraseña'), {
      target: { value: 'password123' }
    });

    const submitButton = screen.getByText('Registrarse');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalled();
      expect(screen.getByText(/Error al registrar el usuario/i)).toBeInTheDocument();
    });
  });
});
