const base= document.getElementById("base");
const canvas = document.createElement("canvas") ;
const qrwindow = document.createElement("canvas");
canvas.id = "canvas";
qrwindow.id = "qrwindow";

base.appendChild(canvas);
base.appendChild(qrwindow);


window.onload = (e)=>{

    const video = document.createElement("video");
    const ctx = canvas.getContext("2d", {willReadFrequently: true});
    const qrctx = qrwindow.getContext("2d");

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
            qrwindow.height = video.videoHeight;
            qrwindow.width = video.videoWidth;

            const qrsize = 500;
            const x = (canvas.width - qrsize) / 2;
            const y = (canvas.height - qrsize) / 2;

            ctx.drawImage(video,0,0,canvas.width,canvas.height);
            qrctx.drawImage(video,x,y,qrsize,qrsize,x,y,qrsize,qrsize);
            const img = ctx.getImageData(x,y,qrsize,qrsize);
        
            const code = jsQR(img.data,img.width,img.height,{
            inversionAttempts:"dontInvert",
            });
                if(code){
                    drawRect(code.location);
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

    function drawline(begin, end){
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#FF3B58";
        ctx.beginPath();
        ctx.moveTo(begin.x, begin.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    }
}