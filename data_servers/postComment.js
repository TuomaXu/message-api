import saveImage from '../utils/save-image';
import sequelize from '../data-model/data-base';

const Message = sequelize.model('message');
const User = sequelize.model('message_user');
const Comment = sequelize.model('comment');

export default async (req,res)=>{

    try {
        console.log(req.body);

        const {access_token,messageID,content} = req.body;

        if(!access_token || !messageID || !content){

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

        const message = await Message.findOne({where:{id:messageID}});

        if (!message) {
            res.json({
                success:false,
                errorCode:10008,
                errorMessage:'MessageID无效'
            })
            return;
        }



        const comment = await Comment.create({
            content
        });

        await user.addComment(comment);
        await message.addComment(comment);
 
        
        const m = await Comment.findOne({
            where:{id:comment.id},
            include:[
                {
                    model:Message,
                    attributes:['id','title']
                },
                {
                    model:User,
                    attributes:['id','username']
                }
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