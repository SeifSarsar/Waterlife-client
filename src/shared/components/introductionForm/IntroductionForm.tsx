import { Component, Fragment, ChangeEvent } from 'react';
import { TextArea } from './IntroductionForm.style';
import {
  FormTitle,
  FieldTitle,
} from '../../../pages/createProduct/CreateProduct.style';
import Translator from '../../translations/Translator';
import { Product } from '../../../models/Product';
import { Input, InputError } from '../../inputs/Inputs.style';

interface Props {
  product: Product;
  isEdit: boolean;
  update(product: Product, isAction: boolean): void;
}

interface State {}

class IntroductionForm extends Component<Props, State> {
  componentDidMount() {
    this.update(this.props.product);
  }

  update = (product: Product) => {
    const { title, description } = product;
    this.props.update(product, this.isNext(title, description));
  };

  isNext = (title: string, description: string) => {
    return title.length >= 10 && description.length >= 50;
  };

  onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.update({
      ...this.props.product,
      title: event.target.value,
    });
  };

  onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    this.update({
      ...this.props.product,
      description: event.target.value,
    });
  };

  render() {
    const { title, description } = this.props.product;
    const { isEdit } = this.props;
    const text = Translator.getCreateProductText().descriptionForm;
    return (
      <Fragment>
        {!isEdit && <FormTitle>Introduction</FormTitle>}
        <FieldTitle>{text.titleQuestion}</FieldTitle>
        <Input
          type="text"
          className={title.length < 10 ? 'invalid' : ''}
          placeholder="Title"
          value={title}
          maxLength={80}
          width="100%"
          onChange={this.onTitleChange}
        />
        {title.length < 10 && <InputError>{text.titleerror}</InputError>}

        <FieldTitle>{text.description}</FieldTitle>
        <TextArea
          placeholder="Description"
          className={description.length < 50 ? 'invalid' : ''}
          value={description}
          rows={8}
          maxLength={1000}
          onChange={this.onDescriptionChange}
        ></TextArea>
        {description.length < 50 && (
          <InputError>{text.descriptionerror}</InputError>
        )}

        <InputError></InputError>
      </Fragment>
    );
  }
}

export default IntroductionForm;
