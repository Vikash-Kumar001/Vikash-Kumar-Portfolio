import CustomCursor from './CustomCursor';

export default {
  title: 'Components/CustomCursor',
  component: CustomCursor,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  render: () => (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      <h1>Move your mouse to see the custom cursor</h1>
      <button data-cursor="pointer" data-magnetic="true" style={{ margin: '1rem', padding: '1rem' }}>
        Hover me (magnetic)
      </button>
      <a href="#" data-cursor="pointer" style={{ margin: '1rem', display: 'block' }}>
        Link with pointer cursor
      </a>
      <CustomCursor />
    </div>
  ),
};

