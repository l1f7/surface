# Build Processes

**Note:** If you are using Docker for development you must add the `--docker` flag to the Development or Prototyping tasks below. This is mainly to configure the `browser-sync` proxy to Django. Ex. `gulp --dev --docker`

## Development
```sh
gulp --dev
```

This is our main Gulp task, it does the following, in this order:
1. Optimize and minify images and SVGs into the `website/{{ cookiecutter.short_name }}/static/images` and `website/{{ cookiecutter.short_name }}/templates/includes/svgs` folders respectively
1. Compile, lint, and minify Sass stylesheets into the `website/{{ cookiecutter.short_name }}/static/css` directory
1. Lint the JavaScript, and then run it through Webpack to generate your JavaScript files into the `website/{{ cookiecutter.short_name }}/static/js` directory
1. Runs a `browser-sync` instance accessed at `localhost:1337` which proxies the Django server through it and then will automatically refresh every time you make changes to images, SVGs, CSS, JavaScript, or templates


## Prototyping
```
gulp --proto
```

Does essentially the same things as `gulp --dev`, but compiles your files into the `prototype/` directory and runs the `pug` task so that you can quickly iterate on project ideas/layouts/modules before the project moves into development. Output paths for assets are also modified to accomodate this.


## Production
```
gulp --prod
```

Specifically for doing builds before you push to production. It works mostly the same as the main `dev` task except that it does not run a `browser-sync` instance and does a few things which the normal `gulp dev` tasks doesn't. Namely:
  * Compresses/uglifies the JavaScript
  * Adds sourcemaps for JavaScript files

In the future we may run this through CI and add further optimizations to static assets.


## Linting
```
gulp --lint
```

Does one thing and one thing only. You guessed it. This task is designed to lint our CSS and JavaScript and will be mostly used through CI since linting is built into all other tasks.


## Customizing Gulp
The `gulpfile.js` directory contains all of the configuration/tasks for the various gulp tasks that are run. You generally shouldn't need to edit too much, but in case you do, it's all there and heavily documented so it should be pretty easy to dive into and understand what's going on.
