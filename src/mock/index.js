
//引入
import Mock from 'mockjs';


//模拟/api请求
Mock.mock('/api', {
    //模拟要返回的数据
    status: 200,
    success: true,
    msg: '',
    data: [
        {
            id: 1,
            name: '张三'
        },
        {
            id: 2,
            name: '李四'
        },
        {
            id: 3,
            name: '王五'
        }
    ]
});


Mock.mock('/api/test', {
    //模拟要返回的数据
    status: 200,
    success: true,
    msg: '',
    data: [
        {
            id: 1,
            name: "基础信息",
            type: 'form',
            config: [
                {
                    "id": "001",				//主键
                    "property": "rwmc",		    //字段
                    "label": "任务名称：",		 //名称 
                    "index": 1,				    //排序
                    "type": "text",			    //文本类型
                    "readonly": false,		    //是否只读
                    "disabled": false,          //是否禁用
                    "isGroup": false			//是否是组别
                },
                {
                    "id": "002",
                    "property": "jcrq",
                    "label": "采样/监测日期：",
                    "index": 2,
                    "type": "date",
                    "readonly": false,
                    "isGroup": false
                },
                {
                    "id": "003",
                    "property": "tq",
                    "label": "天 气：",
                    "index": 3,
                    "type": "text",
                    "isGroup": false,
                    "readonly": false,
                },
                {
                    "id": "004",
                    "property": "cyff",
                    "label": "采样方法：",
                    "index": 4,
                    "type": "select",
                    "isGroup": false,
                    "readonly": false,
                },
                {
                    "id": "005",
                    "property": "qw",
                    "label": "气温（℃）：",
                    "index": 5,
                    "type": "number",
                    "isGroup": false,
                    "readonly": false,
                },
                {
                    "id": "006",
                    "property": "qy",
                    "label": "气压（kpa）：",
                    "index": 6,
                    "type": "number",
                    "isGroup": false,
                    "readonly": false,
                },
                // {
                //     "id":"007",				
                //     "property":"ygrs",			
                //     "label":"员工人数(人)",	 		
                //     "index":4,				
                //     "type":"number",		
                //     "isGroup":false,
                //     "readonly":false,
                // },
                // {
                //     "id":"008",				
                //     "property":"bgxl",			
                //     "label":"办公效率(闲/慢/快)",	 		
                //     "index":5,				
                //     "type":"number",		
                //     "isGroup":false,
                //     "readonly":false,
                // },
                // {
                //     "id":"009",				
                //     "property":"nhqx",			
                //     "label":"拟合曲线",	 		
                //     "index":6,				
                //     "type":"echart",		
                //     "isGroup":false,
                //     "readonly":false,
                // },
            ]
        },
        {
            id: 2,
            name: "环境测定",
            type: 'form',
            config: [
                {
                    "id": "001",				//主键
                    "property": "stmc",		//字段
                    "label": "水体名称",		 //名称 
                    "index": 1,				//排序
                    "type": "text",			//文本类型
                    "readonly": false,		//是否只读
                    "isGroup": false			//是否是组别
                },
                {
                    "id": "002",
                    "property": "dwmc",
                    "label": "点位名称",
                    "index": 2,
                    "type": "text",
                    "readonly": false,
                    "isGroup": false
                },
                {
                    "id": "003",
                    "property": "hdlb",
                    "label": "划定类别",
                    "index": 3,
                    "type": "text",
                    "isGroup": false,
                    "readonly": false,
                },
                {
                    "id": "005",
                    "property": "cydwsyt",
                    "label": "采样点位示意图",
                    "index": 5,
                    "type": "check",
                    "isGroup": false,
                    "readonly": false,
                },
                {
                    "id": "006",
                    "property": "jd",
                    "label": "经度",
                    "index": 6,
                    "type": "text",
                    "isGroup": false,
                    "readonly": false,
                },
                {
                    "id": "006",
                    "property": "wd",
                    "label": "纬度",
                    "index": 6,
                    "type": "text",
                    "isGroup": false,
                    "readonly": false,
                },
                {
                    "id": "006",
                    "property": "hk",
                    "label": "河宽（m）",
                    "index": 6,
                    "type": "number",
                    "isGroup": false,
                    "readonly": false,
                },
                {
                    "id": "006",
                    "property": "ss",
                    "label": "水深（m）",
                    "index": 6,
                    "type": "number",
                    "isGroup": false,
                    "readonly": false,
                },
                {
                    "id": "006",
                    "property": "dmszbx",
                    "label": "断面水质表观",
                    "index": 6,
                    "type": "textarea",
                    "isGroup": false,
                    "readonly": false,
                },
                {
                    "id": "006",
                    "property": "ypggms",
                    "label": "样品感官描述",
                    "index": 6,
                    "type": "textarea",
                    "isGroup": false,
                    "readonly": false,
                },
                {
                    "id": "006",
                    "property": "dmzbhjms",
                    "label": "断面周边环境描述",
                    "index": 6,
                    "type": "textarea",
                    "isGroup": false,
                    "readonly": false,
                },
                {
                    "id": "006",
                    "property": "bz",
                    "label": "备注",
                    "index": 6,
                    "type": "textarea",
                    "isGroup": false,
                    "readonly": false,
                },
            ]
        },
        {
            id: 3,
            name: "现场测定",
            type: 'table',
            config: [
                {
                    "id": "001",				//主键
                    "property": "cdxm",		//字段
                    "label": "测定项目",		 //名称 
                    "index": 1,				//排序
                    "type": "text",			//文本类型
                    "readonly": false,		//是否只读
                    "isGroup": false			//是否是组别
                },
                {
                    "id": "001",
                    "property": "fxff",
                    "label": "分析方法",
                    "index": 1,
                    "type": "text",
                    "readonly": false,
                    "isGroup": false
                },
                {
                    "id": "001",
                    "property": "syyq",
                    "label": "使用仪器",
                    "index": 1,
                    "type": "text",
                    "readonly": false,
                    "isGroup": false
                },
                {
                    "id": "001",
                    "property": "cdjg",
                    "label": "测定结果",
                    "index": 1,
                    "type": "text",
                    "readonly": false,
                    "isGroup": false
                },
                {
                    "id": "001",
                    "property": "jgdw",
                    "label": "结果单位",
                    "index": 1,
                    "type": "text",
                    "readonly": false,
                    "isGroup": false
                },
                {
                    "id": "001",
                    "property": "bz",
                    "label": "备注",
                    "index": 1,
                    "type": "text",
                    "readonly": false,
                    "isGroup": false
                }
            ]
        },
        {
            id: 2,
            name: "采样信息:",
            type: 'table',
            config: [
                {
                    "id": "001",				//主键
                    "property": "ypbh",		//字段
                    "label": "样品编号",		 //名称 
                    "index": 1,				//排序
                    "type": "text",			//文本类型
                    "readonly": true,		//是否只读
                    "isGroup": false			//是否是组别
                },
                {
                    "id": "002",
                    "property": "jcxm",
                    "label": "监测项目",
                    "index": 2,
                    "type": "number",
                    "isGroup": false
                },
                {
                    "id": "003",
                    "property": "rqcz",
                    "label": "容器材质",
                    "index": 3,
                    "type": "number",
                    "isGroup": false,
                    "isTrigger": true,
                    "calc": "qyl/fmj",
                },
                {
                    "id": "003",
                    "property": "cytj",
                    "label": "采样体积（mL）",
                    "index": 3,
                    "type": "number",
                    "isGroup": false,
                    "isTrigger": true,
                    "calc": "qyl/fmj",
                },
                {
                    "id": "003",
                    "property": "ypys",
                    "label": "样品保存与运输",
                    "index": 3,
                    "type": "number",
                    "isGroup": false,
                    "isTrigger": true,
                    "calc": "qyl/fmj",
                },
                {
                    "id": "003",
                    "property": "sl",
                    "label": "数量（瓶）",
                    "index": 3,
                    "type": "number",
                    "isGroup": false,
                    "isTrigger": true,
                    "calc": "qyl/fmj",
                },
                {
                    "id": "003",
                    "property": "px",
                    "label": "平行（瓶）",
                    "index": 3,
                    "type": "number",
                    "isGroup": false,
                    "isTrigger": true,
                    "calc": "qyl/fmj",
                },
                {
                    "id": "003",
                    "property": "kb",
                    "label": "空白（瓶）",
                    "index": 3,
                    "type": "number",
                    "isGroup": false,
                    "isTrigger": true,
                    "calc": "qyl/fmj",
                },
                {
                    "id": "003",
                    "property": "qyl",
                    "label": "备注",
                    "index": 3,
                    "type": "number",
                    "isGroup": false,
                    "isTrigger": true,
                    "calc": "qyl/fmj",
                },
                // {
                //     "id": "004",
                //     "property": "",
                //     "label": "项目:总烃(以甲烷计)",
                //     "index": 3,
                //     "isGroup": true,
                //     "children": [
                //         {
                //             "id": "005",
                //             "property": "fmj",
                //             "label": "峰面积",
                //             "index": 1,
                //             "type": "number",
                //             "isGroup": false,
                //             "isTrigger": true,
                //             "calc": "qyl/fmj",
                //         },
                //         {
                //             "id": "006",
                //             "property": "yfmj",
                //             "label": "氧峰面积",
                //             "index": 2,
                //             "type": "number",
                //             "isGroup": false
                //         },
                //         {
                //             "id": "007",
                //             "property": "nd",
                //             "label": "浓度(mg/m³)",
                //             "index": 3,
                //             "type": "number",
                //             "calc": "qyl/fmj",
                //             "readonly": true,
                //             "isGroup": false
                //         }
                //     ]
                // },
                // {
                //     "id": "007",
                //     "property": "",
                //     "label": "送检信息",
                //     "index": 4,
                //     "isGroup": true,
                //     "children": [
                //         {
                //             "id": "008",
                //             "property": "name",
                //             "label": "姓名",
                //             "index": 1,
                //             "type": "text",
                //             "isGroup": false
                //         },
                //         {
                //             "id": "008",
                //             "property": "",
                //             "label": "地址",
                //             "index": 2,
                //             "isGroup": true,
                //             "children": [
                //                 {
                //                     "id": "009",
                //                     "property": "province",
                //                     "label": "省份",
                //                     "index": 1,
                //                     "type": "text",
                //                     "isGroup": false
                //                 },
                //                 {
                //                     "id": "010",
                //                     "property": "city",
                //                     "label": "市区",
                //                     "index": 2,
                //                     "type": "text",
                //                     "isGroup": false
                //                 },
                //                 {
                //                     "id": "010",
                //                     "property": "address",
                //                     "label": "地址",
                //                     "index": 3,
                //                     "type": "text",
                //                     "isGroup": false
                //                 }
                //             ]
                //         }
                //     ]
                // }
            ]
        }

    ]
});



