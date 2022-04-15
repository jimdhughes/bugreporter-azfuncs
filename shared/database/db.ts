import { CosmosClient, CosmosClientOptions } from "@azure/cosmos";

const cosmosOptions: CosmosClientOptions = {
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
};

const client = new CosmosClient(cosmosOptions)

/** Create Database if it doesn't exist **/
client.databases.createIfNotExists({ id: process.env.COSMOS_DBNAME }).then(x => {
  console.log("Database created");
  client.database(process.env.COSMOS_DBNAME).containers.createIfNotExists({ id: process.env.COSMOS_APPCONTAINERNAME, uniqueKeyPolicy: { uniqueKeys: [{ paths: ["/name"] }] } }).then(x => { console.log("Created App Container") }).catch(e => { console.error(e) })
  client.database(process.env.COSMOS_DBNAME).containers.createIfNotExists({ id: process.env.COSMOS_CONTAINER, partitionKey: { paths: ["/clientId"] } }).then(x => {
    console.log("Created Bug Container");
  }).catch(e => console.error(e))
  client.database(process.env.COSMOS_DBNAME).containers.createIfNotExists({ id: process.env.COSMOS_EVENTCONTAINER_NAME, partitionKey: { paths: ["/clientId"] } }).then(x => {
    console.log("Created Event Container");
  }).catch(e => console.error(e));
})

export default client