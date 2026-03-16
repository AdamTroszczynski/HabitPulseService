// src/app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// src/helpers/LoadEnv.ts
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";
var DIR_NAME = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(DIR_NAME, "../../../.env") });

// src/middlewares/ErrorHandler.ts
import { ZodError } from "zod";

// src/helpers/ResponsHelpers.ts
var ok = (res, data, status = 200 /* OK */) => {
  res.status(status).json({ success: true, data, error: null });
};
var fail = (res, code, message, status) => {
  res.status(status).json({ success: false, data: null, error: { code, message } });
};

// src/middlewares/ErrorHandler.ts
var AppError = class extends Error {
  constructor(code, message, status) {
    super(message);
    this.code = code;
    this.message = message;
    this.status = status;
  }
};
var errorHandler = (err, req, res, _next) => {
  if (err instanceof ZodError) {
    return fail(res, "VALIDATION_ERROR" /* VALIDATION_ERROR */, err.issues[0].message, 422 /* UNPROCESSABLE_ENTITY */);
  }
  if (err instanceof AppError) {
    return fail(res, err.code, err.message, err.status);
  }
  return fail(res, "INTERNAL_ERROR" /* INTERNAL_ERROR */, "Something went wrong", 500 /* INTERNAL_SERVER_ERROR */);
};

// src/modules/Auth/AuthRoutes.ts
import { Router } from "express";

// src/modules/Auth/AuthSchemas.ts
import z from "zod";
var LoginDTOSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().min(6),
  rememberMe: z.boolean()
});
var LogoutDTOSchema = z.object({
  token: z.string().nonempty()
});
var RegisterDTOSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty()
});
var ActivateDTOSchema = z.object({
  token: z.string().nonempty()
});
var ResetPasswordDTOSchema = z.object({
  email: z.email().nonempty()
});
var ChangePasswordDTOSchema = z.object({
  password: z.string().min(6),
  token: z.string().nonempty()
});
var ResendActivationDTOSchema = z.object({
  email: z.email().nonempty()
});

// src/modules/Auth/AuthService.ts
import bcrypt from "bcrypt";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath as fileURLToPath2 } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.5.0",
  "engineVersion": "280c870be64f457428992c43c1f6d557fab6e29e",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum Lang {\n  PL @map("pl")\n}\n\nenum DateFormat {\n  DD_MM_YYYY @map("dd-mm-yyyy")\n  MM_DD_YYYY @map("mm-dd-yyyy")\n  YYYY_MM_DD @map("yyyy-mm-dd")\n}\n\nmodel User {\n  id                  Int        @id @default(autoincrement())\n  email               String     @unique @db.VarChar(255)\n  passwordHash        String     @map("password_hash")\n  name                String     @db.VarChar(40)\n  dateFormat          DateFormat @default(DD_MM_YYYY) @map("date_format")\n  lang                Lang       @default(PL)\n  failedLoginAttempts Int        @default(0) @map("failed_login_attempts")\n  habits              Habit[]\n  isVerified          Boolean    @default(false) @map("is_verified")\n  lastLogin           DateTime?  @map("last_login")\n  createdAt           DateTime   @default(now()) @map("created_at")\n  updatedAt           DateTime   @updatedAt @map("updated_at")\n\n  @@map("users")\n}\n\nmodel Habit {\n  id         Int        @id @default(autoincrement())\n  userId     Int        @map("user_id")\n  user       User       @relation(fields: [userId], references: [id])\n  name       String     @db.VarChar(255)\n  desc       String?\n  color      String?\n  icon       String?\n  frequency  String[]   @default([])\n  isArchived Boolean    @default(false) @map("is_archived")\n  reminder   Reminder?\n  trackings  Tracking[]\n  createdAt  DateTime   @default(now()) @map("created_at")\n  updatedAt  DateTime   @updatedAt @map("updated_at")\n\n  @@map("habits")\n}\n\nmodel Reminder {\n  id               Int       @id @default(autoincrement())\n  habitId          Int       @unique @map("habit_id")\n  habit            Habit     @relation(fields: [habitId], references: [id])\n  isReminderActive Boolean   @default(false) @map("is_reminder_active")\n  preferredTime    String    @default("12:00") @map("preferred_time")\n  frequency        String[]  @default([])\n  jobId            String?   @map("job_id")\n  nextScheduledAt  DateTime? @map("next_scheduled_at")\n  lastSentAt       DateTime? @map("last_sent_at")\n  reminderVersion  Int       @default(0) @map("reminder_version")\n  createdAt        DateTime  @default(now()) @map("created_at")\n  updatedAt        DateTime  @updatedAt @map("updated_at")\n\n  @@map("reminders")\n}\n\nmodel Tracking {\n  id         Int      @id @default(autoincrement())\n  habitId    Int      @map("habit_id")\n  habit      Habit    @relation(fields: [habitId], references: [id])\n  day        DateTime @db.Date\n  isFinished Boolean  @default(false) @map("is_finished")\n  createdAt  DateTime @default(now()) @map("created_at")\n  updatedAt  DateTime @updatedAt @map("updated_at")\n\n  @@unique([habitId, day])\n  @@map("trackings")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"email","kind":"scalar","type":"String"},{"name":"passwordHash","kind":"scalar","type":"String","dbName":"password_hash"},{"name":"name","kind":"scalar","type":"String"},{"name":"dateFormat","kind":"enum","type":"DateFormat","dbName":"date_format"},{"name":"lang","kind":"enum","type":"Lang"},{"name":"failedLoginAttempts","kind":"scalar","type":"Int","dbName":"failed_login_attempts"},{"name":"habits","kind":"object","type":"Habit","relationName":"HabitToUser"},{"name":"isVerified","kind":"scalar","type":"Boolean","dbName":"is_verified"},{"name":"lastLogin","kind":"scalar","type":"DateTime","dbName":"last_login"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"users"},"Habit":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"Int","dbName":"user_id"},{"name":"user","kind":"object","type":"User","relationName":"HabitToUser"},{"name":"name","kind":"scalar","type":"String"},{"name":"desc","kind":"scalar","type":"String"},{"name":"color","kind":"scalar","type":"String"},{"name":"icon","kind":"scalar","type":"String"},{"name":"frequency","kind":"scalar","type":"String"},{"name":"isArchived","kind":"scalar","type":"Boolean","dbName":"is_archived"},{"name":"reminder","kind":"object","type":"Reminder","relationName":"HabitToReminder"},{"name":"trackings","kind":"object","type":"Tracking","relationName":"HabitToTracking"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"habits"},"Reminder":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"habitId","kind":"scalar","type":"Int","dbName":"habit_id"},{"name":"habit","kind":"object","type":"Habit","relationName":"HabitToReminder"},{"name":"isReminderActive","kind":"scalar","type":"Boolean","dbName":"is_reminder_active"},{"name":"preferredTime","kind":"scalar","type":"String","dbName":"preferred_time"},{"name":"frequency","kind":"scalar","type":"String"},{"name":"jobId","kind":"scalar","type":"String","dbName":"job_id"},{"name":"nextScheduledAt","kind":"scalar","type":"DateTime","dbName":"next_scheduled_at"},{"name":"lastSentAt","kind":"scalar","type":"DateTime","dbName":"last_sent_at"},{"name":"reminderVersion","kind":"scalar","type":"Int","dbName":"reminder_version"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"reminders"},"Tracking":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"habitId","kind":"scalar","type":"Int","dbName":"habit_id"},{"name":"habit","kind":"object","type":"Habit","relationName":"HabitToTracking"},{"name":"day","kind":"scalar","type":"DateTime"},{"name":"isFinished","kind":"scalar","type":"Boolean","dbName":"is_finished"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"trackings"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","habit","reminder","trackings","_count","habits","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_avg","_sum","_min","_max","User.groupBy","User.aggregate","Habit.findUnique","Habit.findUniqueOrThrow","Habit.findFirst","Habit.findFirstOrThrow","Habit.findMany","Habit.createOne","Habit.createMany","Habit.createManyAndReturn","Habit.updateOne","Habit.updateMany","Habit.updateManyAndReturn","Habit.upsertOne","Habit.deleteOne","Habit.deleteMany","Habit.groupBy","Habit.aggregate","Reminder.findUnique","Reminder.findUniqueOrThrow","Reminder.findFirst","Reminder.findFirstOrThrow","Reminder.findMany","Reminder.createOne","Reminder.createMany","Reminder.createManyAndReturn","Reminder.updateOne","Reminder.updateMany","Reminder.updateManyAndReturn","Reminder.upsertOne","Reminder.deleteOne","Reminder.deleteMany","Reminder.groupBy","Reminder.aggregate","Tracking.findUnique","Tracking.findUniqueOrThrow","Tracking.findFirst","Tracking.findFirstOrThrow","Tracking.findMany","Tracking.createOne","Tracking.createMany","Tracking.createManyAndReturn","Tracking.updateOne","Tracking.updateMany","Tracking.updateManyAndReturn","Tracking.upsertOne","Tracking.deleteOne","Tracking.deleteMany","Tracking.groupBy","Tracking.aggregate","AND","OR","NOT","id","habitId","day","isFinished","createdAt","updatedAt","equals","not","in","notIn","lt","lte","gt","gte","isReminderActive","preferredTime","frequency","jobId","nextScheduledAt","lastSentAt","reminderVersion","contains","startsWith","endsWith","has","hasEvery","hasSome","userId","name","desc","color","icon","isArchived","email","passwordHash","DateFormat","dateFormat","Lang","lang","failedLoginAttempts","isVerified","lastLogin","every","some","none","habitId_day","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","push","increment","decrement","multiply","divide"]'),
  graph: "-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_ADACAAA8ACAMBAAAsQEAIFQCAAAAAVUCAAAAAVhAAAAAAVlAAAAAAWIgAAAAAWMBAAAAAWQAALABACBlAQAAAAFmQAAAAAFnQAAAAAFoAgAAAAEBDgAAQwAgC1QCAAAAAVUCAAAAAVhAAAAAAVlAAAAAAWIgAAAAAWMBAAAAAWQAALABACBlAQAAAAFmQAAAAAFnQAAAAAFoAgAAAAEBDgAARQAwAQ4AAEUAMAwEAACvAQAgVAIAogEAIVUCAKIBACFYQACgAQAhWUAAoAEAIWIgAKEBACFjAQCrAQAhZAAArAEAIGUBAK0BACFmQACuAQAhZ0AArgEAIWgCAKIBACECAAAAPAAgDgAASAAgC1QCAKIBACFVAgCiAQAhWEAAoAEAIVlAAKABACFiIAChAQAhYwEAqwEAIWQAAKwBACBlAQCtAQAhZkAArgEAIWdAAK4BACFoAgCiAQAhAgAAAAcAIA4AAEoAIAIAAAAHACAOAABKACADAAAAPAAgFQAAQwAgFgAASAAgAQAAADwAIAEAAAAHACAIBwAApgEAIBsAAKcBACAcAACqAQAgHQAAqQEAIB4AAKgBACBlAAClAQAgZgAApQEAIGcAAKUBACAOUQAAdQAwUgAAUQAQUwAAdQAwVAIAawAhVQIAawAhWEAAbAAhWUAAbAAhYiAAbQAhYwEAdgAhZAAAdwAgZQEAeAAhZkAAeQAhZ0AAeQAhaAIAawAhAwAAAAcAIAEAAFAAMBoAAFEAIAMAAAAHACABAAA_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-ACAeAAB-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-AAAJACB_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"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath2(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });
var prisma_default = prisma;

// src/repositories/User/UserRepository.ts
var getUserById = async (dto) => {
  return prisma_default.user.findUnique({ where: dto });
};
var getUserByEmail = async (dto) => {
  return prisma_default.user.findUnique({ where: dto });
};
var createUser = async (dto) => {
  return prisma_default.user.create({ data: dto });
};
var changeUserPassword = async (dto) => {
  return prisma_default.user.update({ where: { id: dto.id }, data: { passwordHash: dto.passwordHash } });
};
var verifyUser = async (dto) => {
  return prisma_default.user.update({ where: { id: dto.id }, data: { isVerified: true } });
};

// src/lib/jwt.ts
import jwt from "jsonwebtoken";

// src/helpers/ConfigEnv.ts
var requireEnv = (key) => {
  const value = process.env[key];
  if (!value) throw new Error("Missing environment variable");
  return value;
};
var optionalEnv = (key, defaultValue) => {
  return process.env[key] ?? defaultValue;
};
var env = {
  JWT_SECRET: requireEnv("JWT_SECRET"),
  BCRYPT_ROUNDS: Number(requireEnv("BCRYPT_ROUNDS")),
  DATABASE_URL: requireEnv("DATABASE_URL"),
  NODE_ENV: requireEnv("NODE_ENV"),
  REDIS_URL: requireEnv("REDIS_URL"),
  RABBITMQ_URL: requireEnv("RABBITMQ_URL"),
  RABBITMQ_VHOST: optionalEnv("RABBITMQ_VHOST", "/")
};

// src/lib/jwt.ts
var generateAuthToken = (dto) => {
  const payload = {
    jti: crypto.randomUUID(),
    userId: dto.userId,
    type: dto.type,
    duration: dto.duration,
    iat: Date.now()
  };
  const authToken = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: dto.duration === "long" ? "30d" : "15m"
  });
  return authToken;
};
var verifyAuthToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch {
    throw new AppError("UNAUTHORIZED" /* UNAUTHORIZED */, "Invalid or expired token", 401 /* UNAUTHORIZED */);
  }
};

// src/lib/rabbitmq.ts
import amqplib from "amqplib";
var connection;
var channel;
var connetRabbitMQ = async () => {
  connection = await amqplib.connect(env.RABBITMQ_URL, { vhost: env.RABBITMQ_VHOST });
  channel = await connection.createChannel();
  await channel.assertExchange("habitpulse.messages", "direct", { durable: true });
  await channel.assertQueue("messages.email", { durable: true });
  await channel.bindQueue("messages.email", "habitpulse.messages", "email");
  console.log("RabbitMQ connected");
};
var getChannel = () => {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  return channel;
};

// src/lib/redis.ts
import { createClient } from "redis";
var redisClient = createClient({ url: env.REDIS_URL });
redisClient.on("error", (err) => console.error("Redis error:", err));
redisClient.on("connect", () => console.log("Redis connected"));
var redis_default = redisClient;

// src/modules/Auth/AuthService.ts
var loginService = async (dto) => {
  const user = await getUserByEmail({ email: dto.email });
  if (!user) throw new AppError("UNAUTHORIZED" /* UNAUTHORIZED */, "Invalid credentials", 401 /* UNAUTHORIZED */);
  const isPasswordMatch = await bcrypt.compare(dto.password, user.passwordHash);
  if (!isPasswordMatch) throw new AppError("UNAUTHORIZED" /* UNAUTHORIZED */, "Invalid credentials", 401 /* UNAUTHORIZED */);
  const token = generateAuthToken({ userId: user.id, duration: dto.rememberMe ? "long" : "short", type: "auth" });
  return { user, token };
};
var logoutService = async (dto) => {
  const authToken = verifyAuthToken(dto.token);
  const ttl = authToken.exp - Math.floor(Date.now() / 1e3);
  if (ttl > 0) {
    await redis_default.set(`habitpulse:blacklist:${authToken.jti}`, "1", { EX: ttl });
  }
};
var registerService = async (dto) => {
  const user = await getUserByEmail({ email: dto.email });
  if (user) throw new AppError("CONFLICT" /* CONFLICT */, "User already exists", 409 /* CONFLICT */);
  const passwordHash = await bcrypt.hash(dto.password, env.BCRYPT_ROUNDS);
  const newUser = await createUser({ email: dto.email, passwordHash, name: dto.email });
  const token = generateAuthToken({ userId: newUser.id, duration: "long", type: "activation" });
  getChannel().publish(
    "habitpulse.messages",
    "email",
    Buffer.from(JSON.stringify({ type: "activation", email: newUser.email, token })),
    { persistent: true }
  );
};
var activateService = async (dto) => {
  const authToken = verifyAuthToken(dto.token);
  if (authToken.type !== "activation")
    throw new AppError("UNAUTHORIZED" /* UNAUTHORIZED */, "Invalid credentials", 401 /* UNAUTHORIZED */);
  const user = await getUserById({ id: authToken.userId });
  if (!user) throw new AppError("NOT_FOUND" /* NOT_FOUND */, "User does not exist", 404 /* NOT_FOUND */);
  if (user.isVerified) throw new AppError("CONFLICT" /* CONFLICT */, "User is already verified", 409 /* CONFLICT */);
  await verifyUser({ id: authToken.userId });
};
var resendActivationService = async (dto) => {
  const user = await getUserByEmail({ email: dto.email });
  if (!user) throw new AppError("NOT_FOUND" /* NOT_FOUND */, "User does not exist", 404 /* NOT_FOUND */);
  if (user.isVerified) throw new AppError("CONFLICT" /* CONFLICT */, "User is already verified", 409 /* CONFLICT */);
  const token = generateAuthToken({ userId: user.id, duration: "long", type: "activation" });
  getChannel().publish(
    "habitpulse.messages",
    "email",
    Buffer.from(JSON.stringify({ type: "activation", email: user.email, token })),
    { persistent: true }
  );
};
var resetPasswordService = async (dto) => {
  const user = await getUserByEmail({ email: dto.email });
  if (!user) throw new AppError("UNAUTHORIZED" /* UNAUTHORIZED */, "Invalid credentials", 401 /* UNAUTHORIZED */);
  const token = generateAuthToken({ userId: user.id, duration: "short", type: "resetPassword" });
  getChannel().publish(
    "habitpulse.messages",
    "email",
    Buffer.from(JSON.stringify({ type: "resetPassword", email: user.email, token })),
    { persistent: true }
  );
};
var changePasswordService = async (dto) => {
  const authToken = verifyAuthToken(dto.token);
  if (authToken.type !== "resetPassword")
    throw new AppError("UNAUTHORIZED" /* UNAUTHORIZED */, "Invalid credentials", 401 /* UNAUTHORIZED */);
  const user = await getUserById({ id: authToken.userId });
  if (!user) throw new AppError("NOT_FOUND" /* NOT_FOUND */, "User does not exist", 404 /* NOT_FOUND */);
  const passwordHash = await bcrypt.hash(dto.password, env.BCRYPT_ROUNDS);
  await changeUserPassword({ id: authToken.userId, passwordHash });
};

// src/helpers/SendCookie.ts
var cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict"
};
var sendCookie = (res, key, value, isLong) => {
  res.cookie(key, value, {
    maxAge: isLong ? 30 * 24 * 60 * 60 * 1e3 : void 0,
    ...cookieOptions
  });
};
var removeCookie = (res, key) => {
  res.clearCookie(key, cookieOptions);
};

// src/const/CommonConst.ts
var AUTH_TOKEN_NAME = "authToken";

// src/modules/Auth/AuthController.ts
var loginController = async (req, res) => {
  const dto = LoginDTOSchema.parse(req.body);
  const data = await loginService(dto);
  sendCookie(res, AUTH_TOKEN_NAME, data.token, dto.rememberMe);
  ok(res, data);
};
var logoutController = async (req, res) => {
  const authToken = req.cookies[AUTH_TOKEN_NAME];
  if (authToken) {
    await logoutService({ token: authToken });
    removeCookie(res, AUTH_TOKEN_NAME);
    ok(res, null);
  } else fail(res, "UNAUTHORIZED" /* UNAUTHORIZED */, "Token does not exist", 401 /* UNAUTHORIZED */);
};
var registerController = async (req, res) => {
  const dto = RegisterDTOSchema.parse(req.body);
  await registerService(dto);
  ok(res, null, 201 /* CREATED */);
};
var activeController = async (req, res) => {
  const dto = ActivateDTOSchema.parse(req.body);
  await activateService(dto);
  ok(res, null);
};
var resendActivationController = async (req, res) => {
  const dto = ResendActivationDTOSchema.parse(req.body);
  await resendActivationService(dto);
  ok(res, null);
};
var resetPasswordController = async (req, res) => {
  const dto = ResetPasswordDTOSchema.parse(req.body);
  await resetPasswordService(dto);
  ok(res, null);
};
var changePasswordController = async (req, res) => {
  const dto = ChangePasswordDTOSchema.parse(req.body);
  await changePasswordService(dto);
  ok(res, null);
};

// src/modules/Auth/AuthRoutes.ts
var AuthRouter = Router();
AuthRouter.post("/login", loginController);
AuthRouter.post("/logout", logoutController);
AuthRouter.post("/register", registerController);
AuthRouter.post("/active", activeController);
AuthRouter.post("/resend-activation", resendActivationController);
AuthRouter.post("/reset-password", resetPasswordController);
AuthRouter.patch("/change-password", changePasswordController);

// src/app.ts
var app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("<h1>Working2</h1>");
});
app.use("/auth", AuthRouter);
var app_default = app;

// src/server.ts
var PORT = process.env.PORT || 3e3;
var startApp = async () => {
  await redis_default.connect();
  await connetRabbitMQ();
  app_default.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};
startApp();
