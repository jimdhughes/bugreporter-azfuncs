import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import cache from "../shared/cache/cache";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const stats = cache.GetCacheStats()
    context.res = {
        body: stats
    }

};

export default httpTrigger;