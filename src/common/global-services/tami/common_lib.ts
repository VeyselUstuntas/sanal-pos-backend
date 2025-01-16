import { createHash } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export const serviceEndpoint = process.env.TAMI_BASE_URL;
export const merchantId = process.env.TAMI_MERCHANT_ID;
export const terminalId = process.env.TAMI_TERMINAL_ID;
export const secretKey = process.env.TAMI_SECRET_KEY;
export const fixedKidValue = process.env.TAMI_FIXED_KID_VALUE;
export const fixedKValue = process.env.TAMI_FIXED_K_VALUE;
export const callbackUrl =
  'https://gbtunelemulator-d.fw.garantibbva.com.tr/secure3d';

export function calculateSHA256(data: string) {
  const hash = createHash('sha256').update(data).digest();
  return Buffer.from(hash).toString('base64');
}

export function generateBasicAuthHeader(username: string, password: string) {
  const credentials = Buffer.from(`${username}:${password}`).toString('base64');
  return `Basic ${credentials}`;
}

export function getGUID() {
  return uuidv4();
}

export const headers = {
  'Content-Type': 'application/json',
  'Accept-Language': 'tr',
  'PG-Api-Version': 'v2',
  'PG-Auth-Token': `${merchantId}:${terminalId}:${calculateSHA256(merchantId + terminalId + secretKey)}`,
  correlationId: getGUID(),
};
