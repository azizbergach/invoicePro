import CurrencyInput from 'react-currency-input-field';


export default function Price({ formik, name, currency, label }) {


    return <div style={{ width: "12em" }} className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-wb57ya-MuiFormControl-root-MuiTextField-root">
        <label className={`MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-filled MuiFormLabel-colorPrimary Mui-focused MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-filled css-1r7i3m1-MuiFormLabel-root-MuiInputLabel-root ${formik.touched[name] && Boolean(formik.errors[name]) ? "Mui-error" : ""}`} htmlFor="price-input">{label}</label>
        <div onBlur={formik.handleBlur} className={`MuiInputBase-root MuiFilledInput-root MuiFilledInput-underline MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-1qbgmf4-MuiInputBase-root-MuiFilledInput-root ${formik.touched[name] && Boolean(formik.errors[name]) ? "Mui-error" : ""}`}>
            <CurrencyInput
                id="price-input"
                name={name}
                suffix={currency}
                className="MuiInputBase-input MuiFilledInput-input css-1yc880w-MuiInputBase-input-MuiFilledInput-input"
                onValueChange={(value) => formik.setFieldValue(name, value)}
                value={formik.values[name]}
                onBlur={formik.handleBlur}
                decimalsLimit={2}
                allowNegativeValue={false}
            />
        </div>
    </div>
}