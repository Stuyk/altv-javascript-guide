# 设置客户端调试

您应该在此阶段设置alt:V客户端.

转到altv.exe所在的文件夹位置, 然后找到altv.cfg.

![](../../img/edit_cfg.png)

## altv.cfg

确保此参数设置为true.

如果不存在. 自行创建参数.

```sh
debug: 'true'
```

## 重新连接

重新启动服务器后, 您将断开连接. 您只能将`debug`设置为`true`以及您自己的客户端的`debug`设置为`true`才能重新连接到服务器.

只需按 `F8`

**有设置服务器密码**

```
reconnect 输入你的密码
```

**没有设置服务器密码**

```
reconnect
```
