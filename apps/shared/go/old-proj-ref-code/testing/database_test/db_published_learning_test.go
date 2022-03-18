package database_test

import (
	"errors"
	"testing"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/database/mocks"
	"github.com/matthew-j-welte/bit-board/server/models/resources"
	testUtils "github.com/matthew-j-welte/bit-board/server/testing"
	"github.com/stretchr/testify/suite"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type LearningDBTestSuite struct {
	suite.Suite
	MockCollHelper database.CollectionHelper
	MockDBHelper   database.DBHelper
	MockManyResult database.ManyResultsHelper
	UserID         string
	PostID         primitive.ObjectID
	ResourceIDHex  string
}

func (suite *LearningDBTestSuite) SetupTest() {
	suite.MockCollHelper = &mocks.CollectionHelper{}
	suite.MockDBHelper = &mocks.DBHelper{}
	suite.MockManyResult = &mocks.ManyResultsHelper{}
	suite.UserID = primitive.NewObjectID().Hex()
	suite.PostID = primitive.NewObjectID()
	suite.ResourceIDHex = primitive.NewObjectID().Hex()
}

func (suite *LearningDBTestSuite) MockCollHelperFunc(name string, args int, ret ...interface{}) {
	suite.MockCollHelper.(*mocks.CollectionHelper).
		On(name, testUtils.MockArgs(args)...).
		Return(ret...)
}

func (suite *LearningDBTestSuite) MockManyResultFunc(name string, args int, ret ...interface{}) {
	suite.MockManyResult.(*mocks.ManyResultsHelper).
		On(name, testUtils.MockArgs(args)...).
		Return(ret...)
}

func (suite *LearningDBTestSuite) GetCollectionMockedDB() database.LearningDB {
	suite.linkMockHelpers()
	return database.NewLearningDB(&suite.MockDBHelper)
}

func (suite *LearningDBTestSuite) linkMockHelpers() {
	suite.MockDBHelper.(*mocks.DBHelper).
		On("GetCollection", testUtils.MockArgs(1)...).
		Return(suite.MockCollHelper)
}

func (suite *LearningDBTestSuite) TestGetAllResources() {
	expected := []bson.M{{"test": 1}, {"test": 2}}

	suite.MockManyResultFunc("Decode", 0, expected, nil)
	suite.MockCollHelperFunc("Find", 2, suite.MockManyResult, nil)
	learnDB := suite.GetCollectionMockedDB()
	result, err := learnDB.GetAll()
	suite.Equal(expected, result)
	suite.Nil(err)
}

func (suite *LearningDBTestSuite) TestGetAllResourcesFailure() {
	suite.MockCollHelperFunc("Find", 2, nil, errors.New("err"))
	learnDB := suite.GetCollectionMockedDB()
	result, err := learnDB.GetAll()
	suite.Nil(result)
	suite.NotNil(err)
}

func (suite *LearningDBTestSuite) TestGetAllResourcesNilCursor() {
	suite.MockCollHelperFunc("Find", 2, nil, nil)
	learnDB := suite.GetCollectionMockedDB()
	result, err := learnDB.GetAll()
	suite.Nil(result)
	suite.NotNil(err)
}

// addPostToResource tests

func (suite *LearningDBTestSuite) TestAddPostWithObjectID() {
	var modifiedCount int64 = 1
	suite.MockCollHelperFunc("PushToArray", 3, nil, nil)
	suite.MockCollHelperFunc("GetModifiedCount", 1, modifiedCount, nil)
	learnDB := suite.GetCollectionMockedDB()
	result, err := learnDB.AddPostToResource(
		resources.ResourcePost{ID: suite.PostID},
		suite.ResourceIDHex,
	)
	suite.Equal(suite.PostID.Hex(), result)
	suite.Nil(err)
}

func (suite *LearningDBTestSuite) TestAddPostWithErrorOnUpdate() {
	suite.MockCollHelperFunc("PushToArray", 3, nil, errors.New("err"))
	learnDB := suite.GetCollectionMockedDB()
	result, err := learnDB.AddPostToResource(resources.ResourcePost{}, suite.ResourceIDHex)
	suite.Equal("", result)
	suite.NotNil(err)
}

func (suite *LearningDBTestSuite) TestAddPostWithNoRecordsModified() {
	var modifiedCount int64 = 0
	suite.MockCollHelperFunc("PushToArray", 3, nil, nil)
	suite.MockCollHelperFunc("GetModifiedCount", 1, modifiedCount, nil)
	learnDB := suite.GetCollectionMockedDB()
	result, err := learnDB.AddPostToResource(resources.ResourcePost{}, suite.ResourceIDHex)
	suite.Equal("", result)
	suite.NotNil(err)
}

func (suite *LearningDBTestSuite) TestIncrementFunctions() {
	val := 1
	suite.MockCollHelperFunc("IncrementField", 2, val, nil)
	suite.MockCollHelperFunc("IncrementFieldInObjectArray", 4, val, nil)
	suite.MockCollHelperFunc("DecrementFieldInObjectArray", 4, val, nil)

	learnDB := suite.GetCollectionMockedDB()
	res, err := learnDB.IncrementResourceViews("id")
	suite.Equal(val, res)
	suite.Nil(err)

	res, err = learnDB.IncrementResourcePostLikeCount("id", "id")
	suite.Equal(val, res)
	suite.Nil(err)

	res, err = learnDB.DecrementResourcePostLikeCount("id", "id")
	suite.Equal(val, res)
	suite.Nil(err)

	res, err = learnDB.IncrementResourcePostReportCount("id", "id")
	suite.Equal(val, res)
	suite.Nil(err)

	res, err = learnDB.DecrementResourcePostReportCount("id", "id")
	suite.Equal(val, res)
	suite.Nil(err)
}

func TestLearnDBTestSuite(t *testing.T) {
	suite.Run(t, new(LearningDBTestSuite))
}

// // getResources tests

// // Increment functions
