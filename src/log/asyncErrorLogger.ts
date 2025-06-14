import { appendFile } from 'fs/promises';
import { GraphQLFormattedError } from 'graphql';
import { ILogger } from './logger.interface';

export class AsyncErrorLogger implements ILogger {
  private filePath: string;
  private queue: (() => Promise<void>)[] = [];
  private lock = false;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  public info(graphqlError: GraphQLFormattedError): void {
    const work = async () => {
      const timestamp = new Date().toISOString();
      const line = `[${timestamp}] ${graphqlError.message}\n`;

      try {
        await appendFile(this.filePath, line);
      } catch(e) {
        console.error('asyncErrorLogger error: ' , e);
      }
    };

    this.queue.push(work);
    this.start();
  }

  private async start() {
    if(this.lock){
        return;
    }
    this.lock = true;

    while(this.queue.length > 0) {
        const work = this.queue.shift();
        if(work) {
            await work();
        }
    }
    this.lock = false;
  }
}



