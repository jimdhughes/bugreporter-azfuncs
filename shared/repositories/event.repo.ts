import client from "../database/db";
import { CreateEventDTO } from "../dto/event/event.dto";

export const CreateEvent = async (event: CreateEventDTO): Promise<any> => {
  try {
    const res = await client
      .database(process.env.COSMOS_DBNAME)
      .container(process.env.COSMOS_EVENTCONTAINER_NAME)
      .items.create({
        ...event,
        createdAt: Date.now()
      })
    return res.resource;
  } catch (e) {
    throw e;
  }
}
