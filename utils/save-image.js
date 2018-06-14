import crypto from 'crypto';
import fs from 'fs';

export default (fileBuffer)=>{
    return new Promise((callBack,reject)=>{
        //通过随机数和当前时间生成文件名
        //创建HASH计算器，制定为md5算法
        const hash = crypto.createHash('md5');
        //获取当前时间
        const date = new Date();
        //获取随机数
        const random = Math.random();
        //设置源数据
        hash.update(date+ random);
        //获取摘要值,参数hex表示以16进制显示内容
        const filename = hash.digest('hex');
        //配置文件路径
        const path = `./resource/image/${filename}.png`;
    
        fs.writeFile(path,fileBuffer,(err)=>{
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log('文件写入成功');
                callBack(`${filename}.png`);
            }
        });
    });
}