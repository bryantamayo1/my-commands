import './ErrorBoundary.css';
import {Component}    from 'react';
import Button         from '@mui/material/Button';

type ErrorBoundaryProps = {
  children: React.ReactNode,
}
type ErrorBoundaryState = {
  hasError: boolean,
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // componentDidCatch(error, info) {
  //   // Example "componentStack":
  //   //   in ComponentThatThrows (created by App)
  //   //   in ErrorBoundary (created by App)
  //   //   in div (created by App)
  //   //   in App
  //   logErrorToMyService(error, info.componentStack);
  // }

  goHome(){
    // @ts-ignore
    window.location = "/home";
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='mc-container-rrror-boundary'>
          Ups! An error has occured, try again later please
          <Button variant="contained" color="secondary" size="small"
            onClick={this.goHome}
          >
            Go home
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}