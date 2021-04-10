import BaseHttpService from './base-http.service';
import queryString from 'query-string';
import axios from 'axios';
export default class MapboxService extends BaseHttpService {
    constructor(props) {
        super(props)
    }
    async getLatLngFromAddress({ address, options = {} }) {
        Object.assign(options, this._getCommonOptions());
        return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoianJuZWxzMTAiLCJhIjoiY2ticjNwdXR4MXlpcTJ5dG1rdjF4MDdxeSJ9.tiUpLiArSzx6thNUgPOL-w`)
            .catch(error => this._handleHttpError(error));
    }

    async getAddressFromLatLng({ latlng, options = {} }) {
        Object.assign(options, this._getCommonOptions());
        return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${latlng[0]},${latlng[1]}.json?access_token=pk.eyJ1IjoianJuZWxzMTAiLCJhIjoiY2ticjNwdXR4MXlpcTJ5dG1rdjF4MDdxeSJ9.tiUpLiArSzx6thNUgPOL-w`)
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
    _handleHttpError(error) {
        const { statusCode } = error.response.data;

        if (statusCode !== 401) {
            throw error;
        } else {
            return this._handle401();
        }
    }
    _getCommonOptions() {
        const token = this.loadToken();

        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }
}
