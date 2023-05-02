import { Autocomplete, Card, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CompaniesSearch } from "./companies-search";




export default function FilterCompanies({ data, setCompanyData }) {

    const [selectedType, setSelectedType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        setCompanyData(
            data.filter(company => {
                if (selectedType) {
                    const type = company.type;
                    console.log(type === selectedType.label);
                    return type === selectedType.label;
                } else {
                    return true;
                }
            })
                .filter(company => company.name.includes(searchQuery) || company.phoneNumber.includes(searchQuery) || company.address.includes(searchQuery) || company.tpNumber.includes(searchQuery) || company.iceNumber.includes(searchQuery) || company.ifNumber.includes(searchQuery) || company.city.includes(searchQuery) || company.rib.includes(searchQuery))
        )
    }, [selectedType, searchQuery]);

    const Type = ['société', 'auto-entrepreneur'];


    return (<>
        <CompaniesSearch {...{ setSearchQuery }} />
        <Card sx={{ p: 2 }} style={{
            display: "grid",
            gridTemplate: "1fr/ 2fr 1fr 2fr 2fr",
            gridGap: "1em",
            alignItems: "center",
        }}>
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
        </Card>
    </>)
}