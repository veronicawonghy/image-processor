(function(imageproc) {
    "use strict";

    /*
     * Apply Kuwahara filter to the input data
     */
    imageproc.kuwahara = function(inputData, outputData, size) {
        console.log("Applying Kuwahara filter...");

        /*
         * TODO: You need to extend the kuwahara function to include different
         * sizes of the filter
         *
         * You need to clearly understand the following code to make
         * appropriate changes
         */
        var subregionSize, halfSubregionSize;
        switch(size){
            case 5:
                subregionSize = 3;
                halfSubregionSize = 1;
                break;
            case 9:
                subregionSize = 5;
                halfSubregionSize = 2;
                break;
            case 13:
                subregionSize = 7;
                halfSubregionSize = 3;
                break;
        }

        /*
         * An internal function to find the regional stat centred at (x, y)
         */
        function regionStat(x, y) {
            // Find the mean colour and brightness
            var meanR = 0, meanG = 0, meanB = 0;
            var meanValue = 0;
            for (var j = -1 * halfSubregionSize; j <= halfSubregionSize; j++) {
                for (var i = -1 * halfSubregionSize; i <= halfSubregionSize; i++) {
                    var pixel = imageproc.getPixel(inputData, x + i, y + j);

                    // For the mean colour
                    meanR += pixel.r;
                    meanG += pixel.g;
                    meanB += pixel.b;

                    // For the mean brightness
                    meanValue += (pixel.r + pixel.g + pixel.b) / 3;
                }
            }
            meanR /= (subregionSize * subregionSize);
            meanG /= (subregionSize * subregionSize);
            meanB /= (subregionSize * subregionSize);
            meanValue /= (subregionSize * subregionSize);

            // Find the variance
            var variance = 0;
            for (var j = -1 * halfSubregionSize; j <= halfSubregionSize; j++) {
                for (var i = -1 * halfSubregionSize; i <= halfSubregionSize; i++) {
                    var pixel = imageproc.getPixel(inputData, x + i, y + j);
                    var value = (pixel.r + pixel.g + pixel.b) / 3;

                    variance += Math.pow(value - meanValue, 2);
                }
            }
            variance /= (subregionSize * subregionSize);

            // Return the mean and variance as an object
            return {
                mean: {r: meanR, g: meanG, b: meanB},
                variance: variance
            };
        }

        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                // Find the statistics of the four sub-regions
                var regionA = regionStat(x - halfSubregionSize, y - halfSubregionSize, inputData);
                var regionB = regionStat(x + halfSubregionSize, y - halfSubregionSize, inputData);
                var regionC = regionStat(x - halfSubregionSize, y + halfSubregionSize, inputData);
                var regionD = regionStat(x + halfSubregionSize, y + halfSubregionSize, inputData);

                // Get the minimum variance value
                var minV = Math.min(regionA.variance, regionB.variance,
                                    regionC.variance, regionD.variance);

                var i = (x + y * inputData.width) * 4;

                // Put the mean colour of the region with the minimum
                // variance in the pixel
                switch (minV) {
                case regionA.variance:
                    outputData.data[i]     = regionA.mean.r;
                    outputData.data[i + 1] = regionA.mean.g;
                    outputData.data[i + 2] = regionA.mean.b;
                    break;
                case regionB.variance:
                    outputData.data[i]     = regionB.mean.r;
                    outputData.data[i + 1] = regionB.mean.g;
                    outputData.data[i + 2] = regionB.mean.b;
                    break;
                case regionC.variance:
                    outputData.data[i]     = regionC.mean.r;
                    outputData.data[i + 1] = regionC.mean.g;
                    outputData.data[i + 2] = regionC.mean.b;
                    break;
                case regionD.variance:
                    outputData.data[i]     = regionD.mean.r;
                    outputData.data[i + 1] = regionD.mean.g;
                    outputData.data[i + 2] = regionD.mean.b;
                }
            }
        }
    }
 
}(window.imageproc = window.imageproc || {}));
