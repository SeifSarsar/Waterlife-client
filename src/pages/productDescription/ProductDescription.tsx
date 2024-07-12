import React, { Component, Fragment } from 'react';
import { RouteComponentProps } from 'react-router';
import ReactStars from 'react-stars';
import { Review } from '../../models/Review';
import {
  Header,
  AmenitiesGrid,
  AmenitiesList,
  AmenitiesTitle,
  Name,
  Price,
  Adress,
  Break,
  Capacity,
  CommentDate,
  PhotoContainer,
  MapContainer,
  DescriptionGrid,
  DescriptionTitle,
  Line,
  CalendarContainer,
  FinalPrice,
  BookButton,
  RulesList,
  DescriptionTab,
  ReviewsTab,
  Tabs,
  ReviewHeader,
  MiddleContainer,
  Comment,
  CommentUnderLine,
  NoReviews,
  AmenityLi,
  Edit,
  Hours,
  Hour,
  DateError,
  BoatLicense,
  AmenitiesTab,
  MotorDiv,
  CaptainDiv,
  RulesTitle,
  CheckIn,
} from './ProductDescription.style';
import { Calendar } from './../../shared/Calendar.style';
import {
  DateUtils,
  Modifier,
  Modifiers,
  RangeModifier,
} from 'react-day-picker';
import { withRouter } from 'react-router-dom';
import { Amenity, AmenityToString } from '../../enums/Amenity';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Scrollbars } from 'react-custom-scrollbars';
import GoogleMapReact from 'google-map-react';
import MapMarker from '../../shared/map/MapMarker';
import Translator from '../../shared/translations/Translator';
import { Product } from '../../models/Product';
import { Category } from '../../enums/Category';
import { FiAlertCircle } from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContext';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AccountType } from '../../enums/AccountType';
import { Captain } from '../../enums/Captain';
import { Rule, RuleToString } from '../../enums/Rule';
import AxiosHandler from '../../shared/AxiosHandler';
import { Bed, BedToString } from '../../enums/Bed';
import TagsInput from '../../shared/tagsInput/TagsInput';

interface Props extends RouteComponentProps {}

interface State {
  date: RangeModifier;
  product: Product;
  daysStayed: number;
  tabs: number;
  params: URLSearchParams;
  datesChosen: boolean;
  hours: Array<string>;
  activeIndex: Array<number>;
  hoursSelected: Array<string>;
  numberOfHoursBooked: number;
  hoursChosen: boolean;
  hoursBooked: Array<string>;
  invalidHourRange: boolean;
  invalidDayRange: boolean;
  dateOrderGood: boolean;
  show: boolean;
  showHours: boolean;
  errorRange: boolean;
}

class ProductDescription extends Component<Props, State> {
  params = this.props.match.params;
  productId: string = (this.params as any)?.id;
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;
  constructor(props: Props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      date: {
        from: null,
        to: null,
      },
      product: new Product(),
      tabs: 0,
      daysStayed: 0,
      params: new URLSearchParams(this.props.location.search),
      datesChosen: false,
      hours: [],
      activeIndex: [],
      hoursSelected: [],
      numberOfHoursBooked: 0,
      hoursChosen: false,
      hoursBooked: [],
      invalidHourRange: false,
      dateOrderGood: false,
      show: false,
      invalidDayRange: false,
      showHours: false,
      errorRange: false,
    };
  }

  componentDidMount() {
    this.fetchProductDescription();
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  setDate(from: Date | null | undefined, to: Date | null | undefined) {
    this.setState(() => ({
      date: {
        from,
        to,
      },
    }));
  }

  setProduct(product: Product) {
    this.setState(() => ({
      product: product,
    }));
  }

  setDatesChosen(datesChosen: boolean) {
    this.setState(() => ({
      datesChosen: datesChosen,
    }));
  }

  setDaysStayed(days: number) {
    this.setState(() => ({
      daysStayed: days,
    }));
  }

  setParams(params: URLSearchParams) {
    this.setState(() => ({
      params: params,
    }));
  }
  setTabs(tab: number) {
    this.setState(() => ({
      tabs: tab,
    }));
  }

  setHours(hours: Array<string>) {
    this.setState(() => ({
      hours: hours,
    }));
  }

  setStyle(index: number, hour: string) {
    let styles = {};
    this.state.activeIndex.sort((a, b) => (a > b ? 1 : -1));
    if (this.state.hoursBooked.includes(hour)) {
      const booked = {
        backgroundColor: '#f8f8f8',
        color: '#c1c1c1',
        pointerEvents: 'none',
      };
      styles = Object.assign(styles, booked);
    } else if (this.state.activeIndex.includes(index)) {
      let active = {
        backgroundColor: '#4da7bc',
        color: 'white',
      };
      styles = Object.assign(styles, active);
    } else if (
      index > this.state.activeIndex[0] &&
      index < this.state.activeIndex[1]
    ) {
      let active = {
        backgroundColor: '#c8e4e8',
        color: 'white',
      };
      styles = Object.assign(styles, active);
    } else {
      let normal = {
        backgroundColor: 'white',
        color: '#4DA7BC',
        border: '1px solid #c1c1c1',
      };
      styles = Object.assign(styles, normal);
    }
    return styles;
  }

  addActive(index: number, hour: string) {
    this.setState({ invalidHourRange: false });
    if (!this.state.hoursBooked.includes(hour)) {
      let indexArray = this.state.activeIndex;
      let hours = this.state.hoursSelected;
      const indexInArray = indexArray.findIndex((i) => i === index);
      const indexInHours = hours.findIndex((h) => h === hour);
      if (indexInArray > -1) {
        indexArray.splice(indexInArray, 1);
        this.setState({ hoursChosen: false });
        hours.splice(indexInHours, 1);
        this.setState({ numberOfHoursBooked: 0 });
      } else if (indexArray.length === 2) {
        indexArray[1] = index;
        hours[1] = hour;
      } else {
        indexArray.push(index);
        hours.push(hour);
      }
      this.setState({ activeIndex: indexArray });
      this.setHourRange(hours);
    }
  }

  setHourRange(hours: Array<string>) {
    let newHours = hours;
    let invalidHourRange = false;
    hours.sort((a, b) => (a > b ? 1 : -1));
    if (hours.length === 2) {
      let firstNumber = this.getHoursNumberFromString(hours[0]);
      let secondNumber = this.getHoursNumberFromString(hours[1]);
      firstNumber > secondNumber
        ? this.setState({ dateOrderGood: false })
        : this.setState({ dateOrderGood: true });
      for (let hourBooked of this.state.hoursBooked) {
        if (secondNumber > firstNumber) {
          if (
            this.getHoursNumberFromString(newHours[0]) <
              this.getHoursNumberFromString(hourBooked) &&
            this.getHoursNumberFromString(newHours[1]) >
              this.getHoursNumberFromString(hourBooked)
          ) {
            invalidHourRange = true;
            this.setState({
              invalidHourRange: invalidHourRange,
              hoursChosen: false,
              hoursSelected: [],
              activeIndex: [],
              numberOfHoursBooked: 0,
            });
          }
        } else {
          if (
            this.getHoursNumberFromString(newHours[1]) <
              this.getHoursNumberFromString(hourBooked) &&
            this.getHoursNumberFromString(newHours[0]) >
              this.getHoursNumberFromString(hourBooked)
          ) {
            invalidHourRange = true;
            this.setState({
              invalidHourRange: invalidHourRange,
              hoursChosen: false,
              hoursSelected: [],
              activeIndex: [],
              numberOfHoursBooked: 0,
            });
          }
        }
      }
      if (!invalidHourRange) {
        firstNumber < secondNumber
          ? this.setState({
              numberOfHoursBooked:
                parseInt(newHours[1]) - parseInt(newHours[0]),
            })
          : this.setState({
              numberOfHoursBooked:
                parseInt(newHours[0]) - parseInt(newHours[1]),
            });
        this.setState({
          hoursChosen: true,
          invalidHourRange,
          hoursSelected: newHours,
        });
      }
    }
  }

  fetchProductDescription() {
    AxiosHandler.get(`/get/productdescription`, {
      params: {
        id: this.productId,
      },
    })
      .then((res) => {
        if (res) {
          const product: Product = res.data;
          this.setState({ product }, this.setDatesFromSearch);
        }
      })
      .catch(() => {});
  }

  handleDayClick(day: Date) {
    day.setHours(0);
    this.setState({ hoursSelected: [], activeIndex: [], errorRange: false });
    if (this.state.product?.category !== Category.Home) {
      this.setState({ showHours: true });
      this.setDate(day, day);
      this.showHoursAvailable(day);
    } else {
      const range = DateUtils.addDayToRange(day, this.state.date);
      if (range.from && range.to) {
        if (!this.checkValidRange(range)) {
          this.setState({ invalidDayRange: true });
          this.setDate(null, null);
          return;
        }
      }
      this.setState({ invalidDayRange: false });
      this.daysStayed(range.from, range.to);
      this.setDate(range.from, range.to);
      if (range.from && range.to) {
        this.setDatesChosen(true);
        this.addDatesInParams(range.from, range.to);
      } else {
        this.setDatesChosen(false);
      }
    }
    this.disableHours(day);
  }

  checkValidRange(range: RangeModifier) {
    let disabledDays = this.disableDays(this.state.product);
    for (let disabledDay of disabledDays) {
      if (range.to && range.from && disabledDay.to && disabledDay.from) {
        if (
          range.from.getTime() <= disabledDay.from.getTime() &&
          range.to.getTime() >= disabledDay.to.getTime()
        ) {
          return false;
        }
      }
    }
    return true;
  }

  compareDates(date1: Date, date2: Date) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  addDatesInParams(from: Date | null | undefined, to: Date | null | undefined) {
    if (from && to) {
      this.state.params.set('from', from.toISOString().split('T')[0]);
      this.state.params.set('to', to.toISOString().split('T')[0]);
    } else {
      this.state.params.delete('from');
      this.state.params.delete('to');
    }
  }

  addHoursInParams() {
    if (this.state.dateOrderGood) {
      this.state.params.set('from', this.state.hoursSelected[0].split(':')[0]);
      this.state.params.set('to', this.state.hoursSelected[1].split(':')[0]);
    } else {
      this.state.params.set('from', this.state.hoursSelected[1].split(':')[0]);
      this.state.params.set('to', this.state.hoursSelected[0].split(':')[0]);
    }
    if (this.state.date.from)
      this.state.params.set(
        'day',
        this.state.date.from.toISOString().split('T')[0]
      );
  }

  addDatesInUrl() {
    this.props.history.push({
      pathname: `/payment/${this.productId}`,
      search: this.state.params.toString(),
    });
  }

  addHoursInUrl() {
    this.addHoursInParams();
    this.props.history.push({
      pathname: `/payment/${this.productId}`,
      search: this.state.params.toString(),
    });
  }

  setDatesFromSearch() {
    const searchParam = new URLSearchParams(this.props.location.search);
    let fromDate = searchParam.get('from');
    fromDate = fromDate?.replaceAll('-', '/')!;
    let toDate = searchParam.get('to');
    toDate = toDate?.replaceAll('-', '/')!;
    if (!fromDate) return;

    const from = new Date(fromDate);
    const to = new Date(toDate);

    this.setDate(from, to);
    this.daysStayed(from, to);
    this.setDatesChosen(true);
    //this.setErrorRange(fromDate, toDate);
  }

  setErrorRange(from: any, to: any) {
    this.setState(() => ({
      errorRange: from !== to && this.state.product.category !== Category.Home,
    }));
  }

  daysStayed(from: Date | null | undefined, to: Date | null | undefined) {
    if (from && to) {
      let diffInTime = to.getTime() - from.getTime();
      let diffInDays = Math.round(diffInTime / (1000 * 3600 * 24));
      this.setDaysStayed(diffInDays);
    }
  }

  showHoursAvailable(day: Date) {
    let hours: Array<string> = [];
    let today = new Date();
    let hour = 0;
    if (this.compareDates(today, day)) {
      hour = today.getHours() + 1;
    } else {
      hour = this.state.product.availableStart;
    }
    for (hour; hour <= this.state.product.availableEnd; hour++) {
      let hourString = hour.toString() + ':00';
      hours.push(hourString);
    }
    this.setHours(hours);
  }

  disableDays = (product: Product) => {
    let disabledDay: {
      from: Date | null | undefined;
      to: Date | null | undefined;
    } = { from: new Date(), to: new Date() };
    let disabledDays: {
      from: Date | null | undefined;
      to: Date | null | undefined;
    }[] = [];
    for (let i = 0; i < product.overnightBooking.length; i++) {
      let dateFrom = new Date(product.overnightBooking[i].start);
      let dateTo = new Date(product.overnightBooking[i].end);
      disabledDay = {
        from: dateFrom,
        to: dateTo,
      };
      disabledDays.push(disabledDay);
    }

    for (let i = 0; i < product.unavailableDays.length; i++) {
      let dateFrom = new Date(product.unavailableDays[i]);
      let dateTo = new Date(product.unavailableDays[i]);
      disabledDay = {
        from: dateFrom,
        to: dateTo,
      };
      disabledDays.push(disabledDay);
    }

    return disabledDays;
  };

  disableHours(day: Date) {
    let hoursBooked: Array<string> = [];
    for (let dayBooked of this.state.product.dayBooking) {
      dayBooked.day = new Date(dayBooked.day);
      if (this.compareDates(day, dayBooked.day))
        if (dayBooked.start && dayBooked.end) {
          for (let i = dayBooked.start; i <= dayBooked.end; i++) {
            let hourString = i + ':00';
            hoursBooked.push(hourString);
          }
        }
    }
    this.setState({ hoursBooked: hoursBooked });
  }

  getHoursNumberFromString(hour: string) {
    return parseInt(hour.substr(0, hour.indexOf(':')));
  }

  edit() {
    this.props.history.push({
      pathname: `/edit/products/${this.productId}`,
    });
  }

  delete() {
    AxiosHandler.delete(`/delete/product`, {
      params: {
        id: this.state.product._id,
      },
    })
      .then((res) => {
        if (res) {
          this.props.history.push({
            pathname: `/rentals/`,
          });
        }
      })
      .catch(() => {});
  }

  render() {
    const { product, show } = this.state;
    if (!product) return null;

    const startModifier: Modifier = this.state.date.from as Date;
    const endModifier: Modifier = this.state.date.to as Date;

    const modifiers: Partial<Modifiers> = {
      range: this.state.date,
      start: startModifier,
      end: endModifier,
    };

    const text = Translator.getDescriptionText();
    const listtext = Translator.getPropertyListText();

    return (
      <div>
        {(product.userId === this.context.user?._id ||
          this.context.user?.accountType === AccountType.admin ||
          this.context.user?.accountType === AccountType.manager) && (
          <Edit>
            <FaPencilAlt
              onClick={() => this.edit()}
              cursor="pointer"
            ></FaPencilAlt>
            <FaTrashAlt
              onClick={() => this.handleShow()}
              cursor="pointer"
              color="black"
            ></FaTrashAlt>
          </Edit>
        )}
        <Header>
          <Name>{product.title}</Name>
          {product.category === Category.Home ? (
            <Price>{product.price + text.price}</Price>
          ) : (
            <Price>{product.price + text.pricehour}</Price>
          )}
          <Break></Break>
          <div>
            <Adress>{product.address.fullAddress.replace(/,/g, ', ')}</Adress>
            <Capacity>
              {product.nGuests + ' ' + text.guest}
              {product.nBedrooms === 1 &&
                ', ' + product.nBedrooms + ' ' + text.bedroom}
              {product.nBedrooms > 1 &&
                ', ' + product.nBedrooms + ' ' + text.bedrooms}
              {product.nWashrooms === 1 &&
                ', ' + product.nWashrooms + ' ' + text.washroom}
              {product.nWashrooms > 1 &&
                ', ' + product.nWashrooms + ' ' + text.washrooms}
            </Capacity>
          </div>
          <div>
            <ReactStars
              count={5}
              edit={false}
              value={product.rating}
              size={36}
              color1={'#ffffff'}
              color2={'#4da7bc'}
            />
          </div>
        </Header>
        <PhotoContainer>
          <ImageGallery
            items={product.images.map((image) => ({ original: image }))}
          />
        </PhotoContainer>
        <Tabs
          style={{
            justifyContent:
              product.category === Category.SmallBoat
                ? 'space-evenly'
                : 'space-between',
          }}
        >
          <DescriptionTab
            onClick={() => this.setTabs(0)}
            style={{
              backgroundColor: this.state.tabs === 0 ? '#4DA7BC' : 'white',
              color: this.state.tabs === 0 ? 'white' : '#4DA7BC',
              border: this.state.tabs === 0 ? '' : '1px solid #C1C1C1',
            }}
          >
            {text.description}
          </DescriptionTab>
          {product.category !== Category.SmallBoat && (
            <AmenitiesTab
              onClick={() => this.setTabs(2)}
              style={{
                backgroundColor: this.state.tabs !== 2 ? 'white' : '#4DA7BC',
                color: this.state.tabs !== 2 ? '#4DA7BC' : 'white',
                border: this.state.tabs !== 2 ? '1px solid #C1C1C1' : '',
              }}
            >
              {text.amenities}
            </AmenitiesTab>
          )}
          <ReviewsTab
            onClick={() => this.setTabs(1)}
            style={{
              backgroundColor: this.state.tabs !== 1 ? 'white' : '#4DA7BC',
              color: this.state.tabs !== 1 ? '#4DA7BC' : 'white',
              border: this.state.tabs !== 1 ? '1px solid #C1C1C1' : '',
            }}
          >
            {text.rating}
          </ReviewsTab>
        </Tabs>
        <MiddleContainer>
          {this.state.tabs === 0 && (
            <DescriptionGrid>
              <Scrollbars
                style={{
                  height: 400,
                }}
              >
                {product.description}
                {product.category === Category.Home && (
                  <Fragment>
                    <DescriptionTitle>{text.time}</DescriptionTitle>
                    <CheckIn>
                      <div>
                        <span style={{ fontWeight: 600 }}>
                          {text.checkin} {': '}{' '}
                        </span>
                        <span>
                          {product.checkinStart +
                            ':00 - ' +
                            product.checkinEnd +
                            ':00'}
                        </span>
                      </div>
                      <div>
                        <span style={{ fontWeight: 600 }}>
                          {text.checkout} {': '}{' '}
                        </span>
                        <span>{product.checkout + ':00'}</span>
                      </div>
                    </CheckIn>
                  </Fragment>
                )}
                {product.bedrooms.length > 0 && (
                  <DescriptionTitle>{text.bedrooms}</DescriptionTitle>
                )}

                <TagsInput
                  data={product.bedrooms}
                  isStatic={true}
                  options={
                    new Map(
                      Object.entries(Bed).map((value: [string, Bed]) => [
                        value[1],
                        BedToString(value[1]),
                      ])
                    )
                  }
                ></TagsInput>
                {product.isElectricMotor && <MotorDiv>{text.motor}</MotorDiv>}
                {product.captain === Captain.Never && (
                  <CaptainDiv>{text.nocaptain}</CaptainDiv>
                )}
                {product.captain === Captain.Optional && (
                  <CaptainDiv>{text.optional}</CaptainDiv>
                )}
                {product.captain === Captain.Always && (
                  <CaptainDiv>{text.always}</CaptainDiv>
                )}
              </Scrollbars>
            </DescriptionGrid>
          )}
          {this.state.tabs === 1 && (
            <DescriptionGrid>
              {product.reviews.length > 0 ? (
                <Scrollbars
                  style={{
                    height: 300,
                    gridColumnStart: 1,
                    gridColumnEnd: 3,
                    gridRowStart: 1,
                    gridRowEnd: 3,
                  }}
                >
                  {product.reviews.map((review: Review, index: number) => (
                    <React.Fragment key={index}>
                      <ReviewHeader>
                        <div>{review.userName}</div>
                        <div>
                          <ReactStars
                            count={review.rating}
                            edit={false}
                            value={review.rating}
                            size={36}
                            color2={'#4da7bc'}
                          />
                        </div>
                      </ReviewHeader>
                      <Comment>{review.comment}</Comment>
                      <CommentDate>
                        {new Date(review.date).toLocaleDateString()}
                      </CommentDate>
                      <CommentUnderLine></CommentUnderLine>
                    </React.Fragment>
                  ))}
                </Scrollbars>
              ) : (
                <NoReviews>
                  <h3>{text.norating}</h3>
                </NoReviews>
              )}
            </DescriptionGrid>
          )}
          {this.state.tabs === 2 && product.category !== Category.SmallBoat && (
            <AmenitiesGrid>
              <AmenitiesTitle>{text.am}</AmenitiesTitle>
              <AmenitiesList>
                {Array.from(product.amenities).map(
                  (amenity: Amenity, index: number) => (
                    <AmenityLi key={index}>
                      {AmenityToString(product.category, amenity)}
                    </AmenityLi>
                  )
                )}
              </AmenitiesList>
              <RulesTitle>{text.rules}</RulesTitle>
              <RulesList>
                {Array.from(product.rules).map((rule: Rule, index: number) => (
                  <AmenityLi key={index}>{RuleToString(rule)}</AmenityLi>
                ))}
              </RulesList>
            </AmenitiesGrid>
          )}
          {product && (
            <MapContainer>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: 'AIzaSyAISTnlb1x6zOX5PHw3IfMaOBdWwx40TcU',
                }}
                center={{
                  lng: product.location.coordinates[0],
                  lat: product.location.coordinates[1],
                }}
                defaultZoom={14}
              >
                <MapMarker
                  lat={product.location.coordinates[1]}
                  lng={product.location.coordinates[0]}
                  category={product.category}
                ></MapMarker>
              </GoogleMapReact>
            </MapContainer>
          )}
        </MiddleContainer>

        {product.category === Category.Boat &&
          product.address.state !== 'YT' &&
          product.address.state !== 'NT' && (
            <BoatLicense>
              <FiAlertCircle style={{ marginLeft: '10px' }} />
              {text.boatlicense}
            </BoatLicense>
          )}

        <Line></Line>

        {this.state.invalidHourRange && <DateError>{text.hourerror}</DateError>}
        <CalendarContainer>
          <Calendar
            modifiers={modifiers}
            selectedDays={[startModifier, this.state.date]}
            disabledDays={[
              { before: new Date() },
              ...this.disableDays(product),
            ]}
            month={startModifier}
            onDayClick={this.handleDayClick}
          ></Calendar>
          {this.state.invalidDayRange && <DateError>{text.dayerror}</DateError>}
          {this.state.errorRange && <DateError>{text.selectday}</DateError>}
          {this.state.showHours && (
            <Hours>
              {this.state.hours.map(
                (hour: string, index: number) =>
                  product.category !== Category.Home && (
                    <Hour
                      key={index}
                      data-id={index}
                      onClick={() => this.addActive(index, hour)}
                      style={this.setStyle(index, hour)}
                    >
                      {hour}
                    </Hour>
                  )
              )}
            </Hours>
          )}
          {product.category === Category.Home ? (
            <FinalPrice>
              <span>
                ${product.price} x {this.state.daysStayed} {text.nights}
              </span>
              <span>${product.price * this.state.daysStayed}</span>
              <span>____________________________</span>
              <span>{text.total}</span>
              <span>${product.price * this.state.daysStayed}</span>
              <BookButton
                onClick={() => this.addDatesInUrl()}
                disabled={
                  !this.state.datesChosen || this.state.daysStayed === 0
                }
              >
                {text.book}
              </BookButton>
            </FinalPrice>
          ) : (
            <FinalPrice>
              <span>
                ${product.price} x {this.state.numberOfHoursBooked} {text.hours}
              </span>
              <span>${product.price * this.state.numberOfHoursBooked}</span>
              <span>____________________________</span>
              <span>{text.total}</span>
              <span>${product.price * this.state.numberOfHoursBooked}</span>
              <BookButton
                onClick={() => this.addHoursInUrl()}
                disabled={!this.state.hoursChosen}
              >
                {text.book}
              </BookButton>
            </FinalPrice>
          )}
        </CalendarContainer>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{listtext.modaltitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{listtext.modaltext}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.handleClose}
              style={{
                backgroundColor: 'white',
                color: '#4da7bc',
                border: '1px solid #4da7bc',
              }}
            >
              {listtext.close}
            </Button>
            <Button
              variant="primary"
              onClick={() => this.delete()}
              style={{
                backgroundColor: '#4da7bc',
                color: 'white',
                border: '1px solid #4da7bc',
              }}
            >
              {listtext.delete}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ProductDescription);
