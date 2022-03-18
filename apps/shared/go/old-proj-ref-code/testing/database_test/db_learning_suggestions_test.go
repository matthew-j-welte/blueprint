package database_test

import (
	"errors"
	"testing"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/database/mocks"
	"github.com/matthew-j-welte/bit-board/server/models/resources"
	testUtils "github.com/matthew-j-welte/bit-board/server/testing"
	"github.com/stretchr/testify/suite"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type LearnSuggestionDBTestSuite struct {
	suite.Suite
	MockCollHelper database.CollectionHelper
	MockDBHelper   database.DBHelper
	UserID         string
}

func (suite *LearnSuggestionDBTestSuite) SetupTest() {
	suite.MockCollHelper = &mocks.CollectionHelper{}
	suite.MockDBHelper = &mocks.DBHelper{}
	suite.UserID = primitive.NewObjectID().Hex()
}

func (suite *LearnSuggestionDBTestSuite) MockCollHelperFunc(name string, args int, ret ...interface{}) {
	suite.MockCollHelper.(*mocks.CollectionHelper).
		On(name, testUtils.MockArgs(args)...).
		Return(ret...)
}

func (suite *LearnSuggestionDBTestSuite) GetCollectionMockedDB() database.LearningSuggestionDB {
	suite.linkMockHelpers()
	return database.NewLearningSuggestionDB(&suite.MockDBHelper)
}

func (suite *LearnSuggestionDBTestSuite) linkMockHelpers() {
	suite.MockDBHelper.(*mocks.DBHelper).
		On("GetCollection", testUtils.MockArgs(1)...).
		Return(suite.MockCollHelper)
}

func (suite *LearnSuggestionDBTestSuite) TestCreateLearningSuggestion() {
	suite.MockCollHelperFunc("InsertOne", 1, nil, nil)
	suite.MockCollHelperFunc("GetInsertID", 1, "100", nil)

	learnSuggestDB := suite.GetCollectionMockedDB()
	result, err := learnSuggestDB.Create(resources.ResourceSuggestion{}, suite.UserID)
	suite.Equal(result, "100")
	suite.Nil(err)
}

func (suite *LearnSuggestionDBTestSuite) TestCreateLearningSuggestionFailure() {
	suite.MockCollHelperFunc("InsertOne", 1, nil, errors.New("err"))
	suite.MockCollHelperFunc("GetInsertID", 1, "100", nil)

	learnSuggestDB := suite.GetCollectionMockedDB()
	_, err := learnSuggestDB.Create(resources.ResourceSuggestion{}, suite.UserID)
	suite.NotNil(err)
}

func TestLearnSuggestionDBTestSuite(t *testing.T) {
	suite.Run(t, new(LearnSuggestionDBTestSuite))
}
