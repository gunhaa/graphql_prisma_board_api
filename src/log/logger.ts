import path from "path";
import { AsyncErrorLogger } from "./asyncErrorLogger";

const filePath = path.resolve(__dirname, '../../logs/errorLog.txt');

export const errorLogger = new AsyncErrorLogger(filePath);