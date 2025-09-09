
import './globals.css';

import Footer from "../components/footer/footer";


const Home: React.FC = () => {
  return (
    
     <div className="relative">
  <img
    src="/Biomedical.jpg"
    alt="Background"
    className="float-right  object-bottom h-80 object-cover ml-4 mb-4 rounded"
  />
  
  <section className="p-8 bg-white dark:bg-zinc-900 text-black dark:text-white">
    <h1 className="text-3xl font-bold mb-4">Benvenuto su My Bio History</h1>
    <p className="mb-2">La tua storia, la tua biografia, il tuo mondo.</p>
    <p className="mb-2">
      Scopri di più su di noi e su come possiamo aiutarti a raccontare la tua storia.
    </p>
    <p className="mb-2">Contattaci per maggiori informazioni.</p>
    <p className="mb-2">Inizia il tuo viaggio con noi!</p>
    <p className="mb-2">TESTING.............</p>
    <p className="mb-2">TESTING.............</p>
    <p className="mb-2">TESTING.............</p>
    <p>TESTING.............</p>
  </section>
</div>
  );
};

export default Home;
