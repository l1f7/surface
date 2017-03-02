# Build Processes

## Node scripts
The `package.json` contains a number of scripts for performing various tasks on the project. Running the npm script ensures the proper environment variables are set.

`npm` scripts can get a little *verbose* though, so here’s a breakdown of what each one will do for you.

### `npm run start`
1. Runs the [`lint:versions`](#npm-run-lint-versions) script
2. Sets <var>NODE_ENV</var> to `development`
3. Runs the Gulp [`watch`](#gulp-watch) task

If you’re working with Docker, you can run `npm run start:docker` instead which does all of the above, as well as setting <var>VIRTUAL_ENV</var> to `docker`.

If you’re working on a prototype build, you can run `npm run start:proto`. This is the same as `start` except for setting <var>NODE_ENV</var> to `prototype`.

### `npm run build`
If you just need to compile all the static assets from source, run this script.
1. Sets <var>NODE_ENV</var> to `development`
2. Runs the Gulp [`build`](#gulp-build) task

Use `npm run build:proto` or `npm run build:prod` to set <var>NODE_ENV</var> to `prototype` or `production`, respectively.

### `npm run lint:versions`
1. Checks your current version of `node` against the version in `.nvmrc`. Gives the all-clear if it maches, or exits back to the prompt if not.

### `npm run lock`
1. Runs the [`lint:versions`](#npm-run-lint-versions) script
2. Runs `npm shrinkwrap` with the `--dev` flag to include packages in `devDependencies`
3. Replaces `https` with `http` in resolved URLs

See [`npm-shrinkwrap`’s docs](https://docs.npmjs.com/cli/shrinkwrap) for more info.


## Gulp tasks
These tasks can all be run individually outside of any related Node script, but using the Node script ensures the correct environment variables are passed to Gulp’s configuration and the output will be where/what you expect.

The following is just a basic breakdown of what processes each task is doing; see the [individual tasks](../gulpfile.js/tasks) for more.

### `build`
The default Gulp task. Runs the subsequent tasks *in parallel* to build the various static assets, excluding `watch`.

### `watch`
Does essentially the same thing as `build`, plus starts a local BrowserSync server (using environment variables to configure) and watches for changes to the source dirs to re-run the appropriate build task.

### `css`
1. Process Sass code into CSS
2. Generate sourcemaps (in prod only)
3. Prefix & optimize CSS
4. Minify final CSS
5. ~~Write CSS stats log~~
6. Write new CSS to build dir
7. Stream new CSS to BrowserSync

### `icons`
tk

### `images`
1. Check if image differs from file in build dir
2. Optimise image based on file type
3. Write image to build dir
4. Stream new image to BrowserSync

### `pug`
tk

### `webpack`
1. Bundles all the JavaScript together.


## On Environment Variables
To understand the different environment vars and what they should be set to, consider the context of your work.

* `prototype`  
When you need to quickly iterate on project ideas/layouts/modules before the project moves into development.
* `production`  
Specifically for doing builds before you push to production. In the future we may run this through CI and add further optimizations to static assets.
* `docker`  
If you’re utilising Docker containerisation (as opposed to a Python virtualenv). One day this may become our internal standard and this flag won’t be needed.
