
export default {

  get(id) {
    return fetch("/backend/hashids/convert?id=" + encodeURI(id))
      .then(response => {
        return response.text();
      })
      .then(resultId => {
        return resultId;
      })
      .catch(err => {
        return err;
      });
  }

}