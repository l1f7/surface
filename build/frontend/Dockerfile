# latest node LTS release
FROM node:6-slim

# if you have any questions...
MAINTAINER Bryan Hyshka <bryan@hyshka.com>

# Set a term for terminal inside the container, can't clear without it
ENV TERM xterm-256color

# Update and install
RUN apt-get update && apt-get install -y \
    # git may be required for pulling npm packages from a repo
    git

# Upgrade npm
#RUN npm install --global npm@3.10

# So we can access the package.json inside container
ADD src/package.json /app/package.json

# Install the requirements and cleanup
RUN /bin/bash -c 'cd /app && npm install && npm cache clean'

# The code should be symlinked to this directory
WORKDIR /app

# Expose the 1337 port for BrowserSync
EXPOSE 1337

# Add node binaries to path
ENV PATH /app/node_modules/.bin:$PATH

# Add the entry script and make it executable
ADD entry.sh /opt/
RUN chmod 755 /opt/entry.sh
