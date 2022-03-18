package database_test

import (
	"errors"
	"testing"

	"github.com/matthew-j-welte/bit-board/server/database"
	"github.com/matthew-j-welte/bit-board/server/database/mocks"
	testUtils "github.com/matthew-j-welte/bit-board/server/testing"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type CollectionHelpersSuite struct {
	suite.Suite
	MockAccessor     database.MongoCollection
	MockCollHelper   database.CollectionHelper
	MockManyResult   database.ManyResultsHelper
	MockSingleResult database.SingleResultHelper
	MockPKString     string
	MockFieldName    string
	MockArrayName    string
	MockCountValue   int32
}

func (suite *CollectionHelpersSuite) SetupTest() {
	suite.MockAccessor = &mocks.MongoCollection{}
	suite.MockCollHelper = &mocks.CollectionHelper{}
	suite.MockManyResult = &mocks.ManyResultsHelper{}
	suite.MockSingleResult = &mocks.SingleResultHelper{}
	suite.MockPKString = primitive.NewObjectID().Hex()
	suite.MockFieldName = "views"
	suite.MockArrayName = "posts"
	suite.MockCountValue = int32(5)
}

func (suite *CollectionHelpersSuite) MockAccessorFunc(name string, args int, ret ...interface{}) {
	suite.MockAccessor.(*mocks.MongoCollection).
		On(name, testUtils.MockArgs(args)...).
		Return(ret...)
}

func (suite *CollectionHelpersSuite) MockSingleResultFunc(name string, args int, ret ...interface{}) {
	suite.MockSingleResult.(*mocks.SingleResultHelper).
		On(name, testUtils.MockArgs(args)...).
		Return(ret...)
}

func (suite *CollectionHelpersSuite) GetAccessorMockedCollection() database.CollectionHelper {
	return database.GetCollectionHelper(suite.MockAccessor)
}

func (suite *CollectionHelpersSuite) TestCountAllRecords() {
	var count int64 = 1
	suite.MockAccessorFunc("CountDocuments", 1, count, nil)
	collHelper := suite.GetAccessorMockedCollection()

	result, err := collHelper.CountAllRecords()
	suite.Equal(result, count)
	suite.Nil(err)
}

func (suite *CollectionHelpersSuite) TestCountRecordsWithFilter() {
	var count int64 = 1
	suite.MockAccessorFunc("CountDocuments", 1, count, nil)
	collHelper := suite.GetAccessorMockedCollection()

	result, err := collHelper.CountRecords(nil)
	suite.Equal(result, count)
	suite.Nil(err)
}

func (suite *CollectionHelpersSuite) TestFindOneNoOptions() {
	filter := bson.M{"id": 1}
	suite.MockAccessorFunc("FindOne", 1, nil)
	collHelper := suite.GetAccessorMockedCollection()

	collHelper.FindOne(filter, nil)

	called := suite.MockAccessor.(*mocks.MongoCollection).AssertCalled(suite.T(), "FindOne", filter)
	suite.True(called)
}

func (suite *CollectionHelpersSuite) TestFindOneWithProjection() {
	var singleResult *mongo.SingleResult = nil
	filter := bson.M{"_id": 1}
	projection := bson.M{"_id": 0}
	suite.MockAccessorFunc("FindOne", 3, singleResult)
	collHelper := suite.GetAccessorMockedCollection()
	collHelper.FindOne(filter, projection)

	called := suite.MockAccessor.(*mocks.MongoCollection).AssertCalled(
		suite.T(),
		"FindOne",
		filter,
		options.FindOne().SetProjection(projection),
	)
	suite.True(called)
}

func (suite *CollectionHelpersSuite) TestInsertOne() {
	res := mongo.InsertOneResult{InsertedID: "100"}
	suite.MockAccessorFunc("InsertOne", 1, &res, nil)
	collHelper := suite.GetAccessorMockedCollection()

	result, err := collHelper.InsertOne(nil)
	suite.Equal(res.InsertedID, result)
	suite.Nil(err)
}

func (suite *CollectionHelpersSuite) TestDeleteOne() {
	res := mongo.DeleteResult{DeletedCount: 1}
	suite.MockAccessorFunc("DeleteOne", 1, &res, nil)
	collHelper := suite.GetAccessorMockedCollection()

	result, err := collHelper.DeleteOne(nil)
	suite.Equal(res.DeletedCount, result)
	suite.Nil(err)
}

func (suite *CollectionHelpersSuite) TestGetInsertID() {
	collHelper := suite.GetAccessorMockedCollection()
	oid := primitive.NewObjectID()
	result, err := collHelper.GetInsertID(oid)
	suite.Equal(oid.Hex(), result)
	suite.Nil(err)
}

func (suite *CollectionHelpersSuite) TestGetInsertIDFailure() {
	collHelper := suite.GetAccessorMockedCollection()
	oid := "something"
	result, err := collHelper.GetInsertID(oid)
	suite.Equal("", result)
	suite.NotNil(err)
}

func (suite *CollectionHelpersSuite) TestUpdateOne() {
	ur := mongo.UpdateResult{}
	suite.MockAccessorFunc("UpdateOne", 2, &ur, nil)
	collHelper := suite.GetAccessorMockedCollection()

	result, err := collHelper.UpdateOne(nil, nil)
	suite.Equal(&ur, result)
	suite.Nil(err)
}

func (suite *CollectionHelpersSuite) TestGetModifiedCount() {
	collHelper := suite.GetAccessorMockedCollection()
	updateResult := mongo.UpdateResult{ModifiedCount: 1}
	result, err := collHelper.GetModifiedCount(&updateResult)
	suite.Equal(updateResult.ModifiedCount, result)
	suite.Nil(err)
}

func (suite *CollectionHelpersSuite) TestGetModifiedCountFailure() {
	collHelper := suite.GetAccessorMockedCollection()
	updateResult := "wrong type"
	result, err := collHelper.GetModifiedCount(updateResult)
	suite.Equal(int64(0), result)
	suite.NotNil(err)
}

func (suite *CollectionHelpersSuite) getUpdateFieldMockedHelper() database.CollectionHelper {
	suite.MockSingleResultFunc("Err", 0, nil)
	suite.MockSingleResult.(*mocks.SingleResultHelper).On("Decode", mock.Anything).Return(nil).Run(func(args mock.Arguments) {
		arg := args.Get(0).(bson.M)
		arg[suite.MockFieldName] = suite.MockCountValue
	})
	suite.MockAccessorFunc("FindOneAndUpdate", 3, suite.MockSingleResult)
	return suite.GetAccessorMockedCollection()
}

func (suite *CollectionHelpersSuite) TestIncrementField() {
	collHelper := suite.getUpdateFieldMockedHelper()

	result, err := collHelper.IncrementField(suite.MockPKString, suite.MockFieldName)
	suite.Equal(int(suite.MockCountValue+1), result)
	suite.Nil(err)
}

func (suite *CollectionHelpersSuite) TestDecrementField() {
	collHelper := suite.getUpdateFieldMockedHelper()

	result, err := collHelper.DecrementField(suite.MockPKString, suite.MockFieldName)
	suite.Equal(int(suite.MockCountValue-1), result)
	suite.Nil(err)
}

func (suite *CollectionHelpersSuite) TestUpdateFieldCount() {
	updateVal := int32(1)
	collHelper := suite.getUpdateFieldMockedHelper()

	result, err := collHelper.UpdateFieldCount(suite.MockPKString, suite.MockFieldName, int(updateVal))
	suite.Equal(int(suite.MockCountValue+updateVal), result)
	suite.Nil(err)
}

func (suite *CollectionHelpersSuite) TestUpdateFieldCountIDError() {
	collHelper := suite.GetAccessorMockedCollection()
	result, err := collHelper.UpdateFieldCount("invalid", "fieldName", 5)
	suite.Equal(0, result)
	suite.NotNil(err)
}

func (suite *CollectionHelpersSuite) TestUpdateFieldCountResultError() {
	primID := primitive.NewObjectID().Hex()
	suite.MockSingleResultFunc("Err", 0, errors.New("err"))
	suite.MockSingleResult.(*mocks.SingleResultHelper).On("Decode", mock.Anything).Return(nil)
	suite.MockAccessorFunc("FindOneAndUpdate", 3, suite.MockSingleResult)
	collHelper := suite.GetAccessorMockedCollection()

	result, err := collHelper.UpdateFieldCount(primID, "fieldName", 5)
	suite.Equal(0, result)
	suite.NotNil(err)
}

func (suite *CollectionHelpersSuite) getUpdateFieldInArrayCollHelper() database.CollectionHelper {
	suite.MockSingleResultFunc("Err", 0, nil)
	suite.MockSingleResult.(*mocks.SingleResultHelper).On("Decode", mock.Anything).Return(nil).Run(func(args mock.Arguments) {
		arg := args.Get(0).(bson.M)
		arr := bson.A{bson.M{suite.MockFieldName: suite.MockCountValue}}
		arg[suite.MockArrayName] = arr
	})
	suite.MockAccessorFunc("FindOneAndUpdate", 3, suite.MockSingleResult)
	return suite.GetAccessorMockedCollection()
}

func (suite *CollectionHelpersSuite) TestIncrementFieldInArray() {
	collHelper := suite.getUpdateFieldInArrayCollHelper()

	result, err := collHelper.IncrementFieldInObjectArray(
		suite.MockPKString, suite.MockArrayName, suite.MockPKString, suite.MockFieldName)
	suite.Equal(int(suite.MockCountValue+1), result)
	suite.Nil(err)
}

func (suite *CollectionHelpersSuite) TestDecrementFieldInArray() {
	collHelper := suite.getUpdateFieldInArrayCollHelper()

	result, err := collHelper.DecrementFieldInObjectArray(
		suite.MockPKString, suite.MockArrayName, suite.MockPKString, suite.MockFieldName)
	suite.Equal(int(suite.MockCountValue-1), result)
	suite.Nil(err)
}

func (suite *CollectionHelpersSuite) TestUpdateCountFieldInObjectArray() {
	updateVal := int32(1)
	collHelper := suite.getUpdateFieldInArrayCollHelper()

	result, err := collHelper.UpdateCountFieldInObjectArray(
		suite.MockPKString, suite.MockArrayName, suite.MockPKString, suite.MockFieldName, int(updateVal))
	suite.Equal(int(suite.MockCountValue+updateVal), result)
	suite.Nil(err)
}

func (suite *CollectionHelpersSuite) TestUpdateCountFieldInObjectArrayIDError() {
	collHelper := suite.GetAccessorMockedCollection()
	result, err := collHelper.UpdateCountFieldInObjectArray("invalid", "arrname", "arrID", "field", 5)
	suite.Equal(0, result)
	suite.NotNil(err)

	result, err = collHelper.UpdateCountFieldInObjectArray(primitive.NewObjectID().Hex(), "arrname", "invalid", "field", 5)
	suite.Equal(0, result)
	suite.NotNil(err)
}

func (suite *CollectionHelpersSuite) TestUpdateCountFieldInObjectArrayResultError() {
	primID := primitive.NewObjectID().Hex()
	suite.MockSingleResultFunc("Err", 0, errors.New("err"))
	suite.MockSingleResult.(*mocks.SingleResultHelper).On("Decode", mock.Anything).Return(nil)
	suite.MockAccessorFunc("FindOneAndUpdate", 3, suite.MockSingleResult)
	collHelper := suite.GetAccessorMockedCollection()

	result, err := collHelper.UpdateCountFieldInObjectArray(primID, "arrName", "arrID", "fieldName", 5)
	suite.Equal(0, result)
	suite.NotNil(err)
}

func (suite *CollectionHelpersSuite) TestGetObjectIDFromFilter() {
	suite.MockSingleResult.(*mocks.SingleResultHelper).On("Decode", mock.Anything).Return(nil).Run(func(args mock.Arguments) {
		arg := args.Get(0).(bson.M)
		arg["_id"], _ = primitive.ObjectIDFromHex(suite.MockPKString)
	})
	suite.MockAccessorFunc("FindOne", 3, suite.MockSingleResult)
	collHelper := suite.GetAccessorMockedCollection()

	filter := bson.M{}
	result, err := collHelper.GetObjectIDFromFilter(filter)
	suite.Equal(suite.MockPKString, result)
	suite.Nil(err)
}

func (suite *CollectionHelpersSuite) TestGetObjectIDFromFilterFailure() {
	suite.MockSingleResult.(*mocks.SingleResultHelper).On("Decode", mock.Anything).Return(nil).Run(func(args mock.Arguments) {
		arg := args.Get(0).(bson.M)
		arg["blah"] = "something"
	})
	suite.MockAccessorFunc("FindOne", 3, suite.MockSingleResult)
	collHelper := suite.GetAccessorMockedCollection()

	result, err := collHelper.GetObjectIDFromFilter(bson.M{})
	suite.Equal("", result)
	suite.NotNil(err)
}

func (suite *CollectionHelpersSuite) TestFind() {
	filter := bson.M{}
	projection := bson.M{}
	suite.MockAccessorFunc("Find", 2, nil, nil)

	collHelper := suite.GetAccessorMockedCollection()
	result, err := collHelper.Find(filter, projection)
	called := suite.MockAccessor.(*mocks.MongoCollection).AssertCalled(
		suite.T(),
		"Find",
		filter,
		options.Find().SetProjection(projection),
	)
	suite.True(called)
	suite.Equal(nil, result)
	suite.Nil(err)
}

func (suite *CollectionHelpersSuite) TestFindNoProjection() {
	filter := bson.M{}
	suite.MockAccessorFunc("Find", 1, nil, nil)

	collHelper := suite.GetAccessorMockedCollection()
	result, err := collHelper.Find(filter, nil)
	called := suite.MockAccessor.(*mocks.MongoCollection).AssertCalled(
		suite.T(),
		"Find",
		filter,
	)
	suite.True(called)
	suite.Equal(nil, result)
	suite.Nil(err)
}

func (suite *CollectionHelpersSuite) TestFindFailure() {
	filter := bson.M{}
	suite.MockAccessorFunc("Find", 1, nil, errors.New("err"))

	collHelper := suite.GetAccessorMockedCollection()
	result, err := collHelper.Find(filter, nil)
	suite.Equal(nil, result)
	suite.NotNil(err)
}

func (suite *CollectionHelpersSuite) TestGetSubArray() {
	suite.MockSingleResult.(*mocks.SingleResultHelper).On("Decode", mock.Anything).Return(nil).Run(func(args mock.Arguments) {
		arg := args.Get(0).(*bson.M)
		arr := bson.A{1, 2, 3}
		(*arg)[suite.MockArrayName] = arr
	})
	suite.MockAccessorFunc("FindOne", 2, suite.MockSingleResult)
	collHelper := suite.GetAccessorMockedCollection()
	result, err := collHelper.GetSubArray(suite.MockPKString, suite.MockArrayName)
	suite.Equal(bson.A{1, 2, 3}, result)
	suite.Nil(err)
}

func (suite *CollectionHelpersSuite) TestPushToArray() {
	suite.MockAccessorFunc("UpdateOne", 2, nil, nil)
	collHelper := suite.GetAccessorMockedCollection()
	_, err := collHelper.PushToArray(suite.MockPKString, suite.MockArrayName, bson.M{})
	suite.Nil(err)
}

func (suite *CollectionHelpersSuite) TestPushToArrayFailure() {
	collHelper := suite.GetAccessorMockedCollection()
	result, err := collHelper.PushToArray("invalid", suite.MockArrayName, bson.M{})
	suite.Equal(nil, result)
	suite.NotNil(err)
}

func TestCollectionHelperSuite(t *testing.T) {
	suite.Run(t, new(CollectionHelpersSuite))
}
