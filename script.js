const quoteContainer=document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader=document.getElementById('loader')


//show loading spinner
function showLoadingSpinner(){
    loader.hidden=false
    quoteContainer.hidden=true
}

//hide loading spinner
function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden=false
        loader.hidden=true
    }
}

let counter=0

//get quote from API
async function getQuote(){
    showLoadingSpinner() //start loading animation
    const proxyURL='https://cors-anywhere.herokuapp.com/'
    const apiURL ='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response=await fetch(proxyURL + apiURL)
        const data=await response.json()
        // console.log(data)
        if(data.quoteAuthor===''){
            authorText.innerText='Unknown'
        }else{
            authorText.innerText = data.quoteAuthor
        }

        //reduce size for long quotes
        if(data.quoteText.length>50){
            quoteText.classList.add('long-quote')
        }else{
            quoteText.classList.remove('long-quote')
        }
       
        quoteText.innerText=data.quoteText

 
        removeLoadingSpinner() //stop loading and show quote
        
    } catch (error) {
        counter++
        if(counter>10){
            console.log('something is very very wrong. exiting.....')
            return
        }
        getQuote() //there is bug with the API so we run the function again if a token error exists
        console.log('Uh ohsomething went wrong😅',error)
    }

}


function tweetQuote(){
    const quote=quoteText.innerText
    const author=authorText.innerText
    const twitterURL=`https://twitter.com/intent/tweet?text=${quote}-${author}`
    window.open(twitterURL,'_blank')
}


//event listeners
newQuoteBtn.addEventListener('click',getQuote)
twitterBtn.addEventListener('click', tweetQuote)

//on loads
getQuote()