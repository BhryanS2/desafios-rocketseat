import NodeCache from 'node-cache';

const CACHE_LIMIT = 0.1 // 100ms
const dbCache = new NodeCache({ stdTTL: CACHE_LIMIT, checkperiod: 0.2 });
const mySqlQuery = 'SELECT email from emails where email = email'

export async function findEmail(rocketNews, email) {
  if (dbCache.has(mySqlQuery)) {
    const buffer = dbCache.get(mySqlQuery)
    const { reduce } = await JSON.parse(buffer)
    const result = reduce.filter(item => item === email)
    return result.length > 0
  }
  try {
    const query = await rocketNews.findAll()
    const reduce = query.reduce((acc, item) => {
      acc.push(item.dataValues.emails)
      return acc
    }, [])
    dbCache.set(mySqlQuery, JSON.stringify({ reduce }))
    const result = reduce.filter(item => item === email)
    return result.length > 0
  } catch (error) {
    console.error('error find email')
  }
  const res = false;
  const isExists = res ? true : false;
  return isExists;
}
