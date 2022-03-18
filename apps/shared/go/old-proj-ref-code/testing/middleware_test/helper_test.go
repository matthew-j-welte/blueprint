package middleware_test

import (
	"net/http"

	"github.com/matthew-j-welte/bit-board/server/database"
	dbMocks "github.com/matthew-j-welte/bit-board/server/database/mocks"
	httpMocks "github.com/matthew-j-welte/bit-board/server/middleware/mocks"
	testUtils "github.com/matthew-j-welte/bit-board/server/testing"
)

type MockMiddlewareHelper struct {
	MockDatastore            database.Datastore
	MockResponseWriter       http.ResponseWriter
	MockRequest              *http.Request
	MockUserDB               database.UserDB
	MockLearningDB           database.LearningDB
	MockErrorReportDB        database.ErrorReportDB
	MockLearningSuggestionDB database.LearningSuggestionDB
}

func (helper *MockMiddlewareHelper) Setup() {
	helper.MockDatastore = &dbMocks.Datastore{}
	helper.MockResponseWriter = &httpMocks.ResponseWriter{}
	helper.MockRequest = &http.Request{}
	helper.MockUserDB = &dbMocks.UserDB{}
	helper.MockLearningDB = &dbMocks.LearningDB{}
	helper.MockErrorReportDB = &dbMocks.ErrorReportDB{}
	helper.MockLearningSuggestionDB = &dbMocks.LearningSuggestionDB{}
	helper.AddDatastoreMockFunc("GetUserDB", 0, helper.MockUserDB)
	helper.AddDatastoreMockFunc("GetLearningDB", 0, helper.MockLearningDB)
	helper.AddDatastoreMockFunc("GetLearningSuggestionDB", 0, helper.MockLearningSuggestionDB)
	helper.AddDatastoreMockFunc("GetErrorReportDB", 0, helper.MockErrorReportDB)
}

func (helper *MockMiddlewareHelper) AddDatastoreMockFunc(funcName string, args int, ret ...interface{}) {
	helper.MockDatastore.(*dbMocks.Datastore).
		On(funcName, testUtils.MockArgs(args)...).
		Return(ret...)
}

func (helper *MockMiddlewareHelper) AddUserDBMockFunc(funcName string, args int, ret ...interface{}) {
	helper.MockUserDB.(*dbMocks.UserDB).
		On(funcName, testUtils.MockArgs(args)...).
		Return(ret...)
}

func (helper *MockMiddlewareHelper) AddLearningDBMockFunc(funcName string, args int, ret ...interface{}) {
	helper.MockLearningDB.(*dbMocks.LearningDB).
		On(funcName, testUtils.MockArgs(args)...).
		Return(ret...)
}

func (helper *MockMiddlewareHelper) AddErrorReportDBMockFunc(funcName string, args int, ret ...interface{}) {
	helper.MockErrorReportDB.(*dbMocks.ErrorReportDB).
		On(funcName, testUtils.MockArgs(args)...).
		Return(ret...)
}

func (helper *MockMiddlewareHelper) AddLearningSuggestionDBMockFunc(funcName string, args int, ret ...interface{}) {
	helper.MockLearningSuggestionDB.(*dbMocks.LearningSuggestionDB).
		On(funcName, testUtils.MockArgs(args)...).
		Return(ret...)
}

func (helper *MockMiddlewareHelper) AddHttpWriterMockFunc(funcName string, args int, ret ...interface{}) {
	helper.MockResponseWriter.(*httpMocks.ResponseWriter).
		On(funcName, testUtils.MockArgs(args)...).
		Return(ret...)
}
