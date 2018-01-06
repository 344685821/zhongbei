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
           parent.cssText+=this.css;
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
    template() {
      this.html=   `
      <video src="/video1.mp4"> </video>
    `
    }

}

class controls extends parent{
    constructor(el){
      super(el);
    }
    css(){
        return `
          .controls{
            width:100%;height:50px;
            position:absolute;left:0;bottom:0;
            background:rgba(200,200,200,.6);
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
            background:url("/img/play.png");
          }
        `
    }
    template(){
        this.html=`
          <div class="playBtn"> </div>
        `
    }
}


class run{
    constructor(){
        new video();
        var control=new controls().dom;
        new play(control)
        this.createCss();
    }
    createCss(){
        $("<style></style>").html(parent.cssText).appendTo("body");
    }
}

new run();


