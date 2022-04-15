import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { GetApplications } from "../shared/repositories/application.repo";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const applications = await GetApplications();
        context.res = {
            body: applications
        };
    } catch (e) {
        context.res = {
            status: 500,
            body: e
        };
    }
};

export default httpTrigger;