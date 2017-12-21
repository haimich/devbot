import axios from 'axios';

export default {

  addToQueue(mrId, env) {
    return axios.get(`/backend/cdp/add?mrId=${mrId}&env=${env}`);
  }

}