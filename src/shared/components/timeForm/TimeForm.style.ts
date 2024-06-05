import styled from 'styled-components';
import { Calendar } from '../../Calendar.style';

export const AvailabilityCalendar = styled(Calendar)`
  font-size: 20px;
  background-color: #f8f8f8;
  &
    .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #e0e0e0;
    color: #b8b8b8;
  }
`;

export const TimeRange = styled.div`
  display: flex;
`;

export const Legends = styled.div`
  display: flex;
  width: 337px;
  box-sizing: border-box;
  margin-bottom: 10px;
  background-color: #f8f8f8;
  padding: 10px;
`;

export const Legend = styled.div`
  display: flex;
  margin-right: 20px;
  font-size: 20px;
`;

export const UnavailableSquare = styled.div`
  border: 1px solid #b8b8b8;
  background-color: #e0e0e0;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  margin-right: 10px;
`;

export const AvailableSquare = styled.div`
  border: 1px solid #b8b8b8;

  background-color: #f8f8f8;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  margin-right: 10px;
`;
