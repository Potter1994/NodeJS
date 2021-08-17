const http = require('http');
// 導入讀取文件的模組 fs (file system)
const fs = require('fs');

const sendResponse = (filename, statusCode, response) => {
    // 用 fs.readFile(文件名, 回調函數) 函數讀取文件
    // readFile 還需要提供文件的路徑在文件名前面
    // readFile 參數的回調函數裡面有兩個參數 error 跟 data ，如果成功讀取文件 error 值是 undefined ， data 被賦予文件內容。
    // 如果讀取文件報錯 error 被賦予報錯訊息
    fs.readFile(`./html/${filename}`, (error, data) => {
        // 這裡放 if else 來判斷 readeFile 是否成功讀取文件
        if(error){
            response.statusCode = 500;
            response.setHeader('Content-Typq', 'text/plain');
            response.end('Sorry, internal error');
        } else {
            response.statusCode = statusCode;
            response.setHeader('Content-Type', 'text/html'); // text/html 代表發送 html 源代碼
            response.end(data);
        }
    });
};

const server = http.createServer((request, response) => {
    console.log(request.url, request.method);
    const method = request.method;
    const url = request.url;
    if(method === 'GET') {
        if(url === '/') {
            sendResponse('index.html', 200, response)
        } else if(url === '/about.html'){
            sendResponse('about.html', 200, response)
        } else {
            sendResponse('404.html', 404, response)
        }
    } else{

    }
})
const port = 3000;
const ip = '127.0.0.1'
server.listen(port, ip, () => {
    console.log(`Server is running at http://${ip}:${port}`);
})