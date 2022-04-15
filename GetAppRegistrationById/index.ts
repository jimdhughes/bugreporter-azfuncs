import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { GetApplicationById } from "../shared/repositories/application.repo";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        if (!req.params.id) {
            context.res = {
                status: 400,
                body: "Please pass an id on the query string"
            }
        }
        const app = await GetApplicationById(req.params.id)
        context.res = {
            body: app,
            status: 200
        }
        if (!app) {
            context.res = {
                body: "Application not found",
                status: 404
            }
        }
    } catch (e) {
        context.res = {
            status: 500,
            body: e
        };
    }

};

export default httpTrigger;