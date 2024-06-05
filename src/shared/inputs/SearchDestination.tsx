import { Component, createRef, KeyboardEvent, RefObject } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import {
  Container,
  DestinationInput,
  SearchIcon,
} from './SearchDestination.style';

interface Props {
  types: string[];
  placeholder: string;
  defaultValue: string;
  onSearchDestination(place: google.maps.places.PlaceResult): void;
  isHome?: boolean;
}

interface State {}

class SearchDestination extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onKeyPress = this.onKeyPress.bind(this);
    this.submitAddress = this.submitAddress.bind(this);
    this.onPlaceSelected = this.onPlaceSelected.bind(this);
    this.geocode = this.geocode.bind(this);
  }

  geocoder = new google.maps.Geocoder();
  inputRef: RefObject<any> = createRef<any>();

  onKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') this.submitAddress();
  }

  geocode(address: string) {
    this.geocoder.geocode({ address }).then((result) => {
      const { results } = result;
      if (results.length > 0) {
        this.props.onSearchDestination(results[0]);

        if (this.inputRef.current) {
          (this.inputRef.current as HTMLInputElement).value =
            results[0].formatted_address;
        }
      }
    });
  }

  submitAddress() {
    if (this.inputRef.current) {
      const input = this.inputRef.current as HTMLInputElement;
      const address = input.value;
      if (/\S/.test(address)) {
        this.geocode(address);
      }
    }
  }

  onPlaceSelected(place: google.maps.places.PlaceResult) {
    if (place.geometry && place.geometry.location) {
      this.props.onSearchDestination(place);
    }
  }

  render() {
    const { isHome } = this.props;

    return (
      <Container>
        <FaMapMarkerAlt size="20px" />
        <DestinationInput
          ref={this.inputRef}
          apiKey={'AIzaSyAISTnlb1x6zOX5PHw3IfMaOBdWwx40TcU'}
          onPlaceSelected={this.onPlaceSelected}
          options={{
            componentRestrictions: { country: 'ca' },
            types: this.props.types,
          }}
          placeholder={this.props.placeholder}
          defaultValue={this.props.defaultValue}
        />
        {!isHome && <SearchIcon onClick={this.submitAddress} />}
      </Container>
    );
  }
}

export default SearchDestination;
