export function mergeOptions(options: object[]) {
  let value = {};

  options.map((option) => {
    value = { ...value, ...option };
  });

  return value;
}

export const defaultRESTOptions = {
  prefix: "Bot",
  api: "https://discord.com/api",
  versioned: true,
  version: 10,
};

export const defaultClientOptions = {};
