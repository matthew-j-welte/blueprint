package database

import (
	"github.com/matthew-j-welte/bit-board/server/models/resources"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const resourceSuggestionDB = "suggested-resources"

// LearningSuggestionDB the learning suggestions DB
type LearningSuggestionDB interface {
	Create(resource resources.ResourceSuggestion, userID string) (string, error)
}

type learningSuggestionDB struct {
	helper DBHelper
}

// NewLearningSuggestionDB return a new learning suggestion DB
func NewLearningSuggestionDB(helper *DBHelper) LearningSuggestionDB {
	return &learningSuggestionDB{
		helper: *helper,
	}
}

// CreateResourceSuggestion creates a learning resource suggestion in the helper
func (learningSuggestion *learningSuggestionDB) Create(resource resources.ResourceSuggestion, userID string) (string, error) {
	collectionHelper := learningSuggestion.helper.GetCollection(resourceSuggestionDB)
	userOID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return "", nil
	}

	resource.Poster = userOID
	result, err := collectionHelper.InsertOne(resource)
	if err != nil {
		return "", err
	}
	return collectionHelper.GetInsertID(result)
}
