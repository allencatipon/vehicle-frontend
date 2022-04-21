import axios from 'axios'

const USERS_REST_API_URL = 'http://localhost:8080/api/vehicle';

class VehicleService {

    getVehicle(){
        return axios.get(USERS_REST_API_URL, {
            variant: 'Car'
        });
    }
}

export default new VehicleService();