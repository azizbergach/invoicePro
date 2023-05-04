import { Autocomplete, Avatar, Button, Card, Collapse, Divider, FormControl, IconButton, Input, InputAdornment, InputLabel, NativeSelect, OutlinedInput, Select, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { FieldArray, FormikProvider } from "formik";
import { cities } from 'list-of-moroccan-cities';
import { useState } from "react";
import MAFlag from "src/icons/MA";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuantityInput from "./QuntityInput";
import Price from "./Price";
import CurrencyInput from "react-currency-input-field";




function Field(props) {

    const { label, name, childs, options, currency, formik, addedProps = {} } = props;

    const [file, setFile] = useState("");
    const [openCollapse, setOpenCollapse] = useState(Array(formik.values.options.length).fill(false));


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
        case 'name': case 'iceNumber': case 'cinNumber': case 'address': case "tpNumber": case "ifNumber": case 'sku':
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
        case 'type': case 'category': case 'status':
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
                    label={label}
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

        case 'logoUrl': case 'image':
            return <Stack direction="column" alignItems="center" spacing={2} justifyContent="center" marginX="auto">
                <Avatar src={file} variant='square' sx={{ objectFit: "cover", width: 60, height: 60 }} />
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

        case 'price':
            return <Price {...{ name, formik, currency, label }} />



        case 'options':
            return <FormikProvider value={formik}>
                <FieldArray name="options">
                    {({ push, remove }) =>
                        <div>
                            {formik.values.options.length > 0 && formik.values.options.map((option, index) => (
                                <div>
                                    <Card key={index} sx={{ marginBlock: 5, paddingInline: "1em" }} >
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span>Option {index + 1}</span>
                                            <IconButton onClick={() => setOpenCollapse(openCollapse.map((value, i) => i === index ? !value : value))} sx={{ transform: openCollapse[index] ? 'rotate(180deg)' : undefined }}>
                                                <ExpandMoreIcon />
                                            </IconButton>
                                        </Box>
                                        <Divider />
                                        <Collapse in={openCollapse[index]}>
                                            <Stack height={10} />
                                            <Stack key={index} {...stackProps}>
                                                <TextField
                                                    name={`options[${index}].name`}
                                                    fullWidth
                                                    label={label}
                                                    value={option.name}
                                                    {
                                                    ...(formik && {
                                                        error: formik.touched.options && formik.errors.options?.[index]?.name ? true : false,
                                                        onBlur: formik.handleBlur,
                                                        onChange: formik.handleChange
                                                    })
                                                    }
                                                />
                                                <IconButton onClick={() => remove(index)} color='error' aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Stack>
                                            <FieldArray name={`options[${index}].variants`}>
                                                {({ push, remove }) => <div>
                                                    {option.variants.length > 0 && option.variants.map((variant, idx) => (
                                                        <Stack key={idx} {...stackProps}>
                                                            <TextField
                                                                name={`options[${index}].variants[${idx}].name`}
                                                                label="Variant Name"
                                                                value={variant.name}
                                                                {
                                                                ...(formik && {
                                                                    error: formik.touched.options &&
                                                                        formik.touched.options[index]?.variants &&
                                                                        formik.errors.options?.[index]?.variants?.[idx]?.name
                                                                        ? true
                                                                        : false,
                                                                    onBlur: formik.handleBlur,
                                                                    onChange: formik.handleChange
                                                                })
                                                                }
                                                            />
                                                            <div style={{ width: "12em" }} className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-wb57ya-MuiFormControl-root-MuiTextField-root">
                                                                <label className={`MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-filled MuiFormLabel-colorPrimary Mui-focused MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-filled css-1r7i3m1-MuiFormLabel-root-MuiInputLabel-root ${formik.touched.options && formik.touched.options[index]?.variants && formik.errors.options?.[index]?.variants?.[idx]?.price ? "Mui-error" : ""}`} htmlFor="price-input">{"Variant Price"}</label>
                                                                <div onBlur={formik.handleBlur} className={`MuiInputBase-root MuiFilledInput-root MuiFilledInput-underline MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-1qbgmf4-MuiInputBase-root-MuiFilledInput-root ${formik.touched.options && formik.touched.options[index]?.variants && formik.errors.options?.[index]?.variants?.[idx]?.price ? "Mui-error" : ""}`}>
                                                                    <CurrencyInput
                                                                        id="price-input"
                                                                        name={`options[${index}].variants[${idx}].price`}
                                                                        suffix="DH"
                                                                        className="MuiInputBase-input MuiFilledInput-input css-1yc880w-MuiInputBase-input-MuiFilledInput-input"
                                                                        onValueChange={(value) => formik.setFieldValue(`options[${index}].variants[${idx}].price`, value)}
                                                                        value={variant.price}
                                                                        onBlur={formik.handleBlur}
                                                                        decimalsLimit={2}
                                                                        allowNegativeValue={false}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <Box flexDirection="column" >
                                                                <IconButton onClick={() => remove(idx)} color='error' aria-label="delete">
                                                                    <ClearIcon />
                                                                </IconButton>
                                                            </Box>
                                                        </Stack>
                                                    ))}
                                                    <Button onClick={() => push({ name: '', price: '' })}><AddIcon /> Add Another Variant</Button>
                                                </div>
                                                }
                                            </FieldArray>
                                        </Collapse>
                                    </Card>
                                </div>
                            ))}
                            <Button color="secondary" onClick={() => { push({ name: '', variants: [{ name: '', price: '' }, { name: '', price: '' }] }); setOpenCollapse(prev => [...prev, false]) }}><AddIcon /> Add Another Option</Button>
                        </div>
                    }
                </FieldArray>
            </FormikProvider>


        case "quantity":
            return <QuantityInput {...{ name, formik }} />
    }
}

export default Field;