package main

import (
	"net/http"

	log "github.com/sirupsen/logrus"

	"github.com/matthew-j-welte/bit-board/server/router"
)

func main() {
	r := router.Router()
	log.Println("Starting server on the port 8080...")
	log.Fatal(http.ListenAndServe(":8080", r))
}
