package database

import (
	"errors"

	"github.com/matthew-j-welte/bit-board/server/models/users"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const userDBName = "users"

// UserDB the user database collection
type UserDB interface {
	CountUsers() (int64, error)
	CreateUser(user users.User) (string, error)
	GetUserID(user users.User) (string, error)
	GetUserSummary(userID string) (users.User, error)
	GetEditorConfigurations(userID string) (interface{}, error)
	CreateEditorConfiguration(editorConfig users.CodeEditorConfiguration, documentID string) (string, error)
	GetUserSkills(userID string) (interface{}, error)
}

type userDB struct {
	helper DBHelper
}

// NewUserDB return a new UserDB
func NewUserDB(helper *DBHelper) UserDB {
	return &userDB{
		helper: *helper,
	}
}

// CountUsers counts all users
func (usr *userDB) CountUsers() (int64, error) {
	collectionHelper := usr.helper.GetCollection(userDBName)
	return collectionHelper.CountAllRecords()
}

// CreateUser creates a new user in the database
func (usr *userDB) CreateUser(user users.User) (string, error) {
	collectionHelper := usr.helper.GetCollection(userDBName)
	result, err := collectionHelper.InsertOne(user)
	if err != nil {
		return "", err
	}
	return collectionHelper.GetInsertID(result)
}

// GetUserID gets the users ID based on a subsection of the user model
func (usr *userDB) GetUserID(user users.User) (string, error) {
	collectionHelper := usr.helper.GetCollection(userDBName)
	return collectionHelper.GetObjectIDFromFilter(
		bson.M{
			"username": user.Username,
			"password": user.Password},
	)
}

// GetUserSummary gets the name and profile photo of a user
func (usr *userDB) GetUserSummary(userID string) (users.User, error) {
	collectionHelper := usr.helper.GetCollection(userDBName)
	usrSummary := bson.M{}
	userOID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return users.User{}, err
	}
	err = collectionHelper.FindOne(
		bson.M{"_id": userOID},
		bson.M{"_id": 0, "fname": 1, "lname": 1, "image": 1},
	).Decode(usrSummary)
	if err != nil {
		return users.User{}, err
	}

	return users.User{
		FName: usrSummary["fname"].(string),
		LName: usrSummary["lname"].(string),
		Image: usrSummary["image"].(string),
	}, nil
}

// GetEditorConfigurations retrieve all saved editor configurations for a user
func (usr *userDB) GetEditorConfigurations(userID string) (interface{}, error) {
	collectionHelper := usr.helper.GetCollection(userDBName)
	return collectionHelper.GetSubArray(userID, "editorconfs")
}

// CreateEditorConfiguration creates a new editor configuration for a user
func (usr *userDB) CreateEditorConfiguration(editorConfig users.CodeEditorConfiguration, documentID string) (string, error) {
	collectionHelper := usr.helper.GetCollection(userDBName)
	if editorConfig.ID == primitive.NilObjectID {
		editorConfig.ID = primitive.NewObjectID()
	}

	result, err := collectionHelper.PushToArray(documentID, "editorconfs", editorConfig)
	if err != nil {
		return "", err
	}

	modifiedCount, err := collectionHelper.GetModifiedCount(result)
	if err != nil || modifiedCount == 0 {
		return "", errors.New("Failed to save editor configuration - No documents were modified")
	}
	return editorConfig.ID.Hex(), nil

}

// GetUserSkills retrieve all saved editor configurations for a user
func (usr *userDB) GetUserSkills(userID string) (interface{}, error) {
	collectionHelper := usr.helper.GetCollection(userDBName)
	return collectionHelper.GetSubArray(userID, "skills")
}
