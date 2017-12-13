
export default {

  get() {
    return fetch("https://www.google.de")
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json;
      });
  }

}