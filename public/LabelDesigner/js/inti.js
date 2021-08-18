/*
 * @Descripttion:
 * @Autor: yqn
 * @Date: 2021-08-14 13:59:59
 * @LastEditTime: 2021-08-17 10:00:13
 * @FilePath: \public\LabelDesigner\js\inti.js
 * @LastEditors: yqn
 */

$(function () {
  var elem = $(".container");
  var customLabel = "";

  function init(option, widgets) {
    option = option || {};
    widgets = widgets || [];

    customLabel = new CustomLabel(option);

    if (widgets.length) {
      customLabel.addPageWidgets(widgets);
    } else {
      customLabel.addPage();
    }

    elem.html("").append(customLabel.getElem());
  }

  $(".btn-add-new").on("click", function () {
    init({
      name: "编辑模板",
      size: [80, 80], // 尺寸，单位毫米
    });
  });

  $(".btn-remove").on("click", function () {
    customLabel.remove();
  });

  // 创建实例
  $(".btn-add-new-by-config").on("click", function () {
    $.get("./data/config.json?random=" + Math.random()).then(function (data) {
      init(data.config, data.widgets);
    });
  });

  // 填充实例
  $(".btn-fill-data").on("click", function () {
    $.get("./data/data.json?random=" + Math.random()).then(function (data) {
      customLabel.fillData(data);
    });
  });

  // 获取模板数据
  $(".btn-get-data").on("click", function () {
    console.log(customLabel.getData());
  });

  // 获取HTML
  $(".btn-get-html").on("click", function () {
    alert(customLabel.getHtml());
  });

  // 打印
  $(".btn-finish").on("click", function () {
    // 第一步获取模板
    $.get("./data/config.json?random=" + Math.random()).then(function (data) {
      // 第二步初始化
      var customLabel = new CustomLabel(data.config);
      customLabel.addPageWidgets(data.widgets);
      // 第三步填充订单信息
      $.get("./data/data.json?random=" + Math.random()).then(function (data) {
        customLabel.fillData(data);
        // 第四步打印
        // var html = customLabel.getData();
        // console.log(html); 
        // 拿到html去打印
        // send(html)
      });
    });
  });

  $(".btn-reload").on("click", function () {
    window.location.reload();
  });

  let obj = {
    config: { mode: "normal", name: "编辑模板", size: [80, 80] },
    widgets: [
      [
        {
          name: "image-logo",
          value: "qrcode",
          config: {
            props: { src: "./img/la.png" },
            css: { width: "60px", height: "60px", left: 183, top: 24 },
          },
        },
        {
          name: "image",
          value: "qrcode",
          config: {
            props: { src: "./img/img_qrcode.png" },
            css: { width: 140, height: 123, left: 145, top: 100 },
          },
        },
        {
          name: "x-line",
          value: "",
          config: {
            data: {},
            props: { width: "100%", weight: 1, style: "solid", color: "#000" },
            css: { width: "100%", height: "5px", left: 0, top: 92 },
          },
        },
        {
          name: "local-text-bm",
          value: "id",
          config: {
            data: { text: "设备编码" },
            props: { text: "设备编码", fontSize: 14, radio: 1, fontWeight: 400, color: "gray" },
            css: {
              width: "160px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              fontSize: "14px",
              fontWeight: 400,
              color: "gray",
              height: "60px",
              left: 5,
              top: 115,
            },
          },
        },
        {
          name: "local-text-bm",
          value: "id",
          config: {
            data: { text: "设备编码" },
            props: { text: "设备编码", fontSize: 14, radio: 1, fontWeight: 400, color: "gray" },
            css: {
              width: "150px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              fontSize: "14px",
              fontWeight: 400,
              color: "gray",
              height: "30px",
              left: 5,
              top: 153,
            },
          },
        },
      ],
    ],
  };
  //   init(obj.config, obj.widgets)

  //   let obj = JSON.parse(sessionStorage.getItem('label'))
  init(obj.config, obj.widgets);
  //   init({
  //       name: '编辑模板',
  //       size: [80, 80] // 尺寸，单位毫米
  //   })
});
