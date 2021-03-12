(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"./src/components/SearchGroup/index.mdx":function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return G}));var n=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),l=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),r=t("react"),o=t.n(r),c=t("./node_modules/@mdx-js/react/dist/esm.js"),s=t("./node_modules/docz/dist/index.esm.js"),i=(t("./node_modules/antd/es/card/style/index.js"),t("./node_modules/antd/es/card/index.js")),d=(t("./node_modules/antd/es/button/style/index.js"),t("./node_modules/antd/es/button/index.js")),u=(t("./node_modules/antd/es/row/style/index.js"),t("./node_modules/antd/es/row/index.js")),m=(t("./node_modules/antd/es/col/style/index.js"),t("./node_modules/antd/es/col/index.js")),p=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),b=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),j=(t("./node_modules/antd/es/form/style/index.js"),t("./node_modules/antd/es/form/index.js")),f=(t("./node_modules/antd/es/input/style/index.js"),t("./node_modules/antd/es/input/index.js")),h=(t("./node_modules/antd/es/select/style/index.js"),t("./node_modules/antd/es/select/index.js")),g=(t("./node_modules/antd/es/date-picker/style/index.js"),t("./node_modules/antd/es/date-picker/index.js")),O=g.a.RangePicker,y=h.a.Option,_=Object(r.forwardRef)((function(e,a){var t=e.type,n=e.componentProps,r=Object(l.a)(e,["type","componentProps"]);switch(t){case"input":return o.a.createElement(f.a,Object.assign({},n,r,{ref:a}));case"select":return o.a.createElement(h.a,Object.assign({},n,r,{ref:a}),n.options.map((function(e){return o.a.createElement(y,{key:e.value,value:e.value},e.label)})));case"datePicker":return o.a.createElement(g.a,Object.assign({},n,r,{style:{width:"100%"}}));case"rangePicker":return o.a.createElement(O,Object.assign({},n,r,{style:{width:"100%"}}));default:return null}}));_.defaultProps={componentProps:{}};var S=_;"undefined"!==typeof _&&_&&_===Object(_)&&Object.isExtensible(_)&&Object.defineProperty(_,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"CommonField",filename:"src\\components\\Field\\index.tsx"}});var x=t("./node_modules/lodash/lodash.js"),v=t("./src/setting.ts"),P=function(e){var a=e.maxNum,t=e.onSearch,l=e.fetchParams,c=j.a.useForm(),s=Object(n.a)(c,1)[0],f=Object(r.useReducer)((function(e){return!e}),!0),h=Object(n.a)(f,2),g=h[0],O=h[1],y=Object(r.useMemo)((function(){return e.fields.map((function(e){return Object(b.a)(Object(b.a)({},e),{},{type:e.type||"input",componentProps:Object(b.a)(Object(b.a)({},e.componentProps||{}),{},{placeholder:e.placeholder||"rangePicker"===e.type&&[v.a.searchGroup.startTime,v.a.searchGroup.endTime]||"select"===e.type&&v.a.searchGroup.pleaseSelect||"".concat(v.a.searchGroup.pleaseInput).concat(e.name),options:"[object Array]"===Object.prototype.toString.call(e.options)?e.options:"[object Object]"===Object.prototype.toString.call(e.options)?Object.entries(e.options).map((function(e){var a=Object(n.a)(e,2);return{name:a[0],value:a[1]}})):[]})})}))}),[e.fields]),_=function(){s.validateFields().then((function(e){t(Object(b.a)(Object(b.a)({},l||{}),y.filter((function(e){return"rangePicker"===e.type})).map((function(e){return e.label})).reduce((function(a,t){var l,r=Object(n.a)(t,2),o=r[0],c=r[1];return Object(b.a)(Object(b.a)({},a),{},(l={},Object(p.a)(l,o,e[o]&&e[o][0]?e[o][0].format("YYYY-MM-DD"):void 0),Object(p.a)(l,c,e[o]&&e[o][1]?e[o][1].format("YYYY-MM-DD"):void 0),l))}),e)))})).catch((function(e){console.log(e)}))};return Object(r.useEffect)((function(){"[object Object]"===Object.prototype.toString.call(l)&&s.setFieldsValue(Object(x.pick)(l,Object.keys(s.getFieldsValue()||{}))),_()}),[]),o.a.createElement(i.a,{className:"dp-searchgroup"},o.a.createElement(j.a,{form:s},o.a.createElement(u.a,{gutter:[0,10],align:"middle",style:{marginBottom:10}},y.map((function(e,t){return o.a.createElement(m.a,{key:"string"===typeof e.label?e.label:e.label[0],span:g&&t>=a?0:6,style:{paddingRight:16}},o.a.createElement(j.a.Item,Object.assign({label:e.name,name:"string"===typeof e.label?e.label:e.label[0],style:{width:"100%"},initialValue:e.initialValue},v.a.layout.formItemLayout),o.a.createElement(S,{type:e.type,componentProps:e.componentProps})))}))),o.a.createElement(u.a,{justify:"end",align:"middle"},o.a.createElement(m.a,{span:6,style:{paddingRight:16,textAlign:"right"}},o.a.createElement(d.a,{type:"primary",onClick:_},v.a.searchGroup.search),y.length>a?o.a.createElement(d.a,{style:{marginLeft:8},onClick:O},g?v.a.searchGroup.moreSearch:v.a.searchGroup.hideSearch):null,o.a.createElement(d.a,{style:{marginLeft:8},onClick:function(){s.resetFields(),_()}},v.a.searchGroup.clean)))))};P.defaultProps={maxNum:8};var N=P;P&&P===Object(P)&&Object.isExtensible(P)&&Object.defineProperty(P,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"SearchGroup",filename:"src\\components\\SearchGroup\\index.tsx"}});var E={};function G(e){var a=e.components,t=Object(l.a)(e,["components"]);return Object(c.b)("wrapper",Object.assign({},E,t,{components:a,mdxType:"MDXLayout"}),Object(c.b)("h1",{id:"searchgroup-\u641c\u7d22"},"SearchGroup \u641c\u7d22"),Object(c.b)("h4",{id:"\u9ed8\u8ba4"},"\u9ed8\u8ba4"),Object(c.b)(s.c,{__position:0,__code:"() => {\n  const [searchParams, setSearchParams] = React.useState()\n  const fields = [\n    { name: '\u59d3\u540d', label: 'name' },\n    {\n      name: '\u6027\u522b',\n      label: 'type',\n      type: 'select',\n      options: [\n        { label: '\u7537', value: '0' },\n        { label: '\u5973', value: '1' },\n      ],\n    },\n    { name: '\u65e5\u671f', label: 'date', type: 'datePicker' },\n    {\n      name: '\u65e5\u671f\u8303\u56f4',\n      label: ['dateStart', 'dateEnd'],\n      type: 'rangePicker',\n    },\n  ]\n\n  const onSearch = values => {\n    console.log(values)\n    setSearchParams(values)\n  }\n\n  return <SearchGroup fields={fields} onSearch={values => onSearch(values)} />\n}",__scope:{props:this?this.props:t,Playground:s.c,SearchGroup:N},__codesandbox:"undefined",mdxType:"Playground"},(function(){var e=o.a.useState(),a=Object(n.a)(e,2),t=(a[0],a[1]);return Object(c.b)(N,{fields:[{name:"\u59d3\u540d",label:"name"},{name:"\u6027\u522b",label:"type",type:"select",options:[{label:"\u7537",value:"0"},{label:"\u5973",value:"1"}]},{name:"\u65e5\u671f",label:"date",type:"datePicker"},{name:"\u65e5\u671f\u8303\u56f4",label:["dateStart","dateEnd"],type:"rangePicker"}],onSearch:function(e){return function(e){console.log(e),t(e)}(e)},mdxType:"SearchGroup"})})),Object(c.b)("h4",{id:"\u8d85\u8fc78\u4e2a\u8868\u5355\u9879\uff0c\u663e\u793a\u66f4\u591a\u67e5\u8be2\u6309\u94ae"},"\u8d85\u8fc78\u4e2a\u8868\u5355\u9879\uff0c\u663e\u793a\u66f4\u591a\u67e5\u8be2\u6309\u94ae"),Object(c.b)(s.c,{__position:1,__code:"() => {\n  const [searchParams, setSearchParams] = React.useState()\n  const fields = [\n    { name: '\u59d3\u540d1', label: 'name1' },\n    { name: '\u59d3\u540d2', label: 'name2' },\n    { name: '\u59d3\u540d3', label: 'name3' },\n    { name: '\u59d3\u540d4', label: 'name4' },\n    { name: '\u59d3\u540d5', label: 'name5' },\n    { name: '\u59d3\u540d6', label: 'name6' },\n    {\n      name: '\u6027\u522b',\n      label: 'type',\n      type: 'select',\n      options: [\n        { label: '\u7537', value: '0' },\n        { label: '\u5973', value: '1' },\n      ],\n    },\n    { name: '\u65e5\u671f', label: 'date', type: 'datePicker' },\n    {\n      name: '\u65e5\u671f\u8303\u56f4',\n      label: ['dateStart', 'dateEnd'],\n      type: 'rangePicker',\n    },\n  ]\n  const onSearch = values => {\n    console.log(values)\n    setSearchParams(values)\n  }\n\n  return <SearchGroup fields={fields} onSearch={values => onSearch(values)} />\n}",__scope:{props:this?this.props:t,Playground:s.c,SearchGroup:N},__codesandbox:"undefined",mdxType:"Playground"},(function(){var e=o.a.useState(),a=Object(n.a)(e,2),t=(a[0],a[1]);return Object(c.b)(N,{fields:[{name:"\u59d3\u540d1",label:"name1"},{name:"\u59d3\u540d2",label:"name2"},{name:"\u59d3\u540d3",label:"name3"},{name:"\u59d3\u540d4",label:"name4"},{name:"\u59d3\u540d5",label:"name5"},{name:"\u59d3\u540d6",label:"name6"},{name:"\u6027\u522b",label:"type",type:"select",options:[{label:"\u7537",value:"0"},{label:"\u5973",value:"1"}]},{name:"\u65e5\u671f",label:"date",type:"datePicker"},{name:"\u65e5\u671f\u8303\u56f4",label:["dateStart","dateEnd"],type:"rangePicker"}],onSearch:function(e){return function(e){console.log(e),t(e)}(e)},mdxType:"SearchGroup"})})),Object(c.b)("h2",{id:"api\u6587\u6863"},"API\u6587\u6863"),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"\u5c5e\u6027"),Object(c.b)("th",{parentName:"tr",align:null},"\u8bf4\u660e"),Object(c.b)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),Object(c.b)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),Object(c.b)("th",{parentName:"tr",align:null},"\u662f\u5426\u5fc5\u4f20"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},"fields"),Object(c.b)("td",{parentName:"tr",align:null},"\u8868\u5355\u9879\u914d\u7f6e"),Object(c.b)("td",{parentName:"tr",align:null},"[]"),Object(c.b)("td",{parentName:"tr",align:null},"-"),Object(c.b)("td",{parentName:"tr",align:null},"\u662f")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},"onSearch"),Object(c.b)("td",{parentName:"tr",align:null},"\u67e5\u8be2\u65b9\u6cd5"),Object(c.b)("td",{parentName:"tr",align:null},"func"),Object(c.b)("td",{parentName:"tr",align:null},"-"),Object(c.b)("td",{parentName:"tr",align:null},"\u662f")),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},"fetchParams"),Object(c.b)("td",{parentName:"tr",align:null},"\u8bf7\u6c42\u9644\u52a0\u53c2\u6570"),Object(c.b)("td",{parentName:"tr",align:null},"{}"),Object(c.b)("td",{parentName:"tr",align:null},"-"),Object(c.b)("td",{parentName:"tr",align:null})),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},"maxNum"),Object(c.b)("td",{parentName:"tr",align:null},"\u8868\u5355\u9879\u663e\u793a\u6700\u5927\u6570\u91cf\uff0c\u8d85\u8fc7\u9690\u85cf\uff0c\u663e\u793a\u66f4\u591a\u6309\u94ae"),Object(c.b)("td",{parentName:"tr",align:null},"number"),Object(c.b)("td",{parentName:"tr",align:null},"8"),Object(c.b)("td",{parentName:"tr",align:null})))))}G&&G===Object(G)&&Object.isExtensible(G)&&Object.defineProperty(G,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"src\\components\\SearchGroup\\index.mdx"}}),G.isMDXComponent=!0},"./src/setting.ts":function(e,a,t){"use strict";var n=window.lang=new Proxy({},{get:function(e,a){return e[a]||a}});a.a={searchGroup:{search:n&&n["\u67e5\u8be2"]||"\u67e5\u8be2",moreSearch:n&&n["\u66f4\u591a\u67e5\u8be2"]||"\u66f4\u591a\u67e5\u8be2",hideSearch:n&&n["\u6536\u8d77\u67e5\u8be2"]||"\u6536\u8d77\u67e5\u8be2",clean:n&&n["\u6e05\u7a7a"]||"\u6e05\u7a7a",pleaseInput:n&&n["\u8bf7\u8f93\u5165"]||"\u8bf7\u8f93\u5165",pleaseSelect:n&&n["\u5168\u90e8"]||"\u5168\u90e8",startTime:n&&n["\u5f00\u59cb\u65f6\u95f4"]||"\u5f00\u59cb\u65f6\u95f4",endTime:n&&n["\u7ed3\u675f\u65f6\u95f4"]||"\u7ed3\u675f\u65f6\u95f4"},uploadFile:{pleaseUpload:n&&n["\u8bf7\u4e0a\u4f20"]||"\u8bf7\u4e0a\u4f20",fileType:n&&n["\u7c7b\u578b\u7684\u6587\u4ef6"]||"\u7c7b\u578b\u7684\u6587\u4ef6",fileTypeError:n&&n["\u6587\u4ef6\u7c7b\u578b\u4e0d\u7b26\u5408"]||"\u6587\u4ef6\u7c7b\u578b\u4e0d\u7b26\u5408",fileSizeLimit:n&&n["\u6587\u4ef6\u9650\u5236\u5927\u5c0f"]||"\u6587\u4ef6\u9650\u5236\u5927\u5c0f",fileReachLimit:n&&n["\u6587\u4ef6\u5df2\u8fbe\u4e0a\u9650"]||"\u6587\u4ef6\u5df2\u8fbe\u4e0a\u9650",addFile:n&&n["\u6dfb\u52a0\u6587\u4ef6"]||"\u6dfb\u52a0\u6587\u4ef6",singleFileNoMoreThan:n&&n["\u5355\u4e2a\u6587\u4ef6\u4e0d\u8d85\u8fc7"]||"\u5355\u4e2a\u6587\u4ef6\u4e0d\u8d85\u8fc7",uploadAgainError:n&&n["\u518d\u6b21\u4e0a\u4f20\u5931\u8d25"]||"\u518d\u6b21\u4e0a\u4f20\u5931\u8d25",uploadAgain:n&&n["\u91cd\u65b0\u4e0a\u4f20"]||"\u91cd\u65b0\u4e0a\u4f20",delete:n&&n["\u5220\u9664"]||"\u5220\u9664",uploadSuccess:n&&n["\u4e0a\u4f20\u6210\u529f"]||"\u4e0a\u4f20\u6210\u529f",uploadFail:n&&n["\u4e0a\u4f20\u5931\u8d25"]||"\u4e0a\u4f20\u5931\u8d25"},uploadImage:{uploadFail:n&&n["\u4e0a\u4f20\u5931\u8d25"]||"\u4e0a\u4f20\u5931\u8d25",uploadAgain:n&&n["\u91cd\u65b0\u4e0a\u4f20"]||"\u91cd\u65b0\u4e0a\u4f20",noData:n&&n["\u6682\u65e0\u6570\u636e"]||"\u6682\u65e0\u6570\u636e",canDragDrop:n&&n["\u53ef\u62d6\u62fd"]||"\u53ef\u62d6\u62fd",correctImage:n&&n["\u8bf7\u4e0a\u4f20\u6b63\u5e38\u56fe\u7247\u683c\u5f0f"]||"\u8bf7\u4e0a\u4f20\u6b63\u5e38\u56fe\u7247\u683c\u5f0f",maxLengthLimit:n&&n["\u9009\u62e9\u7684\u56fe\u7247\u4e0d\u53ef\u8d85\u8fc7"]||"\u9009\u62e9\u7684\u56fe\u7247\u4e0d\u53ef\u8d85\u8fc7",zhang:n&&n["\u5f20"]||"\u5f20",maxSizeLimit:n&&n["\u56fe\u7247\u9650\u5236\u5927\u5c0f"]||"\u56fe\u7247\u9650\u5236\u5927\u5c0f",widthNoLessThan:n&&n["\u56fe\u7247\u5bbd\u5ea6\u4e0d\u80fd\u5c0f\u4e8e"]||"\u56fe\u7247\u5bbd\u5ea6\u4e0d\u80fd\u5c0f\u4e8e",widthNoMoreThan:n&&n["\u56fe\u7247\u5bbd\u5ea6\u4e0d\u80fd\u5927\u4e8e"]||"\u56fe\u7247\u5bbd\u5ea6\u4e0d\u80fd\u5927\u4e8e",heightNoLessThan:n&&n["\u56fe\u7247\u9ad8\u5ea6\u4e0d\u80fd\u5c0f\u4e8e"]||"\u56fe\u7247\u9ad8\u5ea6\u4e0d\u80fd\u5c0f\u4e8e",heightNoMoreThan:n&&n["\u56fe\u7247\u9ad8\u5ea6\u4e0d\u80fd\u5927\u4e8e"]||"\u56fe\u7247\u9ad8\u5ea6\u4e0d\u80fd\u5927\u4e8e",pixel:n&&n["\u50cf\u7d20"]||"\u50cf\u7d20",horizontal:n&&n["\u8bf7\u4e0a\u4f20\u6a2a\u56fe"]||"\u8bf7\u4e0a\u4f20\u6a2a\u56fe",vertical:n&&n["\u8bf7\u4e0a\u4f20\u7ad6\u56fe"]||"\u8bf7\u4e0a\u4f20\u7ad6\u56fe"},selectSearch:{pleaseSelect:"\u8bf7\u9009\u62e9",multiple:"\u53ef\u591a\u9009"},layout:{formItemLayout:{labelCol:{xs:{span:24},sm:{span:6}},wrapperCol:{xs:{span:24},sm:{span:18}}}}},"undefined"!==typeof layout&&layout&&layout===Object(layout)&&Object.isExtensible(layout)&&Object.defineProperty(layout,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"layout",filename:"src\\setting.ts"}}),"undefined"!==typeof selectSearch&&selectSearch&&selectSearch===Object(selectSearch)&&Object.isExtensible(selectSearch)&&Object.defineProperty(selectSearch,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"selectSearch",filename:"src\\setting.ts"}}),"undefined"!==typeof uploadImage&&uploadImage&&uploadImage===Object(uploadImage)&&Object.isExtensible(uploadImage)&&Object.defineProperty(uploadImage,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"uploadImage",filename:"src\\setting.ts"}}),"undefined"!==typeof uploadFile&&uploadFile&&uploadFile===Object(uploadFile)&&Object.isExtensible(uploadFile)&&Object.defineProperty(uploadFile,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"uploadFile",filename:"src\\setting.ts"}}),"undefined"!==typeof searchGroup&&searchGroup&&searchGroup===Object(searchGroup)&&Object.isExtensible(searchGroup)&&Object.defineProperty(searchGroup,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"searchGroup",filename:"src\\setting.ts"}})}}]);