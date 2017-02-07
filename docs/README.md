# Laptop

> Your laptop is your sword. Don’t go into battle without it.

Required tools for a development environment.

## What to set up
macOS tools:

* [Homebrew] for managing operating system libraries.

Unix tools:

* [Git] for version control
* [Tmux] for saving project state and switching between projects

Image tools:

* [ImageMagick] for cropping and resizing images

Programming languages and configuration:

* [Cookiecutter] for bootstrapping new projects
* [Node.js] and [npm], for running apps and installing JavaScript packages
* [avn] for automatic Node version switching
* [virtualenv] for managing isolated Python project environments
* [virtualenvwrapper], extensions for `virtualenv`

## Installing
### macOS
1. Install Command Line Tools  
`xcode-select --install`
2. Install Homebrew  
`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`  
`brew doctor`
3. Install Homebrew packages  
`brew install git`  
`brew install imagemagick --with-webp`  
`brew install python`  
`brew install python3`  
`brew linkapps python`  
`brew linkapps python3`
4. Install Node Version Manager  
`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash`  
`command -v nvm`  
5. Install PyPi  
`pip install pip`
6. Install Python packages  
`pip install cookiecutter`  
`pip install virtualenv`  
`pip install virtualenvwrapper`

### Arch Linux
1. Install general development packages  
`sudo pacman -S git python python`
2. Install Node Version Manager  
`sudo pacman -S nvm`
3. Install PyPi  
`sudo pacman -S python-pip python-pip2`

### Windows
`¯\_(ツ)_/¯`


## Configuring
### Node
1. Install currently-used Node versions  
`nvm install 0.10`  
`nvm install 4`
2. Set the default version  
`nvm alias default 4`
3. Set Python version  
`npm config set python python2.7`
4. Install global Node utilities  
`npm install -g avn`  
`npm install -g avn-nvm`  
`npm install -g avn-n`  
`npm install -g bower`  
`npm install -g eslint`  
`npm install -g gulp`  
`npm install -g stylelint`
5. Set up `avn`  
`avn setup`

**Note:** Repeat steps 3–5 for all additional Node versions.

[Homebrew]: http://brew.sh/

[Git]: https://git-scm.com/
[Tmux]: http://tmux.github.io/

[ImageMagick]: http://www.imagemagick.org/

[avn]: https://github.com/wbyoung/avn
[Cookiecutter]: https://github.com/audreyr/cookiecutter
[Node.js]: http://nodejs.org/
[npm]: https://www.npmjs.org/
[virtualenv]: https://virtualenv.pypa.io/en/stable/
[virtualenvwrapper]: https://bitbucket.org/virtualenvwrapper/virtualenvwrapper
