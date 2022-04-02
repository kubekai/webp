var x=document.getElementById("demo");
document.addEventListener('keydown',keylog);
function keylog(e)
{
        x.innerText+=e.key;

}
