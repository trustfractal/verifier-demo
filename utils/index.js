export const getEnv = (envVar, defaultValue, allowNull = false) => {
  const env = process.env[envVar] || defaultValue;

  if (!env && !allowNull) {
    throw new Error(
      `The ${envVar} environment variable is required but was not specified.`
    );
  }

  return env;
};

export const send = (res, status, json) => {
  res.status(status).send(json);
};

export const notFound = (res, message) => {
  const json = { error: "Not Found", message: message || "Not found" };

  send(res, 404, json);
};

export const badRequest = (res, message) => {
  const json = { error: "Bad Request", message: message || "Bad request" };

  send(res, 400, json);
};

export const unauthorized = (res, message) => {
  const json = {
    error: "Unauthorized",
    message: message || "You're not authorized to do that",
  };

  send(res, 401, json);
};
