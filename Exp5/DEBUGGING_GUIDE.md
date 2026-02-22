# Testing Debugging Guide

## Common Test Issues and Solutions

### 1. TextEncoder/TextDecoder Not Defined

**Error**: `ReferenceError: TextEncoder is not defined`

**Cause**: Node.js environment doesn't have browser APIs

**Solution**: Add polyfills in `src/setupTests.js`
```javascript
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
```

### 2. Router Nesting Error

**Error**: `You cannot render a <Router> inside another <Router>`

**Cause**: Multiple BrowserRouter components in test hierarchy

**Solution**: Ensure single router in test wrapper
```javascript
const TestWrapper = ({ children }) => (
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        {children}
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
```

### 3. Context Undefined Error

**Error**: `Cannot destructure property 'isAuthenticated' of 'undefined'`

**Cause**: Component not wrapped in context provider

**Solution**: Add context provider to test wrapper
```javascript
const TestWrapper = ({ children }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
);
```

### 4. Module Resolution Issues

**Error**: `Cannot find module 'component'`

**Cause**: Jest module resolution configuration

**Solution**: Check Jest configuration and module paths
```javascript
moduleFileExtensions: ['js', 'jsx', 'json'],
```

### 5. CSS Import Errors

**Error**: `SyntaxError: Unexpected token '.'`

**Cause**: CSS files not handled by Jest

**Solution**: Add CSS module mocking in Jest config
```javascript
moduleNameMapping: {
  '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
},
```

## Debugging Techniques

### 1. DOM Inspection

**Use screen.debug() to print current DOM state**
```javascript
import { screen } from '@testing-library/react';

test('debugging example', () => {
  render(<Component />);
  screen.debug(); // Prints current DOM
});
```

### 2. Component State Inspection

**Use console.log for component state**
```javascript
test('state debugging', () => {
  const { result } = renderHook(() => useCustomHook());
  console.log('Hook result:', result.current);
});
```

### 3. Async Operation Debugging

**Use waitFor with custom timeout**
```javascript
import { waitFor } from '@testing-library/react';

test('async debugging', async () => {
  render(<AsyncComponent />);
  
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  }, { timeout: 5000 }); // Extended timeout
});
```

### 4. Mock Function Inspection

**Check mock calls and arguments**
```javascript
test('mock debugging', () => {
  const mockFn = jest.fn();
  
  render(<Component onClick={mockFn} />);
  fireEvent.click(screen.getByRole('button'));
  
  console.log('Mock calls:', mockFn.mock.calls);
  console.log('Mock args:', mockFn.mock.calls[0][0]);
});
```

## Test Environment Debugging

### 1. Jest Configuration Debugging

**Check Jest configuration**
```bash
npx jest --showConfig
```

**Verify test environment**
```javascript
// jest.config.js
console.log('Jest config:', {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
});
```

### 2. Babel Transpilation Debugging

**Check Babel configuration**
```bash
npx babel --version
npx babel src/App.jsx --out-file /dev/null
```

**Verify JSX transpilation**
```javascript
// babel.config.js
export default {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
```

### 3. Module Resolution Debugging

**Check module paths**
```javascript
// In test file
console.log('Module path:', require.resolve('../Component'));
```

**Verify Jest module mapping**
```javascript
// jest.config.js
moduleNameMapping: {
  '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  '^@/(.*)$': '<rootDir>/src/$1', // Example alias mapping
},
```

## Performance Debugging

### 1. Slow Test Identification

**Run tests with timing information**
```bash
npm test -- --verbose
```

**Profile test execution**
```javascript
// In test file
console.time('Test execution');
// Test code here
console.timeEnd('Test execution');
```

### 2. Memory Usage Debugging

**Check for memory leaks in tests**
```javascript
afterEach(() => {
  // Clean up mocks and subscriptions
  jest.clearAllMocks();
});
```

## Common Test Patterns Debugging

### 1. Async Testing Issues

**Problem**: Tests failing due to timing issues

**Solution**: Use proper async patterns
```javascript
// ❌ Wrong
test('async test', () => {
  render(<AsyncComponent />);
  expect(screen.getByText('Data')).toBeInTheDocument(); // Fails
});

// ✅ Correct
test('async test', async () => {
  render(<AsyncComponent />);
  await waitFor(() => {
    expect(screen.getByText('Data')).toBeInTheDocument();
  });
});
```

### 2. Mock Implementation Issues

**Problem**: Mocks not working as expected

**Solution**: Verify mock setup
```javascript
// Check if mock is called
expect(mockFn).toHaveBeenCalled();

// Check mock arguments
expect(mockFn).toHaveBeenCalledWith(expectedArgs);

// Check mock return value
mockFn.mockReturnValue(expectedValue);
```

### 3. Context Provider Issues

**Problem**: Context not available in tests

**Solution**: Ensure proper provider hierarchy
```javascript
const AllTheProviders = ({ children }) => (
  <AuthProvider>
    <ThemeProvider>
      <Router>
        {children}
      </Router>
    </ThemeProvider>
  </AuthProvider>
);
```

## Debug Tools

### 1. React Testing Library Debug Tools

**screen.debug()**: Print current DOM
**screen.logTestingPlaygroundURL()**: Generate testing playground URL
**within()**: Scope queries to specific elements

### 2. Jest Debug Tools

**--verbose**: Detailed test output
**--no-cache**: Disable cache for debugging
**--runInBand**: Run tests sequentially for debugging

### 3. Browser DevTools Integration

**React DevTools**: Component tree inspection
**Redux DevTools**: State changes visualization
**Network tab**: API call monitoring

## Best Practices for Debugging

### 1. Systematic Approach

1. **Isolate the Problem**: Run single test file
2. **Check Configuration**: Verify Jest and Babel setup
3. **Examine Dependencies**: Ensure all providers are included
4. **Verify Mocks**: Check mock implementations
5. **Test Incrementally**: Add assertions gradually

### 2. Debug Output Strategy

```javascript
// Use descriptive debug output
console.log('Component rendered:', screen.getByRole('heading').textContent);
console.log('Mock calls:', mockFn.mock.calls.length);
console.log('Current URL:', window.location.href);
```

### 3. Test Organization

```javascript
describe('Component Behavior', () => {
  beforeEach(() => {
    // Setup code
  });

  test('specific behavior', () => {
    // Test code with debug statements
  });

  afterEach(() => {
    // Cleanup code
  });
});
```

## Troubleshooting Checklist

### Before Running Tests
- [ ] Node.js version compatible
- [ ] Dependencies installed
- [ ] Jest configuration correct
- [ ] Babel configuration valid
- [ ] Test files in correct locations

### During Test Failures
- [ ] Check error messages carefully
- [ ] Verify mock implementations
- [ ] Ensure proper test setup
- [ ] Check async/await usage
- [ ] Verify provider hierarchy

### After Fixing Issues
- [ ] Run tests in watch mode
- [ ] Check coverage reports
- [ ] Verify all tests pass
- [ ] Test in different environments
- [ ] Update documentation

This debugging guide provides systematic approaches to resolve common testing issues and maintain a robust test suite.
