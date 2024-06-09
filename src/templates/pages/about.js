import axios from 'axios';
import Map from '../components/Map';
import { restBase } from '../../utilities/Utilities'

const restPath = restBase + 'pages/63';

export async function getStaticProps() {
  // Fetch ACF data from your WordPress REST API endpoint
  const res = await axios.get(restPath);
  const data = res.data;

  return {
    props: {
      acfData: data.acf,
    },
  };
}

const AboutPage = ({ acfData }) => {
  const coordinates = [parseFloat(acfData.about_map_latitude), parseFloat(acfData.about_map_longitude)];
  const zoom = parseInt(acfData.about_map_zoom);
  const markers = acfData.about_map_markers.map(marker => ({
    latitude: parseFloat(marker.marker_latitude),
    longitude: parseFloat(marker.marker_longitude),
    description: marker.marker_description,
  }));

  return (
    <div>
      <header>
        <img src={acfData.avatar} alt="Your Avatar" />
        <p>{acfData.introduction_text}</p>
      </header>
      <section>
        <h2>Interesting Facts</h2>
        <div>
          <h3>Personal Facts</h3>
          <ul>
            {acfData.personal_facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Professional Facts</h3>
          <ul>
            {acfData.professional_facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
      </section>
      <section>
        <h2>{acfData.about_map_title}</h2>
        <Map coordinates={coordinates} zoom={zoom} markers={markers} />
      </section>
      <section>
        <button onClick={() => window.location.href='/projects'}>View Projects</button>
        <button onClick={() => window.location.href='/about'}>Learn More About Me</button>
      </section>
    </div>
  );
};

export default AboutPage;
