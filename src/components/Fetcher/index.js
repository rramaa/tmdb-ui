import React from "react";
const fetcherContext = React.createContext();
export const useFetcher = () => React.useContext(fetcherContext);

export function FetcherClientProvider({ cache, children }) {
  let [apiCache, updateCache] = React.useState(cache);
  function fetchApi(api) {
    let cacheKey = api;
    let isDataPresent = apiCache[cacheKey];
    if (isDataPresent) {
      return {
        loading: false,
        data: apiCache[cacheKey],
      };
    }
    window
      .fetch(api, {
        headers: {
          Authorization: `Bearer ${window.API_TOKEN}`,
        },
      })
      .then((v) => v.json())
      .then((data) =>
        updateCache((prevCache) => ({ ...prevCache, [cacheKey]: data }))
      );
    return {
      loading: true,
      data: null,
    };
  }
  return (
    <fetcherContext.Provider value={fetchApi}>
      {children}
    </fetcherContext.Provider>
  );
}

export function FetcherServerProvider({ children, cache, fetcher }) {
  function useFetch(api, options = {}) {
    let cacheKey = api;
    if (options.clientOnly) {
      return {
        loading: false,
        data: null,
      };
    }
    let isDataPresent = cache[cacheKey];
    if (isDataPresent) {
      return {
        loading: false,
        data: cache[cacheKey],
      };
    }
    cache[cacheKey] = fetcher(api, {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    })
      .then((v) => v.json())
      .then((data) => (cache[cacheKey] = data));
    return {
      loading: !cache[cacheKey],
      data: cache[cacheKey],
      error: false,
    };
  }
  return (
    <fetcherContext.Provider value={useFetch}>
      {children}
    </fetcherContext.Provider>
  );
}
