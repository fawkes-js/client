export function mergeOptions (options: object[]): any {
  let value = {}

  options.forEach((option) => {
    value = { ...value, ...option }
  })

  return value
}

export const defaultRESTOptions = {
  prefix: 'Bot',
  api: 'https://discord.com/api',
  versioned: true,
  version: 10
}

export const defaultClientOptions = {}
