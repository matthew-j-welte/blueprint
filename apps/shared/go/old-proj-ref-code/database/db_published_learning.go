package database

import (
	"errors"

	"github.com/matthew-j-welte/bit-board/server/models/resources"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const resourcesDB = "resources"

// LearningDB the learning resources DB
type LearningDB interface {
	GetAll() ([]bson.M, error)
	AddPostToResource(post resources.ResourcePost, resourceID string) (string, error)
	IncrementResourceViews(resourceID string) (int, error)
	IncrementResourcePostLikeCount(resourceID string, postID string) (int, error)
	DecrementResourcePostLikeCount(resourceID string, postID string) (int, error)
	IncrementResourcePostReportCount(resourceID string, postID string) (int, error)
	DecrementResourcePostReportCount(resourceID string, postID string) (int, error)
}

type learningDB struct {
	helper DBHelper
}

// NewLearningDB return a new learning database
func NewLearningDB(helper *DBHelper) LearningDB {
	return &learningDB{
		helper: *helper,
	}
}

// GetResources get all learning resources
func (learning *learningDB) GetAll() ([]bson.M, error) {
	collectionHelper := learning.helper.GetCollection(resourcesDB)
	var resources []bson.M
	cursor, err := collectionHelper.Find(bson.D{}, nil)
	if err != nil {
		return nil, err
	}

	if cursor == nil {
		return nil, errors.New("No cursor returned from the Find query")
	}
	resources, err = cursor.Decode()
	if err != nil {
		return nil, err
	}
	return resources, nil
}

// AddPostToResource adds a post to a learning resource
func (learning *learningDB) AddPostToResource(post resources.ResourcePost, resourceID string) (string, error) {
	collectionHelper := learning.helper.GetCollection(resourcesDB)
	if post.ID == primitive.NilObjectID {
		post.ID = primitive.NewObjectID()
	}

	result, err := collectionHelper.PushToArray(resourceID, "posts", post)
	if err != nil {
		return "", err
	}

	modifiedCount, err := collectionHelper.GetModifiedCount(result)
	if err != nil || modifiedCount == 0 {
		return "", errors.New("Failed to add post to resource - No documents modified")
	}
	return post.ID.Hex(), nil
}

// IncrementResourceViews increments the views on a resource
func (learning *learningDB) IncrementResourceViews(resourceID string) (int, error) {
	collectionHelper := learning.helper.GetCollection(resourcesDB)
	return collectionHelper.IncrementField(resourceID, "viewers")
}

// IncrementResourcePostLikeCount increments the likes on a resources post
func (learning *learningDB) IncrementResourcePostLikeCount(resourceID string, postID string) (int, error) {
	collectionHelper := learning.helper.GetCollection(resourcesDB)
	return collectionHelper.IncrementFieldInObjectArray(resourceID, "posts", postID, "likes")
}

// DecrementResourcePostLikeCount decrements the likes on a resources post
func (learning *learningDB) DecrementResourcePostLikeCount(resourceID string, postID string) (int, error) {
	collectionHelper := learning.helper.GetCollection(resourcesDB)
	return collectionHelper.DecrementFieldInObjectArray(resourceID, "posts", postID, "likes")
}

// IncrementResourcePostReportCount increments the likes on a resources post
func (learning *learningDB) IncrementResourcePostReportCount(resourceID string, postID string) (int, error) {
	collectionHelper := learning.helper.GetCollection(resourcesDB)
	return collectionHelper.IncrementFieldInObjectArray(resourceID, "posts", postID, "reports")
}

// DecrementResourcePostReportCount decrements the likes on a resources post
func (learning *learningDB) DecrementResourcePostReportCount(resourceID string, postID string) (int, error) {
	collectionHelper := learning.helper.GetCollection(resourcesDB)
	return collectionHelper.DecrementFieldInObjectArray(resourceID, "posts", postID, "reports")
}
