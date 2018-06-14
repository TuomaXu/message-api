import crypto from 'crypto';

export default (username)=>{

    const hash = crypto.createHash('md5');
    const date = new Date();
    const random = Math.random();
    hash.update(username + date + random);
    const access_token = hash.digest('hex');

    return access_token;  
}