import { AzureFunction, Context } from "@azure/functions"

const cosmosDBTrigger: AzureFunction = async function (context: Context, documents: any[]): Promise<void> {
    if (!!documents && documents.length > 0) {
        documents.forEach(async (x) => {
            console.log(`Generating ticket for: ${x.id} - ${x.clientId}`)
            //TODO: actually generate a ticket
        })
    }
}

export default cosmosDBTrigger;
