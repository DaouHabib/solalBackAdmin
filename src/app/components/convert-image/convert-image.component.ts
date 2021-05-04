import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
declare var THREEx: any;
@Component({
	selector: 'app-convert-image',
	templateUrl: './convert-image.component.html',
	styleUrls: ['./convert-image.component.scss']
})
export class ConvertImageComponent implements OnInit {
	fullMarkerURL: any;
	imageName = null;
	innerImageURL = "assets/images/Barcode1.PNG";
	selectedFile: File = null;

	public onUploadInit(args: any): void { }

	public onUploadError(args: any): void { }

	public onUploadSuccess(args: any): void {
		this.selectedFile = args[0];
		localStorage.setItem('base64', args[0].dataURL);
		console.log(args[0]);
		var file = args[0];
		var c: any;
		var reader = new FileReader();
		reader.onload = function (event) {
			c = reader.result
		};
		this.innerImageURL = c;
		this.updateFullMarkerImage()

		this.fullMarkerURL = args[0].dataURL;
		this.imageName = file.name
		this.imageName = this.imageName.substring(0, this.imageName.lastIndexOf('.')) || this.imageName
	}

	public config1: DropzoneConfigInterface = {
		clickable: true,
		maxFiles: 1,
		autoReset: null,
		errorReset: null,
		cancelReset: null
	};
	constructor() { }



	downloadImage() {
		var patternString = localStorage.getItem('markerUrl');

		var domElement = window.document.createElement('a');
		domElement.href = patternString;
		domElement.download = "pattern-" + (this.imageName || 'marker') + '.png';
		document.body.appendChild(domElement)
		domElement.click();
		document.body.removeChild(domElement)
		this.updateFullMarkerImage();
	}

	downloadPattern() {

		var patternString = localStorage.getItem('markerUrl');


		THREEx.ArPatternFile.encodeImageURL(patternString, function onComplete(patternFileString) {
			THREEx.ArPatternFile.triggerDownload(patternFileString, "pattern-marker.patt");
		})
		THREEx.ArPatternFile.triggerDownload = function (patternFileString, fileName = 'pattern-marker.patt') {
			// tech from https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
			var domElement = window.document.createElement('a');
			domElement.href = window.URL.createObjectURL(new Blob([patternFileString], { type: 'text/plain' }));
			domElement.download = fileName;
			document.body.appendChild(domElement)
			domElement.click();
			document.body.removeChild(domElement)
		}
	}

	updateFullMarkerImage() {

		THREEx.ArPatternFile.encodeImageURL = function (imageURL, onComplete): any {
			var image = new Image;
			image.onload = function () {
				var patternFileString = THREEx.ArPatternFile.encodeImage(image)
				onComplete(patternFileString)
			}
			image.src = imageURL;
			return image;

		}
		THREEx.ArPatternFile.encodeImage = function (image) {
			// copy image on canvas
			var canvas = document.createElement('canvas');
			var context = canvas.getContext('2d')
			canvas.width = 16;
			canvas.height = 16;

			// document.body.appendChild(canvas)
			// canvas.style.width = '200px'


			var patternFileString = ''
			for (var orientation = 0; orientation > -2 * Math.PI; orientation -= Math.PI / 2) {
				// draw on canvas - honor orientation
				context.save();
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.translate(canvas.width / 2, canvas.height / 2);
				context.rotate(orientation);
				context.drawImage(image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
				context.restore();

				// get imageData
				var imageData = context.getImageData(0, 0, canvas.width, canvas.height)

				// generate the patternFileString for this orientation
				if (orientation !== 0) patternFileString += '\n'
				// NOTE bgr order and not rgb!!! so from 2 to 0
				for (var channelOffset = 2; channelOffset >= 0; channelOffset--) {
					// console.log('channelOffset', channelOffset)
					for (var y = 0; y < imageData.height; y++) {
						for (var x = 0; x < imageData.width; x++) {

							if (x !== 0) patternFileString += ' '

							var offset = (y * imageData.width * 4) + (x * 4) + channelOffset
							var value = imageData.data[offset]

							patternFileString += String(value).padStart(3);
						}
						patternFileString += '\n'
					}
				}
			}

			return patternFileString
		}

		THREEx.ArPatternFile.buildFullMarker = function (innerImageURL, pattRatio, size, color, onComplete): any {
			var whiteMargin = 0.1
			var blackMargin = (1 - 2 * whiteMargin) * ((1 - pattRatio) / 2)
			// var blackMargin = 0.2

			var innerMargin = whiteMargin + blackMargin

			var canvas = document.createElement('canvas');
			var context = canvas.getContext('2d')
			canvas.width = canvas.height = size

			context.fillStyle = 'white';
			context.fillRect(0, 0, canvas.width, canvas.height)

			// copy image on canvas
			context.fillStyle = color;
			context.fillRect(
				whiteMargin * canvas.width,
				whiteMargin * canvas.height,
				canvas.width * (1 - 2 * whiteMargin),
				canvas.height * (1 - 2 * whiteMargin)
			);

			// clear the area for innerImage (in case of transparent image)
			context.fillStyle = 'white';
			context.fillRect(
				innerMargin * canvas.width,
				innerMargin * canvas.height,
				canvas.width * (1 - 2 * innerMargin),
				canvas.height * (1 - 2 * innerMargin)
			);


			// display innerImage in the middle
			var innerImage = document.createElement('img')
			innerImage.addEventListener('load', function () {
				// draw innerImage
				context.drawImage(innerImage,
					innerMargin * canvas.width,
					innerMargin * canvas.height,
					canvas.width * (1 - 2 * innerMargin),
					canvas.height * (1 - 2 * innerMargin)
				);

				var imageUrl = canvas.toDataURL()
				onComplete(imageUrl)
			})
			innerImage.src = innerImageURL
		}
		var patternRatio = document.querySelector('#patternRatioSlider')
		var imageSize = document.querySelector('#imageSize')
		var borderColor = document.querySelector('#borderColor').nodeValue
		this.innerImageURL = localStorage.getItem('base64');
		function hexaColor(color) {
			return /^#[0-9A-F]{6}$/i.test(color);
		};

		THREEx.ArPatternFile.buildFullMarker(this.innerImageURL, 0.50, 512, "black", function onComplete(markerUrl) {
			if (markerUrl) {
				localStorage.setItem('markerUrl', markerUrl);
			}
			console.log(markerUrl);

			var fullMarkerImage = document.createElement('img')
			fullMarkerImage.src = markerUrl

			// put fullMarkerImage into #imageContainer
			var container = document.querySelector('#imageContainer')
			while (container.firstChild) container.removeChild(container.firstChild);
			container.appendChild(fullMarkerImage)
		})
		var s = new Option().style;
		s.color = borderColor;
		if (borderColor === '' || (s.color != borderColor && !hexaColor(borderColor))) {
			// if color not valid, use black
			borderColor = 'black';
		}

	}


	ngOnInit(): void {
		this.updateFullMarkerImage();
	}

}
