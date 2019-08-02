import { CONFIG } from '../../../types/config';

declare global {
  interface Window {
    app: any;
  }
  
  const CONFIG: CONFIG;
}

export {};
