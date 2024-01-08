import React, { useState, useEffect } from 'react'

export default function Meme() {
  const [meme, setMemeImage] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/1bij.jpg"

  })
  const [allMeme, setAllMeme] = useState([])

  useEffect(function () {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMeme(data.data.memes))
  }, [])


  function getMemeImage() {
    const memesArray = allMeme
    const randomNumber = Math.floor(Math.random() * memesArray.length)
    const url = memesArray[randomNumber].url
    setMemeImage(prevMeme => ({
      ...prevMeme,
      randomImage: url
    }))
  }

  function handleChange(event) {
    const { name, value, type } = event.target
    setMemeImage(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  return (
    <main>
      <div className="form">
        {/* <label className="form--label">Top text</label> */}
        <input
          type="text"
          className="form--input"
          placeholder="Shut up"
          value={meme.topText}
          name="topText"
          onChange={handleChange}
        />
        {/* <label className="form--label">Bottom text</label> */}
        <input
          type="text"
          className="form--input"
          placeholder="And take my Money"
          value={meme.bottomText}
          name="bottomText"
          onChange={handleChange}
        />
        <button
          onClick={getMemeImage}
          className="form--button">
          Get a new meme image  🖼
        </button>
      </div>
      <div className="meme">
        <img className="meme--image" src={meme.randomImage} />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}