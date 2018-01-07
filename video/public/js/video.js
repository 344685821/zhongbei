socket.on("server",function (e) {
    $("<div class='danmubox'></div>").html(e).appendTo(".video-box").css({
        position:"absolute",
        left:"100%",
        top:($(".video-box").height()-20)*Math.random(),
        border:"1px solid #555",
        borderRadius:"5px",
        padding:"5px",
        animation:"danmu 5s linear infinite"
    });

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
      <video src="/1080.mp4"> </video>
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
        $("video")[0].addEventListener("timeupdate",()=>{
            this.play();
        })
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
            $(".danmu input").val("")

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

class danmuflag extends parent{
    constructor(el){
        super(el);
        this.flag=true;
        $(".danmuflag").click(()=>{
            this.click();
        });
    }
    click(){

        if(this.flag){
            $(".danmuflag").css("backgroundImage","url(/img/danmu.png)");
             $(".danmubox").css("display","none")
            this.flag=false;
        }else{
            $(".danmuflag").css("backgroundImage","url(/img/danmu-active.png)");
            this.flag=true;
            $(".danmubox").css("display","block")
        }
    }
    css(){
        return `
          .danmuflag{
              width:37px;height:37px;
              background:url("/img/danmu-active.png");
          }
        `
    }
    template(){
        this.html=`
         <div class="danmuflag"> </div>
        `
    }
}

class progress extends parent{
    constructor(el){
        super(el);
        $("video")[0].addEventListener("timeupdate",this.play)
        $(".progress").click(this.click)
    }
    click(e){
        var bili=(e.offsetX)/$(".progress").width();
        $(".bar").css("width",bili*100+"%");
        $("video")[0].currentTime=$("video")[0].duration*bili;
    }
    play(){
        var bili=$("video")[0].currentTime/$("video")[0].duration*100+"%";
        $(".bar").css("width",bili);

    }

    css(){
        return `
          .progress{
            width:100%;height:5px;
            position:absolute;
            left:0;top:0;
            border-bottom:1px solid #ccc;
            cursor:pointer;
          }
          .progress .bar{
            width:0%;height:100%;
            background:orange;
            position:absolute;left:0;top:0;
          }
        `
    }

    template(){
        this.html=`
          <div class="progress"> 
             <div class="bar"> </div>
          </div>
        `
    }
}

class speed extends parent{
    constructor(el){
        super(el);
        $(".speed").mouseenter(this.show);
        $(".speed").mouseleave(this.hide);
        $(".speed-opt").click(this.click);
    }
    click(){
        $(".speed-opt").removeClass("speed-opt-active");
        $(this).addClass("speed-opt-active");
        $("video")[0].playbackRate=$(this).html();
    }

    show(){
        $(".speed-opt-box").css("display","flex")
    }
    hide(){
        $(".speed-opt-box").css("display","none")
    }


    css(){
        return `
        
          .speed{
            width:60px;height:30px;position:relative;
            border:1px solid #000;
            border-radius:5px;text-align:center;
            line-height:30px;
            color:#fff;
            z-index:5;
          }
          .speed-title{
            width:100%;height:100%;
          }
          .speed-opt-box{
            width:100%;height:130px;
            position:absolute;left:0;bottom:30px;
            display:none;
             flex-direction: column;
             background:rgba(200,200,200,.7);
          }
          .speed-opt{
           cursor:pointer;
          }
          .speed-opt-active{
             color:orange;
          }
        `
    }
    template(){
        this.html=`
        
          <div class="speed">
             <div class="speed-title">速度</div>
             <div class="speed-opt-box"> 
               <div class="speed-opt"> 
                 0.5
               </div>
               <div class="speed-opt speed-opt-active"> 
                1
               </div>
               <div class="speed-opt"> 
                 1.5
               </div>
               <div class="speed-opt"> 
                 2
               </div>
             </div>
           </div> 
        `
    }

}

class change extends parent{
    constructor(el){
        super(el);
        $(".change").mouseenter(this.show);
        $(".change").mouseleave(this.hide);
        $(".change-opt").click(this.click);
    }
    click(){
        $(".change-opt").removeClass("change-opt-active");
        $(this).addClass("change-opt-active");
        var curr=$("video")[0].currentTime;
        $("video")[0].src=$(this).attr("attr")+".mp4";
        $("video")[0].play();
        $("video")[0].currentTime=curr;

    }

    show(){
        $(".change-opt-box").css("display","flex")
    }
    hide(){
        $(".change-opt-box").css("display","none")
    }


    css(){
        return `
        
          .change{
            width:60px;height:30px;position:relative;
            border:1px solid #000;
            border-radius:5px;text-align:center;
            line-height:30px;
            color:#fff;
            z-index:5;
          }
          .change-title{
            width:100%;height:100%;
          }
          .change-opt-box{
            width:100%;height:100px;
            position:absolute;left:0;bottom:30px;
            display:none;
             flex-direction: column;
             background:rgba(200,200,200,.7);
          }
          .change-opt{
           cursor:pointer;
          }
          .change-opt-active{
             color:orange;
          }
        `
    }
    template(){
        this.html=`
        
          <div class="change">
             <div class="change-title">清晰度</div>
             <div class="change-opt-box"> 
               <div class="change-opt" attr="1080"> 
                 高清
               </div>
               <div class="change-opt change-opt-active" attr="720"> 
                普通
               </div>
               <div class="change-opt" attr="360"> 
                 流畅
               </div>
              
             </div>
           </div> 
        `
    }

}

class screen extends parent{
    constructor(el){
        super(el)
    }
    css(){
        return `
          .screen{
             width:31px;height:31px;
             background:url("/img/full.png")
          }
        `
    }
    template(){
        this.html=`
         <div class="screen"> </div>
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
        new danmuflag(control);
        new speed(control)
        new change(control);
        new screen(control)
        new progress(control);
        this.createCss();
    }

    createCss(){
        $("<style></style>").html(parent.cssText).appendTo("body");
    }
}

new run();


