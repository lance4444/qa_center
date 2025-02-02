#!/bin/bash

# call this script like so (Windows Git Bash):
# bash init_db_data.sh qa_centre_table ap-southeast-2

# Get the directory where the script is located (Windows 兼容路径)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if table name and region are provided
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Error: Table name or region not provided. Usage: $0 <table_name> <region>"
    exit 1
fi

TABLE_NAME="$1"
REGION="$2"

echo ">>>>> Initializing data in table $TABLE_NAME in region $REGION"

# 关键修复：将 Unix 路径转换为 Windows 原生路径（例如 /c/... → C:\...）
convert_path() {
  local unix_path="$1"
  if [[ "$OSTYPE" == "msys"* ]]; then  # 检测是否在 Git Bash 中运行
    echo "$unix_path" | sed -e 's/^\///' -e 's/\//\\/g' -e 's/^./\0:/'
  else
    echo "$unix_path"  # macOS/Linux 保持原样
  fi
}

# 转换数据目录路径
WIN_DATA_DIR=$(convert_path "${SCRIPT_DIR}/data")

# Configure AWS CLI with the specified region
aws configure set default.region $REGION

# 批量插入数据（使用转换后的 Windows 路径）
aws dynamodb batch-write-item --request-items "file://${WIN_DATA_DIR}/Entity.json"
aws dynamodb batch-write-item --request-items "file://${WIN_DATA_DIR}/Group.json"
aws dynamodb batch-write-item --request-items "file://${WIN_DATA_DIR}/Session.json"
aws dynamodb batch-write-item --request-items "file://${WIN_DATA_DIR}/Question.json"
aws dynamodb batch-write-item --request-items "file://${WIN_DATA_DIR}/AnsOption.json"
aws dynamodb batch-write-item --request-items "file://${WIN_DATA_DIR}/User.json"
aws dynamodb batch-write-item --request-items "file://${WIN_DATA_DIR}/Parti.json"
aws dynamodb batch-write-item --request-items "file://${WIN_DATA_DIR}/ResponseLog.json"
aws dynamodb batch-write-item --request-items "file://${WIN_DATA_DIR}/SessionScore.json"
aws dynamodb batch-write-item --request-items "file://${WIN_DATA_DIR}/QALog.json"
aws dynamodb batch-write-item --request-items "file://${WIN_DATA_DIR}/OpLog.json"

# Debug 测试
aws dynamodb put-item \
    --table-name $TABLE_NAME \
    --item "file://${WIN_DATA_DIR}/site.json"

# Cleanup
aws configure set default.region ""

echo "Data initialization complete!"