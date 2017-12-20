
export default {

  addToQueue(mrId, env) {
    return fetch("/backend/cdp/add?mrId=" + mrId + "&env=" + env)
      .then(response => {
        return response.text();
      })
      .then(result => {
        return result;
      });
  }

}