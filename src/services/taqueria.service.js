import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class TaqueriaService extends BaseHttpService {
  async getTaqueria({ status, search }) {
    const queryObj = {};

    if (status.length) {
      queryObj.status = status;
    }

    if (search.length) {
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

  createTaqueria(name, description) {
    return this.post(`taqueria`, { name, description });
  }

}
