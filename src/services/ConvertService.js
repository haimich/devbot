import moment from 'moment-timezone';

export default {

  convertTimestamp(value) {
      var response = {};
      var momentObj = null;

      if (value >= 100000000000000 || value <= -100000000000000) {
        response.type = "microseconds";
        momentObj = moment(value / 1000);
      } else if (value >= 100000000000 || value <= -100000000000) {
        response.type = "milliseconds";
        momentObj = moment(value);
      } else {
        response.type = "seconds";
        momentObj = moment(value * 1000);
      }
      
      if (! momentObj.isValid()) {
        throw new Error("Is not valid: " + value);
        // this.$notify({
        //   message: "Is not valid: " + value,
        //   type: "warning",
        // });
        // return;
      }

      const gmt = momentObj.clone().tz("gmt")
      const cet = momentObj.clone().tz("cet")

      response.tableData = [{
          key: 1,
          date: gmt.format("YYYY dddd, MMMM Do"),
          time: gmt.format("HH:mm:ss"),
          timezone: 'GMT'
        }, {
          key: 2,
          date: cet.format("YYYY dddd, MMMM Do"),
          time: cet.format("HH:mm:ss"),
          timezone: 'CET'
      }];

      return responsse;
  }

}