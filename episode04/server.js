const http = require('http');
const fs = require('fs');


const port = 3000;
const ip = '127.0.0.1'

const sendResponse = (filename, statusCode, response) => {
    
    fs.readFile(`./html/${filename}`, (error, data) => {
        if(error){
            response.statusCode = 500;
            response.setHeader('Content-Typq', 'text/plain');
            response.end('Sorry, internal error');
        } else {
            response.statusCode = statusCode;
            response.setHeader('Content-Type', 'text/html');
            response.end(data);
        }
    });
};

const server = http.createServer((request, response) => {
    console.log(request.url, request.method);
    const method = request.method;
    let url = request.url;

    if(method === 'GET') {
        // 使用 Javascript 的 URL object 來去使用他的方法可以用 get 請求參數，範例這我們去 searchPath 來 get 他的 lang 值
        //             URL (當前訪問頁面, 基本URL(從 ip 跟 port 獲得))
        const requestURL = new URL(url, `http://${ip}:${port}`);

        console.log(requestURL); // 可以從這邊去看 URL 裡面有什麼屬性可以使用
        console.log(requestURL.searchParams.get('lang'));
        url = requestURL.pathname;
        const lang = requestURL.searchParams.get('lang');
        let selector;

        if(lang === null || lang === 'en') {
            selector = '';
        }
        else if(lang === 'zh') {
            selector = '-zh';
        }
        else{
            selector = '';
        }

        // url ?後面的好像屬於搜尋路徑跟網頁路徑無關的樣子
        if(url === '/') {
            sendResponse(`index${selector}.html`, 200, response)
        } else if(url === '/about.html'){
            sendResponse(`about${selector}.html`, 200, response)
        } else {
            sendResponse(`404${selector}.html`, 404, response)
        }
    } else{

    }
})
server.listen(port, ip, () => {
    console.log(`Server is running at http://${ip}:${port}`);
})