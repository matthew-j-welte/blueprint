package router

import (
	"net/http"
	"os"

	log "github.com/sirupsen/logrus"

	"github.com/gorilla/mux"
	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/middleware"
)

type handler func(*database.Datastore, http.ResponseWriter, *http.Request) bool
type route struct {
	URI         string
	RESTMethods []string
	Handler     handler
}

func init() {
	log.SetOutput(os.Stdout)

	log.Info("Testing Connection to Database...")
	err := database.TestConnection()
	if err != nil {
		log.Fatal("Failed to connect to database - Terminating")
	}
	log.Info("Successfully Connected to Database.")
}

// Router main router for server
func Router() *mux.Router {
	router := mux.NewRouter()
	log.Info("Initializing router...")

	// User route handlers
	userCountRoute := route{
		URI:         "/api/users/count",
		RESTMethods: []string{"GET", "OPTIONS"},
		Handler:     middleware.GetUserCount}
	handleRoute(router, userCountRoute)

	userLogin := route{
		URI:         "/api/user/login",
		RESTMethods: []string{"POST", "OPTIONS"},
		Handler:     middleware.GetUserID}
	handleRoute(router, userLogin)

	userSkillsRoute := route{
		URI:         "/api/user/{id}/persona/skills",
		RESTMethods: []string{"GET", "OPTIONS"},
		Handler:     middleware.GetPersonaSkills}
	handleRoute(router, userSkillsRoute)

	userCodeSubmissionRoute := route{
		URI:         "/api/user/{id}/code/submit/{language}",
		RESTMethods: []string{"POST", "OPTIONS"},
		Handler:     middleware.PostCodeSubmission}
	handleRoute(router, userCodeSubmissionRoute)

	newUserRoute := route{
		URI:         "/api/user/new",
		RESTMethods: []string{"POST", "OPTIONS"},
		Handler:     middleware.UserSubmission}
	handleRoute(router, newUserRoute)

	newEditorConfigRoute := route{
		URI:         "/api/user/{id}/code/configuration/new",
		RESTMethods: []string{"POST", "OPTIONS"},
		Handler:     middleware.NewEditorConfigSubmission}
	handleRoute(router, newEditorConfigRoute)

	getEditorConfigurationsRoute := route{
		URI:         "/api/user/{id}/code/configurations",
		RESTMethods: []string{"GET", "OPTIONS"},
		Handler:     middleware.GetEditorConfigurations}
	handleRoute(router, getEditorConfigurationsRoute)

	// Resource route handlers
	resourcesLearningRoute := route{
		URI:         "/api/learn/resources",
		RESTMethods: []string{"GET", "OPTIONS"},
		Handler:     middleware.GetLearningResources}
	handleRoute(router, resourcesLearningRoute)

	newResourceSuggestionRoute := route{
		URI:         "/api/learn/resource/new",
		RESTMethods: []string{"POST", "OPTIONS"},
		Handler:     middleware.NewResourceSuggestion}
	handleRoute(router, newResourceSuggestionRoute)

	resourceValueIncrement := route{
		URI:         "/api/learn/resource/{id}/{field}/increment",
		RESTMethods: []string{"PUT", "OPTIONS"},
		Handler:     middleware.HandleResourceView}
	handleRoute(router, resourceValueIncrement)

	resourcePostValueIncrement := route{
		URI:         "/api/learn/resource/{id}/post/{postID}/{action}/{field}",
		RESTMethods: []string{"PUT", "OPTIONS"},
		Handler:     middleware.HandleResourcePostActionByUser}
	handleRoute(router, resourcePostValueIncrement)

	newPostOnResource := route{
		URI:         "/api/learn/resource/{id}/new/post",
		RESTMethods: []string{"POST", "OPTIONS"},
		Handler:     middleware.NewPostOnResource}
	handleRoute(router, newPostOnResource)

	// Misc route handlers
	clientErrorReportRoute := route{
		URI:         "/api/error/report",
		RESTMethods: []string{"POST", "OPTIONS"},
		Handler:     middleware.HandleErrorReport}
	handleRoute(router, clientErrorReportRoute)

	log.Info("Router Initialized")
	return router
}

func handleRoute(router *mux.Router, routeInfo route) {
	db := database.GetDatastore()
	router.HandleFunc(
		routeInfo.URI,
		func(w http.ResponseWriter, r *http.Request) {
			routeInfo.Handler(&db, w, r)
		}).Methods(routeInfo.RESTMethods...)
}
