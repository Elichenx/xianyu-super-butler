#!/bin/bash
set -e

echo "========================================="
echo "  闲鱼超级管家 - Docker Entrypoint"
echo "========================================="

# 确保数据目录存在
mkdir -p /app/data /app/logs /app/backups /app/static/uploads/images

# 启动主程序
exec python Start.py
