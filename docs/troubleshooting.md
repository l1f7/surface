# Troubleshooting

Those weird errors that crop up from time to time, you know the ones.

### Error: `libsass` bindings not found. Try reinstalling `node-sass`

This means that the module you are using to compile Sass is not installed (at least not where Node expects it). This is a common error when switching between node versions on different projects, because you installed the project with one version and are now trying to use it with another.

1. Make sure you are using the right node version
2. If so, reinstall the module that you are using to compile Sass. It can be either:

```sh
npm install --save-dev gulp-sass
# or
npm install --save-dev grunt-sass
```

Do not install `node-sass` directly unless you plan on using it directly.


### Error: `Failed at the iconv@2.2.1 install script 'node-gyp rebuild'`

TL, DR: Make sure your local version of Python is `2.7.x`. If your project is using Python 3, instruct `npm` to use Python 2 instead with `npm install --python=python2.7` or `npm config set python python2.7` before running `npm install` (or even `PYTHON=python2.7 npm install`.

While the error message will instruct you to check `npm-debug.log`, it is likely that the file wasn't generated. Trying to run `node-gyp rebuild` from the `iconv` module folder was a little bit more verbose, the post install script fails because it is only compatible with Python 2 and you're running Python 3. [Eventually this won’t be a requirement](https://github.com/nodejs/node-gyp/issues/746#issuecomment-281911560).
