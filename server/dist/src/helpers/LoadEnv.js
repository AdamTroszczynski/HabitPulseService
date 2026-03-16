import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import dotenv from 'dotenv';
const DIR_NAME = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(DIR_NAME, '../../../.env') });
//# sourceMappingURL=LoadEnv.js.map