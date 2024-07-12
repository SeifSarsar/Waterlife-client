import { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AxiosHandler from '../../shared/AxiosHandler';
import Translator from '../../shared/translations/Translator';
import ReactStars from 'react-stars';
import { Review } from '../../models/Review';
import { Product } from '../../models/Product';
import { SecondRow, Input, Title, ButtonRating } from './Histotic.style';
import { PrimaryButton } from '../../shared/buttons/Buttons.style';
import { AuthContext } from '../../contexts/AuthContext';
import ModalDialog from '../../shared/modal/Modal';

interface Props extends RouteComponentProps {
  productId: string;
  product: Product;
}

interface State {
  product: Product | null;
  star: number;
  comment: string;
  showModal: boolean;
}

class ProductReview extends Component<Props, State> {
  params = this.props.match.params;
  productId: string = (this.params as any)?.id;
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  constructor(props: Props) {
    super(props);
    this.state = {
      product: null,
      star: 0,
      comment: '',
      showModal: false,
    };

    this.handleComment = this.handleComment.bind(this);
    this.starChange = this.starChange.bind(this);
    this.fetchProductDescription = this.fetchProductDescription.bind(this);
    this.sendReview = this.sendReview.bind(this);
  }

  fetchProductDescription = () => {
    AxiosHandler.get(`/get/productdescription`, {
      params: {
        id: this.props.productId,
      },
    })
      .then((res) => {
        if (res) {
          const product: Product = res.data;
          this.setState({
            product: product,
          });
          this.findStarReview();
        }
      })
      .catch(() => {});
  };

  findStarReview = () => {
    if (this.props.product != null) {
      for (let i = 0; i < this.props.product.reviews.length; i++) {
        if (this.props.product.reviews[i].userId === this.context.user?._id) {
          this.setState({
            star: this.props.product.reviews[i].rating,
            comment: this.props.product.reviews[i].comment,
          });
        }
      }
    }
  };

  componentDidMount() {
    this.fetchProductDescription();
  }

  starChange = (newRating: number) => {
    this.setState({ star: newRating });
  };

  handleComment = (event: any) => {
    this.setState({ comment: event.target.value });
  };

  deteleOldReview = (oldReview: Review[]) => {
    for (let i = 0; i < oldReview.length; i++) {
      if (oldReview[i].userId === this.context.user?._id) {
        oldReview.splice(i, 1);
      }
    }
  };

  calculNewRating = (oldReview: Review[], review: Review): any => {
    let average = review.rating;
    for (let i = 0; i < oldReview.length; i++) {
      if (oldReview[i].rating != null) {
        average += oldReview[i].rating;
      }
    }
    average = average / (oldReview.length + 1);
    return average;
  };

  sendReview = () => {
    const user = this.context.user;
    if (!user) return;

    let newreview: Review = {
      userId: user._id,
      rating: this.state.star,
      comment: this.state.comment,
      userName: user.firstName + ' ' + user.lastName,
      date: new Date(),
    };
    if (newreview.rating === undefined) {
      newreview.rating = 0;
    }
    let oldReviews: Review[] = [];
    if (this.props.product) {
      oldReviews = this.props.product.reviews;
      this.deteleOldReview(oldReviews);
      let newRating = this.calculNewRating(oldReviews, newreview);

      oldReviews.push(newreview);

      if (this.props.productId !== null) {
        const review = {
          productId: this.props.productId,
          rate: newRating,
          reviews: oldReviews,
        };

        AxiosHandler.put(`/add/review`, review).then(() => {
          this.setState({ showModal: true });
        });
      }
    }
  };

  render() {
    const text = Translator.getHistoricText();
    const { star, comment, showModal } = this.state;

    return (
      <SecondRow>
        <Title> {text.review} </Title>
        <ReactStars
          count={5}
          value={star}
          onChange={this.starChange}
          size={36}
          color2={'#50bed6'}
        />
        <Input
          id="comment"
          value={comment}
          onChange={this.handleComment}
          placeholder={text.comment}
        />
        <ButtonRating>
          <PrimaryButton onClick={this.sendReview}>{text.review}</PrimaryButton>
        </ButtonRating>

        <ModalDialog
          handleClose={() => {
            this.setState({ showModal: false });
          }}
          onConfirm={() => {
            this.setState({ showModal: false });
          }}
          show={showModal}
          title={Translator.getConfirmationsText().infoconfirm}
          secondaryBtn={false}
          primaryBtnText={'Ok'}
        />
      </SecondRow>
    );
  }
}

export default withRouter(ProductReview);
