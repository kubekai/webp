var timeindex=[0,20,39,57,74,90,105,119,132,144,155,165,174,182,189,195,200,204,207,209];
//var type=[".一般票(單程票)",".來回票(悠遊卡/一卡通)",".電子票證",".回數票",".定期票30天期",".定期票60天期"];
//var fare=[".成人",".學生",".孩童",".敬老",".愛心",".愛心孩童",".愛心優待/愛心陪伴",".團體"]
$(function () {
    $.ajax({
        type: 'GET',
        url: 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/S2STravelTime/TYMC?%24top=30&%24format=JSON', //欲呼叫之API網址
        dataType: 'json',
        headers: GetAuthorizationHeader(),
        success: function (Data) {
            //var json=JSON.stringify(Data);
            //console.log(json);
            $("#A1").html(Data[0].TravelTimes[0].FromStationName.Zh_tw);//從北車開始
            for(var i=2;i<22;i++)
            {
                $("#A"+i).html(Data[0].TravelTimes[i-2].ToStationName.Zh_tw);//將每站寫進div
            }
            var s=0;
            for(var i=1;i<21;i++)
            {
                $("#T"+i).html(Data[0].TravelTimes[timeindex[s]].RunTime/60+"分"+Data[0].TravelTimes[timeindex[s]].RunTime%60+"秒");//數據是普通車
                s++;
            }
            $(".station").append("<option>"+Data[0].TravelTimes[0].FromStationName.Zh_tw+"</option>");
            for(var i=2;i<22;i++)
            {
                $(".station").append("<option>"+Data[0].TravelTimes[i-2].ToStationName.Zh_tw+"</option>");
            }
            for(var i=1;i<=6;i++)
            {
                $("#ticketype").append("<option>"+i+"</option>");
            }
            for(var i=1;i<=8;i++)
            {
                $("#fareclass").append("<option>"+i+"</option>");
            }

    
        }
    });
});
$(function () {
    $.ajax({
        type: 'GET',
        url: 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/TYMC?%24format=JSON', //欲呼叫之API網址
        dataType: 'json',
        headers: GetAuthorizationHeader(),
        success: function (Data) {
            $("#price").click(function(){
                var start=$("#start").val();
                var end=$("#end").val();
                var ticketype=$("#ticketype").val();
                var fareclass=$("#fareclass").val();
                if(start==end){
                    $("#value").html("錯誤，請再重試一次");
                }
                else{
                    for(var i=0;i<420;i++){
                        if(Data[i].OriginStationName.Zh_tw==start){
                            for(var j=0;j<20;j++){
                                if(Data[i+j].DestinationStationName.Zh_tw==end){
                                    for(var k=0;k<10;k++){
                                        if(Data[i+j].Fares[k].TicketType==ticketype&&Data[i+j].Fares[k].FareClass==fareclass){
                                            $("#value").html(Data[i+j].Fares[k].Price+"$");
                                            break;
                                        }
                                        else{
                                            $("#value").html("不存在此票型與費率的組合，請重試");
                                        }

                                    }
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
            })
    
        }
    });
});
function GetAuthorizationHeader() {
    var AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    var AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';

    var GMTString = new Date().toGMTString();
    var ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    var HMAC = ShaObj.getHMAC('B64');
    var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

    return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/}; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}
