export function getAppUrl() {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.APP_URL!;
}
