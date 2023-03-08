import "../styles/Home.css";
import Autocomplete from "./Autocomplete";
import LogInForm from "./LogInForm";

function Home() {
  return (
    <>
      <section className="central-area">
        <div className="search-area">
          <h1 className="brand-font">
            <span>Booker,</span>
            <br></br> are you ready?
          </h1>
          <Autocomplete />
        </div>
      </section>
      <section className="right-area">
        <LogInForm />
      </section>
    </>
  );
}
export default Home;
