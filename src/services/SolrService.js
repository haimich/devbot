import axios from 'axios';

export default {

  getActiveSolr() {
    return axios.get(`/backend/solr/active?env=production`)
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

  search(selectedSolrServer, env, q, silo, handler, rows, fl, sort, rawQueryParams) {
    rawQueryParams = rawQueryParams.replace("=", "%3D");
    rawQueryParams = rawQueryParams.replace("&", "%26");

    q = encodeURIComponent(q);

    return axios.get(`/backend/solr/search?solrServer=${selectedSolrServer}&env=${env}&q=${q}&silo=${silo}&handler=${handler}&rows=${rows}&fl=${fl}&sort=${sort}&rawQueryParams=${rawQueryParams}`);
  },

}