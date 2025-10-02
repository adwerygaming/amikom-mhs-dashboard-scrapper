import path from "path";
import { QuickDB } from "quick.db";
import { _dirname } from "../utils/Path.js";

const AmikomDB = new QuickDB({ filePath: path.join(_dirname, "..", "db", "Amikomku.sqlite") })

export default AmikomDB