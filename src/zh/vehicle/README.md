# 关于载具介绍

载具还具有许多特性和功能. 载具通常是通过坐在车辆内部的玩家来访问的. 这是通过`player.vehicle`完成的.

## 载具属性

这是一些非常常用的属性.

### 服务器端

查看 [检查服务器载具属性](./1_server_props).

| 属性名称              | 描述                                                                            |
| -------------------- | -------------------------------------------------------------------------------------- |
| activeRadioStation   | 活动电台的ID.                                                                           |
| bodyAdditionalHealth |                                                                                        |
| bodyHealth           | 车辆的车身健康. 必须使用natives修复车身的损伤.                                            |
| customPrimaryColor   | 车辆原色. 使用`{r，g，b，a}`对象进行设置.                                                 |
| customSecondaryColor | 车辆副色. 使用`{r，g，b，a}`对象进行设置.                                                 |
| customTires          |                                                                                        |
| darkness             |                                                                                        |
| dashboardColor       | 车辆仪表盘颜色的索引.                                                                    |
| daylightOn           | 车辆在白天的灯光.                                                                       |
| destroyed            | 如果车辆被毁.                                                                          |
| dimension            | 车辆的当前尺寸.                                                                        |
| dirtLevel            | 车辆外观有多脏.                                                                        |
| driver               | 当前车辆的驾驶员.                                                                       |
| engineHealth         | 发动机健康.                                                                            |
| engineOn             | 车辆发动机状态. true为启动, false为不启动.                                               |
| flamethrowerActive   |                                                                                       |
| frontWheels          | 用于设置摩托车的轮毂.                                                                   |
| handbrakeActive      |                                                                                        |
| hasArmoredWindows    | 如果车辆装有防弹窗.                                                                     |
| headlightColor       | 大灯的索引颜色.                                                                         |
| id                   | 获取车辆的唯一服务器端ID.                                                                |
| interiorColor        | 车内的索引颜色.                                                                         |
| lightsMultiplier     | 用于增加前照灯的亮度. 默认为`1.0`.                                                       |
| livery               | 如果存在涂装, 获取或设置车辆上的涂装索引.                                                 |
| lockState            | 0 - 无锁, 1 - 未上锁, 2 - 已上锁, 3 - 锁定玩家, 4 - 可以进来不能离开                      |
| manualEngineControl  |                                                                                        |
| modKit               | 设置此项以在 modKitsCount 返回1时允许在车辆上使用mod.                                     |
| modKitsCount         | 与设置modkit一起使用.                                                                   |
| model                | 车辆的当前型号.                                                                         |
| neon                 | 用于打开或关闭霓虹灯. `{back: true, left: true: right: true, front: true}`               |
| neonColor            | 设置霓虹色. `{r, g, b, a}`                                                              |
| nightlightOn         | 用于打开或关闭车辆中的头灯.                                                              |
| numberPlateIndex     | 用于更改车牌的外观.                                                                      |
| numberPlateText      | 将文本放在车牌上.                                                                       |
| pearlColor           |                                                                                        |
| petrolTankHealth     |                                                                                        |
| pos                  | 车辆的当前位置.                                                                         |
| primaryColor         | 设置车辆的主要索引颜色.                                                                  |
| rearWheels           |                                                                                        |
| repairsCount         |                                                                                        |
| roofLivery           |                                                                                        |
| roofOpened           |                                                                                        |
| rot                  | 获取车辆的当前旋转.                                                                      |
| secondaryColor       | 设置车辆的二级索引颜色.                                                                  |
| sirenActive          | 获取警报器当前是否处于活动状态.                                                           |
| tireSmokeColor       |                                                                                        |
| valid                | 检查车辆是否仍然存在并且未被破坏.                                                         |
| wheelColor           |                                                                                        |
| wheelType            |                                                                                        |
| wheelsCount          |                                                                                        |
| windowTint           |                                                                                        |

[alt:V 关于服务器端载具属性类](https://altmp.github.io/altv-typings/classes/_alt_server_.vehicle.html)

### 客户端

| 属性名称       | 描述        |
| ------------- | ----------- |
| gear          |             |
| id            |             |
| model         |             |
| pos           |             |
| rot           |             |
| rpm           |             |
| scriptID      |             |
| speed         |             |
| speedVector   |             |
| valid         |             |
| wheelsCount   |             |

[关于客户端载具属性类](https://altmp.github.io/altv-typings/classes/_alt_client_.vehicle.html)
