const fs = require('fs');
const path = require('path');

// 配置扫描目录和输出文件
const targetDir = 'research'; 
const outputFile = '_sidebar.md';

// 初始化 sidebar 内容，默认带上首页
let sidebarContent = '* 首页\n  * [README](README.md)\n';

/**
 * 递归扫描目录并生成 Markdown 列表
 * @param {string} dir 当前扫描的目录
 * @param {number} level 缩进层级
 */
function generateSidebar(dir, level = 0) {
    // 如果目录不存在，直接返回
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        // 忽略隐藏文件或不需要扫描的文件
        if (file.startsWith('.')) return;

        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        const indent = '  '.repeat(level);

        if (stat.isDirectory()) {
            // 如果是文件夹，生成一级目录头
            sidebarContent += `${indent}* ${file}\n`;
            // 递归扫描子文件夹
            generateSidebar(fullPath, level + 1);
        } else if (file.endsWith('.md')) {
            // 如果是 md 文件，生成链接
            const fileNameWithoutExt = file.replace('.md', '');
            // 将 Windows 的反斜杠 \ 替换为 URL 友好的正斜杠 /
            const urlPath = fullPath.replace(/\\/g, '/');
            sidebarContent += `${indent}  * [${fileNameWithoutExt}](${urlPath})\n`;
        }
    });
}

// 开始执行扫描
console.log('正在扫描目录...');
generateSidebar(targetDir);

// 写入 _sidebar.md 文件
fs.writeFileSync(outputFile, sidebarContent, 'utf-8');
console.log('搞定少侠！_sidebar.md 已成功生成。');