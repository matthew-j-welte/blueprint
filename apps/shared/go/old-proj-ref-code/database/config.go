package database

import "os"

// DBName the name of the main database
const DBName = "bitboard-dev"

// HostName the svc name of the database
var HostName = os.Getenv("DATABASE_URL")

// MongoURI the mongoURI to connect to
var MongoURI = "mongodb://" + HostName + "/"
