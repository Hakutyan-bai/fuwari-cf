---
title: Java开发实用文档
published: 2025-07-12
description: ''
image: ''
tags: []
category: ''
draft: false 
lang: ''
series: Java
updated: 2025-07-26 10:00:00
---
# Java 开发实用文档

本实用文档总结了 Java 开发中的常见功能实现与代码模板，适用于桌面应用、控制台程序或基础服务端逻辑开发。适合初学者与日常开发参考使用。

---

## 1. 输入输出（IO）

### 1.1 控制台输入

```java
import java.util.Scanner;

public class InputExample {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("请输入你的名字: ");
        String name = scanner.nextLine();
        System.out.println("你好, " + name);
        scanner.close();
    }
}
```

### 1.2 文件读写

```java
import java.io.*;

public class FileExample {
    public static void main(String[] args) throws IOException {
        // 写入文件
        FileWriter writer = new FileWriter("example.txt");
        writer.write("Hello, Java!");
        writer.close();

        // 读取文件
        BufferedReader reader = new BufferedReader(new FileReader("example.txt"));
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }
        reader.close();
    }
}
```

---

## 2. 常用数据结构

### 2.1 ArrayList 使用

```java
import java.util.ArrayList;

public class ListExample {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("Apple");
        list.add("Banana");
        list.remove("Apple");
        for (String item : list) {
            System.out.println(item);
        }
    }
}
```

### 2.2 HashMap 使用

```java
import java.util.HashMap;

public class MapExample {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        System.out.println(map.get("A"));
    }
}
```

---

## 3. 面向对象基础

### 3.1 定义类与方法

```java
public class Person {
    private String name;

    public Person(String name) {
        this.name = name;
    }

    public void sayHello() {
        System.out.println("Hello, my name is " + name);
    }
}
```

### 3.2 使用类

```java
public class Main {
    public static void main(String[] args) {
        Person p = new Person("Tom");
        p.sayHello();
    }
}
```

---

## 4. 异常处理

```java
public class ExceptionExample {
    public static void main(String[] args) {
        try {
            int a = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("除数不能为0");
        } finally {
            System.out.println("无论如何都会执行");
        }
    }
}
```

---

## 5. 多线程

```java
public class MyThread extends Thread {
    public void run() {
        System.out.println("线程运行中...");
    }

    public static void main(String[] args) {
        MyThread t = new MyThread();
        t.start();
    }
}
```

或者使用 Runnable 接口：

```java
public class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Runnable 线程运行中...");
    }

    public static void main(String[] args) {
        Thread t = new Thread(new MyRunnable());
        t.start();
    }
}
```

---

## 6. 网络编程（Socket）

### 6.1 服务器端

```java
import java.net.*;
import java.io.*;

public class Server {
    public static void main(String[] args) throws IOException {
        ServerSocket server = new ServerSocket(8888);
        Socket socket = server.accept();
        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        String message = in.readLine();
        System.out.println("收到客户端消息: " + message);
        socket.close();
        server.close();
    }
}
```

### 6.2 客户端

```java
import java.net.*;
import java.io.*;

public class Client {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket("localhost", 8888);
        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
        out.println("Hello Server");
        socket.close();
    }
}
```

---

## 7. 实用建议

- 使用 `try-with-resources` 自动关闭流资源。
- 利用 `Collections` 工具类快速排序、查找。
- 使用 `Logger` 替代 `System.out.println` 进行日志管理。
- 常用构建工具推荐：Maven / Gradle。
- 推荐使用 IDE：IntelliJ IDEA / Eclipse。

---

## 附录资源

- Java 官方文档：
https://docs.oracle.com/javase/

- 菜鸟教程 Java：
https://www.runoob.com/java/java-tutorial.html

- 开源工具类库：
https://commons.apache.org/

---

文章编辑：`@鈴奈咲桜`