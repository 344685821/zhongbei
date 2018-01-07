var ffmpeg = require('fluent-ffmpeg');
ffmpeg('./public/1080.mp4').screenshots({
    folder:"./public/img",
    filename:"screen.png",
    timestamps:["30%","50%"],
    size:"100x100"
})
/*
ffmpeg('./public/video1.mp4').size('720x?').save("./public/720.mp4");
ffmpeg('./public/video1.mp4').size('360x?').save("./public/360.mp4");
*/

