import About from './pages/about/About';
import Account from './pages/account/Account';
import Home from './pages/home/Home';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import { Router, Route, Switch } from 'react-router-dom';
import Payment from './pages/payment/Payment';
import SuccessPayment from './pages/successPayment/SuccessPayment';
import styled from 'styled-components';
import Footer from './layout/footer/Footer';
import NavBar from './layout/navbar/NavBar';
import ProductDescription from './pages/productDescription/ProductDescription';
import Products from './pages/products/Products';
import { RefObject, createRef, Component } from 'react';
import { createBrowserHistory } from 'history';
import { Routes } from './enums/Routes';
import CreateProduct from './pages/createProduct/CreateProduct';
import Refund from './pages/refund/Refund';
import { Category } from './enums/Category';
import EditProduct from './pages/editProduct/EditProduct';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import MyRentals from './pages/myRentals/MyRentals';
import BecomeHost from './pages/becomeHost/BecomeHost';
import Historic from './pages/historic/Historic';
import GovDue from './pages/govDue/GovDue';
import SuccessRefund from './pages/successRefund/SuccessRefund';
import PrivateRoute from './shared/PrivateRoute';
import Booking from './pages/booking/Booking';
import OwnerRefund from './pages/ownerRefund/OwnerRefund';
import NotFoundPage from './pages/notFound/NotFoundPage';
import AdminRoute from './shared/AdminRoute';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Page = styled.div`
  height: 100%;
`;

interface Props {}

interface State {}

class App extends Component<Props, State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  constructor(props: Props) {
    super(props);
    this.setURL = this.setURL.bind(this);

    this.setCurrentPosition = this.setCurrentPosition.bind(this);
  }

  appRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
  position: number[] = [];
  history = createBrowserHistory();
  geocoder = new google.maps.Geocoder();

  setURL(place: google.maps.places.PlaceResult) {
    const searchParams = new URLSearchParams(this.history.location.search);
    searchParams.set('lat', place.geometry!.location!.lat().toString());
    searchParams.set('lng', place.geometry!.location!.lng().toString());

    if (this.history.location.pathname !== '/products')
      searchParams.set('category', Category.Home);

    this.history.push({
      pathname: '/products',
      search: searchParams.toString(),
    });
  }

  setCurrentPosition(position: GeolocationPosition) {
    const coords = position.coords;

    this.position[0] = coords.latitude;
    this.position[1] = coords.longitude;
  }

  render() {
    return (
      <Router history={this.history}>
        <LanguageProvider render={this.setState.bind(this)}>
          <AuthProvider render={this.setState.bind(this)}>
            <NavBar onSearchDestination={this.setURL} />
            <Container ref={this.appRef}>
              <Page>
                <Switch>
                  <Route
                    path={Routes.Home}
                    exact
                    render={() => <Home appRef={this.appRef} />}
                  />
                  <Route path={Routes.About} component={About}></Route>
                  <PrivateRoute
                    path={Routes.Account}
                    component={Account}
                  ></PrivateRoute>
                  <PrivateRoute
                    path={Routes.MyRentals}
                    component={MyRentals}
                  ></PrivateRoute>
                  <PrivateRoute
                    path={Routes.Booking}
                    component={Booking}
                  ></PrivateRoute>
                  <Route path={Routes.SignIn} component={SignIn}></Route>
                  <Route path={Routes.SignUp} component={SignUp}></Route>
                  <PrivateRoute
                    path={Routes.Refund}
                    component={Refund}
                  ></PrivateRoute>
                  <AdminRoute
                    path={Routes.GovDue}
                    component={GovDue}
                  ></AdminRoute>
                  <PrivateRoute
                    path={Routes.SuccessRefund}
                    component={SuccessRefund}
                  ></PrivateRoute>
                  <PrivateRoute
                    path={Routes.OwnerRefund}
                    component={OwnerRefund}
                  ></PrivateRoute>
                  <PrivateRoute
                    path={Routes.Historic}
                    component={Historic}
                  ></PrivateRoute>
                  <PrivateRoute
                    path={Routes.SuccessPayment}
                    component={SuccessPayment}
                  ></PrivateRoute>
                  <Route
                    path={Routes.ForgotPassword}
                    component={ForgotPassword}
                  ></Route>
                  <Route path={Routes.Payment} component={Payment}></Route>
                  <Route
                    path={Routes.Products}
                    exact
                    render={() => <Products appRef={this.appRef} />}
                  />
                  <Route path={Routes.Product} component={ProductDescription} />
                  <PrivateRoute
                    path={Routes.CreateProduct}
                    component={CreateProduct}
                  ></PrivateRoute>
                  <PrivateRoute
                    path={Routes.BecomeHost}
                    component={BecomeHost}
                  ></PrivateRoute>
                  <PrivateRoute
                    path={Routes.EditProduct}
                    component={EditProduct}
                  />
                  <Route component={NotFoundPage} />
                </Switch>
              </Page>
              <Footer />
            </Container>
          </AuthProvider>
        </LanguageProvider>
      </Router>
    );
  }
}

export default App;
