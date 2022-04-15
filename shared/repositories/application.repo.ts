import { uuid } from "uuidv4";
import client from "../database/db";
import { CreateApplicationDTO } from "../dto/application/application.dto";

// TODO: Remove any from promise
export const CreateApplication = async (application: CreateApplicationDTO): Promise<any> => {
  try {
    const res = await client
      .database(process.env.COSMOS_DBNAME)
      .container(process.env.COSMOS_APPCONTAINERNAME)
      .items.create({
        name: application.name,
        clientSecret: uuid(),
      })
    return res.resource;
  } catch (e) {
    throw e;
  }
}

export const GetApplicationById = async (id: string): Promise<any> => {
  try {
    const res = await client.database(process.env.COSMOS_DBNAME).container(process.env.COSMOS_APPCONTAINERNAME).item(id).read();
    return res.resource;
  } catch (e) {
    throw e;
  }
}

export const GetApplications = async (): Promise<any[]> => {
  try {
    const res = await client.database(process.env.COSMOS_DBNAME).container(process.env.COSMOS_APPCONTAINERNAME).items.query(`SELECT * FROM c`).fetchAll();
    return res.resources;
  } catch (e) {
    throw e;
  }
}

export const RefreshAppClientSecret = async (id: string): Promise<any> => {
  try {
    const res = await client.database(process.env.COSMOS_DBNAME).container(process.env.COSMOS_APPCONTAINERNAME).item(id).replace({
      clientSecret: uuid()
    });
    return res.resource;
  } catch (e) {
    throw e;
  }
}