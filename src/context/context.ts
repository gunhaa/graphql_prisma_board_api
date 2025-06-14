import { Comment, PrismaClient } from '@prisma/client';
import { createLoaders } from '../loaders/loaders';
import DataLoader from 'dataloader';
import prisma from '../../prisma/prisma';

export interface Context {
  prisma: PrismaClient;
  commentsLoader: DataLoader<number, Comment[]>;
}

export const createContext = async (): Promise<Context> => {
  return {
    prisma: prisma,
    ...createLoaders(prisma),
  };
};
