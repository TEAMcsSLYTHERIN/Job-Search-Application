import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const AuthButton = props => {
  return (
    <Link to='/dashboard'>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={props.classes.submit}
        // onClick={() => props.setLoggedIn(() => props.history.push('/'))}
        >
        Sign In
      </Button>
    </Link>
  );
}

export default AuthButton;