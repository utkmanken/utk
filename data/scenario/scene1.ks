;ティラノスクリプトサンプルゲーム

*start

[cm]
[bg storage="scene1.png"]

/*
[iscript]
const wraper = document.getElementById("wrapper");
const canvas = document.createElement("canvas") ;
canvas.id = "canvas";

wraper.appendChild(canvas);


window.onload = (e)=>{

    const video = document.createElement("video");
    const ctx = canvas.getContext("2d");

    const userMedia = {video:{facingMode:"environment"}};
    navigator.mediaDevices.getUserMedia(userMedia).then((stream)=>{
        video.srcObject = stream;
        video.setAttribute("playsinline", true);
        video.play();
        startTick();

    });
    
    function startTick(){
        if(video.readyState === video.HAVE_ENOUGH_DATA){
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;
            ctx.drawImage(video,0,0,canvas.width,canvas.height);
            const img = ctx.getImageData(0,0,canvas.width,canvas.height);
        
            const code = jsQR(img.data,img.width,img.height,{
            inversionAttempts:"dontInvert",
            });
                if(code){
                    console.log(code.data);
                }           
        }
    setTimeout(startTick, 250);
    }

    function drawRect(location){
        drawline(location.topLeftCorner, location.topRightCorner);
        drawline(location.topRightCorner, location.bottomRightCorner);
        drawline(location.bottomRightCorner, location.bottomLeftCorner);
        drawline(location.bottomLeftCorner, location.topLeftCorner);
    }

    function drawLine(begin, end){
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#FF3B58";
        ctx.beginPath();
        ctx.moveTo(begin.x, begin.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    }
}

    



[endscript]
*/
