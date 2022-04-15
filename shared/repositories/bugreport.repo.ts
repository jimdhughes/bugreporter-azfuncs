import client from "../database/db";
import { CreateBugReportDTO } from "../dto/bug/bug.dto";
import { GetApplicationById } from "./application.repo";

export const CreateBugReport = async (createBugReportDto: CreateBugReportDTO) => {

  const { email, bugReport, reproductionSteps, occuredAt, clientId } = createBugReportDto;
  const d = await client.database(process.env.COSMOS_DBNAME).container(process.env.COSMOS_CONTAINER).items.create({
    email,
    bugReport,
    reproductionSteps,
    occuredAt,
    clientId,
    createdAt: Date.now()
  });

  return d.resource;
}

export const FlagBugReportAsQueued = async (id: string, clientId: string) => {
  try {
    const i = await GetBugReport(id, clientId);
    const d = await client.database(process.env.COSMOS_DBNAME).container(process.env.COSMOS_CONTAINER).item(id, clientId).replace({
      ...i,
      isQueued: true,
      isQueuedAt: Date.now()
    });
    return d.resource;
  } catch (e) {
    throw e
  }
}

const GetBugReport = async (id: string, clientIdL: string) => {
  try {
    const d = await client.database(process.env.COSMOS_DBNAME).container(process.env.COSMOS_CONTAINER).item(id, clientIdL).read();
    return d.resource;
  } catch (e) {
    console.error(e)
    throw e
  }
}