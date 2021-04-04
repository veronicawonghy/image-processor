(function(imageproc) {
    "use strict";

    /*
     * Apply negation to the input data
     */
    imageproc.negation = function(inputData, outputData) {
        console.log("Applying negation...");

        for (var i = 0; i < inputData.data.length; i += 4) {
            outputData.data[i]     = 255 - inputData.data[i];
            outputData.data[i + 1] = 255 - inputData.data[i + 1];
            outputData.data[i + 2] = 255 - inputData.data[i + 2];
        }
    }

    /*
     * Convert the input data to grayscale
     */
    imageproc.grayscale = function(inputData, outputData) {
        console.log("Applying grayscale...");

        /**
         * TODO: You need to create the grayscale operation here
         */
        // simple average
        for (var i = 0; i < inputData.data.length; i += 4) {
            // Find the grayscale value using simple averaging
            var intensity = (inputData.data[i]+inputData.data[i+1]+inputData.data[i+2])/3;
            // Change the RGB components to the resulting value

            outputData.data[i]     = intensity;
            outputData.data[i + 1] = intensity;
            outputData.data[i + 2] = intensity;
        }

        // maximum 
        // for (var i = 0; i < inputData.data.length; i += 4) {
        //     // Find the grayscale value using simple averaging
        //     var intensity = Math.max(inputData.data[i],inputData.data[i+1],inputData.data[i+2]);
        //     // Change the RGB components to the resulting value

        //     outputData.data[i]     = intensity;
        //     outputData.data[i + 1] = intensity;
        //     outputData.data[i + 2] = intensity;
        // }

        // luminance 
        // for (var i = 0; i < inputData.data.length; i += 4) {
        //     // Find the grayscale value using simple averaging
        //     var intensity = 0.2126*inputData.data[i]+ 0.7152*inputData.data[i+1]+0.0722*inputData.data[i+2];
        //     // Change the RGB components to the resulting value

        //     outputData.data[i]     = intensity;
        //     outputData.data[i + 1] = intensity;
        //     outputData.data[i + 2] = intensity;
        // }
    }

    /*
     * Applying brightness to the input data
     */
    imageproc.brightness = function(inputData, outputData, offset) {
        console.log("Applying brightness...");

        /**
         * TODO: You need to create the brightness operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Change the RGB components by adding an offset
            // Handle clipping of the RGB components
            outputData.data[i]     = inputData.data[i] + offset > 255? 255 : inputData.data[i] + offset < 0? 0 : inputData.data[i] + offset;
            outputData.data[i + 1] = inputData.data[i + 1] + offset > 255? 255 : inputData.data[i + 1] + offset < 0 ? 0 : inputData.data[i + 1] + offset;
            outputData.data[i + 2] = inputData.data[i + 2] + offset > 255? 255 : inputData.data[i + 2] + offset < 0 ? 0 : inputData.data[i + 2] + offset;
        }
    }

    /*
     * Applying contrast to the input data
     */
    imageproc.contrast = function(inputData, outputData, factor) {
        console.log("Applying contrast...");

        /**
         * TODO: You need to create the brightness operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Change the RGB components by multiplying a factor
            // Handle clipping of the RGB components

            outputData.data[i]     = inputData.data[i] * factor > 255? 255 : inputData.data[i] * factor < 0? 0 : inputData.data[i] * factor;
            outputData.data[i + 1] = inputData.data[i + 1] * factor > 255? 255 : inputData.data[i + 1] * factor < 0 ? 0 : inputData.data[i + 1] * factor;
            outputData.data[i + 2] = inputData.data[i + 2] * factor > 255? 255 : inputData.data[i + 2] * factor < 0 ? 0 : inputData.data[i + 2] * factor;

        }
    }

    /*
     * Make a bit mask based on the number of MSB required
     */
    function makeBitMask(bits) {
        var mask = 0;
        for (var i = 0; i < bits; i++) {
            mask >>= 1;
            mask |= 128;
        }
        return mask;
    }

    /*
     * Apply posterization to the input data
     */
    imageproc.posterization = function(inputData, outputData,
                                       redBits, greenBits, blueBits) {
        console.log("Applying posterization...");

        /**
         * TODO: You need to create the posterization operation here
         */

        // Create the red, green and blue masks
        // A function makeBitMask() is already given

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Apply the bitmasks onto the RGB channels

            outputData.data[i]     = inputData.data[i] & makeBitMask(redBits);
            outputData.data[i + 1] = inputData.data[i + 1] & makeBitMask(greenBits);
            outputData.data[i + 2] = inputData.data[i + 2] & makeBitMask(blueBits);
        }
    }

    /*
     * Apply threshold to the input data
     */
    imageproc.threshold = function(inputData, outputData, thresholdValue) {
        console.log("Applying thresholding...");

        /**
         * TODO: You need to create the thresholding operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Find the grayscale value using simple averaging
            // You will apply thresholding on the grayscale value
            var grayscaleValue = (inputData.data[i]+inputData.data[i+1]+inputData.data[i+2])/3;
           
            // Change the colour to black or white based on the given threshold
            if(grayscaleValue > thresholdValue){
                outputData.data[i]     = 255;
                outputData.data[i + 1] = 255;
                outputData.data[i + 2] = 255;
            } else{
                outputData.data[i]     = 0;
                outputData.data[i + 1] = 0;
                outputData.data[i + 2] = 0;
            }
        }
    }

    /*
     * Build the histogram of the image for a channel
     */
    function buildHistogram(inputData, channel) {
        var histogram = [];
        for (var i = 0; i < 256; i++)
            histogram[i] = 0;

        /**
         * TODO: You need to build the histogram here
         */

        // Accumulate the histogram based on the input channel
        // The input channel can be:
        // "red"   - building a histogram for the red component
        // "green" - building a histogram for the green component
        // "blue"  - building a histogram for the blue component
        // "gray"  - building a histogram for the intensity
        //           (using simple averaging)
        for (var i=0; i < inputData.data.length; i+=4){
            switch(channel){
                case "red":
                    histogram[inputData.data[i]] += 1;
                    break;
                case "green":
                    histogram[inputData.data[i+1]] += 1;
                    break;
                case "blue":
                    histogram[inputData.data[i+2]] += 1;
                    break;
                case "gray":
                    var intensity = Math.round( (inputData.data[i] + inputData.data[i+1] + inputData.data[i+2]) / 3);
                    histogram[intensity] += 1;
                    break;
            }
        }

        return histogram;
    }

    /*
     * Find the min and max of the histogram
     */
    function findMinMax(histogram, pixelsToIgnore) {
        var min = 0, max = 255;

        /**
         * TODO: You need to build the histogram here
         */
        // Find the minimum in the histogram with non-zero value by
        // ignoring the number of pixels given by pixelsToIgnore
        for (var total = 0; min < 255; min++) {
            total += histogram[min]
            if (total <= pixelsToIgnore) continue;
            if (histogram[min] > 0) break;
        }
        // Find the maximum in the histogram with non-zero value by
        // ignoring the number of pixels given by pixelsToIgnore
        for (var total = 0; max>=0; max--) {
            total += histogram[max]
            if (total <= pixelsToIgnore) continue;
            if (histogram[max] > 0) break;
        }

        console.log({"min": min, "max": max});
        return {"min": min, "max": max};
    }

    /*
     * Apply automatic contrast to the input data
     */
    imageproc.autoContrast = function(inputData, outputData, type, percentage) {
        console.log("Applying automatic contrast...");

        // Find the number of pixels to ignore from the percentage
        var pixelsToIgnore = (inputData.data.length / 4) * percentage;

        var histogram, minMax;
        if (type == "gray") {
            // Build the grayscale histogram
            histogram = buildHistogram(inputData, "gray");
            console.log(histogram.slice(0, 10).join(","));
            // Find the minimum and maximum grayscale values with non-zero pixels
            minMax = findMinMax(histogram, pixelsToIgnore);

            var min = minMax.min, max = minMax.max, range = max - min;

            /**
             * TODO: You need to apply the correct adjustment to each pixel
             */

            for (var i = 0; i < inputData.data.length; i += 4) {
                // Adjust each pixel based on the minimum and maximum values

                outputData.data[i]     = (inputData.data[i] - min) / range * 255;
                outputData.data[i + 1] = (inputData.data[i + 1] - min) / range * 255;
                outputData.data[i + 2] = (inputData.data[i + 2] - min) / range * 255;
                
                // Handle clipping
                
                if (outputData.data[i] > 255) outputData.data[i] = 255;
                else if (outputData.data[i] < 0) outputData.data[i] = 0;
                if (outputData.data[i+1] > 255) outputData.data[i+1] = 255;
                else if (outputData.data[i+1] < 0) outputData.data[i+1] = 0;
                if (outputData.data[i+2] > 255) outputData.data[i+2] = 255;
                else if (outputData.data[i+2] < 0) outputData.data[i+2] = 0;

            }
        }
        else {

            /**
             * TODO: You need to apply the same procedure for each RGB channel
             *       based on what you have done for the grayscale version
             */

            // Build the histogram for RGB
            var RHistogram = buildHistogram(inputData, "red");
            var GHistogram = buildHistogram(inputData, "green");
            var BHistogram = buildHistogram(inputData, "blue");

            // Find the minimum and maximum grayscale values with non-zero pixels
            var RMinMax = findMinMax(RHistogram, pixelsToIgnore);
            var GMinMax = findMinMax(GHistogram, pixelsToIgnore);
            var BMinMax = findMinMax(BHistogram, pixelsToIgnore);

            var RRange = RMinMax.max - RMinMax.min;
            var GRange = GMinMax.max - GMinMax.min;
            var BRange = BMinMax.max - BMinMax.min;


            for (var i = 0; i < inputData.data.length; i += 4) {
                // Adjust each channel based on the histogram of each one

                outputData.data[i]     = (inputData.data[i] - RMinMax.min) / RRange * 255;
                outputData.data[i + 1] = (inputData.data[i + 1] - GMinMax.min) / GRange * 255;
                outputData.data[i + 2] = (inputData.data[i + 2] - BMinMax.min) / BRange * 255;
            }
            
            // Handle clipping

            if (outputData.data[i] > 255) outputData.data[i] = 255;
            else if (outputData.data[i] < 0) outputData.data[i] = 0;
            if (outputData.data[i+1] > 255) outputData.data[i+1] = 255;
            else if (outputData.data[i+1] < 0) outputData.data[i+1] = 0;
            if (outputData.data[i+2] > 255) outputData.data[i+2] = 255;
            else if (outputData.data[i+2] < 0) outputData.data[i+2] = 0;
        }
    }

}(window.imageproc = window.imageproc || {}));
