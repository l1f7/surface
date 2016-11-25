SHELL := /bin/bash
######################
#
# To list all commands:
#   make
#
# This make file standardizes some basic Docker commands.
# We don't want to remember them all or maintain our own aliases separately.
#
######################

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## Build the node container
	mkdir -p ./build/node/src
	# Npm files need to be in the context
	cp package.json ./build/node/src
	docker build -t lift/surface:node ./build/node

up: build ## Bring up the docker compose
	docker-compose up -d

down: ## Bring down the compose
	docker-compose down

enter: ## Enter the node container
	docker exec -it surface-node /bin/bash

dev: ## Run the Gulp build process
	docker exec -it surface-node /bin/bash -c "gulp --dev"
