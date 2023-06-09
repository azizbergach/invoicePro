import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Field from "./Field";


/**
 * 
 * @param {string} title  the title of the popup
 * @param {boolean} open  specifies whether this component is showing up or not
 * @param {function} setOpen  set the open to false
 * @param {array} Fields   specify the feilds that will be shown within the component
 * @param {object} formik formik
 * @param {array} buttons buttons name
 * @param {function} handleSubmit function that called one submitting the form
 * 
 */

function AddPopup({ title, open, setOpen, Fields, formik, buttons, handleSubmit }) {


    const handleClose = () => {
        formik.resetForm();
        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                {title}
            </DialogTitle>

            <form
                noValidate
                onSubmit={handleSubmit}
            >

                <DialogContent
                    style={{
                        paddingTop: 10
                    }}
                >

                    {
                        Fields.map((field, i) => <Field key={i} formik={formik} {...field} />)
                    }

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>{buttons[0]}</Button>
                    <Button type="submit" >{buttons[1]}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default AddPopup;