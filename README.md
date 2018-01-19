# screenshot
screenshot server(koa2) with [puppeteer](/GoogleChrome/puppeteer)

### first install puppeteer
> npm i puppeteer

### clone this repository, and install dependancies
> npm i

### run
> node index.js

goto http://0.0.0.0:8080/screenshot?url=YOUR_URL

#### tip: 
- the screenshot generated will be found in ./public;
- the default width and heigt will be 800 * 600, you can change it in url query such as w=1000&h=800