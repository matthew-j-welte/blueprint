package database_test

import (
	"errors"
	"testing"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/database/mocks"
	"github.com/matthew-j-welte/bit-board/server/models/reports"
	testUtils "github.com/matthew-j-welte/bit-board/server/testing"
	"github.com/stretchr/testify/suite"
)

type ErrReportDBTestSuite struct {
	suite.Suite
	MockCollHelper database.CollectionHelper
	MockDBHelper   database.DBHelper
}

func (suite *ErrReportDBTestSuite) SetupTest() {
	suite.MockCollHelper = &mocks.CollectionHelper{}
	suite.MockDBHelper = &mocks.DBHelper{}
}

func (suite *ErrReportDBTestSuite) MockCollHelperFunc(name string, args int, ret ...interface{}) {
	suite.MockCollHelper.(*mocks.CollectionHelper).
		On(name, testUtils.MockArgs(args)...).
		Return(ret...)
}

func (suite *ErrReportDBTestSuite) GetCollectionMockedDB() database.ErrorReportDB {
	suite.linkMockHelpers()
	return database.NewErrorReportDB(&suite.MockDBHelper)
}

func (suite *ErrReportDBTestSuite) linkMockHelpers() {
	suite.MockDBHelper.(*mocks.DBHelper).
		On("GetCollection", testUtils.MockArgs(1)...).
		Return(suite.MockCollHelper)
}

func (suite *ErrReportDBTestSuite) TestCreateErrorReport() {
	suite.MockCollHelperFunc("InsertOne", 1, nil, nil)
	suite.MockCollHelperFunc("GetInsertID", 1, "100", nil)

	errDb := suite.GetCollectionMockedDB()
	result, err := errDb.Create(reports.ErrorReport{})
	suite.Equal(result, "100")
	suite.Nil(err)
}

func (suite *ErrReportDBTestSuite) TestCreateErrorReportFailure() {
	suite.MockCollHelperFunc("InsertOne", 1, nil, errors.New("err"))

	errDb := suite.GetCollectionMockedDB()
	_, err := errDb.Create(reports.ErrorReport{})
	suite.NotNil(err)
}

func TestErrorReportDBSuite(t *testing.T) {
	suite.Run(t, new(ErrReportDBTestSuite))
}
