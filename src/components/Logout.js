/* globals window */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import I18n from 'react-cf-helper-i18n';
import Cookies from 'js-cookie';

class Logout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      loading: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { open } = this.props;
    if (open !== prevProps.open) {
      this.toggleOpen(open);
    }
  }

  /**
   * Toggle open true/false and set on state
   *
   * FIXME: Move to redux
   */
  toggleOpen(open) {
    this.setState({
      open,
    });
  }

  /**
   * Action on press close button.
   *
   * FIXME: Move to redux
   */
  close() {
    this.setState({ loading: true }, () => {
      Cookies.remove('cf-token');
      window.location = '/';
    });
  }

  /**
   * Action on press cancel button.
   *
   * FIXME: Move to redux
   */
  cancel() {
    const { onClose } = this.props;
    onClose();
    this.toggleOpen(false);
  }


  render() {
    const { open, loading } = this.state;
    return (
      <Modal size="mini" open={open}>
        <Modal.Header>
          {I18n.t('account.user.logout.title')}
        </Modal.Header>
        <Modal.Content>
          <p>
            {I18n.t('account.user.logout.message')}
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            onClick={() => this.cancel()}
          >
            {I18n.t('form.buttons.cancel')}
          </Button>
          <Button
            negative
            loading={loading}
            onClick={() => this.close()}
          >
            {I18n.t('form.buttons.getOut')}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

Logout.defaultProps = {
  open: false,
};

Logout.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default Logout;
