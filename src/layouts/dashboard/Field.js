import { Autocomplete, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { cities } from 'list-of-moroccan-cities';
import MAFlag from "src/icons/MA";


function Field({ label, name, childs, formik }) {

    const stackProps = {
        direction: "row",
        spacing: 5,
        justifyContent: "space-between",
        style: {
            marginBottom: 10
        }
    }

    if (name === "stack") {
        return <Stack {...stackProps}>
            {
                childs.map((field, i) => <Field key={i} formik={formik} {...field} />)
            }
        </Stack>
    }

    const handleAutocompleteChange = (event, value, name) => {
        if (value !== null) {
            formik.setFieldValue(name, value.label);
        } else {
            formik.setFieldValue(name, "");
        }
    };

    switch (name) {
        case 'name': case 'iceNumber': case 'cinNumber': case 'address':
            return <TextField
                error={formik.touched[name] && Boolean(formik.errors[name])}

                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values[name]}
                id={name}
                label={label}
                name={name}
                type="text"
                fullWidth
            />
        case 'type':
            return <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                <Select
                    labelId="type-customer"
                    id={name}
                    label={label}
                    name={name}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                >
                    <MenuItem value="individual">Individual</MenuItem>
                    <MenuItem value="company">Company</MenuItem>
                </Select>
            </FormControl>

        case 'phoneNumber':
            return <TextField
                fullWidth
                error={formik.touched[name] && Boolean(formik.errors[name])}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values[name]}
                id={name}
                label={label}
                name={name}
                type="phone"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton>
                                <MAFlag />
                            </IconButton>
                            <span style={{
                                color: "#0A0A0A",
                                fontFamily: "inherit",
                                fontSize: 14,
                                fontWeight: 500,
                                lineHeight: 24,
                            }}>+212</span>
                        </InputAdornment>
                    ),
                }}
            />

        case 'city':
            return <Autocomplete
                fullWidth
                error={formik.touched[name] && Boolean(formik.errors[name])}
                onBlur={formik.handleBlur}
                onChange={(e, v) => handleAutocompleteChange(e, v, name)}
                value={formik.values[name]}
                disablePortal
                isOptionEqualToValue={(option, value) => option.value === value}
                id={name}
                label={label}
                name={name}
                options={cities.map(city => ({ label: city.label }))}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="City" />}
            />
    }
}

export default Field;