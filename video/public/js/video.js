socket.on("server",function (e) {
    $("<div></div>").html(e).appendTo(".video-box").css({
        position:"absolute",
        left:"100%",
        top:($(".video-box").height()-20)*Math.random(),
        border:"1px solid #555",
        borderRadius:"5px",
        padding:"5px",
        animation:"danmu 5s linear infinite"
    });
    $(".danmu input").val("")
})
class parent{
    constructor(el){
        this.el=el||".video-box";
        this.html="";
        this.addCss();
        this.template();
        this.render();
    }
    addCss(){
       if(this.css){
           parent.cssText+=this.css();
       }
    }
    render(){
        this.dom=$(this.html).appendTo(this.el)
    }
}
parent.cssText="";

class video extends parent{
    constructor(el){
        super(el);
    }
    css(){
        return `
         video{
    width:100%;height:100%;
}
        `
    }
    template() {
      this.html=   `
      <video src="/video1.mp4"> </video>
    `
    }

}

class controls extends parent{
    constructor(el){
      super(el);
      $(".video-box").mouseenter(this.enter);
      $(".video-box").mouseleave(this.out);
    }
    enter(){
        $(".controls").css("display","flex")
    }
    out(){
        $(".controls").css("display","none")
    }
    css(){
        return `
          .controls{
           width:100%;height:50px;background: rgba(200,200,200,0.6);
    position: absolute;left:0;bottom: 0;display:none;
    align-items:center ;
    justify-content: space-around;
          }
        `
    }
    template(){
        this.html=`
          <div class="controls"> </div>
        `
    }
}

class play extends parent{
    constructor(el){
        super(el);
        $(".playBtn")[0].onclick=this.run;
    }
    run(){
        if($("video")[0].paused){
            $("video")[0].play();
            $(".playBtn").css("backgroundImage","url(/img/pause.png)")
        }else{
            $("video")[0].pause();
            $(".playBtn").css("backgroundImage","url(/img/play.png)")
        }
    }
    css(){
        return `
          .playBtn{
            width:30px;height:30px;
    background: url("/img/play.png");
    background-size: 100%;
          }
        `
    }
    template(){
        this.html=`
          <div class="playBtn"> </div>
        `
    }
}

class time extends parent{
    constructor(el){
        super(el)
        $("video")[0].oncanplay=()=>{
            this.can();
        }
        $("video")[0].ontimeupdate=()=>{
            this.play();
        }
    }
    can(){
        var timestr= this.timeTranform($("video")[0].currentTime)+"/"+this.timeTranform($("video")[0].duration);
        $(".time").html(timestr)

    }
    play(){
        var timestr= this.timeTranform($("video")[0].currentTime)+"/"+this.timeTranform($("video")[0].duration);
        $(".time").html(timestr)
    }
    timeTranform(time){

        var time=Math.round(time);
        var min=parseInt(time/60);
        min=min<10?"0"+min:min;
        time%=60;
        time=time<10?"0"+time:time;
        return min+":"+time;
    }
    css(){
        return `
        .time{
          color:#fff;
        }
        `
    }
    template(){
        this.html=`<div class="time"></div>`
    }
}

class danmu extends parent{
    constructor(el){
        super(el);
        $(".danmu input").keydown(this.down);
    }
    down(e){
        if(e.keyCode==13){
            var text=($(".danmu input").val());
            socket.emit("client",text);

        }
    }
    css(){
        return `
         .danmu{
            width:120px;height:30px;
            border:1px solid #000;
            border-radius:5px;
         }
         input{
           width:100%;height:100%;
           border:none;
           border-radius:5px;
           background:rgba(200,200,200,.8);
           color:red;
         }
         
         input:focus{
           outline:none;
         }
         
         @keyframes danmu{
          0%{
            left:100%;
          }
          
          100%{
          left:0
          }
         }
        `
    }
    template(){
        this.html=`
          <div class="danmu"> 
            <input type="text">
          </div>
        `
    }
}

class run{
    constructor(){
        new video();
        var control=new controls().dom;
        new play(control)
        new time(control)
        new danmu(control);
        this.createCss();
    }

    createCss(){
        $("<style></style>").html(parent.cssText).appendTo("body");
    }
}

new run();


