const jwt = require('jsonwebtoken');
const puppeteer = require('puppeteer');
const env = require('dotenv').config()

const secretSigningKey = process.env.SECRET_KEY || 'shhhhhhhhhhhhhhhhh';

const generateToken = (userId) => {
    return jwt.sign({ userId }, secretSigningKey)
}

const verifyToken = (token) => {
    return jwt.verify(token, secretSigningKey)
}

async function scrapePosting(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, {
        timeout: 0,
        waitUntil: 'networkidle0'
    })
    console.log(`navigating to url ${url}`)
    console.log('selectors appeared')
    console.log('--------------------------------------------------------------------')
    const description = await page.$eval('div.description__text.description__text--rich', el => el.innerText)
    const title = await page.$eval('h1.top-card-layout__title', el => el.innerText)
    const company = await page.$eval('a.topcard__org-name-link', el => el.innerText)
    const location = await page.$eval('span.topcard__flavor--bullet', el => el.innerText)
    console.log(description)
    console.log('--------------------------------------------------------------------')
    console.log(title);
    console.log(company)
    console.log(location)
    await browser.close();
    return {
        description,
        title,
        company,
        location
    }
}

module.exports = {
    generateToken,
    verifyToken,
    scrapePosting
}