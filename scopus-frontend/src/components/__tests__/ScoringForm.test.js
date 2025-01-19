import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScoringForm from '../ScoringForm';

// Change axios import and mock
const mockAxios = {
  get: jest.fn(),
  post: jest.fn()
};

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: (...args) => mockAxios.get(...args),
    post: (...args) => mockAxios.post(...args)
  }
}));

describe('ScoringForm Component', () => {
  const mockIndicators = [
    { id: 1, name: 'Indicator 1', description: 'Description 1', weight: 10 }
  ];

  beforeEach(() => {
    mockAxios.get.mockImplementation((url) => {
      if (url.includes('indicators')) {
        return Promise.resolve({ data: mockIndicators });
      }
      return Promise.resolve({ data: [] });
    });
    mockAxios.post.mockResolvedValue({ data: { success: true } });
  });

  test('renders loading state initially', () => {
    render(<ScoringForm projectId={1} />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  test('renders indicators after loading', async () => {
    render(<ScoringForm projectId={1} />);
    
    await waitFor(() => {
      expect(screen.getByText('Indicator 1')).toBeInTheDocument();
    });
  });

  test('handles score input', async () => {
    render(<ScoringForm projectId={1} />);

    await waitFor(() => {
      const scoreInput = screen.getByRole('spinbutton');
      fireEvent.change(scoreInput, { target: { value: '15' } });
      expect(scoreInput.value).toBe('15');
    });
  });

  test('handles comment input', async () => {
    render(<ScoringForm projectId={1} />);

    await waitFor(() => {
      const commentInput = screen.getByPlaceholderText('Agregar comentario...');
      fireEvent.change(commentInput, { target: { value: 'Test comment' } });
      expect(commentInput.value).toBe('Test comment');
    });
  });

  test('submits rating successfully', async () => {
    mockAxios.post.mockResolvedValueOnce({ data: { success: true } });
    
    render(<ScoringForm projectId={1} />);

    await waitFor(() => {
      const saveButton = screen.getByText('Guardar');
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalled();
    });
  });
});
