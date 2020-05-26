const fs = require('fs')
const {promisify} = require('util');
const events = require('events');
function videoInfo(name,info){
    this.name=name
    this.info=info
    return {name:this.name,info:this.info}
}
const readdir=promisify(fs.readdir)
async function files(path) {
    let filePath=path?path:"./static/"
    let f1=await readdir(filePath)
    return f1
}
async function handle(){
    let output=[]
    let a= await files().then((data)=>{
        data.forEach(element => {
            let info=element.split(".")[0]
            let obj=new videoInfo(element,info)
            output.push(obj)  
        });
        return new Promise((resolve)=>{
            resolve(output)
        })
        })           
    return a
}
function writer(path) {
    let filePath=path?path:"./videoList.json"
    handle().then((data)=>{
        data=JSON.stringify(data)
        let fsw=fs.writeFile(filePath,data,{ 'flag': 'w' },(err)=>{})
    })
}
writer()
