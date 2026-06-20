import { Component } from 'react';
import { markWebGLBlocked } from '@/lib/webgl';
import ThreeSceneFallback from './ThreeSceneFallback';

class ThreeSceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    const message = error?.message?.toLowerCase?.() ?? '';
    if (message.includes('webgl') || message.includes('context')) {
      markWebGLBlocked();
    }
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return <ThreeSceneFallback className={this.props.className} />;
    }

    return this.props.children;
  }
}

export default ThreeSceneErrorBoundary;
