import { useEffect } from 'react';
import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button'
import { Snackbar } from '@mui/material'
import AddCarr from './AddCar';
import EditCar from './EditCar';

export default function Carlist(){

    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    //sarakkeet
    const columns = [
        { field: 'brand' },
        { field: 'model' },
        { field: 'color' },
        { field: 'fuel' },
        { field: 'year' },
        { field: 'price' },
        { cellRenderer: row => <EditCar updateCar={updateCar} car={row.data} />,
          width: 120
                },
        { cellRenderer: params => 
                <Button size='small' color='error' onClick={() => deleteCar(params)} >
                    Delete 
                    </Button>,
                    width:120
                    }
    ];
    
    useEffect(() => getCars(), []);

    //const REST_URL = 'http://carrestapi.herokuapp.com/cars';

    const getCars = () => {
        fetch('http://carrestapi.herokuapp.com/cars')
        .then(response => response.json())
        .then(responseData => {
            setCars(responseData._embedded.cars)
        })
        .catch(error => console.error(error));
    };

    const deleteCar = (params) => {
        fetch(params.data._links.car.href, {method: 'DELETE'})
        .then(response => {
            if (response.ok){
                setMsg("Car is deleted successfully!");
                setOpen(true);
                getCars();
            } else {
                alert("Something went wrong");
            }
        })
        .catch(error => console.error(error));
    };

    const addCar = (car) => {
       fetch('http://carrestapi.herokuapp.com/cars', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(car)
       })
       .then(response => {
            if (response.ok)
                getCars();
            else
                alert('Something went wrong trying to add the car')
       })
       .catch(err => console.error(err));

    }

    const updateCar = (car, link) => {
        fetch(link, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(car)
        })
        .then(response => {
            if (response.ok)
                getCars();
            else
                alert('Something went wrong trying to edit the car')
       })
       .catch(err => console.error(err));
    }

    return (
        <div>
            <AddCarr addCar={addCar}/>
            <div className='ag-theme-material'
                style={{height: '700px', width: '70%', margin: 'auto'}}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={cars}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}>
                </Snackbar>
            </div>
        </div>
    );

}