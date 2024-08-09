import { useEffect, useState } from "react"
import './App.scss'
import 'normalize.css'
import { CgTwitter } from "react-icons/cg";
import { FaQuoteLeft } from "react-icons/fa";


function App() {

  const colors = [
    '#3498db', // Azul
    '#2ecc71', // Verde
    '#9b59b6', // Roxo
    '#1abc9c', // Verde água
    '#34495e', // Azul escuro
    '#2980b9', // Azul vibrante
    '#27ae60', // Verde escuro
    '#8e44ad', // Roxo escuro
    '#16a085', // Verde petróleo
    '#2c3e50', // Azul profundo
    '#3b5998', // Azul Facebook
    '#5d6d7e', // Azul cinza
    '#6c3483', // Roxo suave
    '#48c9b0', // Verde claro
    '#6a89cc'  // Azul claro
  ]
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
      <h1 id="title">Random Quotes Machine</h1>
      <div id="quote-box">
        <div id="group-box">
          <h2 id="text"><FaQuoteLeft /> {quote}</h2>
          <p id="author">- {author}</p>
          <div id="btn-box">
            <a href={`https://www.twitter.com/intent/tweet?text=${quote}`} target="_blank" id="tweet-quote"><CgTwitter /></a>
            <button onClick={changeColor} id="new-quote">New quote</button>
          </div>
        </div>
      </div>
      <a href="https://github.com/allessandrogomes/random-quotes-machine" target="_blank" id="by-text">by Alessandro Gomes</a>
    </div>
  )
}

export default App
