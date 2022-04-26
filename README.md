# BugReporter
## Motiviation
Always try to build a better mouse trap before deciding that it's a lot of work and reverting to something like google analytics or splunk or something.

This is a small Azure Function based service to help teams track usage metrics across their apps and to allow end-users the ability to submit bug reports through the application. 

It's designed to be horizontally scalable with some obvious caching work that would need to be done in environments with a lot of throughput. For instance, we use only a local level cahing mechanism for (expected) high throughput functions. If we fan out, then each instance will have it's own cache which isn't all that helpful. 

Redis and Azure Cache is expensive though so this is all I'm willing to play with for now.

## Config
### Tech Required:
1. Azure Tenant
2. Azure Functions
3. CosmosDB
4. TBD: Caching layer
### Environment Variables:
```
"COSMOS_CONN_STR": "SECRET!"
"COSMOS_ENDPOINT": "SECRET!"
"COSMOS_KEY": "SECRET!"
"COSMOS_DBNAME": "bugs"
"COSMOS_CONTAINER": "bugs"
"COSMOS_APPCONTAINERNAME": "applications"
"COSMOS_EVENTCONTAINER_NAME": "events"
"APP_CACHE_IN_SECONDS": 600
```
## How it works
1. Create an App Registration
- Function Name: CreateAppRegistration
- Supported Methods: POST
- Authentication: Admin
- Synopsis
  - Admins can create a new application. They will receive a ApplicationID and ClientSecret which they will need to include in request bodies when creating the events or bug reports from their applications.
  - We strongly suggest abstracting away your implementations such that your server is responsible for communicating with the service to prevent proliferation of secrets
2. Create Events
- Function Name: CreateEvent
- Support Methods: POST
- Authentication: Anonymous
  - Caveat: you need to have a valid applicationid/secret combination
- Synopsis:
  - TODO 
3. Create Bug Reports
- Function Name: CreateBugReport
- Support Methods: POST
- Authentication: Anonymous
  - Caveat: you need to have a valid applicationid/secret combination
- Synopsis:
  - TODO 

## Future development
This repo may completely turn on it's head once I decide to make support projects (javascript librarie for client-side plugins, server-side libraries, etc). I haven't decided if I like the idea of a monorepo or not.

A Swagger definition would be helpful.