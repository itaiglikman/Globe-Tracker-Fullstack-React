import { AttachMoney, Description, TravelExplore, Upload } from "@mui/icons-material";
import { Button, FormHelperText, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import noImage from "../../../Assets/Images/no-image.jpg";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import VacationService from "../../../Services/VacationService";
import useProtectedPage from "../../../Utils/UseProtectedPage";
import useTitle from "../../../Utils/UseTitle";
import "./AddVacation.css";



function AddVacation(): JSX.Element {

    useTitle("Add");

    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<VacationModel>();
    const navigate = useNavigate();

    // displayed image url:
    const [displayedImage, setDisplayedImage] = useState<string>(noImage); // imageUrl displayed in form
    // image file to upload and to display:
    const [uploadedImage, setUploadedImage] = useState<File | null>(null); // store the uploaded image file


    // custom hook for protecting pages from unauthorized access.
    // hook get boolean if access is for admin only or not.
    // if no logged user or not admin - display error message and navigate user.
    useProtectedPage(true);

    // on new image upload- function get the event values,
    function getImageOnUpload(event: any) {
        // if files exist - create image url and set displayed image as the uploaded image:
        if (event.target.files && event.target.files[0]) {
            let file = event.target.files[0]; //extract image file
            setDisplayedImage(URL.createObjectURL(file)); //image url
            // set the image as the uploaded image:
            setUploadedImage(file); //image file
            clearErrors("image"); //on upload - clear errors
        }
    }

    // on submit send new vacation to db:
    async function send(vacation: VacationModel): Promise<void> {
        try {

            // trim whitespaces before sending:
            vacation.destination = vacation.destination.trim();
            vacation.description = vacation.description.trim();

            // converted FileList (Containing single file) into a File type (happens in getImageOnUpload()):
            vacation.image = uploadedImage;

            // send new vacation to db and update global state:
            await VacationService.addVacation(vacation);

            notifyService.success("New vacation has been added!");
            navigate("/vacations");
        } catch (err) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AddVacation">

            <form onSubmit={handleSubmit(send)}>
                {/* header: */}
                <Typography variant="h4" className="formHeader">Add Vacation</Typography>

                {/* Destination Field: */}
                <TextField label={"Destination"}
                    type="text"
                    title="Destination"
                    inputProps={{ maxLength: 50 }} //limit max length in box
                    {...register("destination", VacationModel.destinationValidation)} // react-form-hook option to connect to model.
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <TravelExplore />
                            </InputAdornment>
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={!!errors.destination} //Check for errors
                    helperText={errors.destination?.message}
                />

                {/* Description Field: */}
                <TextField label={"Description"}
                    type="text"
                    title="Description"
                    inputProps={{ maxLength: 2000 }} //limit max length in box
                    multiline rows={4}
                    {...register("description", VacationModel.descriptionValidation)} // react-form-hook option to connect to model.
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <Description />
                            </InputAdornment>
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={!!errors.description} //Check for errors
                    helperText={errors.description?.message} />

                {/* Price Field: */}
                <TextField
                    label={"Price"}
                    type="number"
                    title="Price"
                    {...register("price", VacationModel.priceValidation)} // react-form-hook option to connect to model.
                    onKeyDown={e => //disable inserting unwanted chars:
                        (e.key === "-" || e.key === "e" || e.key === "+" || e.key === ".") && e.preventDefault()
                    }
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <AttachMoney />
                            </InputAdornment>,
                        inputProps: { min: 0, max: 10000 } // limit input
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={!!errors.price} //Check for errors
                    helperText={errors.price?.message}
                />

                {/* start date Field: */}
                <TextField
                    label="Start Date MM/DD/YYYY" type="date"
                    {...register("startDate", VacationModel.startDateValidation)}
                    className={errors.startDate ? "errorInput" : ""}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={!!errors.startDate} //Check for errors
                    helperText={errors.startDate?.message}
                />

                {/* finish date Field: */}
                <TextField
                    label="Finish Date MM/DD/YYYY" type="date"
                    {...register("finishDate", VacationModel.finishDateValidation)}
                    className={errors.finishDate ? "errorInput" : ""}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={!!errors.finishDate} //Check for errors
                    helperText={errors.finishDate?.message}
                />

                {/* image Field: */}
                <div className="imageContainer">
                    {/* displayed image: */}
                    <img src={displayedImage} className={!!errors.image ? "displayedImageWithError" : "displayedImage"} />
                    <input //only input can have accept property
                        type="file"
                        accept="image/*"
                        className="displayedImageInput"
                        id="displayed-image-input"
                        {...register("image", VacationModel.imageValidation)} // react-form-hook option to connect to model.
                        onChange={getImageOnUpload}//set uploaded image state.
                    />
                    <FormHelperText className={`errorText ${errors.image ? 'visible' : ''}`} >
                        {errors.image?.message}
                    </FormHelperText>
                    {/* image upload button: */}
                    <label htmlFor="displayed-image-input" className="imageUploadButton">
                        <Button component="span" variant="contained" >
                            <Upload />
                        </Button>
                    </label>
                </div>

                {/* send button: */}
                <Button
                    type="submit" variant="contained"
                    sx={{ backgroundColor: "#60BD92", "&:hover": { backgroundColor: "#388e3c" } }} >
                    Save
                </Button>

            </form>

        </div >
    );
}

export default AddVacation;