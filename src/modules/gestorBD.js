module.exports = {
    mongo: null,
    app: null,
    init: function (app, mongo) {
        this.mongo = mongo;
        this.app = app;
    },
    getEntityCollection: function (collectionName, criteria, functionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                functionCallback(null);
            } else {
                let collection = db.collection(collectionName);
                collection.find(criteria).toArray(function (err, list) {
                    functionCallback(err ? null : list);
                    db.close();
                });
            }
        });
    },
    getEntityById: function (collectionName, id, functionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                functionCallback(null);
            } else {
                let collection = db.collection(collectionName);
                var criteria = { "_id": id }
                collection.find(criteria).toArray(function (err, list) {
                    functionCallback(err ? null : list[0]);
                    db.close();
                });
            }
        });
    },
    insertEntity: function (collectionName, entity, functionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                functionCallback(null);
            } else {
                let collection = db.collection(collectionName);
                collection.insert(entity, function (err, result) {
                    functionCallback(err ? null : result.ops[0]._id);
                    db.close();
                });
            }
        });
    },
    updateEntity : function(collectionName, criteria, entity, functionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
            if (err) {
                functionCallback(null);
            } else {
                let collection = db.collection(collectionName);
                collection.update(criteria, {$set: entity}, function(err, result) {
                    if (err) {
                        functionCallback(null);
                    } else {
                        functionCallback(result);
                    }
                    db.close();
                });
            }
        });
    }
}