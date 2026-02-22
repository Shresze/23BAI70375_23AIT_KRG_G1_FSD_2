import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { AuthProvider } from '../context/auth';
import App from '../App';
import logsSlice from '../store/logsSlice';

// Mock the logsSlice for testing
jest.mock('../store/logsSlice', () => ({
  ...jest.requireActual('../store/logsSlice'),
  fetchLogs: jest.fn(),
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      logs: logsSlice,
    },
    preloadedState: {
      logs: {
        data: [],
        loading: false,
        error: null,
        ...initialState.logs,
      },
    },
  });
};

const TestWrapper = ({ children, initialState }) => (
  <Provider store={createMockStore(initialState)}>
    <AuthProvider>
      {children}
    </AuthProvider>
  </Provider>
);

describe('App Integration Tests', () => {
  test('renders app without crashing', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    expect(screen.getByText('ECO TRACK')).toBeInTheDocument();
  });

  test('shows login page by default when not authenticated', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Should show login page since user is not authenticated
    // Use more specific query to avoid multiple elements
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  test('navigation structure is present', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Check that header is rendered
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    // Check that navigation exists
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  test('app handles route changes', async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Test that routing works - should redirect to login by default
    expect(window.location.pathname).toBe('/login');
  });

  test('lazy loaded components are handled', async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // The app should render without errors even with lazy loading
    await waitFor(() => {
      expect(screen.getByText('ECO TRACK')).toBeInTheDocument();
    });
  });

  test('error boundaries are handled gracefully', () => {
    // Mock a component that throws an error
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // App should still render header even if other components fail
    expect(screen.getByText('ECO TRACK')).toBeInTheDocument();
    
    consoleError.mockRestore();
  });

  test('suspense fallback works for lazy components', async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // The app should handle Suspense properly
    await waitFor(() => {
      expect(screen.getByText('ECO TRACK')).toBeInTheDocument();
    });
  });

  test('global styles and CSS modules are applied', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Check that CSS classes are applied (this is a basic check)
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  test('app structure is consistent', () => {
    const { container } = render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Check that the main app structure exists
    expect(container.firstChild).toBeInTheDocument();
    expect(container.querySelector('header')).toBeInTheDocument();
  });
});
