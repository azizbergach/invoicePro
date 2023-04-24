import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Field from "./Field";


/**
 * 
 * @param {string} type  user, customer ...
 * @param {string} open  specifies whether this component is showing up or not
 * @param {string} setOpen  set the open to false
 * @param {string} Fields   specify the feilds that will be shown within the component
 * @param {string} formik formik
 * 
 * @returns add new [type]
 */

function AddPopup({ type, open, setOpen, Fields, formik }) {


    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                Create New {type}
            </DialogTitle>

            <form
                noValidate
                onSubmit={formik.handleSubmit}
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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" >Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default AddPopup;