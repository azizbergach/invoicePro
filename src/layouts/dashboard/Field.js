import styled from "@emotion/styled";
import { Autocomplete, Avatar, Button, FormControl, IconButton, Input, InputAdornment, NativeSelect, Select, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { cities } from 'list-of-moroccan-cities';
import { useEffect, useState } from "react";
import MAFlag from "src/icons/MA";



function Field({ label, name, childs, options, formik, addedProps = {} }) {

    const [file, setFile] = useState("");

    const stackProps = {
        direction: "row",
        spacing: 5,
        justifyContent: "space-between",
        style: {
            marginBottom: 10,
        },
        ...addedProps
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

    const handleFileChange = (value, name) => {
        setFile(URL.createObjectURL(value));
        formik.setFieldValue(name, value);
    }

    switch (name) {
        case 'name': case 'iceNumber': case 'cinNumber': case 'address': case "tpNumber": case "ifNumber":
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
                    label={label}
                />}
            />

        case 'logoUrl':
            return <Stack direction="column" alignItems="center" spacing={2} justifyContent="center" marginX="auto">
                <Avatar src={file} sx={{ width: 60, height: 60 }} />
                <Box sx={{ position: "relative" }}>
                    <input
                        accept="image/*"
                        id={name}
                        name={name}
                        type="file"
                        onChange={(e) => handleFileChange(e.target.files[0], name)}
                        style={{
                            display: 'none'
                        }}
                    />
                    <label htmlFor={name}>
                        <Button variant="outlined" component="span">
                            Upload
                        </Button>
                    </label>
                </Box>
                {formik && formik.touched[name] && formik.errors[name] && (
                    <TextField error helperText={formik.errors[name]} />
                )}
            </Stack>


        case 'rib':
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
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FormControl sx={{ minWidth: "max-content" }} >
                                <NativeSelect
                                    inputProps={{
                                        name: 'bank',
                                        id: 'uncontrolled-native',
                                    }}
                                >
                                    {
                                        options.map(option => <option key={option} value={option}>{option}</option>)
                                    }
                                </NativeSelect>
                            </FormControl>
                        </InputAdornment>
                    ),
                }}
            />
    }
}

export default Field;