import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CreateApplicationDTO } from "../shared/dto/application/application.dto";
import { CreateApplication } from "../shared/repositories/application.repo";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const application: CreateApplicationDTO = req.body;
    try {
        const app = await CreateApplication(application)
        if (app) {
            context.res = {
                status: 200,
                body: app
            };
        }
        else {
            context.res = {
                status: 400,
                body: "Failed to create application registration"
            }
        }
    } catch (e) {
        context.log(e);
        context.res = {
            status: 500,
            body: e
        }
    }
};

export default httpTrigger;