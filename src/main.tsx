import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { DarkTheme, BaseProvider } from 'baseui';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthProvider from './providers/AuthProvider';

const engine = new Styletron();

ReactDOM.render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={DarkTheme}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
