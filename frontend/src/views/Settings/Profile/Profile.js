import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input,
  Form,
  FormGroup,
  Label,
  Button
} from 'reactstrap';
import { getSessionUser, getSessionCsrf, getOAuth2Token } from '../../../utils/djangoSession.js';
import AccessToken from './AccessToken';

class Profile extends Component {
  state = {
    ...(getSessionUser()),
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleCancel = () => {
    console.log('==== handleCancel: ', window.django.user)
    this.setState({...window.django.user});
  };

  handleSubmit = () => {
    console.log('===== handleSubmit');
  };

  render() {
    const user = this.state;
    // const _errors = user._errors || {};
    const csrf = getSessionCsrf();
    const oauth2token = getOAuth2Token();

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong>Profile</strong>
              </CardHeader>
              <CardBody>
                <Form
                  action="/register/account"
                  onSubmit={this.handleSubmit}
                  method="post"
                >
                  <Input
                    type="hidden"
                    id="csrfmiddlewaretoken"
                    name="csrfmiddlewaretoken"
                    value={csrf}
                  />
                  <FormGroup>
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      type="text"
                      id="first_name"
                      name="first_name"
                      placeholder="Enter your first name"
                      onChange={this.handleChange}
                      value={user.first_name}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      type="text"
                      id="last_name"
                      name="last_name"
                      placeholder="Enter your last name" 
                      onChange={this.handleChange}
                      value={user.last_name}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={user.email}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="google_oauth2_client_id">
                      Google OAuth2 Client ID
                    </Label>
                    <Input
                      type="text"
                      id="google_oauth2_client_id"
                      name="google_oauth2_client_id"
                      placeholder="Enter your Google OAuth2 Client ID"
                      onChange={this.handleChange}
                      value={user.google_oauth2_client_id}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="google_oauth2_secrete">
                      Google OAuth2 Client Secret
                    </Label>
                    <Input
                      type="text"
                      id="google_oauth2_secrete"
                      name="google_oauth2_secrete"
                      placeholder="Enter your Google OAuth2 Client Secret"
                      onChange={this.handleChange}
                      value={user.google_oauth2_secrete}
                    />
                  </FormGroup>
                  <Button
                    color="secondary"
                    size="md"
                    className="pull-left"
                    onClick={this.handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="secondary"
                    size="md"
                    className="pull-right"
                  >
                    Save
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col lg={6}>
            <AccessToken />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Profile;
