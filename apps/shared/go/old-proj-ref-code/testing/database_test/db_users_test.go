package database_test

import (
	"errors"
	"testing"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/database/mocks"
	"github.com/matthew-j-welte/bit-board/server/models/users"
	testUtils "github.com/matthew-j-welte/bit-board/server/testing"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserDBTestSuite struct {
	suite.Suite
	MockCollHelper   database.CollectionHelper
	MockDBHelper     database.DBHelper
	MockManyResult   database.ManyResultsHelper
	MockSingleResult database.SingleResultHelper
	UserID           string
	PostID           primitive.ObjectID
	ResourceIDHex    string
}

func (suite *UserDBTestSuite) SetupTest() {
	suite.MockCollHelper = &mocks.CollectionHelper{}
	suite.MockDBHelper = &mocks.DBHelper{}
	suite.MockManyResult = &mocks.ManyResultsHelper{}
	suite.MockSingleResult = &mocks.SingleResultHelper{}
	suite.UserID = primitive.NewObjectID().Hex()
	suite.PostID = primitive.NewObjectID()
	suite.ResourceIDHex = primitive.NewObjectID().Hex()
}

func (suite *UserDBTestSuite) MockCollHelperFunc(name string, args int, ret ...interface{}) {
	suite.MockCollHelper.(*mocks.CollectionHelper).
		On(name, testUtils.MockArgs(args)...).
		Return(ret...)
}

func (suite *UserDBTestSuite) MockManyResultFunc(name string, args int, ret ...interface{}) {
	suite.MockManyResult.(*mocks.ManyResultsHelper).
		On(name, testUtils.MockArgs(args)...).
		Return(ret...)
}

func (suite *UserDBTestSuite) GetCollectionMockedDB() database.UserDB {
	suite.linkMockHelpers()
	return database.NewUserDB(&suite.MockDBHelper)
}

func (suite *UserDBTestSuite) linkMockHelpers() {
	suite.MockDBHelper.(*mocks.DBHelper).
		On("GetCollection", testUtils.MockArgs(1)...).
		Return(suite.MockCollHelper)
}

func (suite *UserDBTestSuite) TestCountUsers() {
	var count int64
	count = 1
	suite.MockCollHelperFunc("CountAllRecords", 0, count, nil)
	userDB := suite.GetCollectionMockedDB()
	result, err := userDB.CountUsers()
	suite.Equal(count, result)
	suite.Nil(err)
}

func (suite *UserDBTestSuite) TestCreateUser() {
	suite.MockCollHelperFunc("InsertOne", 1, nil, nil)
	suite.MockCollHelperFunc("GetInsertID", 1, "100", nil)
	userDB := suite.GetCollectionMockedDB()
	result, err := userDB.CreateUser(users.User{})
	suite.Equal("100", result)
	suite.Nil(err)
}

func (suite *UserDBTestSuite) TestCreateUserFailure() {
	suite.MockCollHelperFunc("InsertOne", 1, nil, errors.New("err"))
	userDB := suite.GetCollectionMockedDB()
	result, err := userDB.CreateUser(users.User{})
	suite.Equal("", result)
	suite.NotNil(err)
}

// getUserID tests

func (suite *UserDBTestSuite) TestGetUserID() {
	suite.MockCollHelperFunc("GetObjectIDFromFilter", 1, "id", nil)
	userDB := suite.GetCollectionMockedDB()
	result, err := userDB.GetUserID(users.User{Username: "uname", Password: "pword"})
	suite.Equal("id", result)
	suite.Nil(err)
}

func (suite *UserDBTestSuite) TestGetUserIDFailure() {
	suite.MockCollHelperFunc("GetObjectIDFromFilter", 1, "", errors.New("err"))
	userDB := suite.GetCollectionMockedDB()
	result, err := userDB.GetUserID(users.User{Username: "uname", Password: "pword"})
	suite.Equal("", result)
	suite.NotNil(err)
}

// getUserSummary tests

func (suite *UserDBTestSuite) TestGetUserSummaryBadHex() {
	userDB := suite.GetCollectionMockedDB()
	result, err := userDB.GetUserSummary("not hex")
	suite.Equal(users.User{}, result)
	suite.NotNil(err)
}

func (suite *UserDBTestSuite) TestGetUserSummarySuccess() {
	suite.MockSingleResult.(*mocks.SingleResultHelper).On("Decode", mock.Anything).Return(nil).Run(func(args mock.Arguments) {
		arg := args.Get(0).(bson.M)
		arg["fname"] = "M"
		arg["lname"] = "W"
		arg["image"] = "mw.com"
	})
	suite.MockCollHelperFunc("FindOne", 2, suite.MockSingleResult)
	userDB := suite.GetCollectionMockedDB()
	result, err := userDB.GetUserSummary(primitive.NewObjectID().Hex())
	suite.Equal(users.User{FName: "M", LName: "W", Image: "mw.com"}, result)
	suite.Nil(err)
}

func (suite *UserDBTestSuite) TestGetUserSummaryFailure() {
	suite.MockSingleResult.(*mocks.SingleResultHelper).
		On("Decode", mock.Anything).
		Return(errors.New("err")).
		Run(func(args mock.Arguments) {
			arg := args.Get(0).(bson.M)
			arg["fname"] = "M"
			arg["lname"] = "W"
			arg["image"] = "mw.com"
		})
	suite.MockCollHelperFunc("FindOne", 2, suite.MockSingleResult)
	userDB := suite.GetCollectionMockedDB()
	result, err := userDB.GetUserSummary(primitive.NewObjectID().Hex())
	suite.Equal(users.User{}, result)
	suite.NotNil(err)
}

// EditorConfigurationToUser tests

func (suite *UserDBTestSuite) TestGetEditorConfigurations() {
	expected := make([]string, 0)
	suite.MockCollHelperFunc("GetSubArray", 2, expected, nil)
	userDB := suite.GetCollectionMockedDB()
	result, err := userDB.GetEditorConfigurations("id")
	suite.Equal(expected, result)
	suite.Nil(err)
}

func (suite *UserDBTestSuite) TestAddEditorConfigurationWithObjectID() {
	var modifiedCount int64 = 1
	editorConfID := primitive.NewObjectID()
	documentIDHex := primitive.NewObjectID().Hex()

	suite.MockCollHelperFunc("PushToArray", 3, nil, nil)
	suite.MockCollHelperFunc("GetModifiedCount", 1, modifiedCount, nil)
	userDB := suite.GetCollectionMockedDB()
	result, err := userDB.CreateEditorConfiguration(users.CodeEditorConfiguration{ID: editorConfID}, documentIDHex)
	suite.Equal(editorConfID.Hex(), result)
	suite.Nil(err)
}

func (suite *UserDBTestSuite) TestAddEditorConfigurationWithoutObjectID() {
	var modifiedCount int64 = 1
	documentIDHex := primitive.NewObjectID().Hex()

	suite.MockCollHelperFunc("PushToArray", 3, nil, nil)
	suite.MockCollHelperFunc("GetModifiedCount", 1, modifiedCount, nil)
	userDB := suite.GetCollectionMockedDB()
	result, err := userDB.CreateEditorConfiguration(users.CodeEditorConfiguration{}, documentIDHex)
	suite.NotEqual(primitive.NilObjectID, result)
	suite.Nil(err)
}

func (suite *UserDBTestSuite) TestAddEditorConfigurationWithErrorOnUpdate() {
	documentIDHex := primitive.NewObjectID().Hex()

	suite.MockCollHelperFunc("PushToArray", 3, nil, errors.New("err"))
	userDB := suite.GetCollectionMockedDB()
	result, err := userDB.CreateEditorConfiguration(users.CodeEditorConfiguration{}, documentIDHex)
	suite.Equal("", result)
	suite.NotNil(err)
}

func (suite *UserDBTestSuite) TestAddEditorConfigurationWithNoRecordsModified() {
	documentIDHex := primitive.NewObjectID().Hex()

	suite.MockCollHelperFunc("PushToArray", 3, nil, errors.New("err"))
	suite.MockCollHelperFunc("GetModifiedCount", 1, 0, nil)
	userDB := suite.GetCollectionMockedDB()
	result, err := userDB.CreateEditorConfiguration(users.CodeEditorConfiguration{}, documentIDHex)
	suite.Equal("", result)
	suite.NotNil(err)
}

func (suite *UserDBTestSuite) TestGetUserSkills() {
	expected := make([]string, 0)
	suite.MockCollHelperFunc("GetSubArray", 2, expected, nil)
	userDB := suite.GetCollectionMockedDB()
	result, err := userDB.GetUserSkills("id")
	suite.Equal(expected, result)
	suite.Nil(err)
}

func TestUserDBTestSuite(t *testing.T) {
	suite.Run(t, new(UserDBTestSuite))
}
