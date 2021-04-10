import BaseHttpService from './base-http.service';
import queryString from 'query-string';

class TaqueriaService extends BaseHttpService {
  constructor(props) {
    super(props)
  }
  async getTaqueria({ status, search }) {
    const queryObj = {};

    if (status && status.length) {
      queryObj.status = status;
    }
    debugger
    if (search && search.length) {
      queryObj.search = search;
    }

    const queryStr = queryString.stringify(queryObj);
    return await this.get('taqueria' + (queryStr ? `?${queryStr}` : '/getall'));
  }

  // async deleteTask(id) {
  //   await this.delete(`tasks/${id}`);
  // }

  updateTaqueriaStatus(id, status) {
    return this.patch(`taqueria/${id}/status`, { status });
  }

  createTaqueria(taqueria) {
    return this.post(`taqueria`, { ...taqueria });
  }

}
export default TaqueriaService;