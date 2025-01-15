import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const serviceEndpoint = process.env.TAMI_BASE_URL;
const merchantId = process.env.TAMI_MERCHANT_ID;
const terminalId = process.env.TAMI_TERMINAL_ID;
const secretKey = process.env.TAMI_SECRET_KEY;
const fixedKidValue = process.env.TAMI_FIXED_KID_VALUE;
const fixedKValue = process.env.TAMI_FIXED_K_VALUE;
const callbackUrl = 'https://gbtunelemulator-d.fw.garantibbva.com.tr/secure3d';

function calculateSHA256(data: string) {
  const hash = crypto.createHash('sha256').update(data).digest();
  return Buffer.from(hash).toString('base64');
}

function generateBasicAuthHeader(username: string, password: string) {
  const credentials = Buffer.from(`${username}:${password}`).toString('base64');
  return `Basic ${credentials}`;
}

function getGUID() {
  return uuidv4();
}

const headers = {
  'Content-Type': 'application/json',
  'Accept-Language': 'tr',
  'PG-Api-Version': 'v2',
  'PG-Auth-Token': `${merchantId}:${terminalId}:${calculateSHA256(merchantId + terminalId + secretKey)}`,
  correlationId: getGUID(),
};

export {
  serviceEndpoint,
  merchantId,
  terminalId,
  secretKey,
  fixedKidValue,
  fixedKValue,
  callbackUrl,
  calculateSHA256,
  generateBasicAuthHeader,
  getGUID,
  headers,
};
