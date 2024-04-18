<script lang="ts">
    import ImagePreview from "./ImagePreview.svelte";
    import BlurService from "$lib/services/blur";
    import detector from "$lib/services/model";
    import logger from "$lib/services/logger";

    // This variable will store the FileList object that is returned from the file input element
    let fileList: FileList;
    // This variable stores the File submitted, which will be the first in the FileList
    let file: File;
    // This variable stores a string containing the File as a URL which can be displayed on the page
    let fileDisplay: string | ImageData = "#";
    // This variable stores the image in the form of an ImageData object
    let imageData: ImageData;
    // This variable stores the image in the form of a Blob object
    let imageBlob: Blob;
    // This variable stores the created image as a string
    let resultImage: string;
    // This variable will determine if the file submitted is valid (it is a png or jpeg 2048 by 2048 pixels or smaller)
    let submissionIsValid: boolean = false;
    // This instance of the BlurService class will be used to blur sections of the image
    let blur: BlurService = new BlurService(13);
    let submissionBlurred: boolean = false;

    
    // This function converts an image file URI to an ImageData object
    // Borrowed from https://stackoverflow.com/questions/17591148/converting-data-uri-to-image-data
    function convertUriToImageData(URI: any) {
        return new Promise(function(resolve, reject) {
            var canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            image = new Image();
            image.addEventListener('load', function() {
                canvas.width = image.width;
                canvas.height = image.height;
                context?.drawImage(image, 0, 0, canvas.width, canvas.height);
                resolve(context?.getImageData(0, 0, canvas.width, canvas.height));
            }, false);
            image.src = URI;
        });
    }

    // This function converts an ImageData object to a Blob object
    // Borrowed from https://stackoverflow.com/questions/65263758/convert-imagedata-to-blob-in-js
    const ImageDataToBlob = function(imageData: ImageData) {
        let w = imageData.width;
        let h = imageData.height;
        let canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        let ctx = canvas.getContext("2d");
        ctx?.putImageData(imageData, 0, 0);        // synchronous

        return new Promise((resolve) => {
            canvas.toBlob(resolve); // implied image/png format
        });
    }

    // This method will run when a file is submitted
    const handleInput = async () => {
        logger.info("Image submitted");

        // Set the file variable to the first item in the fileList
        file = fileList[0];

        // If the file is not a png or jpeg, send an alert warning that the image format is incorrect
        if(fileList[0].type != "image/png" && fileList[0].type != "image/jpeg") {
            submissionIsValid = false;
            logger.error("Bad file input. Please submit an image in png or jpeg format.");
            alert("Bad file input. Please submit an image in png or jpeg format.");
            return;
        }
        
        // The fileUrl is created from the submitted file
        fileDisplay = URL.createObjectURL(file);

        // An ImageData object is created from the file url
        await convertUriToImageData(fileDisplay).then((data) => {
            imageData = data as ImageData;
        })

        // If the image is too large, send an alert warning that the image is too large
        if(imageData.height > 2048 || imageData.width > 2048) {
            submissionIsValid = false;
            logger.error("Image too large. Please submit a 2048 by 2048 image or smaller");
            alert("Image too large. Please submit a 2048 by 2048 image or smaller");
            return;
        }

        // The submission is marked as valid
        submissionIsValid = true;
        submissionBlurred = false;

    }

    // This method runs when the blur button is pushed
    // Since the machine learning model has not yet been implemented, it uses the blur service to blur a predefined region of the image
    const handleBlur = async () => {
        logger.info("Starting image blur");

        // Pass the imageData to the detector
        const faceEstimation = await detector.estimateFaces(imageData);
        // Create an array of boundix boxes from the estimation returned from the detector
        let boundingBoxes = [];
        for(let i = 0; i < faceEstimation.length; i++) {
            const xMin = (faceEstimation[i].box.xMin <= imageData.width ? Math.ceil(faceEstimation[i].box.xMin) : imageData.width) >= 0 ? Math.ceil(faceEstimation[i].box.xMin) : 0;
            const xMax = (faceEstimation[i].box.xMax <= imageData.width ? Math.ceil(faceEstimation[i].box.xMax) : imageData.width) >= 0 ? Math.ceil(faceEstimation[i].box.xMax) : 0;
            const yMin = (faceEstimation[i].box.yMin <= imageData.height ? Math.ceil(faceEstimation[i].box.yMin) : imageData.height) >= 0 ? Math.ceil(faceEstimation[i].box.yMin) : 0;
            const yMax = (faceEstimation[i].box.yMax <= imageData.height ? Math.ceil(faceEstimation[i].box.yMax) : imageData.height) >= 0 ? Math.ceil(faceEstimation[i].box.yMax) : 0;
            boundingBoxes.push([ xMin, yMin, xMax, yMax ]);
        }

        logger.info(boundingBoxes.length + " faces detected");
        
        // Blur a region of the image input
        fileDisplay = imageData;
        for(let i = 0; i < boundingBoxes.length; i++)
            fileDisplay = blur.pixelateBoundingBox(fileDisplay, boundingBoxes[i][0], boundingBoxes[i][1], boundingBoxes[i][2], boundingBoxes[i][3]);
        
        submissionBlurred = true;

        await ImageDataToBlob(fileDisplay).then((data) => {
            imageBlob = data as Blob;
        })

        resultImage = URL.createObjectURL(imageBlob);

        logger.info("Image blurred");

        return;
    }


</script>

<!-- This input tag will let the user submit a png or jpeg file -->
<!-- The input is bound to the fileList variable -->
<button><label for="fileIn">Upload an Image</label></button>
<input type="file" name="fileIn" id="fileIn" accept="image/png, image/jpeg" multiple bind:files={fileList} on:change={handleInput} style="width:0.1px;height:0.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1;">
<br />

<!-- If a file has been submitted and the submission is not valid, render error text -->
{#if fileList && !submissionIsValid}
    <p style="color:red">File submitted is not valid</p>
<!-- If the sumission is valid, render the preview and submit button -->
{:else if fileList && submissionIsValid}
    <ImagePreview inputImage={fileDisplay}></ImagePreview>
    <br/>
    {#if !submissionBlurred}
        <button on:click={handleBlur}>Blur</button>
    {:else}
        <a href={resultImage} download={file.name.replaceAll(".jpg", "").replaceAll(".jpeg", "").replaceAll(".png", "") + "-blurred"}><button>Download</button></a>
    {/if}
{/if}