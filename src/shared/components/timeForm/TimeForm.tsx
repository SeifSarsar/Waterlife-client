import { Component, Fragment } from 'react';
//import { AvailabilityState } from '../../Models';
import {
  FormTitle,
  FieldTitle,
} from '../../../pages/createProduct/CreateProduct.style';
import {
  AvailabilityCalendar,
  Legends,
  Legend,
  UnavailableSquare,
  AvailableSquare,
  TimeRange,
} from './TimeForm.style';

import 'react-day-picker/lib/style.css';
import { Product } from '../../../models/Product';
import { Category } from '../../../enums/Category';
import TimeSelect from '../../timeSelect/TimeSelect';
import Translator from '../../translations/Translator';
import {
  DateUtils,
  Modifier,
  Modifiers,
  RangeModifier,
} from 'react-day-picker';

interface Props {
  product: Product;
  isEdit: boolean;
  update(product: Product, isAction: boolean): void;
}

interface State {
  range: RangeModifier;
  days: Set<string>;
  mode: boolean;
}

class TimeForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      range: {
        from: null,
        to: null,
      },
      mode: true,
      days: new Set(),
    };
  }
  componentDidMount() {
    this.update(this.props.product);
    this.setState({
      days: new Set(
        this.props.product.unavailableDays.map((date) => date.toISOString())
      ),
    });
  }

  startSelectRange = (day: Date) => {
    const range = DateUtils.addDayToRange(day, this.state.range);
    let mode = true;
    if (this.state.days.has(day.toISOString())) {
      mode = false;
    }
    this.setState({ range, mode });
  };

  endSelectRange = (day: Date) => {
    const range = DateUtils.addDayToRange(day, this.state.range);

    if (!range.from || !range.to) return;

    this.state.mode
      ? this.state.days.add(range.from.toISOString())
      : this.state.days.delete(range.from.toISOString());

    if (!this.compareDates(range.from, range.to)) {
      let currentDate = new Date(range.from);
      currentDate.setDate(currentDate.getDate() + 1);

      while (currentDate && !this.compareDates(currentDate, range.to)) {
        this.state.mode
          ? this.state.days.add(currentDate.toISOString())
          : this.state.days.delete(currentDate.toISOString());
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      this.state.mode
        ? this.state.days.add(range.to.toISOString())
        : this.state.days.delete(range.to.toISOString());
    }
    this.update({
      ...this.props.product,
      unavailableDays: Array.from(this.state.days).map(
        (date) => new Date(date)
      ),
    });

    this.setState({ range: { from: null, to: null } });
  };

  compareDates(day1: Date, day2: Date) {
    return (
      day1.getDate() === day2.getDate() &&
      day1.getMonth() === day2.getMonth() &&
      day1.getFullYear() === day2.getFullYear()
    );
  }

  update = (product: Product) => {
    const { category } = product;

    this.props.update(product, this.isNext(category, product));
  };

  isNext = (category: Category, product: Product) => {
    if (category === Category.Home) {
      return (
        product.checkinStart > -1 &&
        product.checkinEnd > -1 &&
        product.checkout > -1
      );
    }
    return product.availableStart > -1 && product.availableEnd > -1;
  };

  render() {
    const { product, isEdit } = this.props;
    const text = Translator.getCreateProductText().calendarForm;
    const startModifier: Modifier = this.state.range.from as Date;
    const endModifier: Modifier = this.state.range.to as Date;
    const modifiers: Partial<Modifiers> = {
      range: this.state.range,
      start: startModifier,
      end: endModifier,
    };
    return (
      <>
        {!isEdit && <FormTitle>{text.time}</FormTitle>}

        {product.category === Category.Home && (
          <>
            <FieldTitle>{text.checkin}</FieldTitle>
            <TimeRange>
              <TimeSelect
                label={text.from}
                value={product.checkinStart}
                update={(checkinStart) =>
                  this.update({ ...product, checkinStart })
                }
                min={6}
                max={23}
              ></TimeSelect>
              <TimeSelect
                label={text.to}
                value={product.checkinEnd}
                update={(checkinEnd) => this.update({ ...product, checkinEnd })}
                min={product.checkinStart + 1}
                max={24}
              ></TimeSelect>
            </TimeRange>

            <FieldTitle>{text.checkout}</FieldTitle>
            <TimeSelect
              label="Before"
              value={product.checkout}
              update={(checkout) => this.update({ ...product, checkout })}
              min={1}
              max={product.checkinStart - 1}
            ></TimeSelect>
          </>
        )}
        {product.category !== Category.Home && (
          <>
            <FieldTitle>{text.availabletext}</FieldTitle>
            <TimeRange>
              <TimeSelect
                label={text.from}
                value={product.availableStart}
                update={(availableStart) =>
                  this.update({ ...product, availableStart })
                }
                min={0}
                max={23}
              ></TimeSelect>
              <TimeSelect
                label={text.to}
                value={product.availableEnd}
                update={(availableEnd) =>
                  this.update({ ...product, availableEnd })
                }
                min={product.availableStart + 1}
                max={24}
              ></TimeSelect>
            </TimeRange>
          </>
        )}
        <FieldTitle>{text.unavailabletext}</FieldTitle>
        <Legends>
          <Legend>
            <AvailableSquare></AvailableSquare>
            <span>{text.available}</span>
          </Legend>
          <Legend>
            <UnavailableSquare></UnavailableSquare>
            <span>{text.unavailable}</span>
          </Legend>
        </Legends>
        <AvailabilityCalendar
          modifiers={modifiers}
          selectedDays={product.unavailableDays}
          disabledDays={{ before: new Date() }}
          onDayMouseDown={this.startSelectRange}
          onDayMouseUp={this.endSelectRange}
        ></AvailabilityCalendar>
      </>
    );
  }
}

export default TimeForm;
