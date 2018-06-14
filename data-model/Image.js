export default (sequelize, DataTypes)=>{
    return sequelize.define('image',{
        url:DataTypes.STRING,
    });
}