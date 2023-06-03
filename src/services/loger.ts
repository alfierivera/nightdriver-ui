import { Logger } from 'tslog';

export const logger = new Logger({
  name: 'NightDriver UI',
  minLevel: Number(process.env.LOG_LEVEL),
  type: process.env.LOG_TYPE as any,
});
