FRONTEND DEVELOPMENT ENVIRONMENT
=============
This is based off of the normal Lift Dev Environment document, so there shouldn't be any major surprises here.


Install
=========
Native
```
npm install
```

Docker (requirements are installed when building the image)
```
make up_fe; make enter_fe
```

A note on Docker usage: when installing `npm` requirements you must save them to the `pacakge.json` with `--save` or `--save-dev` so after you stop your Docker container the requirements will get built into the Docker image.


Directory Structure
=========
The `raw/` folder is where all frontend dev should happen. The working SCSS, JS, SVGs, images, and prototype templates are stored here.


Build Processes
=========

**Note:** If you are using Docker for development you must add the `--docker` flag to the Development or Prototyping tasks below. This is mainly to configure the `browser-sync` proxy to Django. Ex. `gulp --dev --docker`

Development
======
```
gulp --dev
```
This is our main Gulp task, it does the following, in this order:
  * Optimize and minify Images and SVG files into the `website/{{ cookiecutter.short_name }}/static/images` and `website/{{ cookiecutter.short_name }}/templates/includes/svgs` folders respectively
  * Compile, lint, and minify `SASS` into the `website/{{ cookiecutter.short_name }}/static/css` directory
  * Lint the javascript, and then run it through Webpack to generate your javascript files into the `website/{{ cookiecutter.short_name }}/static/js` directory
  * Runs a `browser-sync` instance accessed at `localhost:1337` which proxies the Django project through it and then will automatically refresh every time you make changes to images, svgs, css, javascript, or templates

Prototyping
======
```
gulp --proto
```
Gulp `proto` does essentially the same things as `gulp --dev`, but compiles your files into the `prototype/` directory and runs the `pug` task so that you can quickly iterate on project ideas/layouts/modules before the project moves into development. Output paths for assets are also modified to accomodate this.

Production
======
```
gulp --prod
```
Gulp `prod` is specifically for doing builds before you push to production. It works mostly the same as the main `dev` task except that it does not run a `browser-sync` instance and does a few things which the normal `gulp dev` tasks doesn't. Namely:
  * Compresses/uglifies the javascript
  * Adds sourcemaps for javascript files

In the future we may run this through CI and add further optimizations to static assets.

Linting
======
```
gulp --lint
```
Gulp `lint` does one thing and one thing only. You guessed it. This task is designed to lint our css and javascript and will be mostly used through CI since linting is built into all other tasks.


Customizing Gulp
========
The `gulpfile.js` directory contains all of the configuration/tasks for the various gulp tasks that are run. You generally shouldn't need to edit too much, but in case you do, it's all there and heavily documented so it should be pretty easy to dive into and understand what's going on.
