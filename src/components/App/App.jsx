import React, {Component} from 'react';
import className from 'classnames';
import PropTypes from 'prop-types';

export default class App extends Component {
  componentDidMount() {
    System.import('./_runtime').then(runtime => {
      runtime.didMount.call(this, this.props.data);
    });
  }

  render() {
    return (
      <div
        className={className({
          [this.props.className]: typeof this.props.className === 'string',
        })}
      >
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

App.defaultProps = {
  data: undefined,
  className: undefined,
  children: 'lol',
};
