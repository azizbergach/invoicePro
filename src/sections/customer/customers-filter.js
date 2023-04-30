import { Autocomplete, Card, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { cities } from 'list-of-moroccan-cities';
import { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CustomersSearch } from "./customers-search";




export default function FilterCustomers({ data, setCustomerData, selected, handleDeleteMany }) {

    const [selectedDate, setSelectedDate] = useState([new Date('2023-01-01T17:07:17.000Z'), new Date()]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        setCustomerData(
            data.filter(customer => {
                const date = new Date(customer.createdAt);
                return (date >= selectedDate[0] && date <= selectedDate[1]);
            })
                .filter(customer => {
                    if (selectedType) {
                        const type = customer.type;
                        return type === selectedType.label;
                    } else {
                        return true;
                    }
                })
                .filter(customer => {
                    if (selectedCity) {
                        const city = customer.city;
                        return city === selectedCity.label;
                    } else {
                        return true;
                    }
                })
                .filter(customer => customer.name.includes(searchQuery) || customer.phoneNumber.includes(searchQuery) || customer.address.includes(searchQuery) || customer.cinNumber.includes(searchQuery) || customer.iceNumber.includes(searchQuery))
        )
    }, [selectedDate, selectedCity, selectedType, searchQuery]);

    const Type = ['individual', 'company']


    return (<>
        <CustomersSearch {...{ handleDeleteMany, selected, setSearchQuery }} />
        <Card sx={{ p: 2 }} style={{
            display: "grid",
            gridTemplate: "1fr/ 2fr 1fr 2fr 2fr",
            gridGap: "1em",
            alignItems: "center",
        }}>
            {/* city */}
            <Autocomplete
                fullWidth
                disablePortal
                id='city'
                label='City'
                name='city'
                onChange={(e, value) => setSelectedCity(value)}
                options={cities.map(city => ({ label: city.label }))}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="City" />}
            />
            {/* type */}
            <Autocomplete
                fullWidth
                disablePortal
                id='type'
                label='Type'
                name='type'
                onChange={(e, value) => setSelectedType(value)}
                options={Type.map(type => ({ label: type }))}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Type" />}
            />

            {/* date range */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    label="Start Date"
                    inputFormat="dd/MM/yyyy"
                    value={selectedDate[0]}
                    onChange={(newValue) => {
                        setSelectedDate(([start, end]) => [newValue, end])
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    label="End Date"
                    inputFormat="dd/MM/yyyy"
                    value={selectedDate[1]}
                    onChange={(newValue) => {
                        setSelectedDate(([start, end]) => [start, newValue])
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </Card>
    </>)
}