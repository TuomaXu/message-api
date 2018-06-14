import sequelize from '../data-model/data-base';
import getToken from '../utils/getToken';

const User = sequelize.model('message_user');

export default async (req,res)=>{
    try {
        const { username , password } = req.body;

        if(!username || !password){
            res.json({
                success:false,
                errorCode:10006,
                errorMessage:'参数无效'
            })

            return;
        }

        const users = await User.findAll({where:{username}});

        if (users.length != 0) {
            res.json({
                success:false,
                errorCode:10007,
                errorMessage:'用户名已存在'
            })

            return;
        }

        const access_token = getToken(username);

        const user = await User.create({
            username,
            password,
            access_token
        });

        res.json({
            success:true,
            data:user
        })


    } catch (error) {
        res.json({
            success:false,
            errorCode:10001,
            errorMessage:'系统错误'
        })
    }
}