package middleware

import (
	"net/http"
	"runtime"
	"strings"

	log "github.com/sirupsen/logrus"
)

// RouteSetup initializes route headers and returns a configured logger
func RouteSetup(w http.ResponseWriter, r *http.Request) *log.Entry {
	setHeaders(w, r)
	return log.WithFields(log.Fields{
		"function":   getCaller(),
		"RESTmethod": r.Method,
	})

}

func setHeaders(w http.ResponseWriter, r *http.Request) {
	switch method := r.Method; method {
	case "GET":
		configureGET(w)
	case "POST":
		configurePOST(w)
	}
}

// GETConfigure sets standard headers for GET handlers
func configureGET(w http.ResponseWriter) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

// POSTConfigure sets standard headers for POST handlers
func configurePOST(w http.ResponseWriter) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func getCaller() string {
	fullPath := getFrame(2).Function
	pathParts := strings.Split(fullPath, "/")
	return pathParts[len(pathParts)-1]
}

func getFrame(skipFrames int) runtime.Frame {
	// We need the frame at index skipFrames+2, since we never want runtime.Callers and getFrame
	targetFrameIndex := skipFrames + 2

	// Set size to targetFrameIndex+2 to ensure we have room for one more caller than we need
	programCounters := make([]uintptr, targetFrameIndex+2)
	n := runtime.Callers(0, programCounters)

	frame := runtime.Frame{Function: "unknown"}
	if n > 0 {
		frames := runtime.CallersFrames(programCounters[:n])
		for more, frameIndex := true, 0; more && frameIndex <= targetFrameIndex; frameIndex++ {
			var frameCandidate runtime.Frame
			frameCandidate, more = frames.Next()
			if frameIndex == targetFrameIndex {
				frame = frameCandidate
			}
		}
	}

	return frame
}
