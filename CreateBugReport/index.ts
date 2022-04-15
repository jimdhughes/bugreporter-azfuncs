import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CreateBugReportDTO } from "../shared/dto/bug/bug.dto";
import { GetApplicationById } from "../shared/repositories/application.repo";
import { CreateBugReport } from "../shared/repositories/bugreport.repo";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const bugReport: CreateBugReportDTO = req.body;
    try {
        const application = await GetApplicationById(bugReport.clientId);
        if (!application) {
            throw new Error("Cannot find application");
        }
        else {
            if (application.clientSecret !== bugReport.clientSecret) {
                throw new Error("Invalid client secret");
            }
        }
        const result = await CreateBugReport(bugReport)
        if (result) {
            context.res = {
                status: 200,
                body: result
            };
        } else {
            context.res = {
                status: 400,
                body: "Internal server error"
            };
        }
    } catch (e) {
        context.log(e)
        context.res = {
            status: 500,
            body: "Failed to create bug report"
        }
    }
};

export default httpTrigger;