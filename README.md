# VideoNotes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Build and Run Electron packaging

$npm run deploy

(https://github.com/electron/packager)

or 

for DMG:

$electron-builder

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## App Signing info

This needs to be added eventually

"osxSign": {
          "identity": "[your apple identity]",
          "hardened-runtime": true,
          "entitlements": "entitlements.plist",
          "entitlements-inherit": "entitlements.plist",
          "signature-flags": "library"
        },
        "osxNotarize": {
          "appleId": "[your app ID]",
          "appleIdPassword": "pbfz-qtbs-wgpe-qtvh"
        }


# How to use
The best way to use this product is in the Electron format. You can do this by running `npm run start:electron`. This builds and runs it in Electron. Electron have a different engine than the browser based application. 

Browser: You upload videos as files and the engine converts these files into base64 and saves them to indexDB which is localstorage. When you view the files, you retrieve and copy the base64 for each file. This is very cumbersome on the browser and is not a long term solution. This is only suitable for quick browser applications and for demos.

Electron: This is the proper way to use the application. This engine works by file paths. Because the browser does not support file system traversal, you must use the Electron app to run videos via path. Uploading videos on this application only saves path records and when you view the video, it refers to the video already on your system. This saves significant space and does not require duplicate video storage by having only one reference on your machine, vs one on your machine and one on your browser (like with the Browser engine). The only consideration is you need to have a folder on your machine where you put all your videos for this application. This application then points to that folder and it will reference all videos by this base path plus the relative paths when you uploaded the videos.