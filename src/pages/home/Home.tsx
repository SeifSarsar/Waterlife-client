import { AiOutlineArrowRight } from "react-icons/ai";
import { Category } from "../../enums/Category";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../enums/Routes";
import SearchDestination from "../../shared/inputs/SearchDestination";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Translator from "../../shared/translations/Translator";
import {
  AboutLink,
  Category as CategoryStyling,
  CategoriesContainer,
  Container,
  DestinationContainer,
  ImgCategory,
  ImgSlogan,
  SearchContainer,
  Slogan,
} from "./Home.style";
import { BoatType, SmallBoatType } from "../../enums/Type";
import FiltersComponent from "../products/components/Filters"

const NavigationLinkStyle = {
  textDecoration: "none",
  cursor: "default",
};

interface Props extends RouteComponentProps {
  appRef: React.RefObject<HTMLDivElement>;
}
interface State {
  lat: number | null;
  lng: number | null;
}

class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      lat: null,
      lng: null,
    };

    this.setLocation = this.setLocation.bind(this);
  }

  async search(category?: Category, types?: Set<string>) {
    const searchParams = new URLSearchParams(this.props.location.search);

    if (category) searchParams.set("category", category);
    if (types) searchParams.set("types", Array.from(types).join(","));

    this.props.history.push({
      pathname: Routes.Products,
      search: searchParams.toString(),
    });
  }

  setLocation(place: google.maps.places.PlaceResult) {
    this.setState(() => ({
      lat: place.geometry!.location!.lat(),
      lng: place.geometry!.location!.lng(),
    }));
  }

  render() {
    const text = Translator.getHomePagetext();
    const { lng, lat } = this.state;
    return (
      <Container>
        <SearchContainer style={{ backgroundImage: `url('st-bruno.jpg')` }}>
          <DestinationContainer>
            <SearchDestination
              types={["geocode"]}
              onSearchDestination={this.setLocation}
              placeholder="Destination"
              defaultValue=""
              isHome={true}
            />
            <FiltersComponent 
              appRef={this.props.appRef} 
              isHome={true}
              lng={lng}
              lat={lat}
            />
          </DestinationContainer>
        </SearchContainer>

        <Slogan>
          <div> {text?.sloganfirstrow} </div>
          <div> {text?.slogansecondrow} </div>
          <Link to={Routes.About} style={NavigationLinkStyle}>
            <AboutLink>
              {text?.aboutlink}
              <AiOutlineArrowRight />
            </AboutLink>
          </Link>
        </Slogan>
        <ImgSlogan src="Thumbnail.JPG" />

        <CategoriesContainer>
          <div
            onClick={() => {
              this.search(Category.Waterfront);
            }}
          >
            <CategoryStyling>
              <ImgCategory src="chalet.jpg" />
              {text?.waterside}
            </CategoryStyling>
          </div>
          <div
            onClick={() => {
              this.search(Category.Home);
            }}
          >
            <CategoryStyling>
              <ImgCategory src="OXYY0879.JPG" />
              {text?.home}
            </CategoryStyling>
          </div>
          <div
            onClick={() => {
              this.search(Category.Boat);
            }}
          >
            <CategoryStyling>
              <ImgCategory src="electric-boat.jpg" />
              {text?.electricalboat}
            </CategoryStyling>
          </div>
          <div
            onClick={() => {
              let type = new Set("");
              type.add(BoatType.SailingBoat);
              this.search(Category.Boat, type);
            }}
          >
            <CategoryStyling>
              <ImgCategory src="voilier.jpg" />
              {text?.sailing}
            </CategoryStyling>
          </div>
          <div
            onClick={() => {
              let types = new Set("");
              types.add(SmallBoatType.Canoe);
              types.add(SmallBoatType.Kayak);
              types.add(SmallBoatType.Pedalo);
              types.add(SmallBoatType.RowBoat);
              types.add(SmallBoatType.PaddleBoard);
              this.search(Category.SmallBoat, types);
            }}
          >
            <CategoryStyling>
              <ImgCategory src="Valkayak.JPG" />
              {text?.paddles}
            </CategoryStyling>
          </div>
          <div
            onClick={() => {
              let type = new Set("");
              type.add(SmallBoatType.Wakesurf);
              this.search(Category.SmallBoat, type);
            }}
          >
            <CategoryStyling>
              <ImgCategory src="kite.jpg" />
              {text?.boards}
            </CategoryStyling>
          </div>
        </CategoriesContainer>

        {/* <div
          onClick={() => {
            this.search(Category.TripAndClasses);
          }}
        >
          <NauticalTrips>
            <TextNauticalTrips>
              {text?.trip}
              <AboutLink>
                {text?.seemore}
                <AiOutlineArrowRight />
              </AboutLink>
            </TextNauticalTrips>
            <ImgNauticalTrips src="image.jpg" />
          </NauticalTrips>
        </div> */}

        <Slogan>
          <div style={{ maxWidth: "80%" }}> {text?.environment} </div>
          <Link to={Routes.About} style={NavigationLinkStyle}>
            <AboutLink>
              {text?.aboutlink}
              <AiOutlineArrowRight />
            </AboutLink>
          </Link>
        </Slogan>
      </Container>
    );
  }
}
export default withRouter(Home);
