import { beforeEach } from "@jest/globals";

import { clearRedis, resetDatabase } from "../utils/testEnvironment";

beforeEach(async () => {
  await resetDatabase();
  await clearRedis();
});