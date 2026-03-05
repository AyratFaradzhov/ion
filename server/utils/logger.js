// Simple structured logger for the email server and other backend modules.
// Usage:
//   import { createLogger } from "./utils/logger.js";
//   const log = createLogger("EMAIL SERVER");
//   log.info("Message", { extra: "meta" });
//
// Output example:
// [EMAIL SERVER] 2026-03-05T15:00:00.000Z Message {"extra":"meta"}

function format(moduleName, level, message, meta) {
  const ts = new Date().toISOString();
  const base = `[${moduleName}] ${ts} ${message}`;
  if (meta && Object.keys(meta).length > 0) {
    return `${base} ${JSON.stringify(meta)}`;
  }
  return base;
}

export function createLogger(moduleName = "APP") {
  return {
    info(message, meta = {}) {
      // eslint-disable-next-line no-console
      console.log(format(moduleName, "INFO", message, meta));
    },
    warn(message, meta = {}) {
      // eslint-disable-next-line no-console
      console.warn(format(moduleName, "WARN", message, meta));
    },
    error(message, meta = {}) {
      // eslint-disable-next-line no-console
      console.error(format(moduleName, "ERROR", message, meta));
    },
    debug(message, meta = {}) {
      // eslint-disable-next-line no-console
      console.debug(format(moduleName, "DEBUG", message, meta));
    },
  };
}

