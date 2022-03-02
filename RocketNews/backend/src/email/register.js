import sequelize from 'sequelize'


export async function registerEmail(rocketNews, userEmail) {
  try {
    await rocketNews.create({
      emails: userEmail
    })
  } catch (error) {
    console.error('error in register')
    return false
  }
  return true
}