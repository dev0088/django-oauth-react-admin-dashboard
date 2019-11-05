import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  FormGroup,
  Label,
} from 'reactstrap';
import { getOAuth2Token } from '../../../utils/djangoSession.js';

class AccessToken extends Component {
  render() {
    const oauth2token = getOAuth2Token();

    return (
      <Card>
        <CardHeader>
          <strong>OAuth2Token</strong>
        </CardHeader>
        <CardBody>
          <FormGroup>
            <Label htmlFor="access_token">
              Access Token
            </Label>
            <Input
              type="text"
              id="access_token"
              name="access_token"
              placeholder="None"
              value={oauth2token.access_token}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="access_token">
              Refresh token
            </Label>
            <Input
              type="text"
              id="refresh_token"
              name="refresh_token"
              placeholder="None"
              value={oauth2token.refresh_token}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="token_expiry">
              Refresh token
            </Label>
            <Input
              type="text"
              id="token_expiry"
              name="token_expiry"
              placeholder="None"
              value={oauth2token.token_expiry}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="code">
              Code
            </Label>
            <Input
              type="text"
              id="code"
              name="code"
              placeholder="None"
              value={oauth2token.code}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="text">
              Credential data in JSON
            </Label>
            <Input
              type="textarea"
              id="text"
              name="text"
              placeholder="None"
              value={oauth2token.text}
              disabled
            />
          </FormGroup>
        </CardBody>
      </Card>
    )
  }
}

export default AccessToken;
