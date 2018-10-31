import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.github.com'
});

export default class Api {
  static getUser(username) {
    return instance.get(`/users/${username}`);
  }
}
