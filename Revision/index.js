const fsPromise=require("fs").promises;
const path=require("path");

const fileOps=async ()=>{
    try{
       await fsPromise.writeFile(path.join(__dirname,"files","starter.txt"),"Write something");

      

       await fsPromise.appendFile(path.join(__dirname,"files","starter.txt"),"\n\nhey I am adding something");

       await fsPromise.rename(path.join(__dirname,"files","starter.txt"),path.join(__dirname,"files","newStater.txt"));

        const data=await fsPromise.readFile(path.join(__dirname,"files","starter.txt"),"utf8",)

       console.log(data);
       
    }catch(err){
        console.log(err);
    }   
}

fileOps();