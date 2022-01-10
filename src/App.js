import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Theme } from './components/Theme';
import { Header, Navigation } from './components';
import { Login, Ranking, SignUp, Top } from './container';
import api from './components/items/api';

function App() {

  const [id, setId] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [isEnter, setIsEnter] = useState(0)

  const changePage = (page) => {
    setPage(page)
  }

  useEffect(() => {
    api.post("authA", { withCredentials: true }).then((response) => {
      console.log(response.data)
      if (response.data.auth) {
        setId(response.data.id)
        setUserName(response.data.username)
        setIsLoggedIn(true)
      }
    })
  }, [])

  const login = (id, name, isEnter) => {
    console.log(id, name, isEnter)
    setId(id)
    setUserName(name)
    setIsEnter(isEnter)
    setIsLoggedIn(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setId(null)
    api.post("logout", { withCredentials: true }).then((response) => {
      console.log(response.data)
    })
  }

  const [page, setPage] = useState("")

  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Header page={page} changePage={changePage} />
        <Switch>
          <Route exact path="/">
            <Top changePage={changePage} id={id} isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/ranking">
            <Ranking changePage={changePage} />
          </Route>
          <Route path="/login">
            <Login login={login} />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
        <Navigation page={page} changePage={changePage} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
