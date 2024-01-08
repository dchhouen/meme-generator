import React, { useState, useEffect,useRef } from 'react'
import { toPng } from 'html-to-image';
export default function Meme() {
  const [meme, setMemeImage] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/1bgw.jpg"

  })
  const [allMeme, setAllMeme] = useState([])
  const elementRef = useRef(null);

  const downloadMemeImage = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-meme-image.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <button
          onClick={downloadMemeImage}
          className="form--button-2">
          Download this meme image  🖼
        </button>
      <div className="meme" ref={elementRef}>
        <img className="meme--image" src={meme.randomImage} />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}