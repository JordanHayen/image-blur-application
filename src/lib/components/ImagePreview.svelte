<script lang="ts">
    import { afterUpdate, beforeUpdate, onMount } from "svelte";

    // The parent component can pass an image to this component
    // The image can be passed either as a string (an image file path filepath) or an ImageData object
    export let inputImage: string | ImageData = "#";

    // Each time the component is updated, render the image
    // The appropriate render method is called depending on whether a string or an ImageData object was passed
    afterUpdate(() => {
        if(typeof(inputImage) == "string") {
            renderImagePreviewString();
        } else {
            renderImagePreviewImageData();
        }
    })

    // This method will render the image if it was given as a string
    // This is adapted from code found here: https://stackoverflow.com/questions/17591148/converting-data-uri-to-image-data
    const renderImagePreviewString = () => {
        var canvas: HTMLCanvasElement = document.getElementById("preview") as HTMLCanvasElement;
        var context = canvas.getContext("2d");
        var img: HTMLImageElement = new Image();
        img.src = inputImage as string;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            context?.drawImage(img, 0, 0);
        }
    }

    // This method will render the imag if it was given as an ImageData object
    const renderImagePreviewImageData = () => {
        // References to the canvas element are created
        var canvas: HTMLCanvasElement = document.getElementById("preview") as HTMLCanvasElement;
        var context = canvas.getContext("2d");

        // The ImageData object is written to the canvas
        context?.putImageData(inputImage as ImageData, 0, 0);
    }
</script>

<!-- A canvas element to display the image -->
<canvas id="preview"></canvas>