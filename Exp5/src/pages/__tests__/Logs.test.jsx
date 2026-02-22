import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { AuthProvider } from '../context/auth';
import Logs from '../Logs';
import logsSlice from '../../store/logsSlice';

// Mock the logsSlice
jest.mock('../../store/logsSlice', () => ({
  ...jest.requireActual('../../store/logsSlice'),
  fetchLogs: jest.fn(),
}));

// Mock data
const mockLogs = [
  { id: 1, activity: 'Car Travel', carbon: 4 },
  { id: 2, activity: 'Electricity Usage', carbon: 6 },
  { id: 3, activity: 'Cycling', carbon: 0 },
];

const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      logs: logsSlice,
    },
    preloadedState: initialState,
  });
};

const TestWrapper = ({ children, storeState }) => (
  <Provider store={createMockStore(storeState)}>
    <BrowserRouter>
      <AuthProvider>
        {children}
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);

describe('Logs Component', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    const storeState = {
      logs: {
        data: [],
        loading: true,
        error: null,
      },
    };

    render(
      <TestWrapper storeState={storeState}>
        <Logs />
      </TestWrapper>
    );

    expect(screen.getByText('Fetching Eco Logs...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    const storeState = {
      logs: {
        data: [],
        loading: false,
        error: 'Failed to fetch logs',
      },
    };

    render(
      <TestWrapper storeState={storeState}>
        <Logs />
      </TestWrapper>
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch logs')).toBeInTheDocument();
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  test('renders logs data successfully', () => {
    const storeState = {
      logs: {
        data: mockLogs,
        loading: false,
        error: null,
      },
    };

    render(
      <TestWrapper storeState={storeState}>
        <Logs />
      </TestWrapper>
    );

    expect(screen.getByText('Environmental Logs')).toBeInTheDocument();
    expect(screen.getByText('Car Travel')).toBeInTheDocument();
    expect(screen.getByText('4 kg CO₂')).toBeInTheDocument();
    expect(screen.getByText('Electricity Usage')).toBeInTheDocument();
    expect(screen.getByText('6 kg CO₂')).toBeInTheDocument();
    expect(screen.getByText('Cycling')).toBeInTheDocument();
    expect(screen.getByText('0 kg CO₂')).toBeInTheDocument();
  });

  test('displays total carbon calculation', () => {
    const storeState = {
      logs: {
        data: mockLogs,
        loading: false,
        error: null,
      },
    };

    render(
      <TestWrapper storeState={storeState}>
        <Logs />
      </TestWrapper>
    );

    expect(screen.getByText('Total Carbon: 10 kg CO₂')).toBeInTheDocument();
  });

  test('shows no logs message when data is empty', () => {
    const storeState = {
      logs: {
        data: [],
        loading: false,
        error: null,
      },
    };

    render(
      <TestWrapper storeState={storeState}>
        <Logs />
      </TestWrapper>
    );

    expect(screen.getByText('No logs found.')).toBeInTheDocument();
  });

  test('refresh button calls fetchLogs', async () => {
    const storeState = {
      logs: {
        data: mockLogs,
        loading: false,
        error: null,
      },
    };

    const mockFetchLogs = require('../../store/logsSlice').fetchLogs;
    
    render(
      <TestWrapper storeState={storeState}>
        <Logs />
      </TestWrapper>
    );

    const refreshButton = screen.getByText('🔄');
    fireEvent.click(refreshButton);

    await waitFor(() => {
      expect(mockFetchLogs).toHaveBeenCalled();
    });
  });

  test('retry button calls fetchLogs in error state', async () => {
    const storeState = {
      logs: {
        data: [],
        loading: false,
        error: 'Network error',
      },
    };

    const mockFetchLogs = require('../../store/logsSlice').fetchLogs;
    
    render(
      <TestWrapper storeState={storeState}>
        <Logs />
      </TestWrapper>
    );

    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(mockFetchLogs).toHaveBeenCalled();
    });
  });

  test('logs are rendered in proper structure', () => {
    const storeState = {
      logs: {
        data: mockLogs,
        loading: false,
        error: null,
      },
    };

    render(
      <TestWrapper storeState={storeState}>
        <Logs />
      </TestWrapper>
    );

    // Check that logs are rendered as list items
    const logItems = screen.getAllByRole('listitem');
    expect(logItems).toHaveLength(3);

    // Check that each log has proper structure
    mockLogs.forEach((log, index) => {
      expect(logItems[index]).toHaveTextContent(log.activity);
      expect(logItems[index]).toHaveTextContent(`${log.carbon} kg CO₂`);
    });
  });
});
