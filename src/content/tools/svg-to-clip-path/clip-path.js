/**
 * This script isn't intended to be used in the site.
 * 
 * Add this file to scripts.js before use.
 * 
 * It can generate a css polygon property scaled from 0 to 100% by getting the polygon values here: https://path-to-points.netlify.app/
 * 
 * Simply replace the variable polygonString with the results from the previously mentioned site and check the console on the drupal site. 
 * Then copy and paste into CSS! 
 */



let files = document.querySelector('#svgFile');
let form = document.querySelector('form')

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const paths = await getSVGPaths(files.files);
  const steps = document.querySelector('#numberOfPoints').value ? document.querySelector('#numberOfPoints').value : 50

  // current problem: convertSVGPathToPoints returns numbers in percentages.
  const points = convertSvgPathToPoints(paths, steps);

  const cssPolygonValue = generateClipPath(points)

  // const aspectRatio = generateAspectRatio(points);

  document.querySelector('.output .code').innerHTML = cssPolygonValue
  // document.querySelector('.output .aspect-ratio').innerHTML = aspectRatio

  // TODO: Add uploaded element to display on DOM
  // TODO: Nicely output polygon code
  // TODO: Calculate aspect ratio to go with it
  let img = document.querySelector('.output img');

  img.src = files.files[0].name
});


function getSVGPaths(files) {
  // example from https://stackoverflow.com/questions/55943199/easiest-way-to-get-path-tag-from-user-uploaded-svg

  return new Promise(resolve => {
    const reader = new FileReader();
  
    reader.onload = async function (e) {
      var svgData = e.target.result;
      var parser = new DOMParser();
      var doc = parser.parseFromString(svgData, "image/svg+xml");
      var pathTags = doc.getElementsByTagName("path");
  
      resolve(pathTags)
    }
  
    reader.readAsText(files[0]);
  });
}


function convertSvgPathToPoints(paths, steps) {
  const path = paths[0];
  const len = path.getTotalLength();
  const points = [];

  for (var i = 0; i < steps; i++) {
    var pt = path.getPointAtLength(i * len / (steps - 1));
    points.push([pt.x, pt.y]);
  }

  return points;
}


function getScaledValue(value, sourceRangeMin, sourceRangeMax, targetRangeMin, targetRangeMax) {
  var targetRange = targetRangeMax - targetRangeMin;
  var sourceRange = sourceRangeMax - sourceRangeMin;
  return (value - sourceRangeMin) * targetRange / sourceRange + targetRangeMin;
}

function generateClipPath(coordinates) {
  let rawNumbersX = [], rawNumbersY = [], largestX, largestY, smallestX, smallestY, clipPath = '';

  // Generate array of numbers to find the largest and smallest values
  coordinates.forEach(array => {
    rawNumbersX.push(array[0]);
    rawNumbersY.push(array[1]);
  });

  largestX = Math.max.apply(0, rawNumbersX);
  largestY = Math.max.apply(0, rawNumbersY);
  smallestX = Math.min.apply(0, rawNumbersX);
  smallestY = Math.min.apply(0, rawNumbersY);

  // Create array of values scaled down between 0 and 100
  coordinates.forEach((coordinate, i) => {
    let scaledX = getScaledValue(coordinate[0], smallestX, largestX, 0, 100).toFixed(4) + '%';
    let scaledY = getScaledValue(coordinate[1], smallestY, largestY, 0, 100).toFixed(4) + '%';
    coordinates[i] = [scaledX, scaledY];
  });

  // turn converted coordinates into string
  for(let i=0; i < coordinates.length; i++) {
    if(i < coordinates.length -1) {
      clipPath += `${coordinates[i][0]} ${coordinates[i][1]}, `
    } else {
      clipPath += `${coordinates[i][0]} ${coordinates[i][1]}`
    }
  }

  // Convert string into polygon CSS property
  clipPath = `clip-path: polygon(${clipPath});`;

  return clipPath;
}

function generateAspectRatio(coordinates) {
  const rawNumbersX = [], rawNumbersY = [];
  let largestX, largestY;

  coordinates.forEach(array => {
    let x = Number(array[0].replace('%', ''));
    let y = Number(array[1].replace('%', ''));

    
    rawNumbersX.push(x);
    rawNumbersY.push(y);
  });
  
  largestX = Math.max.apply(0, rawNumbersX);
  largestY = Math.max.apply(0, rawNumbersY);

  let aspectRatio = `aspect-ratio: ${largestX} / ${largestY}`

  return aspectRatio
}