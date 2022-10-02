const searchBox = document.getElementById("search-box");

const displayValue = () => {
    const searchText = searchBox.value
    fetch(`https://api.lyrics.ovh/suggest/${searchText}`)
        .then(res => res.json())
        .then(data => displaySong(data.data))
}

const displaySong = songs => {
    console.log(songs)
    const mainDiv = document.getElementById("main-div");
    mainDiv.innerHTML = ' ';
    songs.forEach(song => {
        const div = document.createElement("div");
        div.className = "single-result row align-items-center my-3 p-3";
        div.innerHTML = `
                <div class="col-md-9">
                    <h3 class="lyrics-name">${song.title}</h3>
                    <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                    </audio controls>

                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                </div>
          
              `;
        mainDiv.appendChild(div);
    })

}

const getLyrics = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.lyrics))
        .catch(error => console.log(error))

}

const displayLyrics = (lyrics) => {
    const lyricsText = document.getElementById("lyrics-text");
    lyricsText.innerText = lyrics;
}