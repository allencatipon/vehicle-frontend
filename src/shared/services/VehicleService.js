import axios from 'axios';

const USERS_REST_API_URL = 'http://localhost:8080/api/vehicle';

class VehicleService {
  async getVehicle(data, currentPage) {
    const response = await axios.get(USERS_REST_API_URL, {
      params: {
        searchBy: data.searchBy,
        searchValue: data.searchValue,
        page: currentPage,
        size: data.recordPerPage
      },
    });

    return response.data;
  }
}

export default new VehicleService();
