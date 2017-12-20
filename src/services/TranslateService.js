
export default {

  translateText(key, textEn) {
    return fetch("/backend/translations", {
      method: 'post',
      body: JSON.stringify({
        textKey: key,
        textEN: textEn,
      })
    })
      .then(response => {
        return;
      });
  },

  fetchTranslations(key, textEn) {
    var url = "/backend/translations";

    if (key != null && key !== "") {
      url += "?textKey=" + key;
    } else if (textEn != null && textEn !== "") {
      url += "?textEn=" + textEn;
    }

    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(translations => {
        return translations;
      });
  }

}