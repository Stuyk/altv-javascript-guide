# 玩家简介

玩家就是你. 你是玩家. 您的朋友是玩家. 每个人都是玩家.

玩家还具有许多特性和功能. 玩家最常通过事件访问.

意味着事件将使您可以访问玩家实例, 具体取决于玩家的行为.

## 玩家属性

这是一些非常常用的属性.

### 服务器端

[查看服务器端玩家属性](./1_server_props).

| 属性名称      | 描述                                         |
| ------------- | -------------------------------------------- |
| armour        | 设置玩家护甲. 0-100                          |
| currentWeapon | 获取玩家当前的护甲.                          |
| dimension     | 玩家的虚拟世界维度. 默认0                    |
| health        | 设定玩家的健康状况. 100-200                  |
| hwidHash      | 独特的硬件哈希                               |
| hwidExHash    | 独特的Ex硬件哈希                             |
| id            | 他们的服务器端ID                             |
| ip            | 他们的IP地址                                 |
| model         | 读取或设置玩家的模型.                        |
| name          | 只读玩家名称                                 |
| ping          | 当前玩家的延迟                               |
| pos           | 当前玩家的位置                               |
| vehicle       | 如果有车辆, 则可让您获得该车辆. 否则为空.    |
| socialId      | 非唯一的欺骗性social club ID。 请勿用于识别. |
| valid         | 一种确定实体是否仍然存在的方法.              |

[查看alt:V服务器端](https://altmp.github.io/altv-typings/classes/_alt_server_.player.html)

### 客户端

| 属性名称 | 描述                                        |
| -------- | ------------------------------------------- |
| pos      | 玩家的位置. 如果超出水流范围, 则位置被冻结. |
| vehicle  | 玩家的车辆, 如果它们合而为一, 否则为空.     |
| scriptID | 玩家当前的scriptID, 用于与本地合作使用.     |

[查看alt:V客户端](https://altmp.github.io/altv-typings/classes/_alt_client_.player.html)
