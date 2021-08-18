/*
 * @Descripttion:
 * @Autor: yqn
 * @Date: 2021-08-17 16:56:49
 * @LastEditTime: 2021-08-17 19:45:01
 * @FilePath: \src\utils\notification.ts
 * @LastEditors: yqn
 */
import { notification } from "ant-design-vue";
// interface setconfig {
//   message: string;
//   placement: string;
//   bottom: string;
//   duration: number;
//   style: {
//     width: string;
//     border: string;
//     marginLeft: string;
//   };
//   description: string;
// }

const Notification = (
  type: string = "open", //展示类型
  message: string = "", //title内容
  description: string = "", //文字内容
  bgcolor: string = "",
  duration: number = 0 //自动关闭时间
) => {
  let config: any = {
    message: message,
    placement: "bottomRight",
    bottom: "50px",
    duration: duration,
    style: {
      width: "600px",
      border: `1px solid ${bgcolor}`,
      marginLeft: `${335 - 580}px`,
    },
    description: description,
  };
  switch (type) {
    case "success":
      notification.success(config);
      break;
    case "info":
      notification.info(config);
      break;
    case "warning":
      notification.warning(config);
      break;
    case "error":
      notification.error(config);
      break;
    default:
      notification.open(config);
  }
};
export { Notification };
