import './App.css'
import Navbar from './Components/Navbar'
import Card from './Components/Card'
import Footer from './Components/Footer';

function App() {

  return (
    <>
      <Navbar />
      <section className="title font-bold mb-11 pointer-events-none">
        <h1 className='mb-4'>Three.js Journey</h1>
        <h3>Archiving and tracking my progress</h3>
      </section>
      <Card />
      <Footer />
    </>
  )
}

export default App
