import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScopusVerification from './ScopusVerification';

const mockAxios = {
  post: jest.fn()
};

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    post: (...args) => mockAxios.post(...args)
  }
}));

// Mock FileUpload and ResultTable components
jest.mock('../FileUpload', () => {
  return function DummyFileUpload(props) {
    return (
      <div data-testid="file-upload">
        <input 
          type="file" 
          onChange={(e) => props.onUploadSuccess(e.target.files[0])}
          aria-label="upload"
        />
      </div>
    );
  };
});

jest.mock('../ResultTable', () => {
  return function DummyResultTable({ results, onVerify }) {
    return (
      <div data-testid="result-table">
        {results.map(result => (
          <div key={result.key}>
            <span>{result.fileName}</span>
            <button onClick={() => onVerify(result)}>Verificar</button>
          </div>
        ))}
      </div>
    );
  };
});

describe('ScopusVerification Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders file upload component', () => {
    render(<ScopusVerification />);
    expect(screen.getByTestId('file-upload')).toBeInTheDocument();
  });

  test('handles file upload', () => {
    render(<ScopusVerification />);
    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText('upload');
    
    Object.defineProperty(fileInput, 'files', {
      value: [file]
    });
    
    fireEvent.change(fileInput);
    expect(screen.getByText('test.pdf')).toBeInTheDocument();
  });

  test('handles logout', () => {
    const mockOnLogout = jest.fn();
    render(<ScopusVerification onLogout={mockOnLogout} />);
    
    const logoutButton = screen.getByText('Cerrar Sesión');
    fireEvent.click(logoutButton);
    
    expect(mockOnLogout).toHaveBeenCalled();
  });
});
