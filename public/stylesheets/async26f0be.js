define("biz_common/dom/attr.js",[],function(){
"use strict";
function t(t,e,n){
return"undefined"==typeof n?t.getAttribute(e):t.setAttribute(e,n);
}
function e(t,e,n,r){
t.style.setProperty?(r=r||null,t.style.setProperty(e,n,r)):"undefined"!=typeof t.style.cssText&&(r=r?"!"+r:"",
t.style.cssText+=";"+e+":"+n+r+";");
}
return{
attr:t,
setProperty:e
};
});define("biz_wap/utils/ajax.js",["biz_common/utils/url/parse.js"],function(e){
"use strict";
function t(e){
var t={};
return"undefined"!=typeof uin&&(t.uin=uin),"undefined"!=typeof key&&(t.key=key),
"undefined"!=typeof pass_ticket&&(t.pass_ticket=pass_ticket),t.x5=r?"1":"0",o.join(e,t);
}
function n(e){
var n=(e.type||"GET").toUpperCase(),o=t(e.url),r="undefined"==typeof e.async?!0:e.async,s=new XMLHttpRequest,a=null,u=null;
if("object"==typeof e.data){
var i=e.data;
u=[];
for(var c in i)i.hasOwnProperty(c)&&u.push(c+"="+encodeURIComponent(i[c]));
u=u.join("&");
}else u="string"==typeof e.data?e.data:null;
s.open(n,o,r),s.onreadystatechange=function(){
3==s.readyState&&e.received&&e.received(s),4==s.readyState&&(s.onreadystatechange=null,
s.status>=200&&s.status<400?e.success&&e.success(s.responseText):e.error&&e.error(s),
clearTimeout(a),e.complete&&e.complete(),e.complete=null);
},"POST"==n&&s.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
s.setRequestHeader("X-Requested-With","XMLHttpRequest"),"undefined"!=typeof e.timeout&&(a=setTimeout(function(){
s.abort("timeout"),e.complete&&e.complete(),e.complete=null;
},e.timeout));
try{
s.send(u);
}catch(p){
e.error&&e.error();
}
}
var o=e("biz_common/utils/url/parse.js"),r=-1!=navigator.userAgent.indexOf("TBS/");
return n;
});define("biz_common/utils/string/html.js",[],function(){
"use strict";
return String.prototype.html=function(t){
var e=["&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&amp;","&","&yen;","¥"];
t&&e.reverse();
for(var n=0,r=this;n<e.length;n+=2)r=r.replace(new RegExp(e[n],"g"),e[n+1]);
return r;
},String.prototype.htmlEncode=function(){
return this.html(!0);
},String.prototype.htmlDecode=function(){
return this.html(!1);
},String.prototype.getPureText=function(){
return this.replace(/<\/?[^>]*\/?>/g,"");
},{
htmlDecode:function(t){
return t.htmlDecode();
},
htmlEncode:function(t){
return t.htmlEncode();
},
getPureText:function(t){
return t.getPureText();
}
};
});define("appmsg/report.js",["biz_common/dom/event.js","appmsg/cdn_img_lib.js","biz_wap/utils/mmversion.js","biz_common/utils/report.js"],function(e){
"use strict";
function t(){
var t=e("biz_wap/utils/mmversion.js"),o=e("biz_common/utils/report.js"),r=!1,a=window.performance||window.msPerformance||window.webkitPerformance;
return function(){
if(Math.random()<.1){
var e=window.webp?2e3:1e3,n=[];
n.push("1="+e),t.isIOS&&n.push("2="+e),t.isAndroid&&n.push("3="+e);
var i=window.logs.pageinfo.content_length;
if(i&&n.push("4="+i),e=a?2e3:1e3,n.push("5="+e),t.isIOS&&n.push("6="+e),t.isAndroid&&n.push("7="+e),
a){
if(a.memory){
var r=a.memory;
!!r.jsHeapSizeLimit&&n.push("8="+r.jsHeapSizeLimit/1e3),!!r.totalJSHeapSize&&n.push("9="+r.totalJSHeapSize/1e3),
!!r.usedJSHeapSize&&n.push("10="+r.usedJSHeapSize/1e3);
}
if(a.timing){
var s=a.timing,p=s.navigationStart,d=s.responseEnd,g=d-p,m=s.connectEnd==s.fetchStart;
n.push("11="+(m?2e3:1e3)),n.push("12="+g),"wifi"==networkType?n.push("13="+g):"2g/3g"==networkType&&n.push("14="+g);
}
}
o("http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7839&flag2=7&flag3=8&"+n.join("&"));
}
}(),a&&a.timing?(r=a.timing.navigationStart,function(){
if(!(Math.random()>.5)&&a.getEntries){
for(var e=[],t=a.getEntries(),n=[],i=0,r=t.length;r>i;++i){
var s=t[i],p=s.name;
if(p&&"script"==s.initiatorType&&/^.*(res\.wx\.qq\.com)(.*)\.js$/g.test(p)){
{
var d=s.duration;
s.startTime,s.responseEnd;
}
-1!=p.indexOf("/js/biz_wap/moon")?(d=Math.round(d),e.push("1="+d),"wifi"==networkType?e.push("2="+d):"2g/3g"==networkType&&e.push("3="+d),
e.push("4="+(10>=d?2e3:1e3))):n.push({
s:s.startTime,
e:s.responseEnd,
t:s.duration
});
}else;
}
if(n=n.sort(function(e){
return e.s<e.s?-1:1;
}),n&&n.length>0){
for(var g=0,m=0,u=0,i=0,f=n.length;f>i;++i){
var s=n[i],h=m-s.s;
h>0&&(s.t-=h),h>0&&s.e>m&&(u+=h),g=s.s,m=s.e;
}
u=Math.round(u),e.push("5="+u),"wifi"==networkType?e.push("6="+u):"2g/3g"==networkType&&e.push("7="+u);
}
if("undefined"!=typeof moon){
var c=moon.hit_num,w=moon.mod_num;
e.push("8="+Math.round(1e3+1e3*(c/w)));
}
o("http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7839&flag2=7&flag3=11&"+e.join("&"));
}
}(),function(){
function e(){
if(-1==i.indexOf("NetType/"))return!1;
for(var e=["2G","cmwap","cmnet","uninet","uniwap","ctwap","ctnet"],t=0,n=e.length;n>t;++t)if(-1!=i.indexOf(e[t]))return!0;
return!1;
}
var t=write_sceen_time-r,n=first_sceen__time-r,a=page_endtime-r;
if(window.logs.pagetime={
wtime:t,
ftime:n,
ptime:a
},!(Math.random()>.5)){
var s=["navigationStart","unloadEventStart","unloadEventEnd","redirectStart","redirectEnd","fetchStart","domainLookupStart","domainLookupEnd","connectStart","connectEnd","requestStart","responseStart","responseEnd","domLoading","domInteractive","domContentLoadedEventStart","domContentLoadedEventEnd","domComplete","loadEventStart","loadEventEnd","secureConnectionStart"],p=[],d=[];
p.push("flag1=7839&flag2=7&flag3=9"),d.push(e()?"flag1=7839&flag2=7&flag3=12":"wifi"==networkType?"flag1=7839&flag2=7&flag3=5":"2g/3g"==networkType?"flag1=7839&flag2=7&flag3=6":"flag1=7839&flag2=7&flag3=7");
for(var g=0,m=s.length;m>g;++g){
s[g]=window.performance.timing[s[g]];
var u=s[g]-s[0];
u>0&&(p.push(g+"="+u),d.push(g+"="+u));
}
-1!=i.indexOf("MicroMessenger")?(p.push("21="+t+"&22="+n+"&23="+a),d.push("21="+t+"&22="+n+"&23="+a)):(p.push("24="+t+"&25="+n+"&26="+a),
d.push("24="+t+"&25="+n+"&26="+a)),p.push("27="+t+"&28="+n+"&29="+a),d.push("27="+t+"&28="+n+"&29="+a),
o("http://isdspeed.qq.com/cgi-bin/r.cgi?"+p.join("&")),o("http://isdspeed.qq.com/cgi-bin/r.cgi?"+d.join("&"));
}
}(),void function(){
var e=document.getElementById("js_toobar"),t=document.getElementById("page-content"),i=window.innerHeight||document.documentElement.clientHeight;
if(t&&!(Math.random()>.1)){
var r=function(){
var s=window.pageYOffset||document.documentElement.scrollTop,p=e.offsetTop;
if(s+i>=p){
for(var d,g,m=t.getElementsByTagName("img"),u={},f=[],h=0,c=0,w=0,l=0,v=m.length;v>l;++l){
var E=m[l];
d=E.getAttribute("data-src")||E.getAttribute("src"),g=E.getAttribute("src"),d&&(d.isCDN()?c++:w++,
h++,u[g]={});
}
if(f.push("1="+1e3*h),f.push("2="+1e3*c),f.push("3="+1e3*w),a.getEntries){
var y=a.getEntries(),S=window.logs.img.download,T=[0,0,0],_=[0,0,0];
h=c=0;
for(var l=0,k=y.length;k>l;++l){
var b=y[l],j=b.name;
j&&"img"==b.initiatorType&&u[j]&&(j.isCDN()&&(_[0]+=b.duration,c++),T[0]+=b.duration,
h++,u[j]={
startTime:b.startTime,
responseEnd:b.responseEnd
});
}
T[0]>0&&h>0&&(T[2]=T[0]/h),_[0]>0&&c>0&&(_[2]=_[0]/c);
for(var l in S)if(S.hasOwnProperty(l)){
for(var M=S[l],q=0,z=0,O=0,x=0,H=0,v=M.length;v>H;++H){
var d=M[H];
if(u[d]&&u[d].startTime&&u[d].responseEnd){
var A=u[d].startTime,C=u[d].responseEnd;
q=Math.max(q,C),z=z?Math.min(z,A):A,d.isCDN()&&(O=Math.max(q,C),x=z?Math.min(z,A):A);
}
}
T[1]+=Math.round(q-z),_[1]+=Math.round(O-x);
}
for(var L=4,I=7,l=0;3>l;l++)T[l]=Math.round(T[l]),_[l]=Math.round(_[l]),T[l]>0&&(f.push(L+l+"="+T[l]),
"wifi"==networkType?f.push(L+l+6+"="+T[l]):"2g/3g"==networkType&&f.push(L+l+12+"="+T[l])),
_[l]>0&&(f.push(I+l+"="+_[l]),"wifi"==networkType?f.push(I+l+6+"="+_[l]):"2g/3g"==networkType&&f.push(I+l+12+"="+_[l]));
}
o("http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7839&flag2=7&flag3=10&"+f.join("&")),
n.off(window,"scroll",r,!1);
}
};
n.on(window,"scroll",r,!1);
}
}()):!1;
}
var n=e("biz_common/dom/event.js"),i=navigator.userAgent;
e("appmsg/cdn_img_lib.js"),n.on(window,"load",function(){
if(""==networkType&&-1!=i.indexOf("MicroMessenger")){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
JSAPI.invoke("getNetworkType",{},function(n){
networkType=e[n.err_msg],t();
});
}else t();
},!1);
});define("biz_common/dom/class.js",[],function(){
"use strict";
function s(s,a){
return s.classList?s.classList.contains(a):s.className.match(new RegExp("(\\s|^)"+a+"(\\s|$)"));
}
function a(s,a){
s.classList?s.classList.add(a):this.hasClass(s,a)||(s.className+=" "+a);
}
function e(a,e){
if(a.classList)a.classList.remove(e);else if(s(a,e)){
var c=new RegExp("(\\s|^)"+e+"(\\s|$)");
a.className=a.className.replace(c," ");
}
}
function c(c,l){
s(c,l)?e(c,l):a(c,l);
}
return{
hasClass:s,
addClass:a,
removeClass:e,
toggleClass:c
};
});define("appmsg/report_and_source.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(require,exports,module){
"use strict";
function viewSource(){
var redirectUrl=sourceurl.indexOf("://")<0?"http://"+sourceurl:sourceurl;
redirectUrl="http://"+location.host+"/mp/redirect?url="+encodeURIComponent(sourceurl);
var opt={
url:"/mp/advertisement_report"+location.search+"&report_type=3&action_type=0&url="+encodeURIComponent(sourceurl)+"&__biz="+biz+"&r="+Math.random(),
type:"GET",
async:!1
};
return tid?opt.success=function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0==res.ret?location.href=redirectUrl:viewSource();
}:(opt.timeout=2e3,opt.complete=function(){
location.href=redirectUrl;
}),ajax(opt),!1;
}
require("biz_common/utils/string/html.js");
var DomEvent=require("biz_common/dom/event.js"),ajax=require("biz_wap/utils/ajax.js"),title=msg_title.htmlDecode(),sourceurl=msg_source_url.htmlDecode(),js_report_article=document.getElementById("js_report_article"),JSAPI=require("biz_wap/jsapi/core.js");
DomEvent.tap(js_report_article,function(){
var e=["/mp/infringement?url=",encodeURIComponent(location.href),"&title=",encodeURIComponent(title),"&__biz=",biz].join("");
return location.href=e+"#wechat_redirect",!1;
});
var js_view_source=document.getElementById("js_view_source");
DomEvent.on(js_view_source,"click",function(){
return viewSource(),!1;
});
});define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/cookie.js","appmsg/cdn_img_lib.js","biz_wap/utils/storage.js"],function(e){
"use strict";
function t(e){
for(var t=5381,n=0;n<e.length;n++)t=(t<<5)+t+e.charCodeAt(n),t&=2147483647;
return t;
}
function n(e,t){
if(e&&!(e.length<=0))for(var n,o,i,a=/http(s)?\:\/\/([^\/\?]*)(\?|\/)?/,l=0,m=e.length;m>l;++l)n=e[l],
n&&(o=n.getAttribute(t),o&&(i=o.match(a),i&&i[2]&&(w[i[2]]=!0)));
}
function o(e){
for(var t=0,n=f.length;n>t;++t)if(f[t]==e)return!0;
return!1;
}
function i(){
w={},n(document.getElementsByTagName("a"),"href"),n(document.getElementsByTagName("link"),"href"),
n(document.getElementsByTagName("iframe"),"src"),n(document.getElementsByTagName("script"),"src"),
n(document.getElementsByTagName("img"),"src");
var e=[];
for(var t in w)w.hasOwnProperty(t)&&(window.networkType&&"wifi"==window.networkType&&!_&&o(t)&&(_=!0),
e.push(t));
return w={},e.join(",");
}
function a(){
var e,t=window.pageYOffset||document.documentElement.scrollTop,n=document.getElementById("js_content"),o=document.documentElement.clientHeight||window.innerHeight,a=document.body.scrollHeight,l=Math.ceil(a/o),r=(window.logs.read_height||t)+o,d=document.getElementById("js_toobar").offsetTop,g=n.getElementsByTagName("img")||[],w=Math.ceil(r/o)||1,f=document.getElementById("media"),p=50,u=0,h=0,v=0,b=0,y=r+p>d?1:0;
w>l&&(w=l);
var T=function(t){
if(t)for(var n=0,o=t.length;o>n;++n){
var i=t[n];
if(i){
u++;
var a=i.getAttribute("src"),l=i.getAttribute("data-type");
a&&0==a.indexOf("http")&&(h++,a.isCDN()&&(v++,-1!=a.indexOf("tp=webp")&&b++),l&&(e["img_"+l+"_cnt"]=e["img_"+l+"_cnt"]||0,
e["img_"+l+"_cnt"]++));
}
}
e.download_cdn_webp_img_cnt=b||0,e.download_img_cnt=h||0,e.download_cdn_img_cnt=v||0;
},j=window.appmsgstat||{},O=window.logs.img||{},x=window.logs.pagetime||{},z=O.load||{},E=O.read||{},D=[],B=[],N=0,k=0,S=0;
for(var I in E)I&&0==I.indexOf("http")&&E.hasOwnProperty(I)&&B.push(I);
for(var I in z)I&&0==I.indexOf("http")&&z.hasOwnProperty(I)&&D.push(I);
for(var M=0,Y=D.length;Y>M;++M){
var P=D[M];
P&&P.isCDN()&&(-1!=P.indexOf("/0")&&N++,-1!=P.indexOf("/640")&&k++,-1!=P.indexOf("/300")&&S++);
}
var e={
__biz:biz,
title:msg_title.htmlDecode(),
mid:mid,
idx:idx,
read_cnt:j.read_num||0,
like_cnt:j.like_num||0,
screen_height:o,
screen_num:l,
video_cnt:window.logs.video_cnt||0,
img_cnt:u||0,
read_screen_num:w||0,
is_finished_read:y,
scene:source,
content_len:c.content_length||0,
start_time:page_begintime,
end_time:(new Date).getTime(),
img_640_cnt:k,
img_0_cnt:N,
img_300_cnt:S,
wtime:x.wtime||0,
ftime:x.ftime||0,
ptime:x.ptime||0,
reward_heads_total:window.logs.reward_heads_total||0,
reward_heads_fail:window.logs.reward_heads_fail||0
};
if(window.networkType&&"wifi"==window.networkType&&(e.wifi_all_imgs_cnt=D.length,
e.wifi_read_imgs_cnt=B.length),window.logs.webplog&&4==window.logs.webplog.total){
var A=window.logs.webplog;
e.webp_total=1,e.webp_lossy=A.lossy,e.webp_lossless=A.lossless,e.webp_alpha=A.alpha,
e.webp_animation=A.animation;
}
T(!!f&&f.getElementsByTagName("img")),T(g);
var C=(new Date).getDay(),H=i();
(_||0!==user_uin&&Math.floor(user_uin/100)%7==C)&&(e.domain_list=H),_&&(e.html_content=s),
m({
url:"/mp/appmsgreport?action=page_time",
type:"POST",
data:e,
async:!1,
timeout:2e3
});
}
e("biz_common/utils/string/html.js");
{
var l=e("biz_common/dom/event.js"),m=e("biz_wap/utils/ajax.js");
e("biz_common/utils/cookie.js");
}
e("appmsg/cdn_img_lib.js");
var s,r=e("biz_wap/utils/storage.js"),d=new r("ad"),g=new r("page_pos"),c={};
!function(){
if(s=document.getElementsByTagName("html"),s&&1==!!s.length){
s=s[0].innerHTML;
var e=s.replace(/[\x00-\xff]/g,""),t=s.replace(/[^\x00-\xff]/g,"");
c.content_length=1*t.length+3*e.length+"<!DOCTYPE html><html></html>".length;
}
window.logs.pageinfo=c;
}();
var w={},_=!1,f=["wap.zjtoolbar.10086.cn","125.88.113.247","115.239.136.61","134.224.117.240","hm.baidu.com","c.cnzz.com","w.cnzz.com","124.232.136.164","img.100msh.net","10.233.12.76","wifi.witown.com","211.137.132.89"],p=null,u=0,h=msg_link.split("?").pop(),v=t(h);
!function(){
if(!localStorage.getItem("clear_page_pos")){
for(var e=localStorage.length-1;e>=0;){
var t=localStorage.key(e);
t.match(/^\d+$/)?localStorage.removeItem(t):t.match(/^adinfo_/)&&localStorage.removeItem(t),
e--;
}
localStorage.setItem("clear_page_pos","true");
}
}(),window.localStorage&&(l.on(window,"load",function(){
u=1*g.get(v);
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=(document.getElementById("img-content"),
document.getElementById("js_cmt_area"));
if(e&&t&&t.offsetTop){
var n=t.offsetTop;
window.scrollTo(0,n-25);
}else window.scrollTo(0,u);
}),l.on(window,"unload",function(){
if(g.set(n,u,+new Date+72e5),window._adRenderData&&"undefined"!=typeof JSON&&JSON.stringify){
var e=JSON.stringify(window._adRenderData),t=+new Date,n=[biz,sn,mid,idx].join("_");
d.set(n,{
info:e,
time:t
},+new Date+24e4);
}
a();
}),window.logs.read_height=0,l.on(window,"scroll",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(p),p=setTimeout(function(){
u=window.pageYOffset,g.set(v,u,+new Date+72e5);
},500);
}),l.on(document,"touchmove",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(p),p=setTimeout(function(){
u=window.pageYOffset,g.set(v,u,+new Date+72e5);
},500);
}));
});define("appmsg/cdn_speed_report.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function n(){
function e(e){
var n=[];
for(var i in e)n.push(i+"="+encodeURIComponent(e[i]||""));
return n.join("&");
}
if(networkType){
var n=window.performance||window.msPerformance||window.webkitPerformance;
if(n&&"undefined"!=typeof n.getEntries){
var i,t,a=100,o=document.getElementsByTagName("img"),s=o.length,p=navigator.userAgent,m=!1;
/micromessenger\/(\d+\.\d+)/i.test(p),t=RegExp.$1;
for(var g=0,w=o.length;w>g;g++)if(i=parseInt(100*Math.random()),!(i>a)){
var d=o[g].getAttribute("src");
if(d&&!(d.indexOf("mp.weixin.qq.com")>=0)){
for(var f,c=n.getEntries(),_=0;_<c.length;_++)if(f=c[_],f.name==d){
r({
type:"POST",
url:"/mp/appmsgpicreport?__biz="+biz+"#wechat_redirect",
data:e({
rnd:Math.random(),
uin:uin,
version:version,
client_version:t,
device:navigator.userAgent,
time_stamp:parseInt(+new Date/1e3),
url:d,
img_size:o[g].fileSize||0,
user_agent:navigator.userAgent,
net_type:networkType,
appmsg_id:window.appmsgid||"",
sample:s>100?100:s,
delay_time:parseInt(f.duration)
})
}),m=!0;
break;
}
if(m)break;
}
}
}
}
}
var i=e("biz_common/dom/event.js"),t=e("biz_wap/jsapi/core.js"),r=e("biz_wap/utils/ajax.js"),a={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
t.invoke("getNetworkType",{},function(e){
networkType=a[e.err_msg],n();
}),i.on(window,"load",n,!1);
});define("appmsg/voice.js",["biz_common/dom/event.js","biz_common/tmpl.js","pages/music_player.js","biz_wap/utils/ajax.js","biz_common/dom/class.js","pages/report.js"],function(e){
"use strict";
function o(){
return g("js_content")?(y._oElements=js_content.getElementsByTagName("mpvoice")||[],
y._oElements.length<=0?!1:!0):!1;
}
function i(){
window.reportVoiceid=[],y.musicLen=y._oElements.length;
}
function t(){
for(var e=0,o=0;o<y.musicLen;o++){
var i=y._oElements[o],t={};
t.voiceid=decodeURIComponent(i.getAttribute("voice_encode_fileid")||""),t.voiceid&&"undefined"!=t.voiceid&&(t.src=y.srcRoot.replace("#meidaid#",t.voiceid),
n(i,t,e),e++);
}
}
function n(e,o,i){
o.duration=e.getAttribute("play_length")||0,o.duration_str=l(o.duration),o.posIndex=i,
o.title=decodeURIComponent(e.getAttribute("name")||""),window.reportVoiceid.push(o.voiceid);
var t=y.reportData;
t.musicid.push(o.voiceid),t.commentid.push(""),t.hasended.push(0),t.mtitle.push(o.title),
t.detail_click.push(0),t.duration.push(o.duration),t.errorcode.push(0),o.show_not_support=!1,
o.musicSupport=y.musicSupport,y.musicSupport?s(o):window._hashShowMusicNotSupport||(o.show_not_support=!0,
window._hashShowMusicNotSupport=!0);
var n=document.createElement("div");
n.innerHTML=w.render("voice_tpl",o),e.parentNode.appendChild(n.children[0]),o.progress=g("voice_progress_"+o.voiceid+"_"+o.posIndex),
y.musicList[o.voiceid+"_"+o.posIndex]=o,u(o.voiceid,o.posIndex);
}
function s(e){
var o=[location.protocol,"//mp.weixin.qq.com/s?__biz=",window.biz,"&mid=",window.mid,"&idx=",window.idx,"&sn=",window.sn,"#wechat_redirect"].join("");
e.player=h.init({
appPlay:!0,
debug:!1,
duration:1*(e.duration/1e3).toFixed(2),
posIndex:e.posIndex,
src:e.src,
songId:e.voiceid,
title:e.title.length>8?e.title.substr(0,8)+"...":e.title,
singer:window.nickname?window.nickname+"的语音":"公众号语音",
epname:"语音",
coverImgUrl:window.__appmsgCgiData.round_head_img,
webUrl:o,
onStatusChange:function(e,o){
c(this,o);
},
onTimeupdate:function(e,o){
d(this,o),y.reportData.play_duration[this._o.posIndex]=1e3*o;
},
onError:function(e,o){
a(this,o);
}
});
}
function r(){
v.on(window,"unload",m);
}
function a(e,o){
y.reportData.errorcode[e._o.posIndex]=o,c(e,3);
}
function c(e,o){
var i=e._o,t=g("voice_main_"+i.songId+"_"+i.posIndex),n=y.musicList[i.songId+"_"+i.posIndex].progress;
if(2==o||3==o)f.removeClass(t,"playing"),n.style.width=0;else if(1==o){
var s=e.getDuration();
!s&&e.onTimeupdate?null==e.onTimeupdate:f.addClass(t,"playing");
}
}
function d(e,o){
var i=e._o,t=y.musicList[i.songId+"_"+i.posIndex],n=e.getDuration();
n?t.progress.style.width=p(n,o):null==e.onTimeupdate;
}
function p(e,o){
return o/e*100+"%";
}
function u(e,o){
var i=e+"_"+o;
y.musicSupport&&v.tap(g("voice_main_"+i),function(){
var t=g("voice_main_"+i),n=y.musicList[i];
return f.hasClass(t,"playing")?(n.player.stop(),I.report({
type:3,
comment_id:e,
action:5
})):(n.player.play(0),y.reportData.hasended[o]=1,I.report({
type:3,
comment_id:e,
action:4
})),!1;
});
}
function m(){
I.musicreport({
data:y.reportData
});
}
function l(e){
var o=new Date(0),i=new Date(1*e),t=i.getHours()-o.getHours(),n=i.getMinutes()+60*t,s="i:ss".replace(/i|I/g,n).replace(/ss|SS/,_(i.getSeconds(),2));
return s;
}
function _(e,o){
for(var i=0,t=o-(e+"").length;t>i;i++)e="0"+e;
return e+"";
}
function g(e){
return document.getElementById(e);
}
var v=e("biz_common/dom/event.js"),w=e("biz_common/tmpl.js"),h=e("pages/music_player.js"),f=(e("biz_wap/utils/ajax.js"),
e("biz_common/dom/class.js")),I=e("pages/report.js"),y={
musicSupport:h.getSurportType(),
musicList:{},
musicLen:0,
srcRoot:location.protocol+"//res.wx.qq.com/voice/getvoice?mediaid=#meidaid#",
reportData:I.getMusicReportData(2)
};
if(o())return i(),t(),r(),y.musicList;
});define("appmsg/qqmusic.js",["biz_common/dom/event.js","biz_common/tmpl.js","pages/music_player.js","biz_wap/utils/ajax.js","biz_common/dom/class.js","pages/report.js"],function(i){
"use strict";
function t(){
return p("js_content")?(q._oElements=js_content.getElementsByTagName("qqmusic")||[],
q._oElements.length<=0?!1:!0):!1;
}
function e(){
window.reportMid=[],q.musicLen=q._oElements.length;
}
function n(){
for(var i=0,t=0;t<q.musicLen;t++){
var e=q._oElements[t],n={};
n.musicid=e.getAttribute("musicid"),n.comment_id=e.getAttribute("commentid"),n.musicid&&"undefined"!=n.musicid&&n.comment_id&&"undefined"!=n.comment_id&&(o(e,n,i),
i++);
}
}
function o(i,t,e){
window.reportMid.push(t.musicid),t.media_id=i.getAttribute("mid"),t.duration=i.getAttribute("play_length")||0,
t.posIndex=e,t.musicImgPart=i.getAttribute("albumurl")||"",t.music_img=q.imgroot+t.musicImgPart,
t.audiourl=i.getAttribute("audiourl"),t.singer=i.getAttribute("singer"),t.music_name=i.getAttribute("music_name");
var n=q.reportData;
n.musicid.push(t.musicid),n.commentid.push(t.comment_id),n.hasended.push(0),n.mtitle.push(t.music_name),
n.detail_click.push(0),n.duration.push(t.duration),t.show_not_support=!1,t.musicSupport=q.musicSupport,
q.musicSupport?m(t):window._hashShowMusicNotSupport||(t.show_not_support=!0,window._hashShowMusicNotSupport=!0);
var o=document.createElement("div");
o.innerHTML=l.render("qqmusic_tpl",t),i.parentNode.appendChild(o.children[0]),q.musicList[t.musicid+"_"+t.posIndex]=t,
r(t.musicid,t.comment_id,t.posIndex,t.media_id);
}
function m(i){
var t=[location.protocol,"//mp.weixin.qq.com/s?__biz=",window.biz,"&mid=",window.mid,"&idx=",window.idx,"&sn=",window.sn,"#wechat_redirect"].join("");
i.player=g.init({
comment_id:i.comment_id,
duration:1*(i.duration/1e3).toFixed(2),
appPlay:!0,
debug:!1,
posIndex:i.posIndex,
mid:i.media_id,
songId:i.musicid,
title:i.music_name.length>8?i.music_name.substr(0,8)+"...":i.music_name,
singer:window.nickname?window.nickname+"推荐的歌":"公众号推荐的歌",
epname:"QQ音乐",
coverImgUrl:i.music_img,
webUrl:t,
onStatusChange:function(i,t){
a(this,t);
},
onError:function(i,t){
c(i,t);
},
onTimeupdate:function(i,t){
q.reportData.play_duration[this._o.posIndex]=1e3*t;
}
});
}
function s(){
_.on(window,"unload",d);
}
function u(){}
function c(i,t){
q.reportData.errorcode[i._o.posIndex]=t;
}
function a(i,t){
var e=i._o,n=p("qqmusic_main_"+e.comment_id+"_"+e.posIndex);
n&&(2==t||3==t?h.removeClass(n,"qqmusic_playing"):1==t&&h.addClass(n,"qqmusic_playing"));
}
function r(i,t,e){
var n=i+"_"+e;
q.musicSupport&&(_.tap(p("qqmusic_play_"+n),function(){
var i=p("qqmusic_main_"+t+"_"+e),o=q.musicList[n];
return h.hasClass(i,"qqmusic_playing")?(o.player.stop(),w.report({
type:1,
comment_id:t,
action:5
})):(o.player.play(0),q.reportData.hasended[e]=1,w.report({
type:1,
comment_id:t,
action:4
})),!1;
}),_.tap(p("qqmusic_home_"+n),function(){
var i=q.musicList[n],t=["http://data.music.qq.com/playsong.html?songmid=",i.media_id,,"&ADTAG=weixin_gzh#wechat_redirect"].join("");
q.reportData.detail_click[e]=1,window.location.href=t;
}));
}
function d(){
w.musicreport({
data:q.reportData
});
}
function p(i){
return document.getElementById(i);
}
var _=i("biz_common/dom/event.js"),l=i("biz_common/tmpl.js"),g=i("pages/music_player.js"),h=(i("biz_wap/utils/ajax.js"),
i("biz_common/dom/class.js")),w=i("pages/report.js"),q={
imgroot:"https://imgcache.qq.com/music/photo/mid_album_68",
musicSupport:g.getSurportType(),
musicList:{},
musicLen:0,
loadConf:{
startAngle:90,
cx:50,
cy:50,
r:20.5
},
reportData:w.getMusicReportData(0)
};
if(t())return e(),n(),s(),u(),q.musicList;
});define("appmsg/iframe.js",["pages/version4video.js","biz_common/dom/attr.js","biz_common/dom/event.js"],function(e){
"use strict";
function t(e){
var t=0;
e.contentDocument&&e.contentDocument.body.offsetHeight?t=e.contentDocument.body.offsetHeight:e.Document&&e.Document.body&&e.Document.body.scrollHeight?t=e.Document.body.scrollHeight:e.document&&e.document.body&&e.document.body.scrollHeight&&(t=e.document.body.scrollHeight);
var i=e.parentElement;
if(i&&(e.style.height=t+"px"),/MSIE\s(7|8)/.test(navigator.userAgent)&&e.contentWindow&&e.contentWindow.document){
var n=e.contentWindow.document.getElementsByTagName("html");
n&&n.length&&(n[0].style.overflow="hidden");
}
}
function i(e,t){
t===!0?(o.checkOriTime=0,o.orientation!=window.orientation?(o.orientation=window.orientation,
window.mpVideoFullScreent(e)):i(e,!1)):o.checkOriTime<=2&&(o.checkOriTime++,setTimeout(function(){
o.orientation!=window.orientation?(o.checkOriTime=0,o.orientation=window.orientation,
window.mpVideoFullScreent(e)):i(e,!1);
},150));
}
{
var n,o={
mpVideoBotH:37,
checkOri:"orientation"in window
},r=e("pages/version4video.js"),d=e("biz_common/dom/attr.js"),s=d.setProperty,a=e("biz_common/dom/event.js"),c=document.getElementsByTagName("iframe");
/MicroMessenger/.test(navigator.userAgent);
}
window.reportVid=[];
for(var m=0,p=c.length;p>m;++m){
n=c[m];
var u=n.getAttribute("data-src"),l=n.className||"",f=n.getAttribute("src")||u;
if(!u||"#"==u){
var g=n.getAttribute("data-display-src");
if(g&&(0==g.indexOf("/cgi-bin/readtemplate?t=vote/vote-new_tmpl")||0==g.indexOf("https://mp.weixin.qq.com/cgi-bin/readtemplate?t=vote/vote-new_tmpl"))){
g=g.replace(/&amp;/g,"&");
for(var h=g.split("&"),w=["/mp/newappmsgvote?action=show"],m=0;m<h.length;m++)(0==h[m].indexOf("__biz=")||0==h[m].indexOf("supervoteid="))&&w.push(h[m]);
w.length>1&&(u=w.join("&")+"#wechat_redirect");
}
}
if(r.isShowMpVideo()&&f&&0==f.indexOf("http://v.qq.com/iframe/player.html")){
var v=f.match(/[\?&]vid\=([^&]*)/),y=v[1],b=document.getElementById("js_content").offsetWidth,x=Math.ceil(3*b/4);
window.reportVid.push(y),f=["/mp/videoplayer?video_h=",x,"&scene=1&source=4&vid=",y,"&mid=",appmsgid,"&idx=",itemidx||idx,"&__biz=",biz,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&version=",version,"&devicetype=",window.devicetype||""].join(""),
setTimeout(function(e,t,i,n){
return function(){
n.removeAttribute("style"),n.setAttribute("width",e),n.setAttribute("height",t+o.mpVideoBotH),
n.setAttribute("marginWidth",0),n.setAttribute("marginHeight",0),n.style.top="0",
n.setAttribute("src",i);
};
}(b,x,f,n),0);
}else if(u&&(u.indexOf("newappmsgvote")>-1&&l.indexOf("js_editor_vote_card")>=0||0==u.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&l.indexOf("card_iframe")>=0||u.indexOf("appmsgvote")>-1||u.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1)){
if(u=u.replace(/^http:/,location.protocol),l.indexOf("card_iframe")>=0)n.setAttribute("src",u.replace("#wechat_redirect",["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||""].join("")));else{
var _=u.indexOf("#wechat_redirect")>-1,O=["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket].join("");
l.indexOf("vote_iframe")>=0&&(O+=["&appmsgid=",mid,"&appmsgidx=",idx].join(""));
var A=_?u.replace("#wechat_redirect",O):u+O;
n.setAttribute("src",A);
}
-1==u.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&!function(e){
e.onload=function(){
t(e);
};
}(n),n.appmsg_idx=m;
}
if(u&&u.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1&&b>0){
var k=b,j=3*k/4;
n.width=k,n.height=j,n.style.setProperty&&(n.style.setProperty("width",k+"px","important"),
n.style.setProperty("height",j+"px","important"));
}
}
var T="onorientationchange"in window?"orientationchange":"resize";
if(a.on(window,T,function(){
for(var e=document.getElementsByTagName("iframe"),t=0,n=e.length;n>t;t++){
var r=e[t],d=r.getAttribute("src");
d&&-1!=d.indexOf("/mp/videoplayer")&&r.className.indexOf("iframe_full_video")>=0&&setTimeout(function(e){
return function(){
o.checkOri?i(e,!0):window.mpVideoFullScreent(e);
};
}(r),0);
}
},!1),a.on(window,"resize",function(){
for(var e=document.getElementsByTagName("iframe"),t=0,i=e.length;i>t;t++){
var n=e[t],r=n.getAttribute("src");
r&&-1!=r.indexOf("/mp/videoplayer")&&setTimeout(function(e){
return function(){
var t=document.getElementById("js_content").offsetWidth,i=Math.ceil(3*t/4)+o.mpVideoBotH;
e.setAttribute("width",t),e.setAttribute("height",i);
};
}(n),100);
}
},!1),window.resetMpVideoH=function(e){
var t=document.getElementById("js_content").offsetWidth,i=Math.ceil(3*t/4)+o.mpVideoBotH;
return e.setAttribute("width",t),e.setAttribute("height",i),s(e,"position","static","important"),
!1;
},window.mpVideoFullScreent=function(e){
o.orientation=window.orientation||0;
var t=window.innerHeight,i=window.innerWidth,n=0;
if(o.checkOri&&90==Math.abs(o.orientation)){
var r=t;
t=i,i=r,n=0;
}
(e.getAttribute("height")!=t||e.getAttribute("width")!=i)&&setTimeout(function(){
s(e,"position","absolute","important"),e.setAttribute("width",i),e.setAttribute("height",t),
setTimeout(function(){
s(e,"position","fixed","important");
},20);
},0);
},window.iframe_reload=function(){
for(var e=0,i=c.length;i>e;++e){
n=c[e];
var o=n.getAttribute("src");
o&&(o.indexOf("newappmsgvote")>-1||o.indexOf("appmsgvote")>-1)&&t(n);
}
},"getElementsByClassName"in document)for(var B,H=document.getElementsByClassName("video_iframe"),m=0;B=H.item(m++);)B.setAttribute("scrolling","no"),
B.style.overflow="hidden";
});define("appmsg/review_image.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","appmsg/cdn_img_lib.js"],function(e){
"use strict";
function t(e,t){
r.invoke("imagePreview",{
current:e,
urls:t
});
}
function i(e){
var i=[],r=e.container;
r=r?r.getElementsByTagName("img"):[];
for(var n=0,p=r.length;p>n;n++){
var m=r.item(n),c=m.getAttribute("data-src")||m.getAttribute("src"),o=m.getAttribute("data-type");
if(c){
for(;-1!=c.indexOf("?tp=webp");)c=c.replace("?tp=webp","");
m.dataset&&m.dataset.s&&c.isCDN()&&(c=c.replace(/\/640$/,"/0"),c=c.replace(/\/640\?/,"/0?")),
c.isCDN()&&(c=s.addParam(c,"wxfrom","3",!0)),e.is_https_res&&(c=c.http2https()),
o&&(c=s.addParam(c,"wxtype",o,!0)),i.push(c),function(e){
a.on(m,"click",function(){
return t(e,i),!1;
});
}(c);
}
}
}
var a=e("biz_common/dom/event.js"),r=e("biz_wap/jsapi/core.js"),s=e("biz_common/utils/url/parse.js");
return e("appmsg/cdn_img_lib.js"),i;
});define("appmsg/outer_link.js",["biz_common/dom/event.js"],function(e){
"use strict";
function n(e){
var n=e.container;
if(!n)return!1;
for(var r=n.getElementsByTagName("a")||[],i=0,o=r.length;o>i;++i)!function(n){
var i=r[n],o=i.getAttribute("href");
if(!o)return!1;
var a=0,c=i.innerHTML;
/^[^<>]+$/.test(c)?a=1:/^<img[^>]*>$/.test(c)&&(a=2),!!e.changeHref&&(o=e.changeHref(o,a)),
t.on(i,"click",function(){
return location.href=o,!1;
},!0);
}(i);
}
var t=e("biz_common/dom/event.js");
return n;
});define("biz_wap/jsapi/core.js",[],function(){
"use strict";
document.domain="qq.com";
var i={
ready:function(i){
"undefined"!=typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.invoke?i():top.window.document.addEventListener?top.window.document.addEventListener("WeixinJSBridgeReady",i,!1):top.window.document.attachEvent&&(top.window.document.attachEvent("WeixinJSBridgeReady",i),
top.window.document.attachEvent("onWeixinJSBridgeReady",i));
},
invoke:function(i,n,e){
this.ready(function(){
return"object"!=typeof top.window.WeixinJSBridge?(alert("请在微信中打开此链接！"),!1):void top.window.WeixinJSBridge.invoke(i,n,e);
});
},
call:function(i){
this.ready(function(){
return"object"!=typeof top.window.WeixinJSBridge?!1:void top.window.WeixinJSBridge.call(i);
});
},
on:function(i,n){
this.ready(function(){
return"object"==typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.on?void top.window.WeixinJSBridge.on(i,n):!1;
});
}
};
return i;
});define("biz_common/dom/event.js",[],function(){
"use strict";
function e(e,t,n,o){
a.isPc||a.isWp?i(e,"click",o,t,n):i(e,"touchend",o,function(e){
if(-1==a.tsTime||+new Date-a.tsTime>200)return a.tsTime=-1,!1;
var n=e.changedTouches[0];
return Math.abs(a.y-n.clientY)<=5&&Math.abs(a.x-n.clientX)<=5?t.call(this,e):void 0;
},n);
}
function t(e,t){
if(!e||!t||e.nodeType!=e.ELEMENT_NODE)return!1;
var n=e.webkitMatchesSelector||e.msMatchesSelector||e.matchesSelector;
return n?n.call(e,t):(t=t.substr(1),e.className.indexOf(t)>-1);
}
function n(e,n,i){
for(;e&&!t(e,n);)e=e!==i&&e.nodeType!==e.DOCUMENT_NODE&&e.parentNode;
return e;
}
function i(t,i,o,r,c){
var s,d,u;
return"input"==i&&a.isPc,t?("function"==typeof o&&(c=r,r=o,o=""),"string"!=typeof o&&(o=""),
t==window&&"load"==i&&/complete|loaded/.test(document.readyState)?r({
type:"load"
}):"tap"==i?e(t,r,c,o):(s=function(e){
var t=r(e);
return t===!1&&(e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault()),
t;
},o&&"."==o.charAt(0)&&(u=function(e){
var i=e.target||e.srcElement,r=n(i,o,t);
return r?(e.delegatedTarget=r,s(e)):void 0;
}),d=u||s,r[i+"_handler"]=d,t.addEventListener?void t.addEventListener(i,d,!!c):t.attachEvent?void t.attachEvent("on"+i,d,!!c):void 0)):void 0;
}
function o(e,t,n,i){
if(e){
var o=n[t+"_handler"]||n;
return e.removeEventListener?void e.removeEventListener(t,o,!!i):e.detachEvent?void e.detachEvent("on"+t,o,!!i):void 0;
}
}
var r=navigator.userAgent,a={
isPc:/(WindowsNT)|(Windows NT)|(Macintosh)/i.test(navigator.userAgent),
isWp:/Windows\sPhone/i.test(r),
tsTime:-1
};
return a.isPc||i(document,"touchstart",function(e){
var t=e.changedTouches[0];
a.x=t.clientX,a.y=t.clientY,a.tsTime=+new Date;
}),{
on:i,
off:o,
tap:e
};
});define("appmsg/copyright_report.js",["biz_common/dom/event.js"],function(e){
"use strict";
function n(e){
var n=["/mp/copyrightreport?action=report&biz=",biz,"&scene=",e.scene,"&card_pos=",window.__appmsgCgiData.card_pos,"&ori_username=",source_username,"&user_uin=",user_uin,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&t=",Math.random()].join(""),o=new Image;
o.src=n.substr(0,1024);
}
function o(){
var e=__appmsgCgiData;
"2"==e.copyright_stat&&"1"==e.card_pos?n({
scene:"1",
card_pos:"1"
}):"2"==e.copyright_stat&&"0"==e.card_pos&&i.on(window,"load",function(){
i.on(window,"scroll",t);
});
}
function t(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,o=r("copyright_info"),s=r("page-content"),a=0;o&&s!==o;)a+=o.offsetTop,
o=o.parentElement;
e+c.innerHeight>a&&(n({
scene:"1",
card_pos:"0"
}),i.off(window,"scroll",t),t=null);
}
function r(e){
return document.getElementById(e);
}
var i=e("biz_common/dom/event.js"),c={
innerHeight:window.innerHeight||document.documentElement.clientHeight
};
return{
card_click_report:n,
card_pv_report:o
};
});define("appmsg/async.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/dom/class.js","biz_common/tmpl.js","biz_wap/utils/storage.js","pages/version4video.js","appmsg/cdn_img_lib.js","biz_common/utils/url/parse.js","appmsg/a.js","appmsg/like.js","appmsg/comment.js","appmsg/reward_entry.js"],function(require,exports,module){
"use strict";
function saveCopy(e){
var t={};
for(var a in e)if(e.hasOwnProperty(a)){
var n=e[a],i=typeof n;
n="string"==i?n.htmlDecode():n,"object"==i&&(n=saveCopy(n)),t[a]=n;
}
return t;
}
function fillVedio(e){
if(vedio_iframes&&vedio_iframes.length>0)for(var t,a,n,i=0,r=vedio_iframes.length;r>i;++i)t=vedio_iframes[i],
a=t.iframe,n=t.src,e&&(n=n.replace(/\&encryptVer=[^\&]*/gi,""),n=n.replace(/\&platform=[^\&]*/gi,""),
n=n.replace(/\&cKey=[^\&]*/gi,""),n=n+"&encryptVer=6.0&platform=61001&cKey="+e),
a.setAttribute("src",n);
}
function fillData(e){
var t=e.adRenderData||{
advertisement_num:0
};
if(!t.flag&&t.advertisement_num>0){
var a=t.advertisement_num,n=t.advertisement_info;
window.adDatas.num=a;
for(var i=0;a>i;++i){
var r=null,o=n[i];
if(o.biz_info=o.biz_info||{},o.app_info=o.app_info||{},o.pos_type=o.pos_type||0,
o.logo=o.logo||"",100==o.pt)r={
usename:o.biz_info.user_name,
pt:o.pt,
url:o.url,
traceid:o.traceid,
adid:o.aid,
is_appmsg:!0
};else if(102==o.pt)r={
appname:o.app_info.app_name,
versioncode:o.app_info.version_code,
pkgname:o.app_info.apk_name,
androiddownurl:o.app_info.apk_url,
md5sum:o.app_info.app_md5,
signature:o.app_info.version_code,
rl:o.rl,
traceid:o.traceid,
pt:o.pt,
type:o.type,
adid:o.aid,
is_appmsg:!0
};else if(101==o.pt)r={
appname:o.app_info.app_name,
app_id:o.app_info.app_id,
icon_url:o.app_info.icon_url,
appinfo_url:o.app_info.appinfo_url,
rl:o.rl,
traceid:o.traceid,
pt:o.pt,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};else if(103==o.pt||104==o.pt){
var d=o.app_info.down_count||0,s=o.app_info.app_size||0,p=o.app_info.app_name||"",m=o.app_info.category,_=["万","百万","亿"];
if(d>=1e4){
d/=1e4;
for(var c=0;d>=10&&2>c;)d/=100,c++;
d=d.toFixed(1)+_[c]+"次";
}else d=d.toFixed(1)+"次";
s>=1024?(s/=1024,s=s>=1024?(s/1024).toFixed(2)+"MB":s.toFixed(2)+"KB"):s=s.toFixed(2)+"B",
m=m?m[0]||"其他":"其他";
for(var l=["-","(",":",'"',"'","：","（","—","“","‘"],f=-1,u=0,g=l.length;g>u;++u){
var v=l[u],w=p.indexOf(v);
-1!=w&&(-1==f||f>w)&&(f=w);
}
-1!=f&&(p=p.substring(0,f)),o.app_info._down_count=d,o.app_info._app_size=s,o.app_info._category=m,
o.app_info.app_name=p,r={
appname:o.app_info.app_name,
app_rating:o.app_info.app_rating||0,
app_id:o.app_info.app_id,
channel_id:o.app_info.channel_id,
md5sum:o.app_info.app_md5,
rl:o.rl,
pkgname:o.app_info.apk_name,
androiddownurl:o.app_info.apk_url,
versioncode:o.app_info.version_code,
appinfo_url:o.app_info.appinfo_url,
traceid:o.traceid,
pt:o.pt,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};
}
var y=o.image_url;
require("appmsg/cdn_img_lib.js");
var h=require("biz_common/utils/url/parse.js");
y&&y.isCDN()&&(y=y.replace(/\/0$/,"/640"),y=y.replace(/\/0\?/,"/640?"),o.image_url=h.addParam(y,"wxfrom","50",!0)),
adDatas.ads["pos_"+o.pos_type]={
a_info:o,
adData:r
};
}
var b=function(e){
var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
"undefined"!=typeof e&&(t=e);
10>=t&&(k.style.display="block",DomEvent.off(window,"scroll",b));
},j=document.getElementById("js_bottom_ad_area"),k=document.getElementById("js_top_ad_area"),z=adDatas.ads;
for(var D in z)if(0==D.indexOf("pos_")){
var r=z[D],o=!!r&&r.a_info;
if(r&&o)if(0==o.pos_type)j.innerHTML=TMPL.render("t_ad",o);else if(1==o.pos_type){
k.style.display="none",k.innerHTML=TMPL.render("t_ad",o),DomEvent.on(window,"scroll",b);
var x=0;
window.localStorage&&(x=1*localStorage.getItem(D)||0),window.scrollTo(0,x),b(x);
}
}
require("appmsg/a.js");
}
var I=e.appmsgstat||{};
window.appmsgstat||(window.appmsgstat=I),I.show&&(!function(){
var e=document.getElementById("js_read_area"),t=document.getElementById("like");
e.style.display="block",t.style.display="inline",I.liked&&Class.addClass(t,"praised"),
t.setAttribute("like",I.liked?"1":"0");
var a=document.getElementById("likeNum"),n=document.getElementById("readNum"),i=I.read_num,r=I.like_num;
i||(i=1),r||(r="Like"),parseInt(i)>1e5?i="100000+":"",parseInt(r)>1e5?r="100000+":"",
n&&(n.innerHTML=i),a&&(a.innerHTML=r);
}(),require("appmsg/like.js")),1==e.comment_enabled&&require("appmsg/comment.js"),
-1!=ua.indexOf("MicroMessenger")&&e.reward&&(rewardEntry=require("appmsg/reward_entry.js"),
rewardEntry.handle(e.reward,getCountPerLine()));
}
function getAsyncData(){
var is_need_ticket="";
vedio_iframes&&vedio_iframes.length>0&&(is_need_ticket="&is_need_ticket=1");
var is_need_ad=1,_adInfo=null;
if(window.localStorage)try{
var key=[biz,sn,mid,idx].join("_"),_ad=adLS.get(key);
_adInfo=_ad.info;
try{
_adInfo=eval("("+_adInfo+")");
}catch(e){
_adInfo=null;
}
var _adInfoSaveTime=_ad.time,_now=+new Date;
_adInfo&&18e4>_now-1*_adInfoSaveTime&&1*_adInfo.advertisement_num>0?is_need_ad=0:adLS.remove(key);
}catch(e){
is_need_ad=1,_adInfo=null;
}
document.getElementsByClassName&&-1!=navigator.userAgent.indexOf("MicroMessenger")||(is_need_ad=0);
var screen_num=Math.ceil(document.body.scrollHeight/(document.documentElement.clientHeight||window.innerHeight)),both_ad=screen_num>=2?1:0;
ajax({
url:"/mp/getappmsgext?__biz="+biz+"&mid="+mid+"&sn="+sn+"&idx="+idx+"&scene="+source+"&title="+encodeURIComponent(msg_title.htmlDecode())+"&ct="+ct+"&devicetype="+devicetype.htmlDecode()+"&version="+version.htmlDecode()+"&f=json&r="+Math.random()+is_need_ticket+"&is_need_ad="+is_need_ad+"&comment_id="+comment_id+"&is_need_reward="+is_need_reward+"&both_ad="+both_ad+"&reward_uin_count="+(is_need_reward?3*getCountPerLine():0),
type:"GET",
async:!0,
success:function(ret){
var tmpret=ret;
if(ret)try{
try{
ret=eval("("+tmpret+")");
}catch(e){
var img=new Image;
return void(img.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=3&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key3]"+encodeURIComponent(tmpret)+"&r="+Math.random()).substr(0,1024));
}
if(fillVedio(ret.appmsgticket?ret.appmsgticket.ticket:""),ret.ret)return;
var adRenderData={};
if(0==is_need_ad)adRenderData=_adInfo,adRenderData||(adRenderData={
advertisement_num:0
});else{
if(ret.advertisement_num>0&&ret.advertisement_info){
var d=ret.advertisement_info;
adRenderData.advertisement_info=saveCopy(d);
}
adRenderData.advertisement_num=ret.advertisement_num;
}
1==is_need_ad&&(window._adRenderData=adRenderData),fillData({
adRenderData:adRenderData,
appmsgstat:ret.appmsgstat,
comment_enabled:ret.comment_enabled,
reward:{
reward_total:ret.reward_total_count,
self_head_img:ret.self_head_img,
reward_head_imgs:ret.reward_head_imgs||[],
can_reward:ret.can_reward,
timestamp:ret.timestamp
}
});
}catch(e){
var img=new Image;
return img.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=1&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(e.toString())+"&r="+Math.random()).substr(0,1024),
void(console&&console.error(e));
}
},
error:function(){
var e=new Image;
e.src="http://mp.weixin.qq.com/mp/jsreport?1=1&key=2&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key2]ajax_err&r="+Math.random();
}
});
}
function getCountPerLine(){
return DomEvent.on(window,"resize",function(){
onResize(),rewardEntry&&rewardEntry.render(getCountPerLine());
}),onResize();
}
function onResize(){
var e=window.innerWidth||document.documentElement.clientWidth;
try{
e=document.getElementById("page-content").getBoundingClientRect().width;
}catch(t){}
var a=30,n=34,i=Math.floor(.9*(e-a)/n);
return document.getElementById("js_reward_inner")&&(document.getElementById("js_reward_inner").style.width=i*n+"px"),
getCountPerLine=function(){
return i;
},i;
}
require("biz_common/utils/string/html.js");
var iswifi=!1,ua=navigator.userAgent,in_mm=-1!=ua.indexOf("MicroMessenger"),DomEvent=require("biz_common/dom/event.js"),offset=200,ajax=require("biz_wap/utils/ajax.js"),Class=require("biz_common/dom/class.js"),TMPL=require("biz_common/tmpl.js"),LS=require("biz_wap/utils/storage.js"),rewardEntry,adLS=new LS("ad"),iframes=document.getElementsByTagName("iframe"),iframe,js_content=document.getElementById("js_content"),vedio_iframes=[],w=js_content.offsetWidth,h=3*w/4;
window.logs.video_cnt=0;
for(var i=0,len=iframes.length;len>i;++i){
iframe=iframes[i];
var src=iframe.getAttribute("data-src"),realsrc=iframe.getAttribute("src")||src;
if(realsrc){
var Version4video=require("pages/version4video.js");
if(!Version4video.isShowMpVideo()&&0==realsrc.indexOf("http://v.qq.com/iframe/player.html")||0==realsrc.indexOf("http://z.weishi.com/weixin/player.html")){
realsrc=realsrc.replace(/width=\d+/g,"width="+w),realsrc=realsrc.replace(/height=\d+/g,"height="+h),
in_mm&&0==realsrc.indexOf("http://v.qq.com/iframe/player.html")?vedio_iframes.push({
iframe:iframe,
src:realsrc
}):iframe.setAttribute("src",realsrc),iframe.width=w,iframe.height=h,iframe.style.setProperty&&(iframe.style.setProperty("width",w+"px","important"),
iframe.style.setProperty("height",h+"px","important")),window.logs.video_cnt++;
continue;
}
}
}
window.adDatas={
ads:{},
num:0
};
var js_toobar=document.getElementById("js_toobar"),innerHeight=window.innerHeight||document.documentElement.clientHeight,onScroll=function(){
var e=window.pageYOffset||document.documentElement.scrollTop,t=js_toobar.offsetTop;
e+innerHeight+offset>=t&&(getAsyncData(),DomEvent.off(window,"scroll",onScroll));
};
iswifi?(DomEvent.on(window,"scroll",onScroll),onScroll()):getAsyncData();
});
