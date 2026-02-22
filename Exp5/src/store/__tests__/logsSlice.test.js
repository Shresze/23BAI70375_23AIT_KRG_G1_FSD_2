import { configureStore } from '@reduxjs/toolkit';
import logsSlice, { fetchLogs } from '../logsSlice';

// Mock the logs data
const mockLogs = [
  { id: 1, activity: "Car Travel", carbon: 4 },
  { id: 2, activity: "Electricity Usage", carbon: 6 },
  { id: 3, activity: "Cycling", carbon: 0 },
];

// Mock the logs data module
jest.mock('../../data/logs', () => mockLogs);

describe('Logs Slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        logs: logsSlice,
      },
    });
    jest.clearAllMocks();
  });

  test('should return the initial state', () => {
    const initialState = store.getState().logs;
    expect(initialState).toEqual({
      data: [],
      loading: false,
      error: null,
    });
  });

  test('should handle fetchLogs.pending', () => {
    store.dispatch(fetchLogs.pending());
    const state = store.getState().logs;
    
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('should handle fetchLogs.fulfilled', () => {
    store.dispatch(fetchLogs.fulfilled(mockLogs));
    const state = store.getState().logs;
    
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockLogs);
    expect(state.error).toBe(null);
  });

  test('should handle fetchLogs.rejected', () => {
    const mockError = 'Failed to fetch logs';
    store.dispatch(fetchLogs.rejected(mockError));
    const state = store.getState().logs;
    
    expect(state.loading).toBe(false);
    expect(state.data).toEqual([]);
    expect(state.error).toBe(mockError);
  });

  test('should handle async fetchLogs action', async () => {
    await store.dispatch(fetchLogs());
    const state = store.getState().logs;
    
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockLogs);
    expect(state.error).toBe(null);
  });

  test('should handle fetchLogs network error', async () => {
    // Mock the logs module to throw an error
    jest.doMock('../../data/logs', () => {
      throw new Error('Network error');
    });
    
    await store.dispatch(fetchLogs());
    const state = store.getState().logs;
    
    expect(state.loading).toBe(false);
    expect(state.data).toEqual([]);
    expect(state.error).toBeTruthy();
  });

  test('should handle fetchLogs API error response', async () => {
    // Mock the logs module to throw an error
    jest.doMock('../../data/logs', () => {
      throw new Error('API Error');
    });
    
    await store.dispatch(fetchLogs());
    const state = store.getState().logs;
    
    expect(state.loading).toBe(false);
    expect(state.data).toEqual([]);
    expect(state.error).toBeTruthy();
  });

  test('should maintain immutability', () => {
    const initialState = store.getState().logs;
    
    store.dispatch(fetchLogs.pending());
    const pendingState = store.getState().logs;
    
    expect(pendingState).not.toBe(initialState);
    expect(pendingState.data).toBe(initialState.data); // Same reference for unchanged data
  });
});
