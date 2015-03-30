var mst_cid=44;
var msw_host = window.location.host;    //获取域名
//var msw_su=window.location;    //本页地址
var msw_sf=document.referrer;  //来源页地址
var msw_cid=mst_cid;
var msw_fzt=0;
var msw_furl='';

if(msw_cid<1){msw_cid=1;}
if(msw_sf.indexOf(msw_host)<0) {
	      msw_furl=msw_sf;
	      msw_fzt=1;
}

function $tyms(_gwId){
	      return document.getElementById(_gwId);
}
	
function ymsupdatestats(msw_furl) {
	      var ymstats='<img style="width:0px;height:0px;display:none;" src="' + msw_furl + '" />';
	      $tyms('ymstats').innerHTML=ymstats;
}

document.write('<div id=ymstats style="display:none;"></div>');
msw_furl='http://wz.gusuwang.com/stats/?cid='+msw_cid+'&fzt='+msw_fzt+'&furl='+escape(msw_furl);
ymsupdatestats(msw_furl);
