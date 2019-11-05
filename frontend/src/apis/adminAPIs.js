import apiConfig from '../constants/api';
// import { getToken, getUserID } from "service/storage";

class AdminAPI {
  static processResponse(response, handleResponse) {
    console.log('==== response: ', response);
    if (response.error) {
      console.log('error: ', response.error);
      handleResponse(response.error, true);
    } else {
      console.log('====');
      if (response) {
        console.log('success: ', response);
        handleResponse(response, false);
      } else {
        console.log('error: ', response);
        handleResponse(response.error, true);
      }
    }
  }

  static processRequest(url, method, data, handleResponse) {
    let params = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      params = {
        ...params,
        body: JSON.stringify(data)
      };
    }

    fetch(`${apiConfig.url}/${url}`, params)
      .then(response => response.json())
      .then(response => this.processResponse(response, handleResponse))
      .catch(error => {
        console.log('error: ', error);
        handleResponse(error, true);
      });
  }

  static processRequestWithToken(url, method, data, handleResponse) {
    let parameters = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // Authorization: `Bearer ${getToken()}`
      }
    };

    if (method !== 'get' && data !== '' && data !== null) {
      parameters = { ...parameters, body: JSON.stringify(data) };
    }

    fetch(`${apiConfig.url}/${url}/`, parameters)
      .then(response => {
        return response.json();
      })
      .then(response => {
        return this.processResponse(response, handleResponse);
      })
      .catch(error => {
        console.log('error: ', error);
        handleResponse(error, true);
      });
  }

  static getProfile(profileId, handleResponse) {
    this.processRequestWithToken(
      `user/${profileId}`,
      'get',
      null,
      handleResponse
    );
  }

  static saveProfile(userId, data, handleResponse) {
    this.processRequestWithToken(`user/${userId}`, 'put', data, handleResponse);
  }
}
export default AdminAPI;
