module.exports = {
    mongo : null,
    app : null,
    init : function(app, mongo) {
        this.mongo = mongo;
        this.app = app;
    },
    getClients : function(criteria, functionCallback){
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
            if (err) {
                functionCallback(null);
            } else {
                let collection = db.collection('clientes');
                collection.find(criteria).toArray(function(err, clients) {
                    if (err) {
                        functionCallback(null);
                    } else {
                        functionCallback(clients);
                    }
                    db.close();
                });
            }
        });
    },
    getClient : function(id, functionCallback){
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
            if (err) {
                functionCallback(null);
            } else {
                let collection = db.collection('clientes');
                var criteria = { "_id" : id}
                collection.find(criteria).toArray(function(err, clients) {
                    if (err) {
                        functionCallback(null);
                    } else {
                        functionCallback(clients[0]);
                    }
                    db.close();
                });
            }
        });
    },
    insertClient : function(client, functionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
            if (err) {
                functionCallback(null);
            } else {
                let collection = db.collection('clientes');
                collection.insert(client, function(err, result) {
                    if (err) {
                        functionCallback(null);
                    } else {
                        functionCallback(result.ops[0]._id);
                    }
                    db.close();
                });
            }
        });
    },
    getActivities : function(criteria, functionCallback){
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
            if (err) {
                functionCallback(null);
            } else {
                let collection = db.collection('actividades');
                collection.find(criteria).toArray(function(err, activities) {
                    if (err) {
                        functionCallback(null);
                    } else {
                        functionCallback(activities);
                    }
                    db.close();
                });
            }
        });
    },
    getActivity : function(id, functionCallback){
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
            if (err) {
                functionCallback(null);
            } else {
                let collection = db.collection('actividades');
                var criteria = { "_id" : id}
                collection.find(criteria).toArray(function(err, activities) {
                    if (err) {
                        functionCallback(null);
                    } else {
                        functionCallback(activities[0]);
                    }
                    db.close();
                });
            }
        });
    },
    insertActivity : function(activity, functionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
            if (err) {
                functionCallback(null);
            } else {
                let collection = db.collection('actividades');
                collection.insert(activity, function(err, result) {
                    if (err) {
                        functionCallback(null);
                    } else {
                        functionCallback(result.ops[0]._id);
                    }
                    db.close();
                });
            }
        });
    },
    getInstructors : function(criteria, functionCallback){
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
            if (err) {
                functionCallback(null);
            } else {
                let collection = db.collection('monitores');
                collection.find(criteria).toArray(function(err, instructors) {
                    if (err) {
                        functionCallback(null);
                    } else {
                        functionCallback(instructors);
                    }
                    db.close();
                });
            }
        });
    },
    getInstructor : function(id, functionCallback){
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
            if (err) {
                functionCallback(null);
            } else {
                let collection = db.collection('monitores');
                var criteria = { "_id" : id}
                collection.find(criteria).toArray(function(err, instructors) {
                    if (err) {
                        functionCallback(null);
                    } else {
                        functionCallback(instructors[0]);
                    }
                    db.close();
                });
            }
        });
    },
    insertInstructor : function(instructor, functionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
            if (err) {
                functionCallback(null);
            } else {
                let collection = db.collection('monitores');
                collection.insert(activity, function(err, result) {
                    if (err) {
                        functionCallback(null);
                    } else {
                        functionCallback(result.ops[0]._id);
                    }
                    db.close();
                });
            }
        });
    }
}