import { Fragment } from 'react';
import { Component } from 'react';
import {
  Modifier,
  DateUtils,
  RangeModifier,
  Modifiers,
} from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {
  ClearFilter,
  FilterButton,
  FilterButtonTitle,
  FilterWindow,
} from '../../../shared/Filter.style';
import { FaCalendarAlt } from 'react-icons/fa';
import { Category } from '../../../enums/Category';
import { Calendar } from '../../../shared/Calendar.style';
import styled from 'styled-components';

export const ValueContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

export const Value = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #b9b9b9;
  border-radius: 5px;
  padding: 5px 0px;
  width: 48%;
`;

interface Props {
  active: boolean;
  value: RangeModifier;
  category: Category;
  setDate(from: Date | null | undefined, to: Date | null | undefined): void;
  toggleWindow(): void;
}

interface State {}

class DateFilter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.setRange = this.setRange.bind(this);
    this.setDay = this.setDay.bind(this);

    this.clear = this.clear.bind(this);
  }

  clear() {
    this.props.setDate(null, null);
  }

  setRange(day: Date) {
    const { from, to } = DateUtils.addDayToRange(day, this.props.value);

    this.props.setDate(from, from?.getDate() !== to?.getDate() ? to : null);
  }

  setDay(day: Date) {
    this.props.setDate(day, day);
  }

  render() {
    const { active, value, category, toggleWindow } = this.props;

    const startModifier: Modifier = value.from as Date;
    const endModifier: Modifier = value.to as Date;

    const modifiers: Partial<Modifiers> = {
      range: value,
      start: startModifier,
      end: endModifier,
    };

    return (
      <Fragment>
        <FilterButton onClick={toggleWindow}>
          <FaCalendarAlt color="#4da7bc" />

          <FilterButtonTitle>Date</FilterButtonTitle>
        </FilterButton>
        <FilterWindow className={active ? 'active' : ''}>
          <ValueContainer>
            <Value>
              {value.from
                ? `${value.from.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}`
                : 'None'}
            </Value>
            {(category === Category.Home || category === Category.None) && (
              <Value>
                {value.to
                  ? `${value.to.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}`
                  : 'None'}
              </Value>
            )}
          </ValueContainer>
          <div>
            {category === Category.Home || category === Category.None ? (
              <Calendar
                modifiers={modifiers}
                selectedDays={[startModifier, value]}
                disabledDays={{ before: new Date() }}
                month={startModifier}
                onDayClick={this.setRange}
              ></Calendar>
            ) : (
              <Calendar
                modifiers={{ start: startModifier }}
                disabledDays={{ before: new Date() }}
                selectedDays={[startModifier]}
                month={startModifier}
                onDayClick={this.setDay}
              ></Calendar>
            )}
          </div>
          <ClearFilter onClick={this.clear}>Clear</ClearFilter>
        </FilterWindow>
      </Fragment>
    );
  }
}

export default DateFilter;
