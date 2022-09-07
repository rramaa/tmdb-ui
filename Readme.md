#TMDB UI

This is an isomorphic application. It displays a very basic UI for displaying some movies, tv series and persons. This also has a feature of wishlist which basically uses localStorage for storing the wishlist.

##Setup:
These are the steps to be followed for setting up the project on local
This project uses yarn(v122.10) and node(v14.17.0) for running.

1. Clone the repo
2. Run `yarn` - install the dependencies
3. Run `cp sample.env .env` - setup the environment variables
4. Inside the `.env` file, fill the `API_TOKEN` variable with your api token. Note: This step is required for a successful working of the application.
5. Run `yarn start-client:dev` - This will fire up the client build and generate a `manifest.json` file. This file contains references to the built files which is used by the server.
6. Run `yarn start-server:dev` - This will fire up the node server The server will run on a port specified in the `.env` file.
7. Navigate to your `localhost` on the specified port. You will find the application running there.

##Contributing:
This project uses `eslint` and `prettier`. After making the changes, run `yarn sanitize`. This will make sure that the changes are in line with the code standards used in the project

##Project Flow:
###Server:
1. Solely server related code is in the folder `server`.
2. Entry point is the file `server/devServer.js`.
3. The markup is created by using `ReactDOMServer.renderToString` and passing the requested route to the `StaticRouter`.
4. The cached data which is needed by the application is also generated which is needed by the UI for rehydration.  
5. In the Server side route setup, there are 3 groups of routes. The controllers of these routes create a group of critical css which are needed for the page to render correctly.
6. The markup, jsFiles and cssFiles are then fed into another React template which renders the whole html.
7. This html is sent in the response.
###Client
1. The client specific code is present in the `client` folder.
2. The cached data, api key, and the critical CSS is received by the client code as global objects.
3. The cached data is used by the FetchProvider to maintain the cache. This helps in a synchronous hydration of the UI. More details on this in the Fetcher section below
4. The critical CSS information os used by the client code to lazily fetch the remaining CSS files so that client side application can work correctly.
5. The rest of the application is hydrated using `ReactDOM.hydrateRoot` method.
###Fetcher
A lightweight api framework is designed in this project to make api calls, cache the data and transfer the data context from server to client.

The core requirements of the framework is that the hook should be usable in the same way on both server and client. There should also be a way to pre-populate the cache so that the component may be able to render synchronously. This is needed in case of SSR and rehydration. There should also be a way to render something's on the client side only(Lazy loading)

This is achieved using React's Provider-Context feature. The Provider is injected in both the server side and the client side. However, internally, both these providers work differently, but they expose the same api.

In the server side, the cache object is modified and a promise is inserted inside the object. The idea is to fulfill the promises and make the calls again the cache warmed this time. Since the re-rendering is done, it is expected that the data requested by the React components would remain the same and would be found in the cache this time. All the calls are executed parallely, and it is expected that the components would not be making serial calls.

In the client side, the same cache is used as an input to the client FetcherProvider. So while hydrating the UI on the client, the cache would hit each time the calls are made by the React components while they are being hydrated.
###File Structure
```
/
    client/
        /* Client specific code /*
    helpers/
        /* helper files not included in the build */
    server/
        /* Server specific code */
        views/
            /* Base HTML views which are sent as responses */
    src/
        /* Code common b/w server and client */
        components/
            /* UI Components */
        styles/
            /* Styles entrypoints */
```

##Enhancements planned
1. Error handling is not taken care of. If the api fails then error page would not be seen by the user. Need to implement this feature
2. Need to think of a better way of handling the loading of CSS. Ideally CSS modules would be better and webpack would automatically handle the CSS part
3. Unit Testing is not present. Need to add the unit testing.
4. Currently, serial calls in the component is not supported. SSR would not work as expected.
5. Need to create another webpack config for production mode optimisations. It would not have the dev server and output the built files in a directory. That directory can be deployed to a webserver. Would have to add support of a public path.
