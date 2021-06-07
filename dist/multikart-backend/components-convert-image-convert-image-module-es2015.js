(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-convert-image-convert-image-module"],{

/***/ "G5Jg":
/*!*********************************************************************!*\
  !*** ./src/app/components/convert-image/convert-image.component.ts ***!
  \*********************************************************************/
/*! exports provided: ConvertImageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConvertImageComponent", function() { return ConvertImageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ngx_dropzone_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-dropzone-wrapper */ "YpNe");



class ConvertImageComponent {
    constructor() {
        this.imageName = null;
        this.innerImageURL = "assets/images/Barcode1.PNG";
        this.selectedFile = null;
        this.config1 = {
            clickable: true,
            maxFiles: 1,
            autoReset: null,
            errorReset: null,
            cancelReset: null
        };
    }
    onUploadInit(args) { }
    onUploadError(args) { }
    onUploadSuccess(args) {
        this.selectedFile = args[0];
        localStorage.setItem('base64', args[0].dataURL);
        console.log(args[0]);
        var file = args[0];
        var c;
        var reader = new FileReader();
        reader.onload = function (event) {
            c = reader.result;
        };
        this.innerImageURL = c;
        this.updateFullMarkerImage();
        this.fullMarkerURL = args[0].dataURL;
        this.imageName = file.name;
        this.imageName = this.imageName.substring(0, this.imageName.lastIndexOf('.')) || this.imageName;
    }
    downloadImage() {
        var patternString = localStorage.getItem('markerUrl');
        var domElement = window.document.createElement('a');
        domElement.href = patternString;
        domElement.download = "pattern-" + (this.imageName || 'marker') + '.png';
        document.body.appendChild(domElement);
        domElement.click();
        document.body.removeChild(domElement);
        this.updateFullMarkerImage();
    }
    downloadPattern() {
        var patternString = localStorage.getItem('markerUrl');
        THREEx.ArPatternFile.encodeImageURL(patternString, function onComplete(patternFileString) {
            THREEx.ArPatternFile.triggerDownload(patternFileString, "pattern-marker.patt");
        });
        THREEx.ArPatternFile.triggerDownload = function (patternFileString, fileName = 'pattern-marker.patt') {
            // tech from https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
            var domElement = window.document.createElement('a');
            domElement.href = window.URL.createObjectURL(new Blob([patternFileString], { type: 'text/plain' }));
            domElement.download = fileName;
            document.body.appendChild(domElement);
            domElement.click();
            document.body.removeChild(domElement);
        };
    }
    updateFullMarkerImage() {
        THREEx.ArPatternFile.encodeImageURL = function (imageURL, onComplete) {
            var image = new Image;
            image.onload = function () {
                var patternFileString = THREEx.ArPatternFile.encodeImage(image);
                onComplete(patternFileString);
            };
            image.src = imageURL;
            return image;
        };
        THREEx.ArPatternFile.encodeImage = function (image) {
            // copy image on canvas
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            canvas.width = 16;
            canvas.height = 16;
            // document.body.appendChild(canvas)
            // canvas.style.width = '200px'
            var patternFileString = '';
            for (var orientation = 0; orientation > -2 * Math.PI; orientation -= Math.PI / 2) {
                // draw on canvas - honor orientation
                context.save();
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.translate(canvas.width / 2, canvas.height / 2);
                context.rotate(orientation);
                context.drawImage(image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
                context.restore();
                // get imageData
                var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                // generate the patternFileString for this orientation
                if (orientation !== 0)
                    patternFileString += '\n';
                // NOTE bgr order and not rgb!!! so from 2 to 0
                for (var channelOffset = 2; channelOffset >= 0; channelOffset--) {
                    // console.log('channelOffset', channelOffset)
                    for (var y = 0; y < imageData.height; y++) {
                        for (var x = 0; x < imageData.width; x++) {
                            if (x !== 0)
                                patternFileString += ' ';
                            var offset = (y * imageData.width * 4) + (x * 4) + channelOffset;
                            var value = imageData.data[offset];
                            patternFileString += String(value).padStart(3);
                        }
                        patternFileString += '\n';
                    }
                }
            }
            return patternFileString;
        };
        THREEx.ArPatternFile.buildFullMarker = function (innerImageURL, pattRatio, size, color, onComplete) {
            var whiteMargin = 0.1;
            var blackMargin = (1 - 2 * whiteMargin) * ((1 - pattRatio) / 2);
            // var blackMargin = 0.2
            var innerMargin = whiteMargin + blackMargin;
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            canvas.width = canvas.height = size;
            context.fillStyle = 'white';
            context.fillRect(0, 0, canvas.width, canvas.height);
            // copy image on canvas
            context.fillStyle = color;
            context.fillRect(whiteMargin * canvas.width, whiteMargin * canvas.height, canvas.width * (1 - 2 * whiteMargin), canvas.height * (1 - 2 * whiteMargin));
            // clear the area for innerImage (in case of transparent image)
            context.fillStyle = 'white';
            context.fillRect(innerMargin * canvas.width, innerMargin * canvas.height, canvas.width * (1 - 2 * innerMargin), canvas.height * (1 - 2 * innerMargin));
            // display innerImage in the middle
            var innerImage = document.createElement('img');
            innerImage.addEventListener('load', function () {
                // draw innerImage
                context.drawImage(innerImage, innerMargin * canvas.width, innerMargin * canvas.height, canvas.width * (1 - 2 * innerMargin), canvas.height * (1 - 2 * innerMargin));
                var imageUrl = canvas.toDataURL();
                onComplete(imageUrl);
            });
            innerImage.src = innerImageURL;
        };
        var patternRatio = document.querySelector('#patternRatioSlider');
        var imageSize = document.querySelector('#imageSize');
        var borderColor = document.querySelector('#borderColor').nodeValue;
        this.innerImageURL = localStorage.getItem('base64');
        function hexaColor(color) {
            return /^#[0-9A-F]{6}$/i.test(color);
        }
        ;
        THREEx.ArPatternFile.buildFullMarker(this.innerImageURL, 0.50, 512, "black", function onComplete(markerUrl) {
            if (markerUrl) {
                localStorage.setItem('markerUrl', markerUrl);
            }
            console.log(markerUrl);
            var fullMarkerImage = document.createElement('img');
            fullMarkerImage.src = markerUrl;
            // put fullMarkerImage into #imageContainer
            var container = document.querySelector('#imageContainer');
            while (container.firstChild)
                container.removeChild(container.firstChild);
            container.appendChild(fullMarkerImage);
        });
        var s = new Option().style;
        s.color = borderColor;
        if (borderColor === '' || (s.color != borderColor && !hexaColor(borderColor))) {
            // if color not valid, use black
            borderColor = 'black';
        }
    }
    ngOnInit() {
        this.updateFullMarkerImage();
    }
}
ConvertImageComponent.ɵfac = function ConvertImageComponent_Factory(t) { return new (t || ConvertImageComponent)(); };
ConvertImageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ConvertImageComponent, selectors: [["app-convert-image"]], decls: 69, vars: 1, consts: [["rel", "stylesheet", "href", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtrustConstantResourceUrl"]("https://fonts.googleapis.com/icon?family=Material+Icons")], ["rel", "stylesheet", "href", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtrustConstantResourceUrl"]("https://code.getmdl.io/1.3.0/material.indigo-pink.min.css")], ["href", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtrustConstantResourceUrl"]("https://fonts.googleapis.com/icon?family=Material+Icons"), "rel", "stylesheet"], ["id", "topRightButtons"], ["id", "show-info", 1, "mdl-button", "mdl-js-button", "mdl-button--fab", "mdl-button--colored"], [1, "material-icons"], ["id", "dialog-info", 1, "mdl-dialog", 2, "width", "400px"], [1, "mdl-dialog__title"], [1, "mdl-dialog__content"], ["target", "_blank", "href", "https://artoolkit.org/documentation/doku.php?id=3_Marker_Training:marker_training"], [1, "mdl-dialog__actions"], ["type", "button", 1, "mdl-button"], [1, "mdl-grid"], [1, "mdl-cell", "mdl-cell--4-col"], [1, "card-body", "dropzone-custom", "p-0"], [1, "dropzone", "dropzone-primary", 3, "dropzone", "error", "success"], [1, "dz-message", "needsclick"], [1, "fa", "fa-cloud-upload"], [1, "mb-0", "f-w-600"], ["for", "buttonUpload", 1, "mdl-tooltip"], [1, "mdl-grid", 2, "justify-content", "center"], [1, "mdl-cell", "mdl-cell--12-col"], ["for", "patternRatioSlider", 1, "mdl-js-ripple-effect"], [1, ""], ["id", "patternRatioSlider", "type", "range", "min", "10", "max", "90", "value", "50", 1, "mdl-slider", "mdl-js-slider"], ["for", "patternRatioSlider", 1, "mdl-tooltip"], ["for", "imageSize", 1, "mdl-js-ripple-effect"], ["id", "imageSize", "type", "range", "min", "150", "max", "2500", "value", "512", 1, "mdl-slider", "mdl-js-slider"], ["for", "borderColor", 1, "mdl-js-ripple-effect"], ["id", "borderColor", "type", "text", "value", "black"], ["for", "borderColor", 1, "mdl-tooltip"], ["id", "buttonDownloadEncoded", 1, "mdl-button", "mdl-js-button", "mdl-button--raised", "mdl-js-ripple-effect", "mdl-button--accent", 3, "click"], ["for", "buttonDownloadEncoded", 1, "mdl-tooltip"], ["id", "buttonDownloadFullImage", 1, "mdl-button", "mdl-js-button", "mdl-button--raised", "mdl-js-ripple-effect", "mdl-button--accent", 3, "click"], ["for", "buttonDownloadFullImage", 1, "mdl-tooltip"], [1, "mdl-cell", "mdl-cell--3-col"], [1, "mdl-cell", "mdl-cfell--6-col"], ["id", "imageContainer"]], template: function ConvertImageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "link", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "link", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "link", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "i", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "info_outline");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "dialog", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "h4", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Welcome!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Details on how to pick the inner image can be found ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "here");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "OK");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("error", function ConvertImageComponent_Template_div_error_22_listener($event) { return ctx.onUploadError($event); })("success", function ConvertImageComponent_Template_div_success_22_listener($event) { return ctx.onUploadSuccess($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "i", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "h4", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Upload your Marker");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, " Upload the image to put inside the marker ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "label", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "span", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Pattern Ratio 0.50");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "input", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, " Set size of inner image vs black border ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "label", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "span", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "Image size 512px");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "input", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, " Set the pixel width/height of the image. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "label", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "span", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "Border color. Please choose a dark one.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "input", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, " Set the marker border color, using hexa code or color name. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "button", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConvertImageComponent_Template_button_click_54_listener() { return ctx.downloadPattern(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, " Download Marker ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, " Download marker encoded from the uploaded image ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](58, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](59, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "button", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConvertImageComponent_Template_button_click_60_listener() { return ctx.downloadImage(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, " Download Image ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, " Download marker image ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](65, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](67, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](68, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dropzone", ctx.config1);
    } }, directives: [ngx_dropzone_wrapper__WEBPACK_IMPORTED_MODULE_1__["DropzoneDirective"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb252ZXJ0LWltYWdlLmNvbXBvbmVudC5zY3NzIn0= */", "body[_ngcontent-%COMP%] {\n\t\tfont-family: arial;\n\t\tbackground-color: #eee;\n\t}\n\th1[_ngcontent-%COMP%] {\n\t\ttext-align: center;\n\t\tfont-size: 500%;\n\t}\n\tdiv.mdl-cell[_ngcontent-%COMP%] {\n\t\ttext-align: center;\n\t}\n\n\th1[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n\t\ttext-decoration: none;\n\t}\n\th1[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n\t\ttext-decoration: underline;\n\t}\n\n\t#imageContainer[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n\t\twidth: 100%;\n\t\tmax-width: 512px;\n\t}\n\n\t#topRightButtons[_ngcontent-%COMP%] {\n\t\tposition: fixed;\n\t\ttop: 1em;\n\t\tright: 1em;\n\t}"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ConvertImageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-convert-image',
                templateUrl: './convert-image.component.html',
                styleUrls: ['./convert-image.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "lagP":
/*!**************************************************************************!*\
  !*** ./src/app/components/convert-image/convert-image-routing.module.ts ***!
  \**************************************************************************/
/*! exports provided: ConvertImageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConvertImageRoutingModule", function() { return ConvertImageRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _convert_image_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./convert-image.component */ "G5Jg");





const routes = [{
        path: '',
        component: _convert_image_component__WEBPACK_IMPORTED_MODULE_2__["ConvertImageComponent"]
    }];
class ConvertImageRoutingModule {
}
ConvertImageRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: ConvertImageRoutingModule });
ConvertImageRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function ConvertImageRoutingModule_Factory(t) { return new (t || ConvertImageRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ConvertImageRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ConvertImageRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "v/nh":
/*!******************************************************************!*\
  !*** ./src/app/components/convert-image/convert-image.module.ts ***!
  \******************************************************************/
/*! exports provided: ConvertImageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConvertImageModule", function() { return ConvertImageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _convert_image_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./convert-image-routing.module */ "lagP");
/* harmony import */ var ngx_dropzone_wrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-dropzone-wrapper */ "YpNe");
/* harmony import */ var _convert_image_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./convert-image.component */ "G5Jg");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/shared.module */ "PCNd");









const DEFAULT_DROPZONE_CONFIG = {
    maxFilesize: 50,
    url: 'https://httpbin.org/post',
};
class ConvertImageModule {
}
ConvertImageModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: ConvertImageModule });
ConvertImageModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function ConvertImageModule_Factory(t) { return new (t || ConvertImageModule)(); }, providers: [{ provide: ngx_dropzone_wrapper__WEBPACK_IMPORTED_MODULE_3__["DROPZONE_CONFIG"],
            useValue: DEFAULT_DROPZONE_CONFIG },
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbActiveModal"]], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _convert_image_routing_module__WEBPACK_IMPORTED_MODULE_2__["ConvertImageRoutingModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
            ngx_dropzone_wrapper__WEBPACK_IMPORTED_MODULE_3__["DropzoneModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ConvertImageModule, { declarations: [_convert_image_component__WEBPACK_IMPORTED_MODULE_4__["ConvertImageComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _convert_image_routing_module__WEBPACK_IMPORTED_MODULE_2__["ConvertImageRoutingModule"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
        ngx_dropzone_wrapper__WEBPACK_IMPORTED_MODULE_3__["DropzoneModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ConvertImageModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_convert_image_component__WEBPACK_IMPORTED_MODULE_4__["ConvertImageComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _convert_image_routing_module__WEBPACK_IMPORTED_MODULE_2__["ConvertImageRoutingModule"],
                    _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                    _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
                    ngx_dropzone_wrapper__WEBPACK_IMPORTED_MODULE_3__["DropzoneModule"]
                ],
                providers: [{ provide: ngx_dropzone_wrapper__WEBPACK_IMPORTED_MODULE_3__["DROPZONE_CONFIG"],
                        useValue: DEFAULT_DROPZONE_CONFIG },
                    _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbActiveModal"]]
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=components-convert-image-convert-image-module-es2015.js.map