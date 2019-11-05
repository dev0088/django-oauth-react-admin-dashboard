import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Table
} from 'reactstrap';

class EventContactsTable extends Component {
  render() {
    const { contacts } = this.props;
    
    return (
      <Card>
        <CardHeader>
          Top Contacts
        </CardHeader>
        <CardBody>
          <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
            <thead className="thead-light">
              <tr>
                <th className="text-right">responseStatus email</th>
                <th className="text-right">accepted</th>
                <th className="text-right">declined</th>
                <th className="text-right">needsAction</th>
                <th className="text-right">tentative</th>
                <th className="text-right">total</th>
              </tr>
            </thead>
            <tbody>
            { contacts && contacts.map((contact, index) => {
                return (
                  <tr key={index}>
                    <td className="text-right">
                      <strong>{contact.email}</strong>
                    </td>
                    <td className="text-right">
                      <div>{contact.accepted}</div>
                    </td>
                    <td className="text-right">
                      <div>{contact.declined}</div>
                    </td>
                    <td className="text-right">
                      <div>{contact.needsAction}</div>
                    </td>
                    <td className="text-right">
                      <div>{contact.tentative}</div>
                    </td>
                    <td className="text-right">
                      <div>{contact.total}</div>
                    </td>
                  </tr>    
                )
              })
            }
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default EventContactsTable;
