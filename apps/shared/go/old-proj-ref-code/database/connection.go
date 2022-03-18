package database

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Datastore top level databse helper
type Datastore interface {
	GetErrorReportDB() ErrorReportDB
	GetLearningDB() LearningDB
	GetLearningSuggestionDB() LearningSuggestionDB
	GetUserDB() UserDB
}

// DBHelper wrapper around the mongo-driver Database type
type DBHelper interface {
	Collection(name string) CollectionHelper
	GetCollection(name string) CollectionHelper
	Client() ClientHelper
}

// ClientHelper wrapper around the mongo-driver client
type ClientHelper interface {
	Database(string) DBHelper
	Connect() error
}

type datastore struct{}

// Database main database struct
type database struct {
	db *mongo.Database
}

type mongoClient struct {
	dbClient *mongo.Client
}

// NewClient grabs a new database client
func NewClient() (ClientHelper, error) {
	client, err := mongo.NewClient(options.Client().ApplyURI(MongoURI))
	return &mongoClient{dbClient: client}, err
}

// NewDatabase grabs a new database
func NewDatabase() DBHelper {
	client, _ := NewClient()
	client.Connect()
	return client.Database(DBName)
}

// TestConnection checks if we can connect to our mongo URI
func TestConnection() error {
	client, _ := NewClient()
	return client.Connect()
}

func (wrapper *mongoClient) Database(dbName string) DBHelper {
	db := wrapper.dbClient.Database(dbName)
	return &database{db: db}
}

func (wrapper *mongoClient) Connect() error {
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()
	err := wrapper.dbClient.Connect(ctx)
	if err != nil {
		return err
	}
	err = wrapper.dbClient.Ping(ctx, nil)
	if err != nil {
		return err
	}
	return nil
}

func (wrapper *database) Client() ClientHelper {
	client := wrapper.db.Client()
	return &mongoClient{dbClient: client}
}

func (wrapper *database) Collection(colName string) CollectionHelper {
	collection := wrapper.db.Collection(colName)
	accessor := GetDatabaseAccessor(collection)
	return GetCollectionHelper(accessor)
}

func (wrapper *database) GetCollection(name string) CollectionHelper {
	return NewDatabase().Collection(name)
}

func (ds *datastore) GetErrorReportDB() ErrorReportDB {
	db := NewDatabase()
	return NewErrorReportDB(&db)
}

func (ds *datastore) GetLearningDB() LearningDB {
	db := NewDatabase()
	return NewLearningDB(&db)
}

func (ds *datastore) GetLearningSuggestionDB() LearningSuggestionDB {
	db := NewDatabase()
	return NewLearningSuggestionDB(&db)
}

func (ds *datastore) GetUserDB() UserDB {
	db := NewDatabase()
	return NewUserDB(&db)
}

// GetDatastore return the current datastore
func GetDatastore() Datastore {
	return &datastore{}
}
