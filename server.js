
const http = require('http')

const counter = {
    count: 0,
    increment() {
        this.count++
    }
}
getLinks = (hrefs) => {
    return hrefs.map(link => `<a href="${link.linkHref}">${link.linkName}</a>`).join('\n')
}
const getContent = (namePage, title , hrefs,count) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${namePage}</title>
    </head>
    <body>
        <div class="count">${count}</div>
        <div class="container">${title}</div>
        ${getLinks(hrefs)}
        
    </body>
    </html>`
}



const routing = {
    '/': {
        head: {
            statusCode: 200,
            contentTYpe: "'Content-Type': 'text/html'"
        },
        getPage() {
            return getContent('Главная','Главная',[{linkName: 'О нас', linkHref: '/about'}], counter.count)
        },
    },
    '/about': {
        head: {
            statusCode: 200,
            contentType: "'Content-Type': 'text/html'"
        },
        getPage() {
            return getContent('О нас','О нас',[{linkName: 'Главная', linkHref: '/'}], counter.count)
        },
    },
    'error': {
        head: {
            statusCode: 404,
            contentType: "'Content-Type': 'text/html'"
        },
        getPage() {
            return getContent('Страница не найдена','Страница не найдена',[{linkName: 'Главная', linkHref: '/'},{linkName: 'О нас', linkHref: '/about'}], counter.count)
        },
    }
}
const server = http.createServer((req, res) => {
    counter.increment()
    let page = routing[req.url]
    if (!page) {
        page = routing['error']
    }
    res.writeHead(page.head.statusCode, page.head.contentType)
    res.write(page.getPage())
    
})

const port = 3000

server.listen(port, () => console.log('Сервер запущени на порту' + port))