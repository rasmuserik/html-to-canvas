

// ## Main function with example.
//
let main = (() => {
  var _ref = _asyncToGenerator(function* () {
    let imgSrc = yield html2png('<h3>Demo: Image generated from html</h3>', { height: 100, width: 200 });
    let canvasElem = yield html2canvas('<em>Demo: Canvas from html</em>', { height: 100, width: 100 });

    window.app.innerHTML = `<img src="${imgSrc}">`;
    window.app.appendChild(canvasElem);
  });

  return function main() {
    return _ref.apply(this, arguments);
  };
})();

// ## Create a new png dataurl
//
// options: 
//
// - `width`, `height` - size of image/canvas
// - `deviceWidth` - virtual width of rendered html document
//
// implementation:

let html2png = (() => {
  var _ref2 = _asyncToGenerator(function* (html, opt) {
    let canvas = yield html2canvas(html, opt);
    return canvas.toDataURL("image/png");
  });

  return function html2png(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
})();

// ## Create a new jpg dataurl
//
// options: 
//
// - `width`, `height` - size of image/canvas
// - `deviceWidth` - virtual width of rendered html document
//
// implementation:

let html2jpg = (() => {
  var _ref3 = _asyncToGenerator(function* (html, opt) {
    let canvas = yield html2canvas(html, opt);
    return canvas.toDataURL("image/jpeg", opt.quality || 0.95);
  });

  return function html2jpg(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
})();

// ## Create a new canvas

let html2canvas = (() => {
  var _ref4 = _asyncToGenerator(function* (html, opt) {
    opt = opt || {};

    let canvas = document.createElement('canvas');
    canvas.width = opt.width || 320;
    canvas.height = opt.height || 480;
    yield drawHtml(canvas, html, opt);
    return canvas;
  });

  return function html2canvas(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
})();

// ## Code for drawing the html to a canvas

let drawHtml = (() => {
  var _ref5 = _asyncToGenerator(function* (canvas, html, opt) {
    opt = opt || {};
    let w = opt.width || 320;
    let h = opt.height || 480;
    let dw = opt.deviceWidth || w;

    let svgImg = yield loadImage(`data:image/svg+xml;utf8,` + `<svg xmlns="http://www.w3.org/2000/svg"
            width="${w}"
            height="${h}" transform="scale(${w / dw})">
         <foreignObject width="${dw}" height="${h * dw / w}">
            <div id="thumbnail-html" xmlns="http://www.w3.org/1999/xhtml">
            ${html}
            </div>
         </foreignObject>
       </svg>`);
    canvas.getContext('2d').drawImage(svgImg, 0, 0);
  });

  return function drawHtml(_x7, _x8, _x9) {
    return _ref5.apply(this, arguments);
  };
})();

// ## Utility for loading an image

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// # Draw html to canvas
//
// Utility for making image files, or writing html to canvas.
//
// Notice: it works by rendering the html as a svg foreignObject, so the html has to be valid xhtml, and all resources have to be inlined. 
//

module.exports = { drawHtml, html2canvas, html2png, html2jpg, main };let loadImage = src => new Promise(function (resolve, reject) {
  var img = new Image();
  img.src = src;
  img.onload = function () {
    resolve(img);
  };
  img.onerror = reject;
});
