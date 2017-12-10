
export default {

  get() {
    return fetch("https://www.google.de")
      .then(response => {
        return response.blob();
      })
      .then(myBlob => {
        return "done";
      })
      .catch(err => {
        return err;
      });
  }

}