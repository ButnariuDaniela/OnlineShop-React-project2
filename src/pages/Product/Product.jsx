import React from 'react';
import Layout from '../../components/Layout/Layout';
import products from '../../utils/products.json';
import './Product.css';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/cart/CartActions';
import { addToFavorites } from '../../redux/favorites/FavoritesActions';
import { ReactComponent as Favorite } from '../../assets/icons/favorites.svg';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import DataTableCrudDemo from '../../components/Table/Table'


class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            product1: [{
                id: 1,
                name: "",
                price: 0,
                currency: "",
                inaltime: 0,
                latime: 0,
                optiune: '',
                quantity: 0
            }],
            idsFavorites: []
        }
    }

    componentDidMount() {
        const { match } = this.props;
        const idsFavorites = this.props.favoritesProducts.map((product) => product.id).sort();
        this.setState({ idsFavorites: idsFavorites })
        const productId = match.params.productId;
        const categoryValues = Object.values(products);
        const productItems = categoryValues.reduce((acc, category) => {
            return [
                ...acc,
                ...category.items
            ]
        }, []);
        const currentProduct = productItems.find(product => {
            return Number(productId) === product.id;
        });
        this.setState({ product: currentProduct });
    }

    disableButton() {
        document.getElementById(`button-favorites`).disabled = true;
    }

    render() {
        const { product } = this.state;
        const isInFavorites = this.state.idsFavorites.includes(this.state.product.id);

        return (
            <Layout>
                <div className="product-page container-fluid container-min-max-width">
                    <h1 className="my-5 h2">{product.name}</h1>
                    <div className="product-info d-flex">
                        <div className="d-flex mr-5">
                            <img className='image-wrapper mr-5' src={product.image} alt="Product presentation" />
                            <div className="product-details">
                                <p className="h3 text-danger">{product.price} {product.currency}</p>
                                {isInFavorites
                                    ? <div></div>
                                    : <button
                                        className="btn btn-outline-dark mb-4"
                                        id={`button-favorites`}
                                        onClick={() => {
                                            this.props.addToFavorites({
                                                productF: {
                                                    id: product.id,
                                                    name: product.name,
                                                    price: product.price,
                                                    currency: product.currency,
                                                    image: product.image
                                                }
                                            });
                                            this.disableButton();
                                        }}
                                    >
                                        <Favorite className='m1-2' />
                                    </button>
                                }
                                <p><span className="font-weight-bold">Mărime</span>: {product.size}</p>
                                <p><span className="font-weight-bold">Culoare</span>: {product.colour}</p>
                                <p><span className="font-weight-bold">Material</span>: {product.material}</p>
                                <p><span className="font-weight-bold">Brand</span>: {product.brand}</p>
                                <p className="font-weight-bold mb-1">Descriere:</p>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card">
                            <DataTableCrudDemo id={product.id} name={product.name} price={product.price} image={product.image} />
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        favoritesProducts: state.favorites.favoritesProducts,
        isInFavorites: this.isInFavorites
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (payload) => dispatch(addToCart(payload)),
        addToFavorites: (payload) => dispatch(addToFavorites(payload)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);