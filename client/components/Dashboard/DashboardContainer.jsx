import React, { Component } from 'react';
import ReactTable from 'react-table';
import { progressStyling } from '../../lib/util';
import { connect } from 'react-redux';
import { query } from 'wasp-graphql';
import * as queries from '../../queries/queries';
import store from '../../store';
import * as types from '../../actions/actionCreators';

const mapStateToProps = store => ({
  ...store.jobSearch
})

function updateState(s) {
  console.log('store',s)
}

class DashboardContainer extends Component {
  constructor(props){
    super(props);
  }
  render(){
    if(this.props.loggedIn === false) {
      query('http://localhost:3000/graphql', queries.allUserData)
      .then(res => {
        return res.json()
      })
      .then(resp => {
        store.dispatch(types.updateUserInformation(resp))        
        store.dispatch(types.setLoggedIn())        
      })
    }
    const { data } = this.props;
    console.log(this.props);
    return (
      <div className="table-container">
        <ReactTable 
          data={data}
          columns={[
            {
              Header: 'Company',
              accessor: 'companyName'
            },
            {
              Header: 'Job Title',
              accessor: 'title'
            },
            {
              Header: 'Date Applied',
              accessor: 'dateApplied'
            },
            {
              Header: 'Status',
              accessor: 'status',
              Cell: row => {
                const style = progressStyling(row)
                return (
                  <div
                    style={{
                      width: '100%',
                      height: '5px',
                      backgroundColor: '#dadada',
                      borderRadius: '2px'
                    }}>
                    <div
                      style={{
                        width: style.width,
                        height: '100%',
                        backgroundColor: style.backgroundColor,
                        borderRadius: '2px',
                        transition: 'all .2s ease-out'
                      }}/>
                  </div>
                );
              }
            },
            {
              Header: 'Notification',
              accessor: 'notification'
            }
          ]}
          SubComponent={row => {
            return (
              <ReactTable
                defaultPageSize={1}
                showPagination={false} 
                data={[row.original]}
                columns={[
                  {
                    Header: 'Status',
                    accessor: 'status'
                  },
                  {
                    Header: 'URL',
                    accessor: 'link'
                  },
                  {
                    Header: 'Description',
                    accessor: 'description'
                  },
                  {
                    Header: 'Notes',
                    accessor: 'notes'
                  }
                ]}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(DashboardContainer);