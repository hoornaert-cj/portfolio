import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'

const Home = () => {
    const restPath = restBase + 'pages/9'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

    return (
        <>
        { isLoaded ?
            <article id={`post-${restData.id}`}>
                <h1>{restData.title.rendered}</h1>
                <div className="entry-content">
                <section className="home-header">
                {restData.acf && restData.acf.home_header_image && (
                <img
                src={restData.acf.home_header_image.url}
                alt={restData.acf.home_header_image.alt}
                width="500px"
                height="300px"
                />
            )}
            <h2>{restData.acf.home_name}</h2>
            </section>
             <section className='quote-section'>
                <blockquote>{restData.acf.main_quote}</blockquote>
                <a href={restData.acf.main_quote_link} target={restData.acf.main_quote_link_target}>
                <p>Click here for more Quotes</p>
                </a>
                </section>

                </div>
            </article>
        :
            <Loading />
        }
        </>
    )
}

export default Home
