export async function hash(value: string, _rounds: number): Promise<string> {
  return `$2b$10$stub${value}`;
}

export async function compare(value: string, hashed: string): Promise<boolean> {
  return hashed === `$2b$10$stub${value}`;
}
