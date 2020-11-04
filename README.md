# 环境准备工作
- 安装 Node.js
- 安装 Git
- Github 账户

安装方法自己网上找，通过以下三条命令检测上述是否安装成功
```
git --version
node -v
npm -v
```

# 安装 Hexo 及部署到 GitHub Pages 上
## 安装 Hexo
选择一个磁盘，新建一个文件夹，自己重命名文件夹（如：我的文件夹为：Ｅ\My_Blog），博客相关文件将储存在此文件夹下，在该文件夹下右键鼠标，点击 Git Bash Here，输入以下 npm 命令即可安装：
```
// 安装 hexo
$ npm install hexo-cli -g

// 表示安装 hexo 部署到 git page 的 deployer
$ npm install hexo-deployer-git --save
```

## Hexo 初始化配置
在刚才新建的文件夹里面再次新建一个 Hexo 文件夹（如：我的文件夹为：E\My_Blog\Hexo）,进入该 Hexo 文件夹右键鼠标，点击 Git Bash Here，输入以下命令：
```
$ hexo init
```

> 注意：此命令如果长时间卡主，很可能是因为默认主题下载不下来，直接ctrl+c 退出即可，继续下一步。因为我们后面会选择主题进行安装。

## 本地查看效果
执行以下命令，执行完即可登录 http://localhost:4000/ 查看效果：
```
$ hexo generate
$ hexo server
```

## 将博客部署到 Github Pages 上
1. 登录Github账户后，创建一个名称为：xxx.github.io 格式的代码库。

2. 打开你创建的 Hexo 文件夹。用记事本打开该文件夹下的 _config.yml 文件，并进行如下修改：
  ![](https://cdn.jsdelivr.net/gh/HelloAllenW/BlogAssets@latest/images/2020/10/103001.png)

3. 在 Hexo 文件夹下执行命令：
```
$ hexo g -d
```
如果执行完成报以下错误，说明你的 deployer 没有安装成功
```
ERROR Deployer not found: git
```
需要执行以下命令再安装一次：
```
npm install hexo-deployer-git --save
```
再执行``` hexo g -d ```，你的博客就会部署到 Github 上了

4. 访问博客：https://你的用户名.github.io，通过此链接就可以访问你的博客了

# 选择博客主题
## 下载主题
[点此此处](https://hexo.io/themes/)进入 Hexo 官网的主题专栏，我们可以看见有许多主题供我们选择。选中自己喜欢的主题去github上download下来（这种方式有时比git clone快很多）

## 设置默认主题
等待下载完成后将其放在 themes 目录下（如：\themes\hexo-theme-aero-dual），然后打开 Hexo 文件夹下的配置文件 _config.yml ，找到关键字 theme，修改参数为：theme：hexo-theme-aero-dual （其他主题修改成相应名称即可），再次注意冒号后面有一个空格！

## 部署主题
返回 Hexo 目录，右键 Git Bash Here ，输入以下命令开始部署主题：
```
$ hexo g
$ hexo s
```
此时打开浏览器，访问 http://localhost:4000/ 就可看见我们的主题已经更换了，如果感觉效果满意，我们就可以把它部署到Github上了。
打开 Hexo 文件夹，右键 Git Bash Here ，输入以下命令：
```
$ hexo clean  
//该命令的作用是清除缓存，若不输入此命令，服务器有可能更新不了主题
$ hexo g -d
```

# 发布文章
## 写文章
新建一个空文章，输入以下命令，会在项目 \Hexo\source\_posts 中生成 文章标题.md 文件，文章标题根据需要命名：
```
$ hexo n "文章标题"
```
也可以直接在 \Hexo\source\_posts 目录下右键鼠标新建文本文档，改后缀为 .md 即可，这种方法比较方便

## 推送到github服务器
当我们用编辑器写好文章后，可以使用以下命令将其推送到服务器上
```
$ hexo d -g
```
现在访问你的博客就可以看见写好的文章啦！

# 博客美化和使用功能的添加
有关博客后期的美化、实用功能的添加，可以参考网上的两篇文章（感谢原创作者）：

[Hexo 博客优化之实用功能添加系列](https://blog.csdn.net/qq_36759224/article/details/85010191)

[Hexo 博客优化之博客美化系列](https://blog.csdn.net/qq_36759224/article/details/85420403)

> 感谢原创：https://blog.csdn.net/qq_36759224/article/details/82121420