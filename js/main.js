// API Key from https://api.nasa.gov/
const API_KEY = 'DEMO_KEY';

const getAPOD = async (date) => {
  try {
    const url = date ? `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}` : `https://api.nasa.gov/planetary/apod?thumbs=true&api_key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if(data && !data.code){
      if(data.media_type === "video"){
        document.querySelector('iframe').src = data.url;
        document.querySelector('iframe').classList.remove('hidden');
        document.querySelector('#apod').classList.add('hidden');
      }else if(data.media_type === "image"){
        document.querySelector('#apod').src = data.url;
        document.querySelector('#apod').alt = data.title;
        document.querySelector('iframe').classList.add('hidden');
        document.querySelector('#apod').classList.remove('hidden');
      }
      document.querySelector('#title').innerText = data.title;
      document.querySelector('#imageDate').innerText = data.date;
      document.querySelector('#desc').innerText = data.explanation;
    }
  } catch (err) {
    console.log(err);
  }
}

document.querySelector('#date').valueAsDate = new Date();
document.querySelector('#date').addEventListener('change', (e) => {
  getAPOD(e.currentTarget.value);
})

getAPOD();