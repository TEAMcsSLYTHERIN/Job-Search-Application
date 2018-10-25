import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    user: state
  }
}

class JobForm extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        here
      </div>
    )
  }
}

export default connect(mapStateToProps)(JobForm);