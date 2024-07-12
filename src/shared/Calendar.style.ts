import styled from 'styled-components';
import DayPicker from 'react-day-picker';

export const Calendar = styled(DayPicker)`
  &
    .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #c8e4e8;
    color: black;
  }
  & .DayPicker-Day {
    border-radius: 0;
  }
  & .DayPicker-Day--start:not(.DayPicker-Day--outside) {
    background-color: #4da7bc !important;
  }
  & .DayPicker-Day--end:not(.DayPicker-Day--outside) {
    background-color: #4da7bc !important;
  }

  & .DayPicker-Day--disabled {
    pointer-events: none;
  }
`;
