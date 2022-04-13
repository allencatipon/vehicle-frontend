import React from 'react';
import VehicleService from '../services/VehicleService';

class VehicleComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            vehicle:[]
        }
    }

    componentDidMount(){
        VehicleService.getVehicle().then((response) => {
            this.setState({ vehicle: response.data})
        });
    }

    render (){
        return (
            <div>
                <h1 className = "text-center"> Vehicle List</h1>
                <table className = "table table-striped">
                    <thead>
                        <tr>

                            <td> Id</td>
                            <td> Color Name</td>
                            <td> Make Name</td>
                            <td> Displacement</td>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.vehicle.map(
                                motor => 
                                <tr key = {motor.id}>
                                     <td> {motor.id}</td>   
                                     <td> {motor.color}</td>   
                                     <td> {motor.make}</td>   
                                     <td> {motor.displacement}</td>   
                                </tr>
                            )
                        }

                    </tbody>
                </table>

            </div>

        )
    }
}

export default VehicleComponent