export const extractQueryParams = (query: Record<string, any>) => {
  return query
    .substr(1)
    .split("&")
    .reduce((queryParams: Record<string, any>, param: string) => {
      const [key, value] = param.split("=");

      queryParams[key] = value;

      return queryParams;
    }, {});
};
