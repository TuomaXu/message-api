import sequelize from '../data-model/data-base';

const Message = sequelize.model('message');

export default async (req,res)=>{
	const query = req.query;
    console.log(query);
    
    const messages = await Message.findAll();

    res.json(messages);

}