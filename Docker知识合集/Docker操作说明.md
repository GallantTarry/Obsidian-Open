不要用工件打包，而是用maven的clean和package打出纯.jar的包
然后先将docker打开，在桌面新建一个文件夹复制进jar包
然后在目录下新建一个文件叫

Dockerfile   这是构造镜像的图纸不然你下面输入的指令就根本一个也完成不了

# 定义从镜像哪里使用环境
FROM eclipse-temurin:21-jre-alpine

# 2. 拷贝你的 jar 包到容器内，并重命名为 app.jar 

COPY springboot-trymore-test.jar /app.jar

# 3. 声明服务运行的端口    这行其实没什么用
EXPOSE 8888

# 4. 指定容器启动时执行的命令   
ENTRYPOINT ["java", "-jar", "/app.jar"]




要在命令行里直接下载你要的 JDK 21 镜像，标准命令就是这一句： 
docker pull eclipse-temurin:21-jre-alpine
要在终端管理员powershell中拉去jre环境镜像
输入上面的指令直接就进入到docker的镜像里了

然后你需要cd到你的文件夹把这个.jar文件也导入镜像里面
docker build -t my-app:v1 .
然后把镜像导入到容器里运行
docker run -d -p 90:8888 my-app:v1

在 `-p 90:8080` 这个参数里，冒号左右两边的数字有着严格的分工：

- **左边的 `90`（宿主机端口）：** 这是**对外暴露的窗口**，也就是你这台真实的电脑（或者以后公司的服务器）提供给外界访问的端口。浏览器要找你，只能认这个门牌号。
    
- **右边的 `8080`（容器内端口）：** 这是你的 Spring Boot 在这个“微型服务器”**内部**死死监听的端口。

### Docker 在中间做了什么？

当你把参数改成 `-p 90:8080` 之后：

1. 你的 Spring Boot 依然觉得一切如常，在容器里面安安静静地守着 `8080`。
    
2. 而 Docker 化身成了一个“前台接待员”，站在你真实电脑的 `90` 号大门前。
    
3. 当你在浏览器输入 `http://localhost:90` 发起请求时，这个接待员收到请求，转身就把它塞进了容器里面的 `8080` 房间。
    

**这就是端口映射最强大的地方**：无论你里面的 Spring Boot 端口怎么写死（比如都是 8080），你在外面启动多个容器时，只要给它们分配不同的外部大门（比如 `-p 90:8080`、`-p 91:8080`、`-p 92:8080`），它们就能完美共存在同一台电脑上，绝对不会发生端口冲突！



在 Docker Desktop 的环境下，想让容器里面的程序访问外面 Windows 电脑上的数据库，你必须用一句“暗号”代替 `localhost`，这个暗号叫：**`host.docker.internal`**。

jdbc:mysql://host.docker.internal:3306/shaoxia_db?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true