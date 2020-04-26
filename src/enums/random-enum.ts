export function randomEnum<T>(enumeration: any): T {
  const keys = Object.keys(enumeration).filter(k => !(Math.abs(Number.parseInt(k)) + 1));
  // @ts-ignore
  return enumeration[keys[Math.floor(Math.random() * keys.length)]];
}
