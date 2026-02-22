import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/auth';
import Header from '../Header';

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      {children}
    </AuthProvider>
  </BrowserRouter>
);

describe('Header Component Snapshots', () => {
  test('matches snapshot when not authenticated', () => {
    const { asFragment } = render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('matches snapshot structure', () => {
    const { container } = render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('has consistent DOM structure', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    // Check that the main structure is consistent
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header.querySelector('h1')).toBeInTheDocument();
    expect(header.querySelector('nav')).toBeInTheDocument();
  });
});
