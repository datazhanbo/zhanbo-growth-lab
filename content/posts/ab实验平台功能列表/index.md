---
title: "AB实验平台功能列表"
date: 2025-06-27T14:05:15+08:00
description: "典型的AB实验平台建设功能列表，可以参考： 需求大类具体需求需求分类交付物优先级相关人备注业务理解流量控制文档调研报告P0业务团队AB产品&后端业务服务端流量控…"
tags: ["实验平台", "功能列表", "平台建设"]
categories: ["实验平台"]
keywords: ["AB实验平台功能", "实验平台建设", "实验平台功能列表"]
draft: false
markup: "html"
showToc: false
hidemeta: false
comments: false
disableShare: false
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
---
<p></p>



<p>典型的AB实验平台建设功能列表，可以参考：</p>



<p></p>



<figure class="wp-block-table"><table><tbody><tr><td>需求大类</td><td>具体需求</td><td>需求分类</td><td>交付物</td><td>优先级</td><td>相关人</td><td>备注</td></tr><tr><td>业务理解</td><td>流量控制</td><td>文档</td><td>调研报告</td><td>P0</td><td>业务团队AB产品&amp;后端业务服务端</td><td>流量控制&amp;实验方法：正交，互斥，缓存（加锁），继承，条件筛选</td></tr><tr><td></td><td>实验配置</td><td>文档</td><td>接口规范(AB后端)</td><td>P0</td><td>AB产品&amp;后端业务服务端</td><td>配置文件格式和schema</td></tr><tr><td>实验配置</td><td>配置管理</td><td>功能</td><td>配置后端(AB后端)</td><td>P0</td><td>AB产品&amp;后端配置管理员</td><td>按照配置协议进行配置管理</td></tr><tr><td></td><td>配置分发</td><td>功能</td><td>TRD+分流服务</td><td>P0</td><td>AB产品&amp;后端业务服务端</td><td>AB后端提供分流接口、分流算法、缓存加锁(按需)业务服务端接入、返回客户端</td></tr><tr><td></td><td>概念抽象</td><td>文档</td><td>PRD+系统功能</td><td>P1</td><td>AB产品</td><td>项目，层，实验，分组，参数，条件等</td></tr><tr><td>实验管理</td><td>实验列表</td><td>功能</td><td>PRD+系统功能</td><td>P2</td><td>AB产研</td><td>实验列表以及实验管理功能（启停、扩缩、分组管理、参数管理、版本管理、审批、通知等）</td></tr><tr><td></td><td>创建实验</td><td>功能</td><td>PRD+系统功能</td><td>P2</td><td>AB产研</td><td>实验设计模板 ，包括 设计 目标 条件 埋点 指标 白名单 冲突检测等</td></tr><tr><td></td><td>权限管理</td><td>功能</td><td>PRD+系统功能</td><td>P2</td><td>AB产研</td><td>鉴权和数据隔离</td></tr><tr><td></td><td>参数管理</td><td>功能</td><td>PRD+系统功能</td><td>P3</td><td>AB产研业务产研</td><td>实验参数体系，提高实验效率，构建实验知识库</td></tr><tr><td></td><td>最小样本量</td><td>功能</td><td>PRD+系统功能</td><td>P3</td><td>AB产研分析师/DS</td><td>依赖指标体系和实验分析方法支持</td></tr><tr><td></td><td>流量检验</td><td>功能</td><td>PRD+系统功能</td><td>P3</td><td>AB产研分析师/DS</td><td>依赖指标体系和实验分析方法支持</td></tr><tr><td></td><td>流量监控</td><td>功能</td><td>PRD+系统功能</td><td>P2</td><td>AB产研数仓</td><td>进量监控、进量控制等</td></tr><tr><td>数据链路</td><td>埋点</td><td>文档</td><td>埋点规范</td><td>P0</td><td>客户端分析师数仓</td><td>埋点确认以支持实验分析</td></tr><tr><td></td><td>数据同步</td><td>数据</td><td>同步任务</td><td>P1</td><td>数仓分析师</td><td>确保埋点事实数据落库、实验跟踪数据落库，支持实验分析</td></tr><tr><td></td><td>数据建模</td><td>数据</td><td>数据资产</td><td>P0</td><td>数仓分析师</td><td>分层的数据资产ods dwd dws ads dim</td></tr><tr><td>指标计算</td><td>指标计算</td><td>数据</td><td>计算任务</td><td>P1</td><td>AB产研数仓</td><td>预计算vs实时计算</td></tr><tr><td></td><td>指标定义</td><td>功能</td><td>PRD+系统功能</td><td>P3</td><td>AB产研数仓分析师</td><td>分析师对口径负责</td></tr><tr><td>实验分析</td><td>实验看板</td><td>功能</td><td>PRD+系统功能</td><td>P0</td><td>AB产研分析师数仓</td><td>基础看板支持实验分析</td></tr><tr><td></td><td>多维分析</td><td>功能</td><td>PRD+系统功能</td><td>P3</td><td>AB产研分析师数仓</td><td>支持多维分析（指标和数据体系的迭代增强）</td></tr><tr><td></td><td>置信分析</td><td>功能</td><td>PRD+系统功能</td><td>P3</td><td>AB产研分析师/DS数仓</td><td>置信区间、P-value或者胜出概率</td></tr><tr><td></td><td>置信计算</td><td>数据</td><td>计算任务</td><td>P3</td><td>AB产研分析师/DS数仓</td><td>数据资产确保支持统计量的计算</td></tr></tbody></table></figure>
