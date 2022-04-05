 alert("敲擊任意鍵開始吧！！")
 var divBoard=document.getElementById("divBoard");
 document.addEventListener('keydown',logkey);
 document.addEventListener('keydown',start);
 function start()
 {
    //將任意的開始鍵刪掉
    document.getElementById("log").innerHTML=document.getElementById("log").innerHTML.substr(document.getElementById("log").innerHTML.length);
    window.setInterval(AddWord,500);//控制時間
    this.removeEventListener('keydown',start);//只需要一次後面不用在觸發
 }

 function logkey(e)
 {
     var lastWord=divBoard.innerText.substr(-1);
     if(lastWord==e.key)//如果輸入是字串的最後一個字
     {
         //將賽道上最後一個字刪掉
         divBoard.innerHTML=divBoard.innerHTML.substr(0,divBoard.innerHTML.length-1);
     }
     //將輸入的字貼上(錯誤的也會)
     if(e.key!="Shift"&&e.key!="Backspace"&&e.key!="Enter"&&e.key!="CapsLock")//不輸出特殊鍵
     {
        document.getElementById("log").innerHTML += e.key;
     }
 }
 
 function AddWord()
 {
     divBoard.innerHTML =String.fromCharCode(getRandom(26)+65)+divBoard.innerHTML;
 }


 function getRandom(x)
 {
     return Math.floor(Math.random()*x);
 }