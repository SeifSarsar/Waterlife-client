import { FunctionComponent } from 'react';
import {
  Container,
  Image,
  Content,
  Title,
  Bottom,
  Price,
  Type,
  Address,
} from './Listing.style';
import ReactStars from 'react-stars';
import { TypeToString } from '../../../../enums/Type';
import { Category } from '../../../../enums/Category';
import { Product } from '../../../../models/Product';
import Translator from '../../../../shared/translations/Translator';

interface Props {
  product: Product;
  url: string;
  hovered: boolean;
}

const Listing: FunctionComponent<Props> = (props: Props) => {
  const { product, hovered, url } = props;

  const text = Translator.getProductsText();

  return (
    <Container $hovered={hovered} to={url}>
      <Image src={product.images[product.thumbnail]}></Image>
      <Content>
        <Type>{TypeToString(product.category, product.type)}</Type>
        <Title>{product.title}</Title>
        <Address>{product.address.fullAddress.replace(/,/g, ', ')}</Address>
        <Bottom>
          <div>
            <ReactStars
              count={5}
              edit={false}
              value={product.rating}
              size={20}
              color1={'#f8f8f8'}
              color2={'#4da7bc'}
            />
          </div>
          <div>
            <Price>${product.price}</Price>
            <span>
              {product.category === Category.Home && '/' + text.nights}
              {product.category === Category.Boat && '/' + text.hours}
            </span>
          </div>
        </Bottom>
      </Content>
    </Container>
  );
};

export default Listing;
