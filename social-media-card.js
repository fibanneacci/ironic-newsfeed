import React from 'react'
import { Col } from 'react-grid-system'
import CardStyles from './card.module.scss'

var sample = "A few months ago, one of my close friends sent me an article titled \"how to do nothing\". In it, author Jenny Odell describes how a new hobby of birdwatching \"changed the granularity of [her] perception\", because to her, what was previously only \"birdsong\" became a collection of different sounds made by different birds. In other words, \"one thing became [multiple]\", and her relatively \"low-resolution\" worldview grew sharper. But I think we all share the potential to pay closer attention. As Odell mentions in her article, modern media values connections built upon primitive signaling rather than true empathy. But by really listening to each other's richly diverse stories, we can begin to comprehend the complexity of human experience; in doing so, we can make better sense of ourselves and the events around us, and recognize our power to change them. This pandemic has made it clearer than ever: nothing happens in a vacuum. Individuals can influence large-scale outcomes, hopefully for the better."
var clean = []

// Clean input
var cleanWords = sample.split(" ")
for (let i = 0; i < cleanWords.length; i++) {
    cleanWords[i] = cleanWords[i].replace(/\W+/g, "")
    cleanWords[i] = cleanWords[i].toLowerCase()
    clean.push(cleanWords[i])
}

// Create map for Markov, each M word(s) and their possible "next" M words
var map = new Map()
var M = 1
for (let i = 0; i < clean.length - M; i++) {
    let cur = ""
    let next = ""
    for (let j = 0; j < M - 1; j++) {
        cur += clean[i + j] + " "
        next += clean[i + j + 1] + " "
    }
    cur += clean[i + M - 1]
    next += clean[i + M]

    if (!map.has(cur)) {
        map.set(cur, [])
    }
    map.get(cur).push(next)
}
var keys = Array.from(map.keys())

function generatePhrase() {
    // Get random starting word
    var markov = [keys[Math.floor(Math.random() * keys.length)]];

    // Complete Markov chain, stopping at between one and four words or ending sequence (whichever first)
    for (let i = 0; i < Math.floor(Math.random() * 4); i++) {
        let cur = markov[markov.length - 1]
        if (!map.has(cur)) break
        markov.push(map.get(cur)[Math.floor(Math.random() * map.get(cur).length)])
    }

    return markov.join(" ")
}

var emojis = ["🐢", "🐥", "🤪", "🤠", "🥳", "🥺", "🥰", "😴", "🥱", "🍜"]
function generateEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)]
}

class SocialMediaCard extends React.Component {
    updateLike(e) {
        document.getElementsByClassName('likes-label')[e._reactInternalFiber.key].innerHTML =
        parseInt(document.getElementsByClassName('likes-label')[e._reactInternalFiber.key].innerHTML) + 1
    }

    render() {
        return (
            <Col className='indiv'>
                <div className={CardStyles.redCard}>
                    <div style={{ height: `215px`, display: `flex`, flexDirection: `column` }}>
                        <p style={{ width: `225px`, fontSize: `5rem`, marginTop: `auto`, marginBottom: `auto`, textAlign: `center` }}>{generateEmoji()}</p>
                    </div>
                    <div style={{ height: `85px` }}>
                        <p style={{ color: `#FFFFFF`, fontSize: `0.85rem`, margin: `10px 15px 15px 15px`, overflow: `hidden` }}>
                            <b>{generatePhrase()}</b>
                            <br />
                        </p>
                    </div>
                </div>
                <div style={{ margin: `-30px 0 12.5px 0`, display: `flex`, flexDirection: `row` }}>
                    <button onClick={() => this.updateLike(this)} style={{ height: `1.9rem`, cursor: `pointer` }}>
                        ❤️
                    </button>
                    <p className='likes-label' style={{ fontSize: `2rem`, padding: `2.5px 0 2.5px 20px` }}>
                        0
                    </p>
                </div>
            </Col>
        );
    }
}

export default SocialMediaCard
