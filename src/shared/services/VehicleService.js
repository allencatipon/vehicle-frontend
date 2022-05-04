import axios from 'axios';

const USERS_REST_API_URL = 'http://localhost:8080/api';

class VehicleService {
  constructor() {
    this.axios = axios.create({
      baseURL: USERS_REST_API_URL,
    });
  }
  async get(data) {
    const response = await this.axios({
      method: 'GET',
      url: '/vehicle',
      params: {
        searchBy: data.searchBy,
        searchValue: data.searchValue,
        page: data.currentPage,
        size: data.recordPerPage,
      },
    });

    return response.data;
  }

  async create(data) {
    const response = await this.axios({
      method: 'POST',
      url: '/vehicle',
      data,
    });

    return response.data;
  }

  async update(vehicleId, data) {
    const response = await this.axios({
      method: 'PUT',
      url: '/vehicle',
      params: {
        id: vehicleId,
      },
      data,
    });

    return response.data;
  }

  async delete(vehicleId) {
    const response = await this.axios({
      method: 'DELETE',
      url: '/vehicle',
      params: {
        id: vehicleId,
      },
    });

    return response.data;
  }
}

export default new VehicleService();
