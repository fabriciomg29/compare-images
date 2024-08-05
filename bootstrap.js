const resemble = require('resemblejs');
const fs = require("mz/fs");
const puppeteer = require('puppeteer');
const path = require('path');

const url = 'https://www.uol.com.br/'

const getImagesFromUrl = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    const articles = await page.$$('body article'); // Select the <body> element

    if(articles.length > 1) {
         // Capture the first <article> element
            await articles[4].screenshot({ path: path.join(__dirname, 'img/uol-article1.png') });
            console.log('uol-article1.png was created!');

            await articles[5].screenshot({ path: path.join(__dirname, 'img/uol-article2.png') });
            console.log('uol-article2.png was created!');
    }
    //await element.screenshot({ path: 'body.png' });

    await browser.close();
}

const compareDiff = async () => {
    const file = 'img/uol-article1.png';
    const file2 = 'img/uol-article2.png';
    resemble(file)
        .compareTo(file2)
        .ignoreColors()
        .onComplete(async function (data) {
            await fs.writeFile("img/output.png", data.getBuffer());
        });
}

const main = async () => {
    await getImagesFromUrl();
    await compareDiff();
}


main();