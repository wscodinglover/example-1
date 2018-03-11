import App from './app'
import List from './list'
import Game from './games'



const routes = {
    path: '/',
    // component: App,
    childRoutes: [
      List ,
      Game ,
    ]
  }

  export default routes