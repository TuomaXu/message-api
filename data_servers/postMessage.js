import saveImage from '../utils/save-image';
import sequelize from '../data-model/data-base';

const Message = sequelize.model('message');
const User = sequelize.model('message_user');
const Image = sequelize.model('image');

export default async (req,res)=>{

    try {
        console.log(req.body);
        console.log(req.files);

        const {access_token,title,content} = req.body;

        if(!access_token || !title || !content){

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

        const message = await Message.create({
            title,
            content
        });

        await user.addMessage(message);

        if (req.files) {
            const imageSavePromises = req.files.map((file)=>{
                return saveImage(file.buffer);
            });
            const imageURLs = await Promise.all(imageSavePromises);
            const imagePromises = imageURLs.map((url)=>{
                return Image.create({url});
            });
            const images = await Promise.all(imagePromises);
            await message.setImages(images);
    
        }

        // const body_length = Object.keys(req.body).length;
        
        // if(body_length>3){
        //     const imageSavePromises = [];
        //     for(let i = 0;i<body_length-3;i++){
        //         const dataString = req.body[`image${i}`];
        //         const array = dataString.split(',');
        //         console.log(array[0]);
        //         const buffer =  new Buffer(array[1], 'base64');
        //         imageSavePromises.push(saveImage(buffer))
        //     }

        //     const imageURLs = await Promise.all(imageSavePromises);

        //     const imageCreatePromises = imageURLs.map((url)=>{
        //         console.log(url);
        //         return Image.create({url});
        //     });

        //     const images = await Promise.all(imageCreatePromises);

        //     await message.setImages(images);
        // }
        
        const m = await Message.findOne({
            where:{id:message.id},
            include:[
                {
                    model:Image,
                    attributes:['id','url']
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