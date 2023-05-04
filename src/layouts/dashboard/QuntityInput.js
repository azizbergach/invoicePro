import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, TextField } from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';


/**
 * you can either provide 'formik' or 'data' params and always 'name'
 * @param {string} name the field name
 * @param {string} table the table name on the database
 * @param {object} formik formik from useFormik
 * @param {object} tableData the object that you'll add the quantity to it
 * @returns jsx of quantity selector
 */


export default function QuantityInput({ name, formik, tableData, table }) {

    if (formik) {
        const quantity = formik.values[name];

        const handleAddQuantity = () => {
            formik.setFieldValue(name, parseInt(quantity, 10) + 1);
        };

        const handleSubtractQuantity = () => {
            if (quantity > 0) {
                formik.setFieldValue(name, parseInt(quantity, 10) - 1);
            }
        };


        return <div style={{
            display: 'flex',
            alignItems: 'center',
        }}>
            <IconButton aria-label="subtract quantity" color='primary' onClick={handleSubtractQuantity}>
                <RemoveIcon />
            </IconButton>
            <TextField
                sx={{
                    width: '5rem',
                    textAlign: 'center',
                }}
                {
                ...{
                    error: formik.touched[name] && Boolean(formik.errors[name]),
                    onBlur: formik.handleBlur,
                    onChange: formik.handleChange,
                    value: quantity,
                }
                }
                id={name}
                name={name}
                inputProps={{
                    min: 0,
                    style: { textAlign: 'center', padding: "1em 0" },
                }}
            />
            <IconButton aria-label="add quantity" color='primary' onClick={handleAddQuantity}>
                <AddIcon />
            </IconButton>
        </div>
    } else if (tableData) {

        const [quantity, setQuantity] = useState(tableData.quantity);

        const handleAddQuantity = async () => {
            try {
                const { data } = await axios.post('/api/update', {
                    table,
                    where: {
                        id: tableData.id
                    },
                    data: {
                        quantity: String(parseInt(quantity) + 1)
                    }
                });
                setQuantity(data.quantity)
            } catch (error) {
                enqueueSnackbar(error.message, { variant: "error" })
            }
        };

        const handleSubtractQuantity = async () => {
            try {
                const { data } = await axios.post('/api/update', {
                    table,
                    where: {
                        id: tableData.id
                    },
                    data: {
                        quantity: String(parseInt(quantity) - 1)
                    }
                });
                setQuantity(data.quantity)
            } catch (error) {
                console.log(error);
                enqueueSnackbar(error.message, { variant: "error" })
            }
        };


        return <div style={{
            display: 'flex',
            alignItems: 'center',
        }}>
            <IconButton aria-label="subtract quantity" color='primary' onClick={handleSubtractQuantity}>
                <RemoveIcon />
            </IconButton>
            <TextField
                sx={{
                    width: '5rem',
                    textAlign: 'center',
                }}
                id={name}
                name={name}
                value={quantity}
                inputProps={{
                    min: 0,
                    style: { textAlign: 'center', padding: "1em 0" },
                }}
            />
            <IconButton aria-label="add quantity" color='primary' onClick={handleAddQuantity}>
                <AddIcon />
            </IconButton>
        </div>
    }

    return <div>Give Some Data</div>

};

