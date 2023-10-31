import type { LooseAuthProp } from '@clerk/clerk-sdk-node';

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}
