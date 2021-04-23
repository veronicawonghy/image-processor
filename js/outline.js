(function(imageproc) {
    "use strict";

    /*
     * Apply sobel edge to the input data
     */
    imageproc.sobelEdge = function(inputData, outputData, threshold) {
        console.log("Applying Sobel edge detection...");

        /* Initialize the two edge kernel Gx and Gy */
        var Gx = [
            [-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]
        ];
        var Gy = [
            [-1,-2,-1],
            [ 0, 0, 0],
            [ 1, 2, 1]
        ];

        /**
         * TODO: You need to write the code to apply
         * the two edge kernels appropriately
         */
        
        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                var RxSum = 0, GxSum = 0, BxSum = 0;

                for (var j = -1; j <= 1; j++) {
                    for (var i = -1; i <= 1; i++) {
                        // Use imageproc.getPixel() to get the pixel values
                        // over the kernel
                        var pixel = imageproc.getPixel(inputData,x + i, y + j);
                        //...multiply the pixels (x + i, y + j) with the coefficients...
                        var coefficient = Gx[j+1][i+1];

                        RxSum += pixel.r * coefficient;
                        GxSum += pixel.g * coefficient;
                        BxSum += pixel.b * coefficient;
                    }
                }
                
                var RySum = 0, GySum = 0, BySum = 0;

                for (var j = -1; j <= 1; j++) {
                    for (var i = -1; i <= 1; i++) {
                        // Use imageproc.getPixel() to get the pixel values
                        // over the kernel
                        var pixel = imageproc.getPixel(inputData,x + i, y + j);
                        //...multiply the pixels (x + i, y + j) with the coefficients...
                        var coefficient = Gy[j+1][i+1];

                        RySum += pixel.r * coefficient;
                        GySum += pixel.g * coefficient;
                        BySum += pixel.b * coefficient;
                    }
                }

                var grayscaleX = (RxSum + GxSum + BxSum) / 3;
                var grayscaleY = (RySum + GySum + BySum) / 3;
                var grayscale = Math.hypot(grayscaleX, grayscaleY);

                var i = (x + y * outputData.width) * 4;
                outputData.data[i]     = 
                outputData.data[i + 1] = 
                outputData.data[i + 2] = (grayscale < threshold)? 0 : 255;
            }
        }
    } 

}(window.imageproc = window.imageproc || {}));
