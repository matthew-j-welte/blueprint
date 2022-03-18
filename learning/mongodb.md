# MongoDB

## Data Modelling

### Top Level Info

**Embedded Data Models**

Embedded data models allow applications to store related pieces of information in the same database record. As a result, applications may need to issue fewer queries and updates to complete common operations.

In general, use embedded data models when:

- you have "contains" relationships between entities.
- you have one-to-many relationships between entities. In these relationships the "many" or child documents always appear with or are viewed in the context of the "one" or parent documents.

In general, embedding provides better performance for read operations, as well as the ability to request and retrieve related data in a single database operation. Embedded data models make it possible to update related data in a single atomic write operation.

**Normalized Data Models**

Normalized data models describe relationships using references between documents.

In general, use normalized data models:

- when embedding would result in duplication of data but would not provide sufficient read performance advantages to outweigh the implications of the duplication.
- to represent more complex many-to-many relationships.
- to model large hierarchical data sets.

**Joins**

To join collections, MongoDB provides the aggregation stages:

- $lookup (Available starting in MongoDB 3.2)
- $graphLookup (Available starting in MongoDB 3.4)

MongoDB also provides referencing to join data across collections.

**Atomicity**

In MongoDB, a write operation is atomic on the level of a single document, even if the operation modifies multiple embedded documents within a single document. When a single write operation modifies multiple documents (e.g. db.collection.updateMany()), the modification of each document is atomic, but the operation as a whole is not atomic.

**Indexes**

Use indexes to improve performance for common queries. Build indexes on fields that appear often in queries and for all operations that return sorted results. MongoDB automatically creates a unique index on the \_id field.

As you create indexes, consider the following behaviors of indexes:

- Each index requires at least 8 kB of data space.
- Adding an index has some negative performance impact for write operations. For collections with high write-to-read ratio, indexes are expensive since each insert must also update any indexes.
- Collections with high read-to-write ratio often benefit from additional indexes. Indexes do not affect un-indexed read operations.
- When active, each index consumes disk space and memory. This usage can be significant and should be tracked for capacity planning, especially for concerns over working set size.

**Large Number of Collections**

If the total number of documents is low, you may group documents into collection by type. For logs, consider maintaining distinct log collections, such as logs_dev and logs_debug. The logs_dev collection would contain only the documents related to the dev environment.

Generally, having a large number of collections has no significant performance penalty and results in very good performance. Distinct collections are very important for high-throughput batch processing.

When using models that have a large number of collections, consider the following behaviors:

- Each collection has a certain minimum overhead of a few kilobytes.
- Each index, including the index on \_id, requires at least 8 kB of data space.
- For each database, a single namespace file (i.e. <database>.ns) stores all meta-data for that database, and each index and collection has its own entry in the namespace file. See places namespace length limits for specific limitations.

---

### Patterns

**FULL REF**: https://docs.mongodb.com/manual/tutorial/model-embedded-one-to-one-relationships-between-documents/

_In general, you should structure your schema so your application receives all of its required information in a single read operation._

**Embedded Document Pattern**

If the address data is frequently retrieved with the name information, then with referencing, your application needs to issue multiple queries to resolve the reference. The better data model would be to embed the address data in the patron data, as in the following document:

````json
{
   _id: "joe",
   name: "Joe Bookreader",
   address: {
              street: "123 Fake Street",
              city: "Faketon",
              state: "MA",
              zip: "12345"
            }
}
```

With the embedded data model, your application can retrieve the complete patron information with one query.
````

**Subset Pattern**

A potential problem with the embedded document pattern is that it can lead to large documents that contain fields that the application does not need. This unnecessary data can cause extra load on your server and slow down read operations. Instead, you can use the subset pattern to retrieve the subset of data which is accessed the most frequently in a single database call.

Consider an application that shows information on movies. The database contains a movie collection with the following schema:

```json
{
  "_id": 1,
  "title": "The Arrival of a Train",
  "year": 1896,
  "runtime": 1,
  "released": ISODate("01-25-1896"),
  "poster": "http://ia.media-imdb.com/images/M/MV5BMjEyNDk5MDYzOV5BMl5BanBnXkFtZTgwNjIxMTEwMzE@._V1_SX300.jpg",
  "plot": "A group of people are standing in a straight line along the platform of a railway station, waiting for a train, which is seen coming at some distance. When the train stops at the platform, ...",
  "fullplot": "A group of people are standing in a straight line along the platform of a railway station, waiting for a train, which is seen coming at some distance. When the train stops at the platform, the line dissolves. The doors of the railway-cars open, and people on the platform help passengers to get off.",
  "lastupdated": ISODate("2015-08-15T10:06:53"),
  "type": "movie",
  "directors": [ "Auguste Lumière", "Louis Lumière" ],
  "imdb": {
    "rating": 7.3,
    "votes": 5043,
    "id": 12
  },
  "countries": [ "France" ],
  "genres": [ "Documentary", "Short" ],
  "tomatoes": {
    "viewer": {
      "rating": 3.7,
      "numReviews": 59
    },
    "lastUpdated": ISODate("2020-01-09T00:02:53")
  }
}
```

Currently, the movie collection contains several fields that the application does not need to show a simple overview of a movie, such as fullplot and rating information. Instead of storing all of the movie data in a single collection, you can split the collection into two collections:

The movie collection contains basic information on a movie. This is the data that the application loads by default:

```json
// movie collection
{
  "_id": 1,
  "title": "The Arrival of a Train",
  "year": 1896,
  "runtime": 1,
  "released": ISODate("1896-01-25"),
  "type": "movie",
  "directors": [ "Auguste Lumière", "Louis Lumière" ],
  "countries": [ "France" ],
  "genres": [ "Documentary", "Short" ],
}
```

The movie_details collection contains additional, less frequently-accessed data for each movie:

```json
// movie_details collection
{
  "_id": 156,
  "movie_id": 1, // reference to the movie collection
  "poster": "http://ia.media-imdb.com/images/M/MV5BMjEyNDk5MDYzOV5BMl5BanBnXkFtZTgwNjIxMTEwMzE@._V1_SX300.jpg",
  "plot": "A group of people are standing in a straight line along the platform of a railway station, waiting for a train, which is seen coming at some distance. When the train stops at the platform, ...",
  "fullplot": "A group of people are standing in a straight line along the platform of a railway station, waiting for a train, which is seen coming at some distance. When the train stops at the platform, the line dissolves. The doors of the railway-cars open, and people on the platform help passengers to get off.",
  "lastupdated": ISODate("2015-08-15T10:06:53"),
  "imdb": {
    "rating": 7.3,
    "votes": 5043,
    "id": 12
  },
  "tomatoes": {
    "viewer": {
      "rating": 3.7,
      "numReviews": 59
    },
    "lastUpdated": ISODate("2020-01-29T00:02:53")
  }
}
```

This method improves read performance because it requires the application to read less data to fulfill its most common request. The application can make an additional database call to fetch the less-frequently accessed data if needed.

Using smaller documents containing more frequently-accessed data reduces the overall size of the working set. These smaller documents result in improved read performance and make more memory available for the application.

However, it is important to understand your application and the way it loads data. If you split your data into multiple collections improperly, your application will often need to make multiple trips to the database and rely on JOIN operations to retrieve all of the data that it needs.

In addition, splitting your data into many small collections may increase required database maintenance, as it may become difficult to track what data is stored in which collection.
