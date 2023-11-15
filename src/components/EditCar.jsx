import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";


export default function EditCar(props){

    //state
    const [car, setCar] = useState({brand: '', model: '', color: '', fuel: '', year: '', price: ''});
    const [open, setOpen] = useState(false); //is dialog open?

    //functions
    const handleClickOpen = () => {
        setCar({brand: props.params.data.brand, 
            model: props.params.data.model,
            color: props.params.data.color,
            fuel: props.params.data.fuel,
            year: props.params.data.year,
            price: props.params.data.price
        });
        setOpen(true);
    }
    
    const handleClose = (event, reason) => {     //close dialog
        if (reason != 'backdropClick')
        setOpen(false);
    }

    const handleInputChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value});
    }
    
    const handleSave = () => {
        props.updateCar(car, props.params.data._links.car.href);     
        setOpen(false);         //suljetaan dialogi ikkuna
    }

    //return
        // addbutton
        //dialog (add 'form')
    return (
        <>
        <Button size="small" onClick={handleClickOpen}>
            Edit Car
        </Button>

        <Dialog
            open={open}
            onClose={handleClose}>
            <DialogTitle>Edit Car</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    label='Brand'
                    name='brand'
                    value={car.brand}
                    onChange={handleInputChange}
                ></TextField>
                <TextField
                    margin="dense"
                    fullWidth
                    label='Model'
                    name='model'
                    value={car.model}
                    onChange={handleInputChange}
                ></TextField>
                 <TextField
                    margin="dense"
                    fullWidth
                    label='Color'
                    name='color'
                    value={car.color}
                    onChange={handleInputChange}
                ></TextField>
                <TextField
                    margin="dense"
                    fullWidth
                    label='Fuel'
                    name='fuel'
                    value={car.fuel}
                    onChange={handleInputChange}
                ></TextField>
                <TextField
                    margin="dense"
                    fullWidth
                    label='Year'
                    name='year'
                    value={car.year}
                    onChange={handleInputChange}
                ></TextField>
                <TextField
                    margin="dense"
                    fullWidth
                    label='Price'
                    name='price'
                    value={car.price}
                    onChange={handleInputChange}
                ></TextField>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>


        </>
    );

}
