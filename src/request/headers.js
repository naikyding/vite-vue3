import hmacsha1 from 'hmacsha1'

export const getHeaders = () => {
  let appId = 'a9e9658bcac14f878ac763023fecc263'
  let apiKey = 'XasUT2UUuQFY19IrVmmit8NjkjY'
  let xDate = new Date().toGMTString()
  let signature = hmacsha1(apiKey, `x-date: ${xDate}`)
  let Authorization = `hmac username="${appId}", algorithm="hmac-sha1", headers="x-date", signature="${signature}"`

  return {
    Authorization,
    'x-date': xDate
  }
}