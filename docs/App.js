import React, { PureComponent } from 'react';
import Logout from '../src';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <button
          type="button"
          onClick={() => this.setState({ open: true })}
        >
          Open modal
        </button>
        <Logout
          open={open}
          onClose={() => this.setState({ open: false })}
        />
      </div>
    );
  }
}

export default App;
