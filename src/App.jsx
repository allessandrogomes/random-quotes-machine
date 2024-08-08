import { useEffect, useState } from "react"
import './App.scss'
import 'normalize.css'
import { CgTwitter } from "react-icons/cg";
import { FaQuoteLeft } from "react-icons/fa";


function App() {

  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#9b59b6', '#f1c40f']
  const [primaryColor, setPrimaryColor] = useState(colors[0])
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")

  const changeColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    setPrimaryColor(randomColor)
  }

  useEffect(() => {
    document.body.style.setProperty('--primary-color', primaryColor)

    async function getQuote() {
      const endPointAPI = "https://api.quotable.io/random"
      try {
        const response = await fetch(endPointAPI)
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`)
        }

        const json = await response.json()
        setQuote(json.content)
        setAuthor(json.author)
      } catch (error) {
        console.error(error.message)
      }
    }

    getQuote()
  }, [primaryColor])

  return (
    <div className="app" style={{ '--primary-color': primaryColor }}>
      <div id="quote-box">
        <h1 id="text"><FaQuoteLeft /> {quote}</h1>
        <p id="author">- {author}</p>
        <div id="btn-box">
          <a href={`https://www.twitter.com/intent/tweet?text=${quote}`} target="_blank" id="tweet-quote"><CgTwitter/></a>
          <button onClick={changeColor} id="new-quote">New quote</button>
        </div>
      </div>
    </div>
  )
}

export default App
