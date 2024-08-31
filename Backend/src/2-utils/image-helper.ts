import { UploadedFile } from "express-fileupload";
import { v4 as uuid } from "uuid";
import path from "path";
import fsPromises from "fs/promises"


// save image to disk with uuid name:
async function saveImage(image: UploadedFile): Promise<string> {

    // if no image:
    if (!image) return "no-image.jpg";

    // take original extension:
    let extension = path.extname(image.name);

    // create unique file name:
    let fileName = uuid() + extension;

    // get absolute path to save image:
    let absolutePath = path.join(__dirname, `../1-assets/images/destinations/${fileName}`);

    // save image in disk:
    await image.mv(absolutePath);

    // return unique name:
    return fileName;

}

// on update: remove old image and save new one:
async function updateImage(image: UploadedFile, oldImage: string): Promise<string> {

    // remove oldImage:
    await deleteImage(oldImage);

    // save new image:
    let fileName = await saveImage(image);

    // return new image name:
    return fileName;
}

// on delete: remove image:
async function deleteImage(oldImage: string): Promise<void> {
    try {

        if (!oldImage) return;

        // get absolute path to save image:
        let absolutePath = path.join(__dirname, `../1-assets/images/destinations/${oldImage}`);

        // remove image:
        await fsPromises.rm(absolutePath); //check
    } catch (error: any) {
        console.log(error.message);
    }
}

export default {
    saveImage,
    updateImage,
    deleteImage
};