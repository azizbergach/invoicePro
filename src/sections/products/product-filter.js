import { Autocomplete, Card, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ProductsSearch } from "./products-search";




export default function FilterProducts({ data, setProductData, selected, handleDeleteMany }) {

    const [selectedDate, setSelectedDate] = useState([new Date('2023-01-01T17:07:17.000Z'), new Date()]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        setProductData(
            data.filter(product => {
                const date = new Date(product.createdAt);
                return (date >= selectedDate[0] && date <= selectedDate[1]);
            })
                .filter(product => {
                    if (selectedCategory) {
                        const category = product.category;
                        return category === selectedCategory.label;
                    } else {
                        return true;
                    }
                })
                .filter(product => {
                    if (selectedStatus) {
                        const status = product.status;
                        return status === selectedStatus.label;
                    } else {
                        return true;
                    }
                })
                .filter(product => product.name.toLowerCase().includes(searchQuery))
        )
    }, [selectedDate, selectedStatus, selectedCategory, searchQuery]);

    const Categories = ["Electronics", "Clothing", "Home Appliances", "Beauty Products", "Books", "Toys and Games", "Sporting Goods", "Pet Supplies", "Furniture", "Food and Beverage"];
    const Status = ["en stock", "rupture de stock"];


    return (<>
        <ProductsSearch {...{ handleDeleteMany, selected, setSearchQuery }} />
        <Card sx={{ p: 2 }} style={{
            display: "grid",
            gridTemplate: "1fr/ 2fr 1fr 2fr 2fr",
            gridGap: "1em",
            alignItems: "center",
        }}>
            {/* status */}
            <Autocomplete
                fullWidth
                disablePortal
                id='status'
                label='Status'
                name='status'
                onChange={(e, value) => setSelectedStatus(value)}
                options={Status.map(status => ({ label: status }))}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Status" />}
            />

            {/* categoty */}
            <Autocomplete
                fullWidth
                disablePortal
                id='category'
                label='Category'
                name='category'
                onChange={(e, value) => setSelectedCategory(value)}
                options={Categories.map(category => ({ label: category }))}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Category" />}
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