package database

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// SingleResultHelper wrapper around the mongo-driver SingleResult type
type SingleResultHelper interface {
	Decode(v interface{}) error
	Err() error
}

// ManyResultsHelper wrapper around the mongo-driver Cursor type
type ManyResultsHelper interface {
	Decode() ([]bson.M, error)
}

// MongoCursor wrapper around the mongo cursor
type MongoCursor interface {
	Close(context.Context) error
	Next(context.Context) bool
	Decode(interface{}) error
	Err() error
}

type mongoSingleResult struct {
	dbSingleResult *mongo.SingleResult
}

type mongoManyResult struct {
	mongoCursor *mongo.Cursor
}

type resultIterator struct {
	cursor *mongo.Cursor
}

func (wrapper *mongoSingleResult) Decode(payload interface{}) error {
	return wrapper.dbSingleResult.Decode(payload)
}

func (wrapper *mongoSingleResult) Err() error {
	return wrapper.dbSingleResult.Err()
}

func (wrapper *mongoManyResult) Decode() ([]bson.M, error) {
	return decodeCursor(wrapper.mongoCursor)
}

func decodeCursor(result MongoCursor) ([]bson.M, error) {
	var payload []bson.M
	defer result.Close(context.Background())
	for result.Next(context.Background()) {
		item := bson.M{}
		err := result.Decode(item)
		if err != nil {
			return nil, result.Err()
		}
		payload = append(payload, item)
	}
	return payload, result.Err()
}
