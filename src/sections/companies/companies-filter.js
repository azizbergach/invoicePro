import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Autocomplete, Card, InputAdornment, OutlinedInput, SvgIcon, TextField } from "@mui/material";
import { useEffect, useState } from "react";




export default function FilterCompanies({ data, setCompanyData, setPage }) {

    const [selectedType, setSelectedType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        setPage(1);
        setCompanyData(
            data.filter(company => {
                if (selectedType) {
                    const type = company.type;
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
        <Card sx={{ p: 2 }} style={{
            display: "grid",
            gridTemplate: "1fr/ 2fr 1fr",
            gridGap: "1em",
            alignItems: "center",
        }}>
            {/* search */}
            <OutlinedInput
                defaultValue=""
                fullWidth
                placeholder="Search company"
                onChange={(e) => setSearchQuery(e.target.value)}
                startAdornment={(
                    <InputAdornment position="start">
                        <SvgIcon
                            color="action"
                            fontSize="small"
                        >
                            <MagnifyingGlassIcon />
                        </SvgIcon>
                    </InputAdornment>
                )}
                sx={{ maxWidth: 500 }}
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
        </Card>
    </>)
}