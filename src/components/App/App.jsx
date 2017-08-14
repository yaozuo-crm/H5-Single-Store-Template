import React, {Component} from 'react';
import className from 'classnames';
import PropTypes from 'prop-types';

export default class App extends Component {
  componentDidMount() {
    System.import('./_runtime').then(runtime => {
      runtime.didMount.call(this, this.props.data);
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('xxxxx', this.props);
    if (this.props.location !== nextProps.location) {
      console.log('location has changed, do your work');
    }
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
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

App.defaultProps = {
  location: undefined,
  data: undefined,
  className: undefined,
  children: 'lol',
};
