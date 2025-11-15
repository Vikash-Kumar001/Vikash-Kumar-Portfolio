import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navbar from './Navbar';

export default {
  title: 'Components/Navbar',
  component: Navbar,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
};

export const Default = {
  render: () => <Navbar />,
};

