**拉取数据库镜像 -> 创建内部网络 -> 启动数据库 -> 现场把你的 jar 编译成镜像 -> 启动 Java 程序 -> 连通两者的网络**


version: '3.8' # 这是剧本的语法版本，通常写 3.8 或 3 都可以

services: # 核心关键字，代表下面要开始定义你要跑的“服务”了

  # ---------------- 角色一：数据库 ----------------
  mysql-db: # 给你的数据库容器起个代号（你的 Java 程序就是靠这个名字连它的）
    image: mysql:8.4 # 告诉管家：这个角色不需要现场打包，直接去网上下载 mysql 8.4 的现成镜像
    container_name: shaoxia-mysql # 容器跑起来之后显示的名字
    environment: # 环境变量，也就是传给 MySQL 的初始密码和要建的库名
      MYSQL_ROOT_PASSWORD: 574185
      MYSQL_DATABASE: shaoxia_db
    volumes: # 数据卷挂载：把外部的 init.sql 挂载到容器内部执行
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports: # 端口映射：把外部电脑的 3307 连通到内部的 3306
      - "3307:3306" 

  # ---------------- 角色二：你的 Spring Boot 项目 ----------------
  app: # 给你的项目容器起个代号
    build: . # 重点！这里的句号（.）代表当前目录。意思是告诉管家：这个角色没有现成的镜像，请你用当前目录下的 Dockerfile 现场给我 build 一个出来！
    container_name: shaoxia-app
    ports: # 把外部的 90 端口连通到内部的 90 端口
      - "90:90" 
    depends_on: # 依赖关系（非常重要）
      - mysql-db # 告诉管家：这个角色必须等上面的 mysql-db 启动之后，它才能启动，防止启动太快连不上数据库报错。