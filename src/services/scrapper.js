const puppeteer = require('puppeteer');
const fs = require('fs');
var config = require('./../config');
const { checkSendEmail } = require('./mail');
const saveDataToDB = (data)=>{
    try{
        fs.writeFileSync('./data/data.json', JSON.stringify(data));
    }catch(err){
        console.log(err);
    }
}

const getDataFromDB = ()=>{
    try{
        return JSON.parse(fs.readFileSync('./data/data.json').toString());
    }catch(err){
        console.log(err);
        return []
    }
}

const launchPupetter = async(link,key,s)=>{
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--start-maximized']
    });
    const page = await browser.newPage({
        timeout:100000
    });
    await page.goto(link);
    await page.waitForSelector(s.title);
    await page.waitForSelector(s.price);

    const data = await page.evaluate(()=>{
        const sIn = {
            title: '#root-app > div > div.ui-pdp-container.ui-pdp-container--pdp > div > div.ui-pdp-container__col.col-1.ui-pdp-container--column-right.mt-16.pr-16.ui-pdp--relative > div > div.ui-pdp-container__row.ui-pdp-component-list.pr-16.pl-16 > div > div.ui-pdp-container__row.ui-pdp-container__row--header > div > div.ui-pdp-header__title-container > h1',
            price: '#root-app > div > div.ui-pdp-container.ui-pdp-container--pdp > div > div.ui-pdp-container__col.col-1.ui-pdp-container--column-right.mt-16.pr-16.ui-pdp--relative > div > div.ui-pdp-container__row.ui-pdp-component-list.pr-16.pl-16 > div > div.ui-pdp-container__row.ui-pdp-container__row--price > div > div.ui-pdp-price__second-line > span.price-tag.ui-pdp-price__part > span.price-tag-amount > span.price-tag-fraction'
        }
        return {
                title: document.querySelector(sIn.title).innerText,
                price: document.querySelector(sIn.price).innerText,
                date: new Date().toISOString()
            }

    });
    await browser.close();
    return { [key]:data };
}
const scrapper = async({scrapper:scrapperIn, selectors})=>{
    try{
        console.log("["+new Date().toISOString()+']Init scrapping...');
        const promises = Object.entries(scrapperIn)
            .map(([key,val])=>launchPupetter(val,key,selectors));
        const result = await Promise.all(promises)
        const initialData = getDataFromDB();
        result.forEach(item=>{
            Object.entries(item).forEach(([key,val])=>{
                initialData[key] = initialData[key] || [];
                checkSendEmail(initialData, {[key]:[val]});
                initialData[key] = [...initialData[key], val];
            });
        });
        saveDataToDB({...initialData});
        console.log("["+new Date().toISOString()+']Scrapping done...');
    }catch(err){
        console.log(err,"Fallo al traer los datos alas " + new Date().toISOString());
    }

}

module.exports  = {
    scrapper,
    getDataFromDB
}
