export default (sequelize, DataTypes)=>{
    return sequelize.define('message_user',{
        username:DataTypes.STRING,
        password:DataTypes.STRING,
        access_token:DataTypes.STRING,
    });
}