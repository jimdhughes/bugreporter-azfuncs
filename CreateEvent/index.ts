import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CreateEventDTO } from "../shared/dto/event/event.dto";
import { GetApplicationById } from "../shared/repositories/application.repo";
import { CreateEvent } from "../shared/repositories/event.repo";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const event: CreateEventDTO = req.body;
    const application = await GetApplicationById(event.clientId);
    try {
        if (!application) {
            context.res = {
                status: 400,
                body: "Invalid Credentials"
            }
        }
        else if (application.clientSecret !== event.clientSecret) {
            context.res = {
                status: 400,
                body: "Invalid Credentials"
            }
        }
        await CreateEvent(event);
        context.res = {
            status: 200,
            body: "OK"
        };
    } catch (e) {
        context.log(e)
        context.res = {
            status: 500,
            body: e.message
        };
    }
};

export default httpTrigger;