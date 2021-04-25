import axios from 'axios';
export default class BaseHttpService {
  BASE_URL = process.env.REACT_APP_API;
  _accessToken = null;

  constructor(props) {
    this.history = props.history;
    this.errorHandler = props.errorHandler;
  }

  async get(endpoint, options = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios.get(`${this.BASE_URL}/${endpoint}`, options)
      .catch(error => this._handleHttpError(error));
  }

  async post(endpoint, data = {}, options = {}) {
    let commonHeaders = { ...this._getCommonOptions().headers }
    let head = { headers: { ...options.headers, ...commonHeaders } }
    return axios.post(`${this.BASE_URL}/${endpoint}`, data, head)
      .catch(error => this._handleHttpError(error));
  }

  async delete(endpoint, options = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios.delete(`${this.BASE_URL}/${endpoint}`, options)
      .catch(error => this._handleHttpError(error));
  }

  async patch(endpoint, data = {}, options = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios.patch(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch(error => this._handleHttpError(error));
  }

  _handleHttpError(error) {
    const { statusCode } = error.response.data;
    if (error.response.data.message) {
      const { message } = error.response.data;
      this.errorHandler.dispatch({ type: 'SET_MESSAGE', payload: { message } })
    }
    if (statusCode !== 401) {
      throw error;
    } else {
      this._handle401();
      throw error;
    }
  }

  _handle401() {
    this.history.push('/signin');
  }

  _getCommonOptions() {
    const token = this.loadToken();

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  get accessToken() {
    return this._accessToken ? this._accessToken : this.loadToken();
  }

  saveToken(accessToken) {
    this._accessToken = accessToken;
    return localStorage.setItem('accessToken', accessToken);
  }

  loadToken() {
    const token = localStorage.getItem('accessToken');
    this._accessToken = token;
    return token;
  }

  removeToken() {
    localStorage.removeItem('accessToken');
  }
}
