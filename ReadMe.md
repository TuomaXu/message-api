# API 文档

### 元数据

账户

```
{
	"id": 1,
	"username": "tom1",
	"password": "1234",
	"access_token": "e1fa63bed5f5eff45c9147ff27fcef28",
	"updatedAt": "2018-06-07T05:08:04.452Z",
	"createdAt": "2018-06-07T05:08:04.452Z"
}
```

消息

```
{
	"id": 10,
	"title": "xxx3",
	"content": "yyy3",
	"createdAt": "2018-06-07T05:25:47.000Z",
	"updatedAt": "2018-06-07T05:25:47.000Z",
	"messageUserId": 1,
	"images": [],
	"message_user": {
		"id": 1,
		"username": "tom1"
	}
}
```

评论

```
{
	"id": 2,
	"content": "xxx",
	"createdAt": "2018-06-07T05:32:59.000Z",
	"updatedAt": "2018-06-07T05:32:59.000Z",
	"messageId": 10,
	"messageUserId": 1,
	"message": {
		"id": 10,
		"title": "xxx3"
	},
	"message_user": {
		"id": 1,
		"username": "tom1"
	}
}
```


### 错误代码

|错误代码|内容|
|:---|:---|
|10001|系统错误|
|10002|用户名错误|
|10003|密码错误|
|10004|access_token无效|
|10005|TodoID无效|
|10006|参数无效|
|10007|用户名已存在|
|10008|MessageID无效|

错误返回值：

```
{
    success:false,
    errorCode:10001,
    errorMessage:'系统错误'
}
```

### 请求地址

`http://60.205.141.116:60003/`

### 接口描述

注册

请求链接：`/api/register`

请求方式：`POST`

|参数名称|参数描述|
|:---|:---|
|username|用户名|
|password|密码|

```
{
    "success": true,
    "data": {
        "id": 2,
        "username": "tom1",
        "password": "1234",
        "access_token": "16e088f3d62c4c132e8728ef79eaf353",
        "updatedAt": "2018-06-06T08:05:13.664Z",
        "createdAt": "2018-06-06T08:05:13.664Z"
    }
}
```

登录

请求链接：`/api/login`

请求方式：`POST`

|参数名称|参数描述|
|:---|:---|
|username|账户名|
|password|密码|

```
{
    "success": true,
    "data": {
        "id": 2,
        "username": "tom1",
        "password": "1234",
        "access_token": "8e58260409dc169009b87800dfe5128f",
        "createdAt": "2018-06-06T08:05:13.000Z",
        "updatedAt": "2018-06-06T08:11:18.442Z"
    }
}

```

发留言

请求链接：`/api/postMessage`

请求方式：`POST`

|参数名称|参数描述|
|:---|:---|
|access_token|登录令牌|
|title|消息标题|
|content|消息内容|
|image1-9|图片Base64链接|

返回值：

```
{
    "success": true,
    "data": {
        "id": 10,
        "title": "xxx3",
        "content": "yyy3",
        "createdAt": "2018-06-07T05:25:47.000Z",
        "updatedAt": "2018-06-07T05:25:47.000Z",
        "messageUserId": 1,
        "images": [],
        "message_user": {
            "id": 1,
            "username": "tom1"
        }
    }
}
```

发布对指定消息的评论

请求路径：`/api/postComment`

请求方式：`POST`

|参数名称|参数描述|
|:---|:---|
|access_token|登录令牌|
|messageID|消息ID|
|content|评论内容|

返回值：

```
{
    "success": true,
    "data": {
        "id": 2,
        "content": "xxx",
        "createdAt": "2018-06-07T05:32:59.000Z",
        "updatedAt": "2018-06-07T05:32:59.000Z",
        "messageId": 10,
        "messageUserId": 1,
        "message": {
            "id": 10,
            "title": "xxx3"
        },
        "message_user": {
            "id": 1,
            "username": "tom1"
        }
    }
}
```


获取全部消息

请求地址：`/api/allMessages`

请求方式：`POST`

|参数名称|参数描述|
|:---|:---|
|access_token|登录令牌|

返回值：

```
{
    "success": true,
    "data": [
        {
            "id": 3,
            "title": "xxx3",
            "content": "yyy3",
            "createdAt": "2018-06-07T05:08:55.000Z",
            "updatedAt": "2018-06-07T05:08:55.000Z",
            "messageUserId": 1,
            "images": [],
            "message_user": {
                "id": 1,
                "username": "tom1"
            }
        },
        {
            "id": 6,
            "title": "xxx3",
            "content": "yyy3",
            "createdAt": "2018-06-07T05:22:16.000Z",
            "updatedAt": "2018-06-07T05:22:16.000Z",
            "messageUserId": 1,
            "images": [],
            "message_user": {
                "id": 1,
                "username": "tom1"
            }
        },
        {
            "id": 7,
            "title": "xxx3",
            "content": "yyy3",
            "createdAt": "2018-06-07T05:22:46.000Z",
            "updatedAt": "2018-06-07T05:22:46.000Z",
            "messageUserId": 1,
            "images": [],
            "message_user": {
                "id": 1,
                "username": "tom1"
            }
        },
        {
            "id": 8,
            "title": "xxx3",
            "content": "yyy3",
            "createdAt": "2018-06-07T05:23:05.000Z",
            "updatedAt": "2018-06-07T05:23:05.000Z",
            "messageUserId": 1,
            "images": [],
            "message_user": {
                "id": 1,
                "username": "tom1"
            }
        },
        {
            "id": 9,
            "title": "xxx3",
            "content": "yyy3",
            "createdAt": "2018-06-07T05:23:43.000Z",
            "updatedAt": "2018-06-07T05:23:43.000Z",
            "messageUserId": 1,
            "images": [],
            "message_user": {
                "id": 1,
                "username": "tom1"
            }
        },
        {
            "id": 10,
            "title": "xxx3",
            "content": "yyy3",
            "createdAt": "2018-06-07T05:25:47.000Z",
            "updatedAt": "2018-06-07T05:25:47.000Z",
            "messageUserId": 1,
            "images": [],
            "message_user": {
                "id": 1,
                "username": "tom1"
            }
        },
        {
            "id": 4,
            "title": "xxx3",
            "content": "yyy3",
            "createdAt": "2018-06-07T05:09:57.000Z",
            "updatedAt": "2018-06-07T05:09:57.000Z",
            "messageUserId": null,
            "images": [],
            "message_user": null
        },
        {
            "id": 5,
            "title": "xxx3",
            "content": "yyy3",
            "createdAt": "2018-06-07T05:11:13.000Z",
            "updatedAt": "2018-06-07T05:11:13.000Z",
            "messageUserId": null,
            "images": [],
            "message_user": null
        }
    ]
}
```

获取指定消息的评论内容

请求地址：`/api/allComments`

请求方式：`POST`

|参数名称|参数描述|
|:---|:---|
|access_token|登录令牌|
|messageID|消息ID|

返回值：

```
{
    "success": true,
    "data": [
        {
            "id": 1,
            "content": "xxx",
            "createdAt": "2018-06-07T05:32:14.000Z",
            "updatedAt": "2018-06-07T05:32:15.000Z",
            "messageId": 10,
            "messageUserId": 1,
            "message_user": {
                "id": 1,
                "username": "tom1"
            }
        },
        {
            "id": 2,
            "content": "xxx",
            "createdAt": "2018-06-07T05:32:59.000Z",
            "updatedAt": "2018-06-07T05:32:59.000Z",
            "messageId": 10,
            "messageUserId": 1,
            "message_user": {
                "id": 1,
                "username": "tom1"
            }
        }
    ]
}
```

