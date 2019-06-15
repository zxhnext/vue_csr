// 接口文档
export interface IApi {
    getInfo(url:string,arg?:Object,callback?:Function):Promise<Object>;
}
