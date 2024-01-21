import { v4 as uuidv4 } from 'uuid';

export const devPayFastUrl = 'https://sandbox.payfast.co.za/eng/process?';
export const livePayFastUrl = 'https://www.payfast.co.za/eng/process?';
// export const merchantId = '10031207';
export const merchantId = '11971107';
// export const merchantKey = '4dbsouknnxyek';
export const merchantKey = 'trgrfjgn9mogh';
export const returnUrl = 'https://featherandflowers.azurewebsites.net/complete';
export const cancelUrl = 'https://featherandflowers.azurewebsites.net/cancel';
export const paymentMethod = 'cc';
export const paymentId = uuidv4();