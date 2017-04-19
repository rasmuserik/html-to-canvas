

// ## Main function with example.
//
let main = (() => {
  var _ref = _asyncToGenerator(function* () {
    let imgSrc = yield html2png('<h1>Image generated from html</h1>', { height: 100 });
    let canvasElem = yield html2canvas('<h1>Canvas from html</h1>', { height: 100 });

    window.app.innerHTML = `<img src="${imgSrc}">`;
    window.app.appendChild(canvasElem);
  });

  return function main() {
    return _ref.apply(this, arguments);
  };
})();

// ## Utility for loading an image

// ## Code for drawing the html to a canvas

let drawHtml = (() => {
  var _ref2 = _asyncToGenerator(function* (canvas, html, opt) {
    opt = opt || {};
    let w = opt.width || 320;
    let h = opt.height || 480;
    let dw = opt.deviceWidth || w;

    let svgImg = yield loadImage(`data:image/svg+xml;utf8,` + `<svg xmlns="http://www.w3.org/2000/svg"
            width="${w}"
            height="${h}" transform="scale(${w / 320})">
         <foreignObject width="${dw}" height="${h * dw / w}">
            <div id="thumbnail-html" xmlns="http://www.w3.org/1999/xhtml">
            ${html}
            </div>
         </foreignObject>
       </svg>`);
    canvas.getContext('2d').drawImage(svgImg, 0, 0);
  });

  return function drawHtml(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
})();

// ## Create a new canvas

let html2canvas = (() => {
  var _ref3 = _asyncToGenerator(function* (html, opt) {
    opt = opt || {};

    let canvas = document.createElement('canvas');
    canvas.width = opt.width || 320;
    canvas.height = opt.height || 480;
    yield drawHtml(canvas, html, opt);
    return canvas;
  });

  return function html2canvas(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
})();

// ## Create a new dataurl


let html2png = (() => {
  var _ref4 = _asyncToGenerator(function* (html, opt) {
    let canvas = yield html2canvas(html, opt);
    return canvas.toDataURL("image/png");
  });

  return function html2png(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// # Draw html to canvas
//
// Utility for making image files, or writing html to canvas.
//
// Notice: it works by rendering the html as a svg foreignObject, so the html has to be valid xhtml, and all resources have to be inlined. 
//

module.exports = { drawHtml, html2canvas, html2png, main };let loadImage = src => new Promise(function (resolve, reject) {
  var img = new Image();
  img.src = src;
  img.onload = function () {
    resolve(img);
  };
  img.onerror = reject;
});
