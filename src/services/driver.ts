import { LogExecutionTime } from '../decorators/executionTime';
import { HandleError } from '../decorators/handleError';
import { state, Stats } from '../stores/store';
import { logger } from './loger';

export class NightDriver {
  host: string;
  private baseUrl = 'http://';
  private logging = logger.getSubLogger({ name: 'NightDriver Service' });
  constructor(host?: string) {
    this.host = host ? new URL(host, this.baseUrl).toString() : new URL(process.env.HOST).toString();
  }

  @HandleError
  @LogExecutionTime
  async getStats(): Promise<Stats> {
    const response = await fetch(`${this.host}/statistics`);
    const stats = await response.json();
    const result = {
      CPU: {
        CPU: {
          stat: {
            CORE0: stats.CPU_USED_CORE0,
            CORE1: stats.CPU_USED_CORE1,
            IDLE: ((200.0 - stats.CPU_USED_CORE0 - stats.CPU_USED_CORE1) / 200) * 100.0,
            USED: stats.CPU_USED,
          },
          idleField: 'IDLE',
          ignored: ['USED'],
          headerFields: ['USED'],
        },
      },
      Memory: {
        HEAP: {
          stat: {
            USED: stats.HEAP_SIZE - stats.HEAP_FREE,
            FREE: stats.HEAP_FREE,
            MIN: stats.HEAP_MIN,
            SIZE: stats.HEAP_SIZE,
          },
          idleField: 'FREE',
          headerFields: ['SIZE', 'MIN'],
          ignored: ['SIZE', 'MIN'],
        },
        DMA: {
          stat: {
            USED: stats.DMA_SIZE - stats.DMA_FREE,
            FREE: stats.DMA_FREE,
            MIN: stats.DMA_MIN,
            SIZE: stats.DMA_SIZE,
          },
          idleField: 'FREE',
          headerFields: ['SIZE', 'MIN'],
          ignored: ['SIZE', 'MIN'],
        },
        PSRAM: {
          stat: {
            USED: stats.PSRAM_SIZE - stats.PSRAM_FREE,
            FREE: stats.PSRAM_FREE,
            MIN: stats.PSRAM_MIN,
            SIZE: stats.PSRAM_SIZE,
          },
          idleField: 'FREE',
          headerFields: ['SIZE', 'MIN'],
          ignored: ['SIZE', 'MIN'],
        },
      },
      NightDriver: {
        FPS: {
          stat: {
            LED: stats.LED_FPS,
            SERIAL: stats.SERIAL_FPS,
            AUDIO: stats.AUDIO_FPS,
          },
        },
      },
      Package: {
        CHIP: {
          stat: {
            MODEL: stats.CHIP_MODEL,
            CORES: stats.CHIP_CORES,
            SPEED: stats.CHIP_SPEED,
            PROG_SIZE: stats.PROG_SIZE,
          },
          static: true,
          headerFields: ['MODEL'],
        },
        CODE: {
          stat: {
            SIZE: stats.CODE_SIZE,
            FREE: stats.CODE_FREE,
            FLASH_SIZE: stats.FLASH_SIZE,
          },
          static: true,
          headerFields: ['SIZE'],
        },
      },
    };
    state.stats = result;
    return result;
  }
}
