
export default {

  getDailyStats() {
    return fetch("/backend/socialcrawler/stats")
      .then(response => {
        return response.json();
      });
  },

}