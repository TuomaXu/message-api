export default (sequelize, DataTypes)=>{
    return sequelize.define('comment',{
        content:DataTypes.STRING,
    });
}