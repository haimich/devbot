import axios from 'axios';

export default {

  getActiveSolr() {
    return axios.get("/backend/solr/active?env=production")
      .then(response => {
        var servers = response.data;

        for (let server of servers) {
          server.urlPath = this.extractUrlPath(server.url);
        }

        return servers;
      });
  },

  extractUrlPath(url) {
    var parser = document.createElement('a');
    parser.href = url;
    
    return parser.hostname;
  },

  search(env, q) {
    return axios.get(`/backend/solr/search?env=${env}&q=${q}`);
  },

}