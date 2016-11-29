#!/bin/bash
# Program:
#       start|stop|restart program xsj-data-report
# History:
#       2016/11/28
# Author:
#       shadow_
# Version:
#       1.0


#启动方法
base_dir=$(cd `dirname $0`;pwd)
pid_filename=${base_dir}/xsj-data-report.pid
echo "base_dir is ${base_dir}"
start(){

        filename=$(ls ${base_dir} | grep 'xsj-data-report.*jar' | sort -r | head -n 1)
        echo "start file is ${filename}"

        nohup java -jar $filename >/dev/null 2>&1 &       #注意：必须有&让其后台执行，否则没有pid生成
        echo $! > ${pid_filename}   # 将jar包启动对应的pid写入文件中，为停止时提供pid
}
#停止方法
stop(){
        PID=$(cat ${pid_filename})
        echo "KILL PID:${PID}"
        kill -9 $PID

}

case "$1" in
start)
  start
  ;;
stop)
  stop
  ;;
restart)
  stop
  start
  ;;
*)
  printf 'Usage: %s {start|stop|restart}\n' "$prog"
  exit 1
  ;;
esac