FROM golang:1.13-alpine

## Setup ##
# Adding git, bash and openssh to the image
RUN apk update && \ 
    apk upgrade && \
    apk add --no-cache bash git openssh

LABEL maintainer="Matthew Welte <matthew.welte95@gmail.com>"

## Provision ##
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go get github.com/githubnemo/CompileDaemon

## Run ##
ENTRYPOINT CompileDaemon --build="go build -o main ." --command="bash -c ./main"
