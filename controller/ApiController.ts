//不是自己实现的，是在IOC 中
import {
    Router,
    TAGS,
    interfaces,
    TYPE,
    httpGet,
    httpPost,
    controller,
    provideThrowable,
    inject
} from "../ioc";

import { URLSearchParams } from 'url';

@provideThrowable(TYPE.Controller,"ApiController")
@controller("/")
export default class ApiController implements interfaces.Controller{
    private apiService;
    //aop 面向切面工程
    constructor(@inject(TAGS.ApiService) ApiService){
        this.apiService = ApiService;
    }

    @httpGet("/")
    private async test(ctx:Router,IRouterContext,next:()=>Promise<any>) :Promise<any>{
        ctx.body = await ctx.render('index');
    }

    @httpGet("search/userinfo")
    private async test2(ctx:Router,IRouterContext,next:()=>Promise<any>) :Promise<any>{
        const result:Promise<Object> = await this.apiService.getInfo("http://localhost/index.php?r=userinfo");
        ctx.body = result;
    }

    @httpPost("set/chatinfo")
    private async test3(ctx:Router,IRouterContext,next:()=>Promise<any>) :Promise<any>{
        // const params = new URLSearchParams({
        //     'Userinfo[name]':ctx.request.body.name,
        //     'Userinfo[sex]':ctx.request.body.sex,
        //     'Userinfo[age]':ctx.request.body.age,
        //     'Userinfo[user_id]':ctx.request.body.user_id
        // } as any);
        // params.append('Userinfo[name]', ctx.request.body.name);
        // params.append('Userinfo[sex]', ctx.request.body.sex);
        // params.append('Userinfo[age]', ctx.request.body.age);
        // params.append('Userinfo[user_id]', ctx.request.body.user_id);
        const _request = ctx.request.body
        const result:Promise<Object> = await this.apiService.getInfo('http://localhost/index.php?r=userinfo/create', {
            method: 'POST',
            params: _request
        })
        ctx.body = result;
    }    
}