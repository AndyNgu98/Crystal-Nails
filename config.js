require('dotenv').config()

const keys = {
    db: {
       connectionLimit: 10,
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASS,
       database: process.env.DATABASE

    },
    emailjs: {
        serviceId: process.env.SERVICE_ID,
        templateId: process.env.TEMPLATE_ID,
        userId: process.env.USER_ID
    }
}

module.exports = {
    keys
}

