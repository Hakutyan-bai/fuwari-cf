---
title: "企微机器人推送课表"
published: 2025-10-07
description: "让企业微信机器人提醒你上课！"
image: ""
tags: [Apple, 日历, 课程表, 提醒]
category: "课程表"
draft: false
lang: ""
updated: 2025-10-07 11:00:00
---

# 前提条件

1. 需要一份准备好的 ics 文件（通用日历格式）
2. 需要企业微信机器人 WebHook 地址
3. 需要安装 NodeJS
4. 一个聪明的大脑

# 先上脚本

```mjs title="Workers.mjs"  {9}
// by 鈴奈咲桜
import ical from "node-ical";
import schedule from "node-schedule";
import axios from "axios";
import fs from "fs";

const icsPath = "./kebiao.ics"; // 你的课表文件
const webhookUrl = "https://your.wechat.webhook"; // webhook地址

const data = fs.readFileSync(icsPath, "utf8");
const events = ical.parseICS(data);

console.log("==== 上课提醒任务 ====");

let upcoming = []; // 保存未来所有提醒
for (let k in events) {
  const ev = events[k];
  if (ev.type === "VEVENT") {
    let startTimes = [];
    if (ev.rrule) {
      startTimes = ev.rrule.all();
    } else if (ev.start) {
      startTimes = [ev.start];
    }

    for (let start of startTimes) {
      const remindTimes = [
        new Date(start.getTime() - 30 * 60 * 1000), // 提前 30 分钟
        new Date(start.getTime() - 15 * 60 * 1000), // 提前 15 分钟
      ];

      for (let remindTime of remindTimes) {
        if (remindTime > new Date()) {
          upcoming.push({ ev, start, remindTime });
        }
      }
    }
  }
}

// 按提醒时间排序
upcoming.sort((a, b) => a.remindTime - b.remindTime);

if (upcoming.length === 0) {
  console.log("近期没有需要提醒的课程。");
} else {
  // 最近的一次提醒
  const first = upcoming[0];
  console.log(
    `最近提醒: ${
      first.ev.summary
    } | 上课时间: ${first.start.toLocaleString()} | 提醒时间: ${first.remindTime.toLocaleString()}`,
  );

  // 启动时推送一次测试提醒
  await sendReminder(first.ev, first.start, true);

  // 注册所有提醒
  for (const { ev, start, remindTime } of upcoming) {
    schedule.scheduleJob(remindTime, () => sendReminder(ev, start, false));
  }
}

console.log("========================");

async function sendReminder(ev, start, isTest = false) {
  const header = isTest ? "[本次为测试提醒（可以不理会）]\n" : "**上课提醒**\n";
  const text =
    `${header}` +
    `课程：${ev.summary}\n` +
    `地点：${ev.location}\n` +
    `时间：${start.toLocaleString()}`;

  const payload = {
    msgtype: "markdown",
    markdown: {
      content: text,
    },
  };

  try {
    const res = await axios.post(webhookUrl, payload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("提醒已发送:", text);
    console.log("服务器返回:", res.data);
  } catch (err) {
    console.error("发送失败:", err.message);
    if (err.response) {
      console.error("响应状态:", err.response.status);
      console.error("响应内容:", err.response.data);
    }
  }
}
```

# 使用方法

1. 在一个空文件夹创建上述脚本，并修改 webhook 地址
2. 准备你的 ics 文件将其改名为 **kebiao.ics** 放在 **Workers.mjs** 相同的文件夹下
3. 运行脚本

```bash
node Workers.mjs
```

就这么简单，可能从哪里搞 ics 文件比较有难度，不过直接把你的课表喂给 ai 生成即可

---

文章编辑：`@鈴奈咲桜`
