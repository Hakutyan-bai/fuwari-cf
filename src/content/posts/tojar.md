---
title: Java如何打包成jar并运行
published: 2025-10-26
description: ''
image: ''
tags: [Java]
category: '文档'
draft: false 
lang: ''
updated: 2025-10-26 15:00:00
series: Java
---
### Java 如何打包成jar

把 Java 程序打成可执行 JAR 只要 3 步：
1. 编译生成 .class
2. 写 MANIFEST.MF 指定主类
3. jar cfm 打包

下面以文件 `RockPaperScissors.java` 为例，完整命令行流程（Windows / macOS / Linux 通用）。
</br>
</br>
首先要进行编译
```
javac RockPaperScissors.java
```
创建清单文件（MANIFEST.MF）
新建一个文本文件，任意文件名，如 manifest.txt，必须留一个空行结尾：
```
Main-Class: RockPaperScissors
```
:::note
Main-Class: 后面空格 + 全限定类名 + 回车
文件最后多按一次回车，否则 jar 会忽略最后一行
:::
```
jar cfm RockPaperScissors.jar manifest.txt *.class
```
参数含义
</br>
c 创建新 jar
</br>
f 指定 jar 文件名
</br>
m 使用自定义清单


运行
```
java -jar RockPaperScissors.jar
```

### 常见的坑

1. 类名大小写必须与文件名一致。
2. 清单文件末尾必须空一行。
3. 如果程序依赖其他 .class，把它们一起打包：
```
jar cfm my.jar manifest.txt *.class lib/*.class
```
---

文章编辑：`@鈴奈咲桜`