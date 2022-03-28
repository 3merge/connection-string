require("dotenv").config();
const url = require("url");

const {
  CONNECTION,
  MONGO,
  QUOTAGUARDSTATIC_URL,
  QUOTAGUARDSTATIC_URL_PORT = 1080,
} = process.env;

if (MONGO && QUOTAGUARDSTATIC_URL) {
  const { auth, hostname } = url.parse(QUOTAGUARDSTATIC_URL);
  const [username, pass] = auth.split(":");

  process.env.CONNECTION = `${MONGO}?retryWrites=true&w=majority&readPreference=nearest&ssl=true&tls=true${Object.entries(
    {
      proxyHost: hostname,
      proxyPassword: pass,
      // useful in using another vendor during dev
      proxyPort: QUOTAGUARDSTATIC_URL_PORT,
      proxyUsername: username,
    }
  ).reduce((acc, [key, value]) => `${acc}&${key}=${value}`, "")}`;
} else if (!CONNECTION || ["", "null", "undefined"].includes(CONNECTION)) {
  throw new Error(
    "CONNECTION var required or use provide MONGO and QUOTAGUARDSTATIC_URL vars"
  );
}
