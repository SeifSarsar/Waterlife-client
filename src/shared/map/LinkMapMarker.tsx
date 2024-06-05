import { FunctionComponent } from 'react';
import { FaHome, FaShip, FaUmbrellaBeach } from 'react-icons/fa';
import { GiPaddles } from 'react-icons/gi';
import { Category } from '../../enums/Category';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled(Link)<{ $hovered: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin-left: -15px;
  margin-top: -15px;
  background-color: ${(props) => (props.$hovered ? '#196a7d' : '#4da7bc')};
  border-radius: 50%;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  padding: 5px;
  transition: 0.3s ease-in-out;
`;

interface Props {
  lat: number;
  lng: number;
  category: Category;
  url: string;
  hovered: boolean;
  onMouseEnter?(): void;
  onMouseLeave?(): void;
}

const LinkMapMarker: FunctionComponent<Props> = (props: Props) => {
  const { category, url, hovered, onMouseEnter, onMouseLeave } = props;
  return (
    <Container
      $hovered={hovered}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      to={url}
    >
      {category === Category.Home && (
        <FaHome color="#fff" fontSize="30px"></FaHome>
      )}
      {category === Category.Boat && (
        <FaShip color="#fff" fontSize="30px"></FaShip>
      )}
      {category === Category.SmallBoat && (
        <GiPaddles color="#fff" fontSize="30px"></GiPaddles>
      )}
      {category === Category.Waterfront && (
        <FaUmbrellaBeach color="#fff" fontSize="30px"></FaUmbrellaBeach>
      )}
    </Container>
  );
};

export default LinkMapMarker;
