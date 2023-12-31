
       
        let now_playing = document.querySelector(".now-playing");
        let track_art = document.querySelector(".track-art");
        let track_name = document.querySelector(".track-name");
        let track_artist = document.querySelector(".track-artist");
        
        let playpause_btn = document.querySelector(".playpause-track");
        let next_btn = document.querySelector(".next-track");
        let prev_btn = document.querySelector(".prev-track");
        
        let seek_slider = document.querySelector(".seek_slider");
        let volume_slider = document.querySelector(".volume_slider");
        let curr_time = document.querySelector(".current-time");
        let total_duration = document.querySelector(".total-duration");
        
        let track_index = 0;
        let isPlaying = false;
        let updateTimer;
        
        // Create new audio element
        let curr_track = document.createElement('audio');
        
        // Define the tracks that have to be played
        let track_list = [
          {
            name: "Unstoppable",
            artist: "Sia",
            image: "https://i.etsystatic.com/13970207/r/il/5e927e/3147858200/il_fullxfull.3147858200_1em9.jpg",
            path: "unstoppable.mp3"
          },
          {
            name: "Fearless",
            artist: "Lost Sky",
            image: "https://images.genius.com/e66ecf4e0bb787d0a1ad87a4e1f6af9e.1000x1000x1.jpg",
            path: "fearless.mp3"
          },
          {
            name: "Badass",
            artist: "Anirudh Ravichandhar",
            image: "https://th.bing.com/th/id/OIP.TSySdOXQPNPk2IRBKaKjywHaEK?pid=ImgDet&rs=1",
            path: "badass.mp3",
          },
          {
            name: "Nira",
            artist: "Sid Sriram",
            image: "https://www.behindwoods.com/tamil-movies-cinema-news-16/images/siddharth-takkar-nira-song-by-sid-sriram-gautham-menon-music-review-photos-pictures-stills-1.jpg",
            path: "Nira-MassTamilan.io.mp3",
          },
          {
            name: "Way down we go",
            artist: "Kaleo",
            image: "https://th.bing.com/th/id/OIP.PmU4tujKr5LVFkB65L-s6gHaKb?pid=ImgDet&w=588&h=828&rs=1",
            path: "way down we go.mp3",
          },
          {
            name: "Industry Baby",
            artist: "Lil Nas X",
            image: "https://th.bing.com/th/id/OIP.YoM4nMHUn4xcMsOTllIuPwHaHa?pid=ImgDet&rs=1",
            path: "Industry Baby.mp3",
          },
          {
            name: "Animals",
            artist: "Maroon 5",
            image: "https://upload.wikimedia.org/wikipedia/en/3/38/Maroon_5_-_Animals_Single_Cover.png",
            path: "🎵 Maroon 5 - Animals Ft J.Cole (Pixl Remix) Thanks For 10,000 Views 🐱 (1).mp3",
          },
          {
            name: "Sundari",
            artist: "SPB & Janaki",
            image: "https://1.bp.blogspot.com/-EXyKk4FP5hc/VwEl4FOHa6I/AAAAAAAAAu0/cp18_i6Y6PM9S007As-EPPC0CaKHqF9aA/s1600/SUNDARI%2BKANNAL%2BORU%2B%2BSONG%2BLYRICS%2B-%2BTHALAPATHI.jpg",
            path: "Sundari.mp3",
          },
          {
            name: "On My Way",
            artist: "Alan Walker",
            image: "https://th.bing.com/th/id/OIP.dKVe-PGxSkMI3Po75hRy7wAAAA?pid=ImgDet&rs=1",
            path: "AlanWalkerOnMyWay.mp3",
          },
          {
            name: "Daylight",
            artist: "David Khushner",
            image: "https://upload.wikimedia.org/wikipedia/en/1/1e/David_Kushner-_Daylight.png",
            path: "Daylight.mp3",
          },
        ];
        
        function loadTrack(track_index) {
          clearInterval(updateTimer);
          resetValues();
        
          // Load a new track
          curr_track.src = track_list[track_index].path;
          curr_track.load();
        
          // Update details of the track
          track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
          track_name.textContent = track_list[track_index].name;
          track_artist.textContent = track_list[track_index].artist;
          now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;
        
          // Set an interval of 1000 milliseconds for updating the seek slider
          updateTimer = setInterval(seekUpdate, 1000);
        
          // Move to the next track if the current one finishes playing
          curr_track.addEventListener("ended", nextTrack);
        
          // Apply a random background color
          random_bg_color();
        }
        
        function random_bg_color() {
        
          // Get a random number between 64 to 256 (for getting lighter colors)
          let red = Math.floor(Math.random() * 256) + 64;
          let green = Math.floor(Math.random() * 256) + 64;
          let blue = Math.floor(Math.random() * 256) + 64;
        
          // Construct a color withe the given values
          let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
        
          // Set the background to that color
          document.body.style.background = bgColor;
        }
        
        // Reset Values
        function resetValues() {
          curr_time.textContent = "00:00";
          total_duration.textContent = "00:00";
          seek_slider.value = 0;
        }
        
        function playpauseTrack() {
          if (!isPlaying) playTrack();
          else pauseTrack();
        }
        
        function playTrack() {
          curr_track.play();
          isPlaying = true;
        
          // Replace icon with the pause icon
          playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
        
        function pauseTrack() {
          curr_track.pause();
          isPlaying = false;
        
          // Replace icon with the play icon
          playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
        }
        
        function nextTrack() {
          if (track_index < track_list.length - 1)
            track_index += 1;
          else track_index = 0;
          loadTrack(track_index);
          playTrack();
        }
        
        function prevTrack() {
          if (track_index > 0)
            track_index -= 1;
          else track_index = track_list.length;
          loadTrack(track_index);
          playTrack();
        }
        
        function seekTo() {
          seekto = curr_track.duration * (seek_slider.value / 100);
          curr_track.currentTime = seekto;
        }
        
        function setVolume() {
          curr_track.volume = volume_slider.value / 100;
        }
        
        function seekUpdate() {
          let seekPosition = 0;
        
          // Check if the current track duration is a legible number
          if (!isNaN(curr_track.duration)) {
            seekPosition = curr_track.currentTime * (100 / curr_track.duration);
            seek_slider.value = seekPosition;
        
            // Calculate the time left and the total duration
            let currentMinutes = Math.floor(curr_track.currentTime / 60);
            let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(curr_track.duration / 60);
            let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
        
            // Adding a zero to the single digit time values
            if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
            if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
            if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
            if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        
            curr_time.textContent = currentMinutes + ":" + currentSeconds;
            total_duration.textContent = durationMinutes + ":" + durationSeconds;

          }
        }
        
        // Load the first track in the tracklist
        loadTrack(track_index);

        