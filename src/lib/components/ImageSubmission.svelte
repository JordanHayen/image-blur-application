<script lang="ts">
    import ImagePreview from "./ImagePreview.svelte";

    // This variable will store the FileList object that is returned from the file input element
    let fileList: FileList;
    // This variable stores the File submitted, which will be the first in the FileList
    let file: File;
    // This variable stores a string containing the File as a URL which can be displayed on the page
    let fileUrl: string = "#";
    // This variable stores the image in the form of an ImageData object
    let imageData: ImageData;
    // This variable will determine if the file submitted is valid (it is a png or jpeg 2048 by 2048 pixels or smaller)
    let submissionIsValid: boolean = false;

    // This function converts an image file URI to an ImageData object
    // I borrowed this from https://stackoverflow.com/questions/17591148/converting-data-uri-to-image-data
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

    // This method will run when a file is submitted
    const input = async () => {
        // Set the file variable to the first item in the fileList
        file = fileList[0];

        // If the file is not a png or jpeg, send an alert warning that the image format is incorrect
        if(fileList[0].type != "image/png" && fileList[0].type != "image/jpeg") {
            submissionIsValid = false;
            alert("Bad file input. Please submit an image in png or jpeg format.");
            return;
        }
        
        // The fileUrl is created from the submitted file
        fileUrl = URL.createObjectURL(file);

        // An ImageData object is created from the file url
        await convertUriToImageData(fileUrl).then((data) => {
            imageData = data as ImageData;
        })

        // If the image is too large, send an alert warning that the image is too large
        if(imageData.height > 2048 || imageData.width > 2048) {
            submissionIsValid = false;
            alert("Image too large. Please submit a 2048 by 2048 image or smaller");
            return;
        }

        // The submission is marked as valid
        submissionIsValid = true;

    }

    const submit = () => {
        return;
    }


</script>

<!-- This input tag will let the user submit a png or jpeg file -->
<!-- The input is bound to the fileList variable -->
<input type="file" id="fileIn" accept="image/png, imge/jpeg" multiple bind:files={fileList} on:change={input}>
<br />

<!-- If a file has been submitted and the submission is not valid, render error text -->
{#if fileList && !submissionIsValid}
    <p style="color:red">File submitted is not valid</p>
<!-- If the sumission is valid, render the preview and submit button -->
{:else if fileList && submissionIsValid}
    <ImagePreview inputImageUrl={fileUrl}></ImagePreview>
    <br/>
    <button on:click={submit}>Blur</button>
{/if}