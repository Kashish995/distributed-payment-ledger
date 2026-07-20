import { z } from "zod";

const schema = z.uuid();

console.log(
  schema.safeParse("550e8400-e29b-41d4-a716-446655440011")
);

