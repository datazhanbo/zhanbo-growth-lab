---
title: "AB实验介绍"
date: 2025-06-26T21:19:43+08:00
description: "本文来源2022-09在Datafun上做的关于AB实验平台建设的分享。 为什么我们需要AB实验平台 A/B 实验应用作为论证的黄金方法，目前已经成为很多企业必…"
tags: ["实验平台", "A/B Testing", "实验体系", "数据驱动增长"]
categories: ["增长方法论"]
keywords: ["AB实验介绍", "实验平台", "A/B测试", "实验方法论", "实验体系"]
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
<p>本文来源2022-09在Datafun上做的关于AB实验平台建设的分享。</p>



<p></p>



<h1 class="wp-block-heading">为什么我们需要AB实验平台</h1>



<p>A/B 实验应用作为论证的黄金方法，目前已经成为很多企业必然的选择，但是实际上如何在企业内部去建设实验平台，还充满了很多选择路径。目前的实验平台，包括在线实验的数量，已经成为衡量互联网公司体量、业务量以及用户量的一个隐藏指标。一些大厂的实验平台，同时在线实验数量超过 10000，可能每个月新建的实验数量都会大于 1000。</p>



<h2 class="wp-block-heading">AB实验是论证的黄金方法</h2>



<figure class="wp-block-image"><img src="/wp-content/uploads/2025/06/c936b836-5de5-40b4-bf0e-214606a7d9d1.png" alt="" class="wp-image-28"/></figure>



<p>上图列出了一些数据分析方法，比如案例研究、观察研究、类实验、随机控制实验，以及统合分析，即结合随机实验和观察研究去做一些综合分析。</p>



<p>这几层分析方法中存在一些通用的因素，首先，样本是定向的样本还是随机的。第二个是有没有控制，比如最下面的案例研究是没有控制的，它可能针对一个群体做分析，而 AB 实验天然会分成对照组和实验组，是有控制的。最后一个就是实验结论是否可以复现，是否科学。这三个因素的不同导致了整个分析方法可信度的差异。从下往上，可信度逐步提升。AB 实验是分析成本最低的一个方法，可以通过工程化的方法来提效，通过 AB 产品化的方式来降低使用门槛。</p>



<p>AB 实验有三个主要的特点：</p>



<ol start="1" class="wp-block-list">
<li>先验性，用事实说话，可以通过小流量低成本来得到一些结论。</li>



<li>科学性，实验分析时会用到假设检验的方法，相对来说是比较科学的。</li>



<li>推断性，通过随机流量控制可以排除混杂因素的干扰，聚焦到我们的控制变量和实验策略上。</li>
</ol>



<p>当然AB实验也不是万能的，一些适用和不适用场景：</p>



<ol start="1" class="wp-block-list">
<li>适用场景
<ol class="wp-block-list">
<li>产品迭代</li>



<li>用户运营</li>



<li>算法优化</li>



<li>营销和用户增长</li>



<li>商业化</li>
</ol>
</li>



<li>不适用场景
<ol class="wp-block-list">
<li>战略或者重大决策</li>



<li>缺少数据或者样本的情况</li>



<li>商业、道德、技术的限制</li>
</ol>
</li>
</ol>



<h2 class="wp-block-heading">AB实验的定义</h2>



<figure class="wp-block-image"><img src="/wp-content/uploads/2025/06/a40710f6-0c4d-44fd-8254-0cce70b45216.png" alt="" class="wp-image-25"/></figure>



<p>AB 实验源于假设检验。我们在线上流量中取出<strong>一小部分</strong>（较低风险），<strong>完全随机</strong>地分给原策略A和新策略B（排除干扰），再结合一定的<strong>统计方法</strong>，得到对于两种策略相对效果的准确估计（量化结果）。</p>



<p>这一套基于小样本的实验方法同时满足了<strong>低风险，抗干扰和量化结果</strong>的要求，因此不论在互联网产品研发还是科学研究中，都被广泛使用。</p>



<p>真实的业务场景，例如客户端交互实验、搜广推策略实验等场景承载大量的DAU，每天大量新的功能、算法及其他等待上线，一方面业务人员无法承担其中任何一个错误特性直接影响用户体验、商业收入的严重后果，另一方面业务人员又希望能够分离并量化每个特性的影响。</p>



<p>因此，我们需要设计并坚持使用一套数据驱动的方法，使得业务人员可以以较小的风险对新feature进行评估，积极试错积累经验；并且我们设计的该方法有能力排除其他因素（比如同时开发的其他feature以及时间因素等）的干扰；最后，除了‘好’或者‘不好’，我们希望这个方法最好也能够给出 定量的结果。</p>



<p>为了解决上述问题，普遍使用的方法论是小流量随机实验，也就是我们常说的AB实验。</p>



<p>AB实验包括三个核心要素：流量、干预、效果，其中流量满足：</p>



<ol start="1" class="wp-block-list">
<li>同质性：控制组和实验组的样本同质（消除偏差）</li>



<li>独立性：符合样本独立稳定假设（SUTVA）即样本之间不应该有干扰</li>



<li>可控性：通过随机分流消除所有已知未知因素的影响，聚焦当前干预方案</li>
</ol>



<p>同时实验设计三原则（由统计学家费希尔提出）：区组，重复，随机。</p>



<h2 class="wp-block-heading">实验平台的选择</h2>



<figure class="wp-block-image"><img src="/wp-content/uploads/2025/06/64b492a4-2836-499d-b08c-669987f40c9e.png" alt="" class="wp-image-27"/></figure>



<p>整个 A/B 平台的建设，主要有两个思路，第一个就是直接采购第三方平台；另外一个就是自建平台。</p>



<p>国内目前比较好的第三方产品，比如火山引擎，无论是产品 feature 还是整个应用情况都比较好，因为它是基于自己内部的最佳实践。另外腾讯也开放了第三方平台。热云、神策数据也提供了 SaaS 的实验平台。国外的厂商也比较多，像 VWO 实验测试平台、谷歌的 Optimize、源自Meta的Statsig以及 Optimizely 等等，都是一些比较有竞争力的产品。</p>



<p>第三方平台通常适用于用户体量比较小，数据跟分析的基建还相对比较薄弱的公司。通过第三方平台的使用，提升公司内部数据以及分析的认知。</p>



<p>用户行为分析和 A/B 实验是紧密联系的，因为它们都是基于用户的行为，让用户来告诉我们答案，包括底层的一些分析引擎、存储引擎的等基建也都是可以复用的，这也是火山引擎的 A/B 测试和分析能力，和用户行为分析能力都是紧密耦合在一起的原因。</p>



<p>对于公司自建平台，国内主流的一些互联网厂商也都有很好的实验平台，比如滴滴、美团、阿里、网易、新浪微博等，甚至有一些公司内部有多个实验平台。国外的微软、谷歌也都有非常有特色的实验平台。这些公司也都是用户体量比较大，实验场景多，数据分析基础比较强的公司。在自建实验平台的时候，如果公司业务体量大的话，不同的业务可能结合自身的需求都建过一些实验平台了，这时候还要推动平台从 N 到 1 的建设。在新建平台时，就要考虑业界的最佳实践，同时还要考虑业务方的独特诉求。这样在公司内部推行实验平台的时候才能顺畅，并且最终可能变成全公司通用的实验平台。</p>



<h2 class="wp-block-heading">实验平台案例及效果</h2>



<p>业界一些实验平台建设案例和应用效果：</p>



<ol start="1" class="wp-block-list">
<li>美团 <a href="https://tech.meituan.com/2020/05/28/peisong-a-b-test.html">配送AB评估体系建设实践</a><a href="https://tech.meituan.com/2025/05/22/meituan-ab-online-controlled-experiment-01.html">可信实验白皮书系列</a> 亮点-双端三端的流量均匀匹配</li>



<li>Uber <a href="https://cloud.tencent.cn/developer/article/1770640">Uber的 A/B 实验平台搭建</a> 亮点-统计分析引擎适配各种指标和统计分析方法</li>



<li>快手 <a href="https://blog.csdn.net/abcdefg90876/article/details/119792186">快手因果推断与实验设计</a> 亮点-因果推断toolkits</li>



<li>腾讯</li>



<li>微信 <a href="https://cloud.tencent.cn/developer/article/2317879?areaId=106005">微信实验平台的指标计算架构</a> 亮点-指标计算</li>



<li>虾皮 <a href="https://www.51cto.com/article/750351.html">电商领域AB实验平台建设方法</a> 亮点-如何从N到1构建统一的实验平台</li>



<li>得物 <a href="https://mp.weixin.qq.com/s/w-Lc08BYk3GosxuM_3bIHA">得物AB实验平台数据驱动决策实践</a><a href="https://cloud.tencent.com.cn/developer/article/2327946">得物实验平台的演进</a> 亮点-演化过程帮助避坑</li>



<li>Vivo <a href="https://cloud.tencent.cn/developer/article/2169845">Vivo实验平台霍金设计和实践</a> 亮点-协变量分流方法</li>
</ol>



<h1 class="wp-block-heading">如何设计一个AB实验平台</h1>



<p>实验平台包括流量框架、实验管理以及实验分析等模块，同时需要相应的埋点TMS、数据工程的支撑。</p>



<figure class="wp-block-image"><img src="/wp-content/uploads/2025/06/79aa00b3-6579-4693-96c6-281709804ce6.png" alt="" class="wp-image-26"/></figure>



<h1 class="wp-block-heading">相关链接</h1>



<ol start="1" class="wp-block-list">
<li>B站分享视频 <a href="https://m.bilibili.com/video/BV1VW4y1e71L">https://m.bilibili.com/video/BV1VW4y1e71L</a></li>
</ol>



<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://m.bilibili.com/video/BV1VW4y1e71L
</div></figure>



<ol start="2" class="wp-block-list">
<li>墨天伦 <a href="https://www.modb.pro/doc/112112">https://www.modb.pro/doc/112112</a></li>
</ol>



<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://www.modb.pro/doc/112112
</div></figure>



<ol start="3" class="wp-block-list">
<li>文字稿 <a href="https://www.51cto.com/article/750351.html">https://www.51cto.com/article/750351.html</a></li>
</ol>



<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://www.51cto.com/article/750351.html
</div></figure>
