export function sign(payload: object): string {
  return `stub.${Buffer.from(JSON.stringify(payload)).toString('base64url')}.sig`;
}

export function verify(token: string): object {
  const [, payload] = token.split('.');
  if (!payload) {
    throw new Error('invalid token');
  }
  return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
}

export default { sign, verify };
