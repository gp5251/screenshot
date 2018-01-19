const Koa = require('koa');
const static = require('koa-static');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const puppeteer = require('puppeteer');
const app = new Koa();
const router = new Router();
const getImg = async (url, w, h) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const fname = Date.now() + '.png';
  const path = __dirname + '/public/' + fname;
  page.setViewport({width: w, height: h});
  await page.goto(url);
  await page.screenshot({path});
  await browser.close();
  return fname;
}

// 使用 bodyParser 和 static 中间件
app.use(bodyParser());
app.use(static('./public'));

// 路由设置
router.get('/screenshot', async (ctx, next) => {
  let {url, w = 800, h = 600} = ctx.query;
  try{
    let fname = await getImg(url, +w, +h);
    ctx.body={
      status: 'ok',
      url: 'http://0.0.0.0:8080/' + fname
    }
  }catch(e){
    console.error(e);
    ctx.body={
      status: 'error',
      msg: e.message
    }
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8080);
