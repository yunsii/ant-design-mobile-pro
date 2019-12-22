<h1 align="center">Ant Design Mobile Pro</h1>

<div align="center">

像 [Ant Design Pro](https://github.com/ant-design/ant-design-pro) 一样使用 Ant Design Mobile。

</div>

![ant-deisgn-mobile-pro-puzzle-min.png](https://i.loli.net/2019/12/20/6nMpEzVkIruC15Y.png)

## 已有特性

* 代码分割
* 高清方案
* 结合 CustomIcon 快速使用 iconfont

## 核心组件

* [AsyncRender](/src/components/AsyncRender/index.tsx) - 数据异步渲染组件
* [Avatar](/src/components/Avatar/index.tsx) - 从 ant-design 迁移的 [Avatar](https://ant.design/components/avatar-cn/) 组件
* [CustomIcon](/src/components/CustomIcon/index.tsx) - 配置 `type` 即可使用 iconfont 中的图标
* [Description](/src/components/Description/index.tsx) - 描述字段
* [Ellipsis](/src/components/Ellipsis/index.tsx) - 文本自动省略号，引用自 https://v2-pro.ant.design/components/ellipsis-cn
* [Form](/src/components/Form/index.tsx) - 基于 antd-mobile 的配置化实现表单功能的组件，仿 [antd-form-mate](https://github.com/theprimone/antd-form-mate) 实现
* [PageWrapper](/src/components/PageWrapper/index.tsx) - 定制导航栏实现
* [Paper](/src/components/Paper/index.tsx) - 纸张组件
* [SimpleCard](/src/components/SimpleCard/index.tsx) - 简单卡片
* [Spin](/src/components/Spin/index.tsx) - 从 ant-design 迁移的 [Spin](https://ant.design/components/spin-cn/) 组件
* [StandardList](/src/components/StandardList/index.tsx) - 基于 ListView 封装的快速实现数据长列表渲染的组件
* [Statistics](/src/components/Statistics/index.tsx) - 统计数字展示

## 一些问题

1. 实测发现 fastclick 的功能在 iOS 设备上会导致输入框点击多次才有响应，故只在非 iOS 设备上[添加](/src/global.ts#L15)该功能。
