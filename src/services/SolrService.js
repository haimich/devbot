
export default {

  getActiveSolr() {
    return fetch("/backend/solr/active?env=production")
      .then(response => {
        return response.json();
      })
      .then(servers => {
        for (let server of servers) {
          server.urlPath = this.getUrlPath(server.url);
        }

        return servers;
      });
  },

  getUrlPath(url) {
    var parser = document.createElement('a');
    parser.href = url;
    
    return parser.hostname;
  }

}