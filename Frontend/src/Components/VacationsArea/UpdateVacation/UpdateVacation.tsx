import { AttachMoney, Description, TravelExplore, Upload } from "@mui/icons-material";
import { Button, FormHelperText, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import noImage from "../../../Assets/Images/no-image.jpg";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import VacationService from "../../../Services/VacationService";
import useProtectedPage from "../../../Utils/UseProtectedPage";
import useTitle from "../../../Utils/UseTitle";
import "./UpdateVacation.css";



function UpdateVacation(): JSX.Element {

    useTitle("Update");

    const { register, handleSubmit, formState: { errors }, clearErrors, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();
    const selectedVacationId = +params.vacationId;

    const [displayedImage, setDisplayedImage] = useState<string>(""); // imageUrl displayed in form
    const [uploadedImage, setUploadedImage] = useState<File | null>(null); // store the uploaded image file
    const [originalVacation, setOriginalVacation] = useState<VacationModel>();

    // custom hook for protecting pages from unauthorized access.
    // hook get if access is for admin only or not.
    // if no logged user or not admin - display error message and navigate user.
    useProtectedPage(true);

    // set the existing item values in the form:
    useEffect(() => {

        VacationService.getOneVacation(selectedVacationId)
            .then(dbVacation => {
                // copy db vacation:
                setOriginalVacation({ ...dbVacation });
                // set the values of the original vacation in the form fields:
                setValue("vacationId", dbVacation.vacationId);
                setValue("destination", dbVacation.destination);
                setValue("description", dbVacation.description);
                setValue("startDate", dateFormatMUI(dbVacation.startDate));
                setValue("finishDate", dateFormatMUI(dbVacation.finishDate));
                setValue("price", dbVacation.price);
                setDisplayedImage(dbVacation.imageUrl); //set displayed image as image of given vacation
                setValue("image", dbVacation.image);
            })
            .catch(err => {
                notifyService.error(err)
                if (err.response.status === 401) navigate('/login'); //not logged user request
                else if (err.response.status === 403) navigate('/vacations'); // unauthorized request
                else if(err.response.status === 404) navigate('/vacations'); // request for not existing vacation
            });
    }, []);

    // on new image upload- 
    // function get the event values,
    // if files exist - create image url and set displayed image as the uploaded image:
    // set the image as the uploaded image:
    // clear errors from the input field:
    function getImageOnUpload(event: any) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0]; //extract image file
            setDisplayedImage(URL.createObjectURL(file)); //image url
            setUploadedImage(file); //image file
            clearErrors("image"); //on upload - clear errors
        }
    }

    // mui date field value need YYYY-MM-DD format
    // get original vacation date, 
    // return string with the needed value for setting in the field
    function dateFormatMUI(date: string): string {
        let newDate = new Date(date);
        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0'); //in case less then 10
        const day = String(newDate.getDate()).padStart(2, '0'); //in case less then 10
        return `${year}-${month}-${day}`;
    }

    // on submit send update vacation:
    async function update(vacation: VacationModel): Promise<void> {
        try {
            // set id as before:
            vacation.vacationId = selectedVacationId;

            // trim whitespaces before sending:
            vacation.destination = vacation.destination.trim();
            vacation.description = vacation.description.trim();

            // convert FileList (Containing single file) into a File type:
            vacation.image = uploadedImage;
            
            // implement follow data from original vacation:
            vacation.isFollowing = originalVacation.isFollowing;
            vacation.followersCount = originalVacation.followersCount;

            // send update to server:
            await VacationService.updateVacation(vacation);

            notifyService.success("Vacation has been updated!");
            navigate("/vacations");
        } catch (err) { notifyService.error(err) }
    }
    return (
        <div className="UpdateVacation">

            <form onSubmit={handleSubmit(update)}>

                <Typography variant="h4" className="formHeader">Update Vacation</Typography>

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

                <TextField
                    label="Start Date MM/DD/YYYY" type="date"
                    {...register("startDate", VacationModel.updateStartDateValidation)}
                    className={errors.startDate ? "errorInput" : ""}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={!!errors.startDate} //Check for errors
                    helperText={errors.startDate?.message}
                />

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

                <div className="imageContainer">
                    <img src={displayedImage} className={!!errors.image ? "displayedImageWithError" : "displayedImage"} />
                    <input //only input can have accept property
                        type="file"
                        accept="image/*"
                        className="displayedImageInput"
                        id="displayed-image-input"
                        {...register("image")} // no validation needed.
                        onChange={getImageOnUpload}//set uploaded image state.
                    />
                    <FormHelperText className={`errorText ${errors.image ? 'visible' : ''}`} >
                        {errors.image?.message}
                    </FormHelperText>
                    <label htmlFor="displayed-image-input" className="imageUploadButton">
                        <Button component="span" variant="contained" >
                            <Upload />
                        </Button>
                    </label>
                </div>

                <Button
                    type="submit" variant="contained"
                    sx={{ backgroundColor: "#60BD92", "&:hover": { backgroundColor: "#388e3c" } }} >
                    Update
                </Button>

            </form>

        </div >
    );
}

export default UpdateVacation;