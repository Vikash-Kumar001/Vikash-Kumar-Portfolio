import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navbar from './Navbar';

const renderWithProviders = (ui) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>{ui}</ThemeProvider>
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  it('renders navigation links', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders logo', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('toggles mobile menu', () => {
    renderWithProviders(<Navbar />);
    const toggle = screen.getByLabelText('Toggle mobile menu');
    expect(toggle).toBeInTheDocument();
  });
});

