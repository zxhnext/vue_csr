import "reflect-metadata";
import { InversifyKoaServer } from "inversify-koa-utils";
import {Container, buildProviderModule} from "./ioc";
import "./ioc/loader";

import * as bodyParser from "koa-bodyparser";
import { configure, getLogger } from 'log4js';
import errorHandler from "./middleawares/errorHandler";
import co from 'co';
import * as render from "koa-swig";
import * as serve from "koa-static";
import historyApiFallback from 'koa2-connect-history-api-fallback';
import config from "./config";




//IOC 控制反转
const container = new Container();
container.load(buildProviderModule());

//log4js配置
configure({
    appenders: { cheese: { type: "file", filename: "./logs/yd.log" } },
    categories: { default: { appenders: ["cheese"], level: "error" } }
});
const logger = getLogger("cheese");

let server = new InversifyKoaServer(container);
server.setConfig(app => {
    app.use(bodyParser())
    app.context.render = co.wrap(render({
      root: config.viewDir,
      autoescape: true,
      // cache: 'memory', // disable, set to false 
      cache:false,
      ext: 'html',
      varControls: ["[[", "]]"],
      writeBody: false
    }))
    app.use(historyApiFallback({  
        index: '/',
        whiteList: ['/search/userinfo', '/set/chatinfo'] 
    }))
    app.use(serve(config.staticDir)) // 静态资源文件
})
.setErrorConfig(app=>{
    console.log(app);
    errorHandler.error(app,logger);
})

let app = server.build();
app.listen(config.port,()=>{
    console.log(config.port+"系统启动成功🍎");
})