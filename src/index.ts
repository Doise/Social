import { createServer, mountDatabase } from "./utils/server";

mountDatabase().then(() => createServer());
