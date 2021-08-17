// 參考影片https://www.youtube.com/watch?v=zHB1dn8FU44&ab_channel=WenXuanDecode%E6%96%87%E8%BD%A9%E8%A7%A3%E7%A0%81
// 使用 Node.js 自帶的 HTTP Module (模組) 返回一個 http object
// 要用模組需要使用 require 這個函數去導入 (類似 JS new 一個物件的感覺)
const http = require('http');


// 用 http object 裡面的 createServer 函數創建服務器 ( createServer 函數會返回一個 server object)
// 將請求監聽器植入到服務器裡面 ( 監聽器(Listener) = 函數(Function) )
// 參數 request = 前端請求 object ， 參數 response = 反饋給前端的信息 響應 object
const server = http.createServer(function(request, response) {
    // 使用 setHeader 函數設置頭部訊息返回到前端
    response.writeHead(200, {'Content-Type':'text/plain'})
    // 使用 end 返回字符串到前端 
    response.end('Hello From NodeJS Server!')
    // 訪問 http://${ip}:${port} 頁面成功顯示 Hello From NodeJS Server! 代表成功運行後端程序
})

// 監聽前端的請求 listen (類似 JS 的 addEventListener )
// server.listen(端口, 地址, 回調函數)
const port = 3000;
const ip ='127.0.0.1'; // Node.js 服務器在本機端運行，訪問本機端 IP 地址
server.listen(port, ip, () => {
    console.log(`Sever is running at http://${ip}:${port}`);
})