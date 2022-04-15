import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { RefreshApplicationSecretDTO } from "../shared/dto/application/application.dto";
import { RefreshAppClientSecret } from "../shared/repositories/application.repo";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const refreshDto: RefreshApplicationSecretDTO = req.body;
        const app = await RefreshAppClientSecret(refreshDto.id);
        context.res = {
            body: app,
            status: 200
        }
    } catch (e) {
        context.res = {
            status: 500,
            body: e
        };
    }
};

export default httpTrigger;