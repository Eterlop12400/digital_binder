import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from "react-router-dom";

// Import Components
import Routes from "./components/Routes";
import SideNav from "./components/SideNav";

// Import Pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
    let loggedIn = localStorage.getItem('login');

    if (loggedIn === null) {
        return (
            <Router>
                <Login/>
            </Router>
        )
    } else if (loggedIn === 'signup') {
        return (
            <Router>
                <SignUp />
            </Router>
            )
    }

  return (
      <Router>
          <main style={styles.main}>
              <aside style={styles.nav}>
                  <SideNav />
              </aside>
              <section style={styles.mainContent}>
                  <Routes />
              </section>
          </main>
      </Router>
  );
}

export default App;

const styles = {
    main: {
        display: "flex",
        minHeight: '100vh',
        margin: '0',
    },
    nav: {
        minWidth: '300px',
        width: '20%',
        backgroundColor: "#001D3D",
    },
    mainContent: {
        width: '80%',
        background: 'linear-gradient(0deg, rgba(255,246,217,1) 0%, rgba(247,247,247,1) 100%)',
    },
}