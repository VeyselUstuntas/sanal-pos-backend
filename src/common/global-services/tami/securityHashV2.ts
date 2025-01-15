import {
  merchantId,
  terminalId,
  secretKey,
  fixedKValue,
  fixedKidValue,
} from './common_lib';
import crypto from 'crypto';

export function generateJWKSignature(input: string) {
  const jwkResource = getJWKResource(
    merchantId,
    terminalId,
    secretKey,
    fixedKidValue,
    fixedKValue,
  );

  const header = {
    kid: jwkResource.kid,
    typ: 'JWT',
    alg: 'HS512',
  };

  const headerBase64 = base64UrlEncode(
    Buffer.from(JSON.stringify(header), 'utf8'),
  );
  const payloadBase64 = base64UrlEncode(Buffer.from(input, 'utf8'));

  const dataToSign = `${headerBase64}.${payloadBase64}`;
  const signature = computeHmacSha512(
    Buffer.from(jwkResource.k, 'base64'),
    Buffer.from(dataToSign, 'utf8'),
  );
  const signatureBase64 = base64UrlEncode(signature);

  const result = `${headerBase64}.${payloadBase64}.${signatureBase64}`;

  // console.log(result);

  return result;
}

export function generateKidValue(secretKey: string, fixedKidValue: string) {
  const hash = crypto.createHash('sha512');
  hash.update(secretKey + fixedKidValue, 'utf8');
  return hash.digest('base64');
}

export function generateKValue(
  merchantNumber: string,
  terminalNumber: string,
  secretKey: string,
  fixedKValue: string,
) {
  const hash = crypto.createHash('sha512');
  hash.update(
    secretKey + fixedKValue + merchantNumber + terminalNumber,
    'utf8',
  );
  return hash.digest('base64');
}

export function getJWKResource(
  merchantNumber: string,
  terminalNumber: string,
  secretKey: string,
  fixedKidValue: string,
  fixedKValue: string,
) {
  return {
    kid: generateKidValue(secretKey, fixedKidValue),
    k: generateKValue(merchantNumber, terminalNumber, secretKey, fixedKValue),
  };
}

export function computeHmacSha512(key: Buffer, data: Buffer) {
  return crypto.createHmac('sha512', data).update(data).digest();
}

export function base64UrlEncode(buffer: Buffer) {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
