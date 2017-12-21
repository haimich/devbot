import axios from 'axios';

export default {

  get(id, reverse) {
    return fetch("/backend/hashids/convert?id=" + encodeURI(id) + "&reverse=" + reverse)
      .then(response => {
        return response.text();
      });
  }

}