import { truncate } from "fs";


export default class ExtensionCheck{
    constructor(){
        this.supportedExtensions = ["jpg", "png", "gif", "jpeg", "bmp", "webp"];
    }

    allowed(extension){
        let ev = false;
        this.supportedExtensions.forEach(ext => {
           let n = ext.localeCompare(extension);
           //console.log(extension + "| Normal Extension:" + ext + " | COMP:" + n);
            if(n == 0)
                ev = true;
        })
        return ev;
    }
}