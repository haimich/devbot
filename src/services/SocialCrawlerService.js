
export default {

  getDailyStats() {
    return fetch("/backend/socialcrawler/stats")
      .then(response => {
        return response.json();
      })
      .then(stats => {
        return stats;
      })
      .catch(err => {
        return err;
      });
  },

}