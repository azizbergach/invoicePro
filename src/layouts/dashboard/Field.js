import { Autocomplete, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { cities } from 'list-of-moroccan-cities';
import MAFlag from "src/icons/MA";


function Field({ label, name, childs, options, formik }) {

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
                {
                ...(formik && {
                    error: formik.touched[name] && Boolean(formik.errors[name]),
                    onBlur: formik.handleBlur,
                    onChange: formik.handleChange,
                    value: formik.values[name],
                })
                }
                id={name}
                label={label}
                name={name}
                type="text"
                fullWidth
            />
        case 'type':
            return <Autocomplete
                fullWidth
                {
                ...(formik && {
                    onBlur: formik.handleBlur,
                    value: formik.values[name],
                    onChange: (e, v) => handleAutocompleteChange(e, v, name)
                })
                }
                disablePortal
                id={name}
                label={label}
                name={name}
                options={options.map(option => ({ label: option }))}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField
                    {...params}
                    {
                    ...(formik && {
                        error: formik.touched[name] && Boolean(formik.errors[name]),
                    })
                    }
                    label="Type"
                />
                }
            />

        case 'phoneNumber':
            return <TextField
                fullWidth
                {
                ...(formik && {
                    error: formik.touched[name] && Boolean(formik.errors[name]),
                    onBlur: formik.handleBlur,
                    onChange: formik.handleChange,
                    value: formik.values[name],
                })
                }
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
                {
                ...(formik && {
                    error: formik.touched[name] && Boolean(formik.errors[name]),
                    onBlur: formik.handleBlur,
                    value: formik.values[name],
                    onChange: (e, v) => handleAutocompleteChange(e, v, name)
                })
                }
                disablePortal
                id={name}
                label={label}
                name={name}
                options={cities.map(city => ({ label: city.label }))}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField
                    {...params}
                    {
                    ...(formik && {
                        error: formik.touched[name] && Boolean(formik.errors[name]),
                    })
                    }
                    label="City"
                />}
            />
    }
}

export default Field;