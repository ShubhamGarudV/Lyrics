const form=document.getElementById('form');
const search=document.getElementById('search');
const output=document.getElementById('output');

const apiURl="https://api.lyrics.ovh";

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let searchvalue=search.value.trim();
    // console.log(searchvalue);
    if(!searchvalue)
    {
        alert("Enter something");
    }
    else{
        searchSong(searchvalue);
    }
});

async function searchSong(searchvalue)
{
    const searchresult=await fetch(`${apiURl}/suggest/${searchvalue}`)
    const data=await searchresult.json();
    console.log(data);
    showData(data);

}
function showData(data)
{
    output.innerHTML=`
    <ul class="songlist">
    ${data.data.map((song=>`<li>
                            <div>
                               <strong>${song.artist.name}</strong>-${song.title}  
                            <div>
                            <span data-artist="${song.artist.name}" data-songtitle="${song.title}"> Get lyrics
                            </span>
                            </li>`
    ))
    .join('')}
    </ul>
    `;
}
// data-artist="${song.artist.name}" data-songtitle="${song.title}"
output.addEventListener('click',(e)=>{
    const clickedElement=e.target;
    if(clickedElement.tagName ==='SPAN')
    {
        const artist=clickedElement.getAttribute('data-artist');
        const songtitle=clickedElement.getAttribute('data-songtitle');
        getLyrics(artist,songtitle);
    }
})
async function getLyrics(artist,songtitle)
{
    // alert(artist,songtitle);
    const res=await fetch(`${apiURl}/v1/${artist}/${songtitle}`);
    const data=await res.json();
 const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    output.innerHTML = `<h2><strong>${artist}</strong> - ${songtitle}</h2>
    <p>${lyrics}</p>`;

}