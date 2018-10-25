import React, { Component } from 'react';
import { connect } from 'react-redux';
import { query, mutation } from 'wasp-graphql';
import * as queries from '../../queries/queries';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const appStatuses = [
  {
    value: 'Resume Submitted',
    label: 'Resume Submitted',
  },
  {
    value: 'Coding Challenges',
    label: 'Coding Challenges',
  },
  {
    value: 'Recruiter Phone Screen',
    label: 'Recruiter Phone Screen',
  },
  {
    value: 'Technical Phone Screen',
    label: 'Technical Phone Screen',
  },
  {
    value: 'On-site Interview',
    label: 'On-site Interview',
  },
];

class TextFields extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    company: '',
    jobTitle: '',
    jobURL: '',
    notes: '',
    description: '',
    appStatus: '',
    notification: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClick(event) {
    event.preventDefault();
    let company = document.getElementById('standard-name').value;
    let jobTitle = document.getElementById('standard-uncontrolled').value;
    let jobURL = document.getElementById('standard-required').value;
    let date = document.getElementById('date').value;
    let description = document.getElementById('standard-helperText').value;
    let notes = document.getElementById('standard-multiline-static').value;
    let appStatus = document.getElementById('standard-select-currency-native').value;
    let notification = document.getElementById('standard-number').value;
    
    let myVariables = {
      "companyName": company,
      "title": jobTitle,
      "dateApplied": date,
      "link": jobURL,
      "description": description,
      "notes": notes,
      "notification": notification,
      "ContactId": "2",
      "UserId": "4",
      "status": appStatus 
    }
    mutation('http://localhost:3000/graphql', {
      body: JSON.stringify({ queries.addApplication, })
    })


  }
  
  handleSubmit(event) {
    event.preventDefault();
    console.log('event.target.value', event.target.value);
    debugger;
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
      <form action="/" method="POST" onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="Company Name"  
          className={classes.textField}
          value={this.state.company}
          onChange={this.handleChange('company')}
          margin="normal"
        />
        <TextField
          value={this.state.jobTitle}
          onChange={this.handleChange('jobTitle')}
          id="standard-uncontrolled"
          label="Job Title"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="date"
          onChange={this.handleChange('date')}
          label="Date Applied"
          type="date"
          defaultValue="2018-10-25"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          required
          onChange={this.handleChange('jobURL')}
          id="standard-required"
          label="Link to Job Posting"
          defaultValue="Hello World"
          className={classes.textField}
          margin="normal"
        />
        <TextField
        onChange={this.handleChange('notes')}
          id="standard-multiline-static"
          label="NOTES"
          multiline
          rows="4"
          defaultValue=""
          className={classes.textField}
          margin="normal"
        />
        <TextField
        onChange={this.handleChange('description')}
          id="standard-helperText"
          label="Description"
          defaultValue=""
          className={classes.textField}
          helperText="Some important text"
          margin="normal"
        />
        <TextField

          id="standard-number"
          label="Notification Frequency"
          value={this.state.age}
          onChange={this.handleChange('notification')}
          type="number"
          className={classes.textField}
          helperText="# of Days"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          />
        <TextField
          id="standard-select-currency-native"
          select
          label="Application Status"
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange('appStatus')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Select one"
          margin="normal"
        >
          {appStatuses.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
{/*        

      <input
        type="submit"
        accept="image/*"
        className={classes.input}
        // id="contained-button-file"
        multiple
      /> */}
      <label htmlFor="contained-button-file">
        <Button 
          onClick={(e) => {this.handleClick(e)}}
          // onSubmit={(e) => {this.handleClick(e)}}
          color="secondary" 
          variant="contained" 
          component="span" 
          className={classes.button}>
          SUBMITTT
        </Button>
      </label>
      </form>
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);





// //
// const mapStateToProps = (state) => {
//   return {
//     user: state
//   }
// }

// class JobForm extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render () {
//     return (
//       <div>
//         here
//       </div>
//     )
//   }
// }

// export default connect(mapStateToProps)(JobForm);