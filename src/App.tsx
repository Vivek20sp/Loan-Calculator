import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import ExchangeRates from './pages/ExchangeRates';
import About from './pages/About';
import Error from './pages/Error';
import NotFound from './components/UI/NotFound';
import ErrorBoundary from './components/UI/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rates" element={<ExchangeRates />} />
                <Route path="/about" element={<About />} />
                <Route path="/error" element={<Error />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;