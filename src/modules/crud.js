module.exports = {
    gestorBD: null,
    factory: null,
    init: function (gestorBD) {
        this.gestorBD = gestorBD;
        this.factory = factory;
    },
    listCollection: function (collectionName, criteria, functionCallback){
        this.gestorBD.getEntityCollection(collectionName, criteria, function(collectionList) {
            functionCallback(collectionList);
        });
    },
    getInstance: function (collectionName, id, functionCallback){
        this.gestorBD.getEntityById(collectionName, id, function(instance){
            functionCallback(instance);
        });
    },
    createClient: function(requestBody, functionCallback){
        this.factory.createClient(requestBody, function(client){
            if(client === null){
                functionCallback(null);
            }else{
                this.gestorBD.insertEntity("clientes", client, function(id){
                    functionCallback(id);
                });
            }
        })
    }
};