import BaseHttpService from './base-http.service';
import queryString from 'query-string';

class TaqueriaService extends BaseHttpService {
  constructor(props) {
    super(props)
  }
  async getTaqueria({ status = "", search }) {
    const queryObj = {};

    if (status && status.length) {
      queryObj.status = status;
    }
    if (search && search.length) {
      queryObj.search = search;
    }

    const queryStr = queryString.stringify(queryObj);
    return await this.get('taqueria/getall' + (queryStr ? `?${queryStr}` : ''));
  }
  async getTaquieriaById({ id }) {
    return await this.get(`taqueria/${id}`);
  }
  async getMyTaquerias({ id }) {
    return await this.get(`taqueria/my/${id}`);
  }

  updateTaqueriaStatus(id, status) {
    return this.patch(`taqueria/${id}/status`, { status });
  }
  updateTaqueria(taco) {
    return this.patch(`taqueria/${taco.id}`, { ...taco });
  }
  createTaqueria(taqueria) {
    return this.post(`taqueria`, { ...taqueria });
  }

}
export default TaqueriaService;