import axios from 'axios';

export default {

  translateText(key, textEn) {
    return axios.post(`/backend/translations`, {
      textKey: key,
      textEN: textEn,
    });
  },

  fetchTranslations(key, textEn) {
    var url = "/backend/translations";

    if (key != null && key !== "") {
      url += `?textKey=${key}`;
    } else if (textEn != null && textEn !== "") {
      url += `?textEn=${textEn}`;
    }

    return axios.get(url);
  }

}