import React from 'react';
import { Component } from 'react';
import { Category } from '../../enums/Category';
import { Container, List, MapContainer, Result } from './Products.style';
import { RangeModifier } from 'react-day-picker';
import Listing from './components/listing/Listing';
import { AxiosRequestConfig } from 'axios';
import { Filter } from '../../enums/Filter';
import { Product } from '../../models/Product';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import FiltersComponent from './components/Filters';
import GoogleMapReact from 'google-map-react';
import AxiosHandler from '../../shared/AxiosHandler';
import NoResult from '../../shared/noResult/NoResult';
import Loading from '../../shared/loading/Loading';
import LinkMapMarker from '../../shared/map/LinkMapMarker';
import Translator from '../../shared/translations/Translator';

interface Props extends RouteComponentProps {
  appRef: React.RefObject<HTMLDivElement>;
}

interface State {
  products: Product[];
  activeFilter: Filter;
  hoveredProduct: string;
  category: Category;
  types: Set<string>;
  guests: number;
  bedrooms: number;
  lat: number | null;
  lng: number | null;
  date: RangeModifier;
  price: number[];
  mobilityFriendly: boolean;
  loading: boolean;
}

class Products extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      products: [],
      activeFilter: Filter.None,
      lat: null,
      lng: null,
      category: Category.Home,
      types: new Set(),
      date: {
        from: null,
        to: null,
      },
      price: [this.DEFAULT_PRICE_MIN, this.DEFAULT_PRICE_MAX],
      guests: 0,
      bedrooms: 0,
      mobilityFriendly: false,
      hoveredProduct: '',
      loading: true,
    };

    this.filterRef = React.createRef<HTMLDivElement>();
    this.onRouteChanged = this.onRouteChanged.bind(this);
  }

  filterRef: React.RefObject<HTMLDivElement>;

  readonly DEFAULT_PRICE_MIN = 0;
  readonly DEFAULT_PRICE_MAX = 1000;

  componentDidMount() {
    this.onRouteChanged();
  }

  onRouteChanged() {
    this.setState({ loading: true });
    const searchParams = new URLSearchParams(this.props.location.search);

    let lat = null;
    let lng = null;

    if (searchParams.get('lat') && searchParams.get('lng')) {
      lat = parseFloat(searchParams.get('lat') as string);
      lng = parseFloat(searchParams.get('lng') as string);
    }

    const category = searchParams.get('category');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const min = searchParams.get('min');
    const max = searchParams.get('max');
    const types = searchParams.get('types');
    const guests = searchParams.get('guests');
    const bedrooms = searchParams.get('bedrooms');
    const mobilityFriendly = searchParams.get('mobilityFriendly');
    this.setState({
      lat,
      lng,
      category: category ? (category as Category) : Category.Home,
      types: types ? new Set(types.split(',')) : new Set(),
      date: {
        from: from ? new Date(from) : null,
        to: to ? new Date(to) : null,
      },
      price: [
        min ? parseInt(min) : this.DEFAULT_PRICE_MIN,
        max ? parseInt(max) : this.DEFAULT_PRICE_MAX,
      ],
      guests: guests ? parseInt(guests) : 0,
      bedrooms: bedrooms ? parseInt(bedrooms) : 0,
      mobilityFriendly: mobilityFriendly === 'true' ? true : false,
    });

    const config: AxiosRequestConfig = {
      params: {
        lat,
        lng,
        category,
        from,
        to,
        min,
        max,
        types: types?.split(','),
        guests,
        bedrooms,
        mobilityFriendly,
      },
    };

    AxiosHandler.get(`/get/products`, config)
      .then((res) => {
        if (res) {
          const products: Product[] = res.data;

          this.setState({
            products,
          });
        }
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.location.search !== prevProps.location.search) {
      this.onRouteChanged();
    }
  }

  getListingURL(product: Product) {
    const { from, to } = this.state.date;
    let searchParams = `?category=${product.category}`;
    if (from) {
      searchParams += `&from=${from.toISOString().split('T')[0]}`;
    }

    if (to && from) {
      searchParams +=
        product.category === Category.Home
          ? `&to=${to.toISOString().split('T')[0]}`
          : `&from=${from.toISOString().split('T')[0]}`;
    }

    return `/products/${product._id}${searchParams}`;
  }

  render() {
    const { products, hoveredProduct, lat, lng, loading } = this.state;
    const text = Translator.getProductsText();
    return (
      <Container>
        <FiltersComponent appRef={this.props.appRef} lat={lat} lng={lng} />
        <Result>
          {loading && <Loading type="bubbles" />}

          {!loading && (
            <List>
              {products.length === 0 ? (
                <NoResult message={text.noResult}></NoResult>
              ) : (
                products.map((product: Product) => (
                  <div
                    key={product._id}
                    onMouseEnter={() =>
                      this.setState({ hoveredProduct: product._id })
                    }
                    onMouseLeave={() => this.setState({ hoveredProduct: '' })}
                  >
                    <Listing
                      product={product}
                      url={this.getListingURL(product)}
                      hovered={product._id === hoveredProduct}
                    ></Listing>
                  </div>
                ))
              )}
            </List>
          )}
          {lat !== null && lng !== null && (
            <MapContainer>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: 'AIzaSyAISTnlb1x6zOX5PHw3IfMaOBdWwx40TcU',
                }}
                center={{ lat, lng }}
                defaultZoom={10}
              >
                {products.map((product: Product) => (
                  <LinkMapMarker
                    key={product._id}
                    url={this.getListingURL(product)}
                    lat={product.location.coordinates[1]}
                    lng={product.location.coordinates[0]}
                    category={product.category}
                    hovered={product._id === hoveredProduct}
                    onMouseEnter={() =>
                      this.setState({ hoveredProduct: product._id })
                    }
                    onMouseLeave={() => this.setState({ hoveredProduct: '' })}
                  ></LinkMapMarker>
                ))}
              </GoogleMapReact>
            </MapContainer>
          )}
        </Result>
      </Container>
    );
  }
}

export default withRouter(Products);
