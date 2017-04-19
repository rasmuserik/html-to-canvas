// # Draw html to canvas
//
// Utility for making image files, or writing html to canvas.
//
// Notice: it works by rendering the html as a svg foreignObject, so the html has to be valid xhtml, and all resources have to be inlined. 
//

module.exports = { drawHtml, html2canvas, html2png, main }

// ## Main function with example.
//
async function main() {
  let imgSrc = await 
    html2png('<h3>Demo: Image generated from html</h3>', 
      {height: 100, width: 200});
  let canvasElem = await 
    html2canvas('<em>Demo: Canvas from html</em>', 
      {height:100, width: 100});

  window.app.innerHTML = `<img src="${imgSrc}">`;
  window.app.appendChild(canvasElem);
}

// ## Create a new dataurl
//
// options: 
//
// - `width`, `height` - size of image/canvas
// - `deviceWidth` - virtual width of rendered html document
//
async function html2png(html, opt) {
  let canvas = await html2canvas(html, opt);
  return canvas.toDataURL("image/png");
}
// ## Create a new canvas

async function html2canvas(html, opt) {
  opt = opt || {};

  let canvas = document.createElement('canvas');
  canvas.width = opt.width || 320;
  canvas.height = opt.height || 480;
  await drawHtml(canvas, html, opt)
  return canvas;
}

// ## Code for drawing the html to a canvas

async function drawHtml(canvas, html, opt) {
  opt = opt || {};
  let w = opt.width || 320;
  let h = opt.height || 480;
  let dw = opt.deviceWidth || w;

  let svgImg = await loadImage(`data:image/svg+xml;utf8,` +
    `<svg xmlns="http://www.w3.org/2000/svg"
            width="${w}"
            height="${h}" transform="scale(${w/dw})">
         <foreignObject width="${dw}" height="${h*dw/w}">
            <div id="thumbnail-html" xmlns="http://www.w3.org/1999/xhtml">
            ${html}
            </div>
         </foreignObject>
       </svg>`);
  canvas.getContext('2d').drawImage(svgImg, 0, 0);
}

// ## Utility for loading an image

let loadImage = (src) => new Promise(function(resolve, reject) {
  var img = new Image();
  img.src = src;
  img.onload = function() { resolve(img); };
  img.onerror = reject;
});

