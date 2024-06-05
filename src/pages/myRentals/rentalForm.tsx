import { Product } from './../../models/Product';
import { TypeToString } from '../../enums/Type';
import Translator from '../../shared/translations/Translator';
import {
  Address,
  Card,
  Contact,
  Content,
  Image,
  FirstRow,
  Price,
  SubContainer,
  Title,
  Type,
} from './../historic/Histotic.style';
import {
  ButtonContainer, 
  LinkButton,
  MobileButtonContainer,
  MobileIconContainer,
} from './MyRentals.style'
import {
  PrimaryButton,
  SecondaryButton,
} from '../../shared/buttons/Buttons.style';
import { Link } from 'react-router-dom';
import { Routes } from '../../enums/Routes';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalDialog from '../../shared/modal/Modal';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

const LinkStyle = {
  textDecoration: "none",
  display: "flex",
};

const LinkStyleIcon = {
  textDecoration: 'none',
  color: '#000000',
  justifyContent: 'flex-end',
};

interface Props {
  product: Product;
  remove(id: string): void;
}

const RentalForm = (props: Props) => {
  const text = Translator.getHistoricText();
  const listtext = Translator.getPropertyListText();
  const { product } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const remove = (id: string) => {
    props.remove(id);
    handleClose();
  };

  return (
    <Card>
      <FirstRow>
        <SubContainer>
          <MobileIconContainer>
            <FaTrashAlt onClick={() => handleShow()} />
            <LinkButton style={LinkStyleIcon} to={`/edit/products/${product._id}`}>
              <FaPencilAlt color="#4DA7BC"/>
            </LinkButton>
          </MobileIconContainer>
          <Link to={Routes.Products + '/' + product._id}>
            <Image src={product.images[product.thumbnail]}></Image>
          </Link>
          <Content style={{ maxWidth: '900px' }}>
            <Type>{TypeToString(product.category, product.type)}</Type>
            <Title>{product.title}</Title>
            <Address>{(product.address.fullAddress).replace(/,/g, ', ')}</Address>
            <Contact>{product.description}</Contact>
          </Content>
        </SubContainer>

        <ButtonContainer>
          <Price>{product.price + text.ppn}</Price>
          <Link style={LinkStyle} to={`/booking/${product._id}`}>
            <PrimaryButton>{listtext.booking}</PrimaryButton>
          </Link>
          <Link style={LinkStyle} to={`/edit/products/${product._id}`}>
            <PrimaryButton>{listtext.edit}</PrimaryButton>
          </Link>
          <SecondaryButton onClick={() => handleShow()}>
            {listtext.delete}
          </SecondaryButton>
        </ButtonContainer>
        <MobileButtonContainer>
          <Link style={LinkStyleIcon} to={`/booking/${product._id}`}>
            <PrimaryButton>{listtext.booking}</PrimaryButton>
          </Link>
        </MobileButtonContainer>
      </FirstRow>

      <ModalDialog
        show={show}
        handleClose={handleClose}
        title={listtext.modaltitle}
        text={listtext.modaltext}
        secondaryBtn={true}
        secondaryBtnText={listtext.close}
        primaryBtnText={listtext.delete}
        onConfirm={() => remove(product._id)}
      />
    </Card>
  );
};

export default RentalForm;
