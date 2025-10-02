import path from "path";
import { QuickDB } from "quick.db";
import { _dirname } from "../utils/Path.js";
import fs from "fs"

const rootDir = path.join(_dirname, "..", "db")
if (!fs.existsSync(rootDir)) fs.mkdirSync(rootDir);

const AmikomDB = new QuickDB({ filePath: path.join(rootDir, "Amikomku.sqlite") })

export default AmikomDB