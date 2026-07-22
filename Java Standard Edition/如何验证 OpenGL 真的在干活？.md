别急，少侠。现代 IDE 的设置界面经常像迷宫一样，而且近几年的版本为了让界面看起来简洁，经常会把“VM Options（虚拟机参数）”这个输入框默认隐藏起来。

不知道少侠目前主力的开发工具是哪一个？我为你列出主流 Java IDE（包括你可能在用的轻量级编辑器）的具体藏匿地点，你可以对号入座：

### 🛠️ 方案一：如果你使用的是 IntelliJ IDEA (最常见情况)

在新版 IDEA（2021 及以后版本）中，VM Options 是默认不显示的，需要你手动把它“召唤”出来：

1. **打开配置：** 在界面右上角，找到那个绿色的运行/启动按钮（Run），点击它左侧那个显示你当前运行类名（比如 `MainLauncher`）的下拉菜单，然后点击 **Edit Configurations... (编辑配置)**。
    
2. **召唤隐藏输入框：** * 在弹出的窗口中，确保左侧选中了你的 `MainLauncher`。
    
    - 看看右侧面板，找到蓝色的 **Modify options (修改选项)** 蓝色文字链接（通常在“Build and run”那一块）。
        
    - 在弹出的下拉菜单中，勾选 **Add VM options (添加虚拟机选项)**。
        
3. **填入参数：** 这时你的界面上就会多出一个名为 **VM options** 的长条输入框。把这段咒语直接粘贴进去：
    
    `-Dsun.java2d.trace=count`
    
4. 点击右下角的 **Apply** 然后 **OK**。重新运行项目即可。
    

### 🛠️ 方案二：如果你使用的是 VS Code 或 Cursor

在这些轻量级、更极客的编辑器中跑 Java，通常依赖的是工程目录下的配置文件：

1. 打开你项目根目录下的 `.vscode` 文件夹。
    
2. 找到并打开 `launch.json` 文件（如果没有，你可以点击运行面板的“创建 launch.json 文件”）。
    
3. 在你的 `MainLauncher` 的那段配置代码里，手动加上一行 `"vmArgs"` 属性：
    

JSON

```
{
    "type": "java",
    "name": "MainLauncher",
    "request": "launch",
    "mainClass": "shaoxia.MainLauncher",
    "vmArgs": "-Dsun.java2d.trace=count" // 👈 就是加上这一行
}
```

4. 保存文件，然后通过旁边的 Run 按钮正常启动项目。
    

### 👁️ 见证奇迹的时刻

配置好之后，少侠去跑一下程序，然后随便在界面上用鼠标滑过你的模块按钮（触发那个涟漪效果），或者切换一下面板。

此时，**把你 IDE 的控制台（Console）拉大**，如果一切正常，你会看到控制台像瀑布一样疯狂输出类似这样的日志：

Plaintext

```
12 calls to sun.java2d.opengl.OGLRenderQueue.flushBuffer
45 calls to sun.java2d.opengl.OGLTextRenderer.drawGlyphList
8 calls to sun.java2d.opengl.OGLRenderer.fillRoundRect
```

只要看到满屏的 `OGL` 字眼，就证明这波显卡硬件加速已经稳稳地安排上了！快去试试看能不能把它揪出来。