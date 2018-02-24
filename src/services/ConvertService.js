import moment from 'moment-timezone';

export default {

  convertTimestamp(timestamp) {
      timestamp = ('' + timestamp).replace(/\s+/g, '');
      timestamp = parseInt(timestamp);

      if (isNaN(timestamp)) {
        throw new Error("Is not a number: " + timestamp);
      }

      var response = {};
      var momentObj = null;

      if (timestamp >= 100000000000000 || timestamp <= -100000000000000) {
        response.type = "microseconds";
        momentObj = moment(timestamp / 1000);
      } else if (timestamp >= 100000000000 || timestamp <= -100000000000) {
        response.type = "milliseconds";
        momentObj = moment(timestamp);
      } else {
        response.type = "seconds";
        momentObj = moment(timestamp * 1000);
      }
      
      if (! momentObj.isValid()) {
        throw new Error("Is not valid: " + timestamp);
      }

      const gmt = momentObj.clone().tz("gmt")
      const cet = momentObj.clone().tz("cet")

      response.gmt = {
        date: gmt.format("DD.MM.YYYY"),
        time: gmt.format("HH:mm:ss"),
      };

      response.cet = {
        date: cet.format("DD.MM.YYYY"),
        time: cet.format("HH:mm:ss"),
      }

      return response;
  }

}