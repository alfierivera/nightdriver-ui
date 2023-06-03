import { createStore } from '@stencil/store';

export const { state } = createStore({
  stats: {
    CPU: {
      CPU: {
        stat: {
          CORE0: 0,
          CORE1: 0,
          IDLE: 0,
          USED: 0,
        },
        idleField: 'IDLE',
        ignored: ['USED'],
        headerFields: ['USED'],
      },
    },
    Memory: {
      HEAP: {
        stat: {
          USED: 0,
          FREE: 0,
          MIN: 0,
          SIZE: 0,
        },
        idleField: 'FREE',
        headerFields: ['SIZE', 'MIN'],
        ignored: ['SIZE', 'MIN'],
      },
      DMA: {
        stat: {
          USED: 0,
          FREE: 0,
          MIN: 0,
          SIZE: 0,
        },
        idleField: 'FREE',
        headerFields: ['SIZE', 'MIN'],
        ignored: ['SIZE', 'MIN'],
      },
      PSRAM: {
        stat: {
          USED: 0,
          FREE: 0,
          MIN: 0,
          SIZE: 0,
        },
        idleField: 'FREE',
        headerFields: ['SIZE', 'MIN'],
        ignored: ['SIZE', 'MIN'],
      },
    },
    NightDriver: {
      FPS: {
        stat: {
          LED: 0,
          SERIAL: 0,
          AUDIO: 0,
        },
      },
    },
    Package: {
      CHIP: {
        stat: {
          MODEL: 0,
          CORES: 0,
          SPEED: 0,
          PROG_SIZE: 0,
        },
        static: true,
        headerFields: ['MODEL'],
      },
      CODE: {
        stat: {
          SIZE: 0,
          FREE: 0,
          FLASH_SIZE: 0,
        },
        static: true,
        headerFields: ['SIZE'],
      },
    },
  },
  effects: {},
  currentEffect: '',
  settings: {},
});

export interface Stat {
  stat: Record<string, number>;
  idleField?: string;
  ignored?: string[];
  headerFields?: string[];
  static?: boolean;
}

export interface Stats {
  CPU: Record<string, Stat>;
  Memory: Record<string, Stat>;
  NightDriver: Record<string, Stat>;
  Package: Record<string, Stat>;
}

export interface ConfigItem {
  name: string;
  value: number | boolean;
  setter: (value: number | boolean) => void;
  type: 'int' | 'boolean';
}

export interface SiteConfig {
  statsRefreshRate: ConfigItem;
  statsAnimateChange: ConfigItem;
  maxSamples: ConfigItem;
}
