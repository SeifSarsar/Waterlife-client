import React from 'react';
import { Component } from 'react';
import { Category } from '../../../enums/Category';
import DateFilter from '../components/DateFilter';
import { Filters } from '../Products.style';
import { RangeModifier } from 'react-day-picker';
import TypeFilter from '../components/TypeFilter';
import { Type, NoneType } from '../../../enums/Type';
import MoreFilter from '../components/morefilter/MoreFilter';
import { Filter } from '../../../enums/Filter';
import CategoryFilter from '../components/CategoryFilter';
import { SearchButton } from '../../../shared/Filter.style';
import { Product } from '../../../models/Product';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { Routes } from '../../../enums/Routes';

interface Props extends RouteComponentProps {
  appRef: React.RefObject<HTMLDivElement>;
  isHome?: boolean;
  lat: number | null;
  lng: number | null;
}

interface State {
  products: Product[];
  activeFilter: Filter;
  category: Category;
  types: Set<string>;
  guests: number;
  bedrooms: number;
  date: RangeModifier;
  price: number[];
  mobilityFriendly: boolean;
  loading: boolean;
}

class FiltersComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      products: [],
      activeFilter: Filter.None,

      category: Category.None,
      types: new Set(),
      date: {
        from: null,
        to: null,
      },
      price: [this.DEFAULT_PRICE_MIN, this.DEFAULT_PRICE_MAX],
      guests: 0,
      bedrooms: 0,
      mobilityFriendly: false,
      loading: true,
    };

    this.filterRef = React.createRef<HTMLDivElement>();
    this.setCategory = this.setCategory.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setTypes = this.setTypes.bind(this);
    this.setPrice = this.setPrice.bind(this);
    this.setMoreFilters = this.setMoreFilters.bind(this);
    this.setMobilityFriendly = this.setMobilityFriendly.bind(this);
    this.clickOutside = this.clickOutside.bind(this);
    this.search = this.search.bind(this);
  }

  filterRef: React.RefObject<HTMLDivElement>;

  readonly DEFAULT_PRICE_MIN = 0;
  readonly DEFAULT_PRICE_MAX = 1000;

  componentDidMount() {
    document.addEventListener('mouseup', this.clickOutside);
    if (!this.props.isHome) this.setParams();
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.clickOutside);
  }

  setParams() {
    const searchParams = new URLSearchParams(this.props.location.search);

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
      category: category ? (category as Category) : Category.None,
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
  }

  search() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const { date, category, types, price, guests, bedrooms, mobilityFriendly } =
      this.state;

    const lat = this.props.lat;
    const lng = this.props.lng;

    if (lat !== null && lng !== null) {
      searchParams.set('lat', lat.toString());
      searchParams.set('lng', lng.toString());
    }

    if (this.props.isHome && this.props.lat && this.props.lng) {
      searchParams.set('lat', this.props.lat.toString());
      searchParams.set('lng', this.props.lng.toString());
    }

    if (category && category !== Category.None) {
      searchParams.set('category', category);
    } else if (category === Category.None) {
      searchParams.delete('category');
    }

    if (date.from) {
      searchParams.set('from', date.from.toISOString().split('T')[0]);
    } else {
      searchParams.delete('from');
      searchParams.delete('to');
    }

    if (date.to) {
      searchParams.set('to', date.to.toISOString().split('T')[0]);
    } else if (date.from) {
      const to = new Date(date.from);
      to.setDate(to.getDate() + 1);
      searchParams.set('to', to.toISOString().split('T')[0]);
    }

    if (
      price[0] > this.DEFAULT_PRICE_MIN ||
      price[1] < this.DEFAULT_PRICE_MAX
    ) {
      searchParams.set('min', price[0].toString());
      searchParams.set('max', price[1].toString());
    } else {
      searchParams.delete('min');
      searchParams.delete('max');
    }

    if (types.size > 0) {
      searchParams.set('types', Array.from(types).join(','));
    } else {
      searchParams.delete('types');
    }

    if (guests > 0) searchParams.set('guests', guests.toString());
    else searchParams.delete('guests');

    if (bedrooms > 0) searchParams.set('bedrooms', bedrooms.toString());
    else searchParams.delete('bedrooms');

    if (mobilityFriendly)
      searchParams.set('mobilityFriendly', mobilityFriendly.toString());
    else searchParams.delete('mobilityFriendly');

    this.props.history.push({
      pathname: Routes.Products,
      search: searchParams.toString(),
    });
  }

  setCategory(category: Category) {
    this.setState(() => ({
      category,
      types: new Set(),
      date: {
        from: this.state.date.from,
        to: this.isCalendarResetNeeded(category)
          ? this.state.date.from
          : this.state.date.to,
      },
    }));
  }

  isCalendarResetNeeded(category: Category) {
    return !(
      (this.state.category === Category.Home && category === Category.None) ||
      (this.state.category === Category.None && category === Category.Home)
    );
  }

  setDate(from: Date | null | undefined, to: Date | null | undefined) {
    this.setState(() => ({
      date: {
        from,
        to,
      },
    }));
  }

  setTypes(type: Type) {
    this.setState((state: State) => {
      if (type === NoneType.None) {
        return {
          types: new Set(),
        };
      }

      const types = new Set(state.types);
      if (types.has(type)) types.delete(type);
      else types.add(type);

      return {
        types,
      };
    });
  }

  setPrice(price: number[]) {
    this.setState(() => ({
      price,
    }));
  }

  setMoreFilters(guests: number, bedrooms: number) {
    this.setState(() => ({
      guests,
      bedrooms,
    }));
  }

  setMobilityFriendly() {
    this.setState(() => ({
      mobilityFriendly: !this.state.mobilityFriendly,
    }));
  }

  clickOutside(event: MouseEvent) {
    const target = event.target as Node | null;
    if (
      this.state.activeFilter !== Filter.None &&
      this.filterRef.current &&
      this.props.appRef.current &&
      this.props.appRef.current.contains(target) &&
      !this.filterRef.current.contains(target)
    ) {
      this.setState(() => ({
        activeFilter: Filter.None,
      }));
    }
  }

  toggleWindow(activeFilter: Filter) {
    this.setState((state: State) => ({
      activeFilter:
        activeFilter === state.activeFilter ? Filter.None : activeFilter,
    }));
  }
  render() {
    const {
      activeFilter,
      category,
      date,
      types,
      price,
      guests,
      bedrooms,
      mobilityFriendly,
    } = this.state;

    return (
      <Filters>
        <div ref={activeFilter === Filter.Date ? this.filterRef : null}>
          <DateFilter
            active={activeFilter === Filter.Date}
            value={date}
            category={category}
            setDate={this.setDate}
            toggleWindow={() => this.toggleWindow(Filter.Date)}
          ></DateFilter>
        </div>
        <div ref={activeFilter === Filter.Category ? this.filterRef : null}>
          <CategoryFilter
            active={activeFilter === Filter.Category}
            value={category}
            setCategory={this.setCategory}
            toggleWindow={() => this.toggleWindow(Filter.Category)}
          ></CategoryFilter>
        </div>
        {category !== Category.Waterfront && category !== Category.None && (
          <div ref={activeFilter === Filter.Types ? this.filterRef : null}>
            <TypeFilter
              active={activeFilter === Filter.Types}
              category={category}
              types={types}
              setTypes={this.setTypes}
              toggleWindow={() => this.toggleWindow(Filter.Types)}
            ></TypeFilter>
          </div>
        )}
        <div ref={activeFilter === Filter.More ? this.filterRef : null}>
          <MoreFilter
            active={activeFilter === Filter.More}
            guests={guests}
            bedrooms={bedrooms}
            minPrice={this.DEFAULT_PRICE_MIN}
            maxPrice={this.DEFAULT_PRICE_MAX}
            price={price}
            mobilityFriendly={mobilityFriendly}
            setPrice={this.setPrice}
            setMoreFilters={this.setMoreFilters}
            setMobilityFriendly={this.setMobilityFriendly}
            toggleWindow={() => this.toggleWindow(Filter.More)}
          ></MoreFilter>
        </div>
        <SearchButton onClick={this.search}>
          <FaSearch />
        </SearchButton>
      </Filters>
    );
  }
}

export default withRouter(FiltersComponent);
