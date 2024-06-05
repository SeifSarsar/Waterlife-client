import { Component, ChangeEvent } from "react";
import { FaImages, FaTimes } from "react-icons/fa";
import { Category } from "../../../enums/Category";
import { Product } from "../../../models/Product";
import {
  FormTitle,
  FieldTitle,
} from "../../../pages/createProduct/CreateProduct.style";
import Translator from "../../translations/Translator";
import {
  DeletePicture,
  FileInput,
  Input,
  Picture,
  PictureContainer,
  Pictures,
} from "./PictureForm.style";

import { InputError } from "../../inputs/Inputs.style";

interface Props {
  product: Product;
  isEdit: boolean;
  update(product: Product, isAction: boolean): void;
}

interface State {}

class PictureForm extends Component<Props, State> {
  componentDidMount() {
    this.update(this.props.product);
  }

  update = (product: Product) => {
    const { category, images } = product;
    this.props.update(product, this.isNext(category, images));
  };

  isNext = (category: Category, images: string[]) => {
    if (images.length === 0) return false;

    if (category === Category.SmallBoat) return images.length >= 1;
    return images.length >= 3;
  };

  selectPictures = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;

    if (files) {
      const maxLength = this.props.product.category === Category.Home ? 10 : 5;
      for (let i = 0; i < Math.min(files.length, maxLength); i++) {
        const fileReader = new FileReader();
        fileReader.addEventListener(
          "load",
          () => {
            const result = fileReader.result;
            if (result) {
              this.update({
                ...this.props.product,
                images: [...this.props.product.images, result as string],
              });
            }
          },
          false
        );

        fileReader.readAsDataURL(files[i]);
      }
    }
  };
  render() {
    const { product, isEdit } = this.props;
    const { category, images, thumbnail } = product;
    const text = Translator.getCreateProductText().pictureForm;
    return (
      <div>
        {!isEdit && <FormTitle>Photos</FormTitle>}
        <Input
          type="file"
          multiple
          accept="image/png, image/jpg, image/jpeg"
          onChange={this.selectPictures}
        />
        <FileInput
          style={{
            width:
              text.selectpictures === "Select your pictures"
                ? "200px"
                : "220px",
          }}
        >
          <FaImages color="#fff" size="30px"></FaImages>
          {text.selectpictures}
        </FileInput>
        {images.length > 0 && (
          <>
            <FieldTitle>{text.selectthumbnail}</FieldTitle>
            <Pictures>
              {images.map((picture: string, index: number) => (
                <PictureContainer
                  key={index}
                  className={thumbnail === index ? "selected" : ""}
                  onClick={() =>
                    this.update({
                      ...product,
                      thumbnail: index,
                    })
                  }
                >
                  <DeletePicture
                    onClick={(e) => {
                      e.stopPropagation();
                      const newImages = images;
                      newImages.splice(index, 1);
                      this.update({
                        ...product,
                        images: newImages,
                      });
                    }}
                  >
                    <FaTimes></FaTimes>
                  </DeletePicture>
                  <Picture key={index} src={picture as string}></Picture>
                </PictureContainer>
              ))}
            </Pictures>
            {category !== Category.SmallBoat && images.length < 3 && (
              <InputError>{text.minhouse}</InputError>
            )}
            {category === Category.SmallBoat && images.length < 1 && (
              <InputError>{text.minboat}</InputError>
            )}

            <FieldTitle>{text.thumbnail}</FieldTitle>
            <Picture src={images[thumbnail]} />
          </>
        )}
      </div>
    );
  }
}

export default PictureForm;
