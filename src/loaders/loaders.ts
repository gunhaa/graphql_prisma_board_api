import { PrismaClient } from "@prisma/client";
import { commentsLoader } from "./comments.loader";

export const createLoaders = (prisma: PrismaClient) => ({
    commentsLoader: commentsLoader(prisma),
});