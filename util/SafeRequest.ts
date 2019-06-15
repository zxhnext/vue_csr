import * as fetch from "node-fetch";
import {provide} from "../ioc";
import TYPES from "../constant/types";
import {ISafeRequest} from "../interface/ISafeRequest";
@provide(TYPES.SafeRequest)
export class SafeRequest implements ISafeRequest {
    public async fetch(url : string, arg?: Object, callback?: Function) : Promise < Object > {
        // let result = {
        //     code: "error"
        // }
        // await fetch(url)
        //     .then(res => res.json())
        //     .then(json => (result = json));
        // console.log("🍊",result);
        // return result;
        let result = {
            code: 0,
            message: '',
            data: []
        }
        let option = {
            method: "GET"
        }

        if(arg && arg["params"]) {
            option = Object.assign(option, {
                method: arg["method"],
                body: JSON.stringify(arg["params"]),
                headers: {'Content-Type': 'application/json'}
            })
        }
        await fetch(url, option).then(res => res.json())
        .then(json => {
            // if(json.code == 0) {
            //     result = json
            // } else {
            //     result = Object.assign({}, json);
            // }
            result = json
        })
        return result;
    }
}