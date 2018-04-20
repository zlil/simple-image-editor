'use strict'

const fs = require("fs");
const sharp = require('sharp');
const download = require('image-downloader');

async function generatePicture({color, coordinateX, coordinateY, fontSize, textToAppend, url}) {

    //await downloadIMG({url: url, dest: 'sourceImage.png'})
    try {
        await download.image({url: url, dest: 'sourceImage.png'})
        let result = await sharpen('sourceImage.png', color, coordinateX, coordinateY, fontSize, textToAppend)
        return result
    } catch (e) {
        throw e
    }

}

async function sharpen(image, color, coordinateX, coordinateY, fontSize, textToAppend) {
    const svg = `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="800px" height="430px" viewBox="0 0 363 373" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs></defs>
    <g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <text id="text" fill="${color}"

        style="font-style: normal; font-variant: normal; font-weight: bold; font-stretch: normal; font-size: ${fontSize}px; line-height: 125%; font-family: 'Open Sans Hebrew'; -inkscape-font-specification: 'Open Sans Hebrew Bold'; text-align: center; letter-spacing: 0px; word-spacing: 0px; writing-mode: lr-tb; text-anchor: middle; fill: ${color}; fill-opacity: 1; stroke: none;"


        >
             <tspan x="170" y="340">${textToAppend}</tspan>
        </text>
    </g>
</svg>
`.trim();
    try {
        let result = (await sharp(image)
            .resize(800, 430)
            .overlayWith(Buffer.from(svg), {top: parseInt(coordinateY), left: parseInt(coordinateX)})
            .jpeg()
            .toFile('./newImage.jpg'));

        let bitmap = await fs.readFileSync('./newImage.jpg');
        // convert binary data to base64 encoded string
        let buffer =  new Buffer(bitmap).toString('base64');
        return buffer

    }catch (e) {
        throw `400 ${e.message}`;
    }
}

module.exports = {generatePicture}
