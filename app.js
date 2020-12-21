const app = () => {
    const song = document.querySelector(".song")
    const play = document.querySelector(".play")
    const outline = document.querySelector(".moving-outline circle")
    const video = document.querySelector(".vid-container video")

    //Sounds
    const sounds = document.querySelectorAll(".sound-picker button")
    //Time Display
    const timeDisplay = document.querySelector(".time-display")
    const timeSelect = document.querySelectorAll(".time-select button")
    //Get the length of the outline
    const outlineLength = outline.getTotalLength()
    //Duration
    let fakeDuration = 600

    outline.style.strokeDasharray = outlineLength
    outline.style.strokeDashoffset = outlineLength

    //Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener("click", function(){
            song.src = this.getAttribute("data-sound")
            video.src = this.getAttribute("data-video")
            checkPLaying(song)
        })
    })

    //play sound
    play.addEventListener("click", () =>{
       checkPLaying(song)
    }) 


    //Selet sound
    timeSelect.forEach(option =>{
        option.addEventListener("click", function(){
            fakeDuration = this.getAttribute("data-time")
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
                fakeDuration % 60

              )}`

        })
    })
    

    //create a function specific to stop and play the sounds
    const checkPLaying = song =>{
        if(song.paused){
            song.play()
            video.play()
            play.scr = "./svg/pause.svg"
        }else {
            song.pause()
            video.pause()
            play.scr = "./svg/play.svg"
        }
    }

    //We can animated the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime
        let elasped = fakeDuration - currentTime
        let seconds = Math.floor(elasped % 60)
        let minutes = Math.floor(elasped / 60)

        //Animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
        outline.style.strokeDashoffset = progress
        //Animate the text 
        timeDisplay.textContent = `${minutes}:${seconds}`
        
        if(currentTime >= fakeDuration){
            song.pause()
            song.currentTime = 0
            play.scr = "./svg/play.svg"
            video.pause()
        }
    }
}


app()