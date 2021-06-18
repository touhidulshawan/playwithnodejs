import path from "path";
import expres, { Request, Response } from "express";
import routes from "./routes/routes";
import config from "./config/config";
import log from "./logger";

const hostname = config.server.hostname;
const port = config.server.port;

const app = expres();

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(expres.json());
app.use(expres.urlencoded({ extended: false }));
app.use(expres.static(publicDirectoryPath));

routes(app);

app.listen(port, () => {
  log.info(`Server is running on ${hostname}:${port}`);
});
