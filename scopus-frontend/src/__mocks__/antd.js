const React = require('react');

// Mock Message
const message = {
  success: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
};

// Mock Form
const Form = ({ children, onFinish }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onFinish) {
      onFinish({});
    }
  };
  return <form onSubmit={handleSubmit}>{children}</form>;
};

Form.Item = ({ children, name }) => (
  <div data-testid={`form-item-${name}`}>{children}</div>
);

// Mock Input
const Input = ({ placeholder, onChange, value, ...props }) => (
  <input
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    {...props}
  />
);

Input.Password = ({ placeholder, onChange, value, ...props }) => (
  <input
    type="password"
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    {...props}
  />
);

// Mock Select
const Select = ({ placeholder, onChange, children, ...props }) => (
  <select onChange={onChange} {...props}>
    <option value="">{placeholder}</option>
    {children}
  </select>
);

Select.Option = ({ children, value }) => (
  <option value={value}>{children}</option>
);

// Mock Button
const Button = ({ children, onClick, htmlType, loading, ...props }) => (
  <button 
    onClick={onClick} 
    type={htmlType || 'button'} 
    disabled={loading}
    {...props}
  >
    {children}
  </button>
);

// Export all mocked components
module.exports = {
  message,
  Form,
  Input,
  Select,
  Button,
  ConfigProvider: ({ children }) => <>{children}</>,
};
