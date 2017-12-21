import axios from 'axios';

export default {

  getDailyStats() {
    return axios.get("/backend/socialcrawler/stats");
  },

}