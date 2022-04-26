import { appendFile } from "fs";
import { uuid } from "uuidv4";
import cache from "../cache/cache";
import client from "../database/db";
import { CreateApplicationDTO } from "../dto/application/application.dto";
import { Application } from "../models/application.model";

const CACHE_KEY = "application:";

// TODO: Remove any from promise
export const CreateApplication = async (application: CreateApplicationDTO): Promise<any> => {
  try {
    const res = await client
      .database(process.env.COSMOS_DBNAME)
      .container(process.env.COSMOS_APPCONTAINERNAME)
      .items.create({
        name: application.name,
        clientSecret: uuid(),
        supportTeam: application.supportTeam
      })
    const app: Application = {
      id: res.resource.id,
      name: res.resource.name,
      clientSecret: res.resource.clientSecret,
      supportTeam: res.resource.supportTeam
    };
    cache.SetCachedItem<Application>(`${CACHE_KEY}${app.id}`, app);
    return application;
  } catch (e) {
    throw e;
  }
}

export const GetApplicationById = async (id: string): Promise<any> => {
  try {
    let cacheResponse = cache.GetCachedItem<Application>(`${CACHE_KEY}${id}`);
    if (cacheResponse) {
      return cacheResponse
    }
    const cosmosResponse = await client.database(process.env.COSMOS_DBNAME).container(process.env.COSMOS_APPCONTAINERNAME).item(id).read<Application>();
    cache.SetCachedItem(`${CACHE_KEY}${id}`, cosmosResponse.resource);
    return cosmosResponse.resource;
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
    cache.DeleteItemByKey(`${CACHE_KEY}${id}`);
    return res.resource;
  } catch (e) {
    throw e;
  }
}