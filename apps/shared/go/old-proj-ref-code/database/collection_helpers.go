package database

import (
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// CollectionHelper Helper functions for completing common collection CRUD
type CollectionHelper interface {
	FindOne(filter interface{}, projection interface{}) SingleResultHelper
	Find(interface{}, interface{}) (ManyResultsHelper, error)
	InsertOne(interface{}) (interface{}, error)
	DeleteOne(filter interface{}) (int64, error)
	CountDocuments(filter interface{}, opts ...*options.CountOptions) (int64, error)
	UpdateOne(filter interface{}, projection interface{}) (interface{}, error)
	FindOneAndUpdate(filter interface{}, update interface{}, opts ...*options.FindOneAndUpdateOptions) SingleResultHelper
	GetInsertID(result interface{}) (string, error)
	GetModifiedCount(result interface{}) (int64, error)
	PushToArray(primaryID string, arrayName string, payload interface{}) (interface{}, error)
	CountRecords(filter interface{}) (int64, error)
	CountAllRecords() (int64, error)
	GetObjectIDFromFilter(identifier bson.M) (string, error)
	GetSubArray(primaryID string, arrayName string) (interface{}, error)
	IncrementField(primaryID string, fieldName string) (int, error)
	DecrementField(primaryID string, fieldName string) (int, error)
	UpdateFieldCount(primaryID string, fieldName string, amount int) (int, error)
	IncrementFieldInObjectArray(primaryID string, arrName string, arrayElementID string, arrayObjectField string) (int, error)
	DecrementFieldInObjectArray(primaryID string, arrName string, arrayElementID string, arrayObjectField string) (int, error)
	UpdateCountFieldInObjectArray(primaryID string, arrName string, arrayElementID string, arrayObjectField string, val int) (int, error)
}

type mongoCollection struct {
	accessor MongoCollection
}

// GetCollectionHelper grab the current collection helper
func GetCollectionHelper(accessor MongoCollection) CollectionHelper {
	return &mongoCollection{
		accessor: accessor,
	}
}

// CountAllRecords returns the amount of documents in a table
func (coll *mongoCollection) CountAllRecords() (int64, error) {
	return coll.accessor.CountDocuments(bson.M{})
}

// CountRecords returns the amount of documents in a table
func (coll *mongoCollection) CountRecords(filter interface{}) (int64, error) {
	return coll.accessor.CountDocuments(filter)
}

func (coll *mongoCollection) FindOne(filter interface{}, projection interface{}) SingleResultHelper {
	optionsCasted := make([]*options.FindOneOptions, 0)
	if projection != nil {
		optionsCasted = append(optionsCasted, options.FindOne().SetProjection(projection))
	}
	return coll.accessor.FindOne(filter, optionsCasted...)
}

func (coll *mongoCollection) InsertOne(document interface{}) (interface{}, error) {
	id, err := coll.accessor.InsertOne(document)
	return id.InsertedID, err
}

func (coll *mongoCollection) DeleteOne(filter interface{}) (int64, error) {
	count, err := coll.accessor.DeleteOne(filter)
	return count.DeletedCount, err
}

func (coll *mongoCollection) GetInsertID(result interface{}) (string, error) {
	insertID, ok := result.(primitive.ObjectID)
	if !ok {
		return "", errors.New("Interface conversion error - could not cast to primitive.ObjectID")
	}
	return insertID.Hex(), nil
}

func (coll *mongoCollection) UpdateOne(filter interface{}, projection interface{}) (interface{}, error) {
	return coll.accessor.UpdateOne(filter, projection)
}

func (coll *mongoCollection) GetModifiedCount(result interface{}) (int64, error) {
	updateResult, ok := result.(*mongo.UpdateResult)
	if !ok {
		return 0, errors.New("Interface conversion error - could not cast to mongo.UpdateResult")
	}
	return updateResult.ModifiedCount, nil
}

// IncrementField increments a value on a document by one
func (coll *mongoCollection) IncrementField(primaryID string, fieldName string) (int, error) {
	return coll.UpdateFieldCount(primaryID, fieldName, 1)
}

// IncrementField decrements a value on a document by one
func (coll *mongoCollection) DecrementField(primaryID string, fieldName string) (int, error) {
	return coll.UpdateFieldCount(primaryID, fieldName, -1)
}

// UpdateCountFieldInObjectArray increments/decrements a value in a document's element inside an object array
func (coll *mongoCollection) IncrementFieldInObjectArray(primaryID string, arrName string, arrayElementID string, arrayObjectField string) (int, error) {
	return coll.UpdateCountFieldInObjectArray(primaryID, arrName, arrayElementID, arrayObjectField, 1)
}

// UpdateCountFieldInObjectArray increments/decrements a value in a document's element inside an object array
func (coll *mongoCollection) DecrementFieldInObjectArray(primaryID string, arrName string, arrayElementID string, arrayObjectField string) (int, error) {
	return coll.UpdateCountFieldInObjectArray(primaryID, arrName, arrayElementID, arrayObjectField, -1)
}

// UpdateFieldCount increment/decrements an int value in a document by value passed in
func (coll *mongoCollection) UpdateFieldCount(primaryID string, fieldName string, val int) (int, error) {
	objectID, err := primitive.ObjectIDFromHex(primaryID)
	if err != nil {
		return 0, err
	}

	filter := bson.M{"_id": objectID}
	projection := bson.M{fieldName: val}
	updateExpr := bson.M{"$inc": projection}
	result := coll.updateAndReturnValue(filter, updateExpr, projection)
	if result.Err() != nil {
		return 0, result.Err()
	}

	document := bson.M{}
	result.Decode(document)
	updatedVal := int(document[fieldName].(int32)) + val
	return updatedVal, nil
}

// UpdateCountFieldInObjectArray increments/decrements a value in a document's element inside an object array
func (coll *mongoCollection) UpdateCountFieldInObjectArray(primaryID string, arrName string, arrayElementID string, arrayObjectField string, val int) (int, error) {
	objectID, err := primitive.ObjectIDFromHex(primaryID)
	if err != nil {
		return 0, err
	}
	arrObjectID, err := primitive.ObjectIDFromHex(arrayElementID)
	if err != nil {
		return 0, err
	}

	filterExpr := bson.M{
		"_id":            objectID,
		arrName + "._id": arrObjectID,
	}
	projection := bson.M{
		arrName + ".$." + arrayObjectField: val,
	}
	updateExpr := bson.M{"$inc": projection}

	result := coll.updateAndReturnValue(filterExpr, updateExpr, projection)
	if result.Err() != nil {
		return 0, result.Err()
	}
	document := bson.M{}
	result.Decode(document)
	updatedVal := int(document[arrName].(bson.A)[0].(bson.M)[arrayObjectField].(int32)) + val
	return updatedVal, nil
}

func (coll *mongoCollection) updateAndReturnValue(filter bson.M, updateExpr bson.M, returnProjection bson.M) SingleResultHelper {
	findOpts := options.FindOneAndUpdateOptions{
		Projection: returnProjection,
	}
	return coll.FindOneAndUpdate(filter, updateExpr, &findOpts)
}

func (coll *mongoCollection) GetObjectIDFromFilter(identifier bson.M) (string, error) {
	result := bson.M{}
	coll.FindOne(
		identifier,
		bson.M{"_id": 1},
	).Decode(result)
	if oid, ok := result["_id"]; ok {
		return oid.(primitive.ObjectID).Hex(), nil
	}

	return "", errors.New("Could not retrieve document ID")
}

func (coll *mongoCollection) Find(filter interface{}, projection interface{}) (ManyResultsHelper, error) {
	var cursor ManyResultsHelper
	var err error

	if projection != nil {
		cursor, err = coll.accessor.Find(filter, options.Find().SetProjection(projection))
	} else {
		cursor, err = coll.accessor.Find(filter)
	}

	if err != nil {
		return nil, err
	}
	return cursor, nil
}

func (coll *mongoCollection) GetSubArray(primaryID string, arrayName string) (interface{}, error) {
	documentOID, err := primitive.ObjectIDFromHex(primaryID)
	if err != nil {
		return nil, err
	}
	result := bson.M{}
	filter := bson.M{"_id": documentOID}
	projection := options.FindOne().SetProjection(bson.M{"_id": 0, arrayName: 1})

	coll.accessor.FindOne(filter, projection).Decode(&result)
	return result[arrayName], nil
}

func (coll *mongoCollection) PushToArray(primaryID string, arrayName string, payload interface{}) (interface{}, error) {
	documentOID, err := primitive.ObjectIDFromHex(primaryID)
	if err != nil {
		return nil, err
	}

	filter := bson.M{"_id": documentOID}
	projection := bson.M{"$push": bson.M{arrayName: payload}}
	return coll.accessor.UpdateOne(filter, projection)
}

func (coll *mongoCollection) CountDocuments(filter interface{}, opts ...*options.CountOptions) (int64, error) {
	return coll.accessor.CountDocuments(filter, opts...)
}

func (coll *mongoCollection) FindOneAndUpdate(filter interface{}, update interface{}, opts ...*options.FindOneAndUpdateOptions) SingleResultHelper {
	return coll.accessor.FindOneAndUpdate(filter, update, opts...)
}
