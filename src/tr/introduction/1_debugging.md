# Setup Client Debugging

You should have the alt:V client setup at this stage.

Go to the folder location of where your altv.exe is located and find the altv.cfg.

![](./img/edit_cfg.png)

## altv.cfg

Make sure that this parameter is set to true.

If it does not exist. Create the parameter.

```sh
debug: 'true'
```

## Reconnecting

After a server is restarted you will be disconnected. You are only able to reconnect to a server with `debug` set to `true` as well as your own client's `debug` set to `true`.

Simply Press `F8`

**With Password**

```
reconnect password_goes_here
```

**Without Password**

```
reconnect
```
