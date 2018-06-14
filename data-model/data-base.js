//引入Sequelize框架
import Sequelize  from 'sequelize';

//通过Sequelize构造方法创建Sequelize实例并链接数据库
const sequelize = new Sequelize(
  'message_api',
  'root',
  '',
  {
    'dialect': 'mysql',  // 数据库使用mysql
    'host': 'localhost', // 数据库服务器ip
    'port': 3306         // 数据库服务器端口
  }
);

//测试链接是否成功
//sequelize提供一个authenticate()函数测试链接是否成功
//sequelize中所有异步操作都为Promise封装
sequelize
  .authenticate()
  .then(()=>{
    console.log('链接成功');
  })
  .catch((err)=>{
    console.error('链接失败', err);
  });



//导入数据模型

const Comment = sequelize.import('./Comment.js');
const Message = sequelize.import('./Message.js');
const Image = sequelize.import('./Image.js');
const User = sequelize.import('./User.js');


User.hasMany(Message);
Message.belongsTo(User);

Message.hasMany(Image);

Message.hasMany(Comment);
Comment.belongsTo(Message);

User.hasMany(Comment);
Comment.belongsTo(User);



//配置数据关系

//同步数据
sequelize.sync({force:false});

export default sequelize;