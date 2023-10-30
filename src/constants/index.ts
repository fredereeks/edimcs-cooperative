

export const SECRET = process.env.JWT || 'a82357yxa.19848iaa069asf6000196'
export const MAX_AGE = 60 * 60 * 24 * 2 //2days
export const randomInt = Buffer.from(crypto.randomUUID()).toString('base64')