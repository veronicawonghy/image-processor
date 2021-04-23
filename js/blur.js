(function(imageproc) {
    "use strict";

    /*
     * Apply blur to the input data
     */
    imageproc.blur = function(inputData, outputData, kernelSize) {
        console.log("Applying blur...");

        // You are given a 3x3 kernel but you need to create a proper kernel
        // using the given kernel size
        var kernel, halfKernelSize;
        switch(kernelSize){
            case 3:
                kernel = [ [1, 1, 1], [1, 1, 1], [1, 1, 1] ];
                halfKernelSize = 1;
                break;
            case 5:
                kernel = [ [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1] ];
                halfKernelSize = 2;
                break;
            case 7:
                kernel = [ [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1] ];
                halfKernelSize = 3;
                break;
            case 9:
                kernel = [ [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1] ];
                halfKernelSize = 4;
                break;
        }

        /**
         * TODO: You need to extend the blur effect to include different
         * kernel sizes and then apply the kernel to the entire image
         */

        // Apply the kernel to the whole image
        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                var sumR = 0, sumG = 0, sumB = 0;

                for (var j = -1 * halfKernelSize; j <= halfKernelSize; j++) {
                    for (var i = -1 * halfKernelSize; i <= halfKernelSize; i++) {
                        // Use imageproc.getPixel() to get the pixel values
                        // over the kernel
                        var pixel = imageproc.getPixel(inputData,x + i, y + j);
                        //...multiply the pixels (x + i, y + j) with the coefficients...
                        var coefficient = kernel[j + halfKernelSize][i + halfKernelSize];

                        sumR += pixel.r * coefficient;
                        sumG += pixel.g * coefficient;
                        sumB += pixel.b * coefficient;

                    }
                }
                // Then set the blurred result to the output data
                
                var i = (x + y * outputData.width) * 4;
                outputData.data[i]     = sumR / (kernelSize * kernelSize);
                outputData.data[i + 1] = sumG / (kernelSize * kernelSize);
                outputData.data[i + 2] = sumB / (kernelSize * kernelSize);
            }
        }
    } 

}(window.imageproc = window.imageproc || {}));
