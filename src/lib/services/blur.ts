// This class contains methods to blur regions of an ImageData object
export default class BlurService {
    private kernelSize: number;

    constructor(kernelSize: number) {
        this.kernelSize = kernelSize;
    }

    public getKernelSize(): number {
        return this.kernelSize;
    }

    public setKernelSize(kernelSize: number) {
        this.kernelSize = kernelSize;
    }

    // This method blurs a region of an ImageData object
    // It takes in an ImageData object and a two-dimensional array of numbers
    // The array represents the pixels to be blurred, each pixel represented as a cooordinate pair
    public blurPixelArray(imageData: ImageData, pixels: number[][]): ImageData {
        // The imageData field is duplicated. This duplicate will be modified and returned
        let result = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);

        // Iterate over the pixels parameter
        // For each pixel, take the average of the pixel and its neighbors in the imageData parameter, set the corresponding image in the result to the average
        for(let i = 0; i < pixels.length; i++) {
            this.setPixel(result, pixels[i][0], pixels[i][1], this.blurPixel(imageData, pixels[i][0], pixels[i][1], this.kernelSize));
        }

        // Return the result
        return result;

    }

    // This method blurs a region of an ImageData object
    // It takes in an ImageData object and four numbers representing the x and y coordinates of the bounding box
    // The array represents the pixels to be blurred, each pixel represented as a cooordinate pair
    public blurBoundingBox(imageData: ImageData, x1: number, y1: number, x2: number, y2: number) {
        // The imageData field is duplicated. This duplicate will be modified and returned
        let result = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);

        // Iterate over the pixels parameter
        // For each pixel, take the average of the pixel and its neighbors in the imageData parameter, set the corresponding image in the result to the average
        for(let x = x1; x < x2; x++) {
            for(let y = y1; y < y2; y++) {
                this.setPixel(result, x, y, this.blurPixel(imageData, x, y, this.kernelSize));
            }
        }

        // Return the result
        return result;
    }

    // This method blurs a region of an ImageData object
    // It takes in an ImageData object and four numbers representing the x and y coordinates of the bounding box
    // The array represents the pixels to be blurred, each pixel represented as a cooordinate pair
    public blurBoundingBoxes(imageData: ImageData, boxes: number[][]) {
        // The imageData field is duplicated. This duplicate will be modified and returned
        let result = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);

        for(let i = 0; i < boxes.length; i++) {
            for(let x = boxes[i][0]; x < boxes[i][2]; x++) {
                for(let y = boxes[i][1]; y < boxes[i][3]; y++) {
                    this.setPixel(result, x, y, this.blurPixel(imageData, x, y, this.kernelSize));
                }
            }
        }

        // Return the result
        return result;
    }

    // This method gets the RGB values from a pixel in an ImageData object
    // It takes the ImageData object, as well as an x and y coordinate for the pixel
    // It returns the RGB values as an array of three numbers
    private getPixel(imageData: ImageData, x: number, y: number): [number, number, number] {
        // An array of three numbers is created and initialized as three zeros. This will eventually be returned
        let rgb: [number, number, number] = [0, 0, 0];
        // The width and height of the ImageData object
        let width: number = imageData.width;
        let height: number = imageData.height;

        // These while loops ensure that the x and y values are within the bounds of the image
        // If the x or y value is out of bounds, the value will be looped over to the other end of the image
        while(x < 0) {
            x += width;
        }

        while(x > (width - 1)) {
            x -= width;
        }

        while(y < 0) {
            y += height;
        }

        while(y > (height - 1)) {
            y -= height;
        }

        // The ImageData object contains the RGBA values of the pixels as a one-dimensional array of numbers between 0 and 255
        // The red channel value of the pixel at (x,y) can be found with this formula: (y * width * 4) + (x * 4)
        // The green channel is immediately after the red channel, and the blue channel is immediately after that
        let redChannelIndex = (y * width * 4) + (x * 4);
        let greenChannelIndex = redChannelIndex + 1;
        let blueChannelIndex = redChannelIndex + 2;

        // The red, green, and blue channel values are retrieved from the ImageData object and added to the array
        rgb[0] = imageData.data[redChannelIndex];
        rgb[1] = imageData.data[greenChannelIndex];
        rgb[2] = imageData.data[blueChannelIndex];

        // The array is returned
        return rgb;
    }

    // This method sets the RGB values of a pixel in an ImageData object
    // It takes the ImageData object, as well as an x and y coordinate for the pixel, and the RGB values as an array of three numbers
    private setPixel(imageData: ImageData, x: number, y: number, rgb: [number, number, number]) {
        // The width of the ImageData object
        let width: number = imageData.width;
        // The ImageData object contains the RGBA values of the pixels as a one-dimensional array of numbers between 0 and 255
        // The red, green and blue channel values can be found the same way they are found in the getPixel method
        let redChannelIndex = (y * width * 4) + (x * 4);

        // The red, green and blue channel values in the ImageData object are set to the input values
        imageData.data[redChannelIndex]     = rgb[0];
        imageData.data[redChannelIndex + 1] = rgb[1];
        imageData.data[redChannelIndex + 2] = rgb[2];


    }

    // Blur a single pixel
    // Takes the image as an ImageData object, the x and y values of the pixel to be blurred
    // Returns the RGB values of the blurred pixel as an array of numbers
    // It works by taking the average of the RGB values of all the pixels in the kernel, a square group of pixels with the pixel to be blurred at the center
    private blurPixel(imageData: ImageData, x: number, y: number, kernelSize: number): [number, number, number] {
        // Variables to store the total RGB values of the pixels in the pixel group
        let redTotal   = 0;
        let greenTotal = 0;
        let blueTotal  = 0;
        // An array to store the to result of the blur operation. This will be the rturn value
        let result: [number, number, number] = [0, 0, 0];

        // The RGB values of the pixel to be blurred along with all of its neighbors in the kernel are added to the pixelGroup array
        for(let i = -1*Math.floor(kernelSize/2); i <= Math.floor(kernelSize/2); i++) {
            for(let j = -1*Math.floor(kernelSize/2); j <= Math.floor(kernelSize/2); j++) {
                redTotal += this.getPixel(imageData, x + i, y + j)[0];
                greenTotal += this.getPixel(imageData, x + i, y + j)[1];
                blueTotal += this.getPixel(imageData, x + i, y + j)[2];
            }
        }

        // Divide RGB values by the number of pixels in the group and put them in the result array
        result[0] = redTotal   / (kernelSize ** 2);
        result[1] = greenTotal / (kernelSize ** 2);
        result[2] = blueTotal  / (kernelSize ** 2);

        // Return the result array
        return result;
    }

    // Pixelate a region of an image within a bounding box
    // Takes the image to be blurred as an ImageData object, as well as the x and y values of the corners of the bounding box
    // Returns the result as an ImageData object
    public pixelateBoundingBox(imageData: ImageData, x1: number, y1: number, x2: number, y2: number): ImageData {
        // The imageData field is duplicated. This duplicate will be modified and returned
        let result = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
        // The x2 and y2 values are constrained to be within the bounds of the image
        x2 = x2 > imageData.width - 1 ? imageData.width - 1 : x2;
        y2 = y2 > imageData.height - 1 ? imageData.height - 1 : y2;
        // These variables store the width and height of the bounding box
        let boxWidth = x2 - x1;
        let boxHeight = y2 - y1;

        // These for loops mathematically divide the bounding box into a grid with squares the size of the kernel
        // The iterators are set to the x and y values of the pixel in the center of each grid space
        // Each iteration selects the center pixel of the next grid space
        for(let x = x1 + Math.ceil(this.kernelSize / 2); x < boxWidth + x1; x+=this.kernelSize) {
            for(let y = y1 + Math.ceil(this.kernelSize / 2); y < boxHeight + y1; y+=this.kernelSize) {
                // The RGB values of the current pixel are selected
                let currentPixel = this.getPixel(imageData, x, y);

                // The RGB values of every pixel in the grid space are set to that of the current pixel
                for(let i = -1*Math.floor(this.kernelSize / 2); i <= Math.floor(this.kernelSize); i++) {
                    for(let j = -1*Math.floor(this.kernelSize / 2); j <= Math.floor(this.kernelSize); j++) {
                        if(x + i >= x1 && y + j >= y1 && x + i <= x2 && y + j <= y2) {
                            this.setPixel(result, x + i, y + j, currentPixel);
                        }
                    }
                }

            }
        }

        // The result image is returned
        return result;
    }



}