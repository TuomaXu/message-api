import saveImage from '../utils/save-image';
import sequelize from '../data-model/data-base';

const Message = sequelize.model('message');
const User = sequelize.model('message_user');
const Image = sequelize.model('image');
const Comment = sequelize.model('comment');

export default async (req,res)=>{

    try {
        console.log(req.body);

        const {access_token} = req.body;

        if(!access_token){

            res.json({
                success:false,
                errorCode:10006,
                errorMessage:'参数无效'
            })

            return;
        }

        const user = await User.findOne({where:{access_token}});

        if (!user) {
            res.json({
                success:false,
                errorCode:10004,
                errorMessage:'access_token无效'
            })
            return;
        }
        
        const m = await Message.findAll({
            order:[
                ['id','DESC']
            ],
            include:[
                {
                    model:Image,
                    attributes:['id','url']
                },
                {
                    model:User,
                    attributes:['id','username']
                },
            ],
        });

        res.json({
            success:true,
            data:m
        })








    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            errorCode:10001,
            errorMessage:'系统错误'
        })
    }
}