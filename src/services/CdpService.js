import axios from 'axios';

export default {

  addToQueue(mrId, env, prio) {
    return axios.get(`/backend/cdp/add?mrId=${mrId}&env=${env}&prio=${prio}`);
  }

}