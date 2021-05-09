const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled
}

const apiKey = 'c671dea7e4f04fb4ae77ac22ada6dd52'

//Passing Joke to VoiceRSS API
function tellMeJoke(joke) {
    VoiceRSS.speech({
        key: apiKey,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Joke from Joke API
async function getJoke() {
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any';
    let joke = '';
    try {
        const response = await fetch(apiUrl);
        const jokesArray = await response.json();
        joke = jokesArray.setup ? `${jokesArray.setup} ... ${jokesArray.delivery}` : jokesArray.joke;
        // Text-to-Speech
        tellMeJoke(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        console.log('ayayay', error)
    }
}

// Event Listeners
button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);