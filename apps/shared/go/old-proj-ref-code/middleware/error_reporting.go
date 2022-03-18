package middleware

import (
	"encoding/json"
	"net/http"

	log "github.com/sirupsen/logrus"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/models/reports"
)

const errorReportCollection = "error-reports"

// HandleErrorReport handles an error report submission
func HandleErrorReport(db *database.Datastore, w http.ResponseWriter, r *http.Request) bool {
	pass := true
	contextLogger := RouteSetup(w, r)
	contextLogger = contextLogger.WithFields(log.Fields{"action": "ERROR REPORTING"})
	contextLogger.Info("Received a new error report from client")

	var errorReport = reports.ErrorReport{}
	err := json.NewDecoder(r.Body).Decode(&errorReport)
	if err != nil {
		contextLogger.WithField("error", err).Error("An Error occured")
	}

	objectID, err := (*db).GetErrorReportDB().Create(errorReport)
	res := map[string]string{"_id": objectID}

	if err != nil {
		contextLogger.WithField("error", err).Error("An Error occured")
		res["error"] = err.Error()
		pass = false
	} else {
		contextLogger.WithField("errReport", objectID).Info("Submitted new error report")
	}
	json.NewEncoder(w).Encode(true)
	return pass
}
