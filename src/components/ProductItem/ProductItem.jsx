import React from 'react';
import './ProductItem.css';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/cart/CartActions';
import { addToFavorites } from '../../redux/favorites/FavoritesActions';
import { Link } from 'react-router-dom';
import { ReactComponent as Favorite } from '../../assets/icons/favorites.svg';

function ProductItem(props) {
    const { name, price, currency, image, id } = props;
    const idsFavorites = props.favoritesProducts.map((product) => product.id).sort();
    function isFavorites(id) {
        return idsFavorites.includes(id)
    }

    return (

        <div className="product-item col-12 col-md-4 mb-3 d-flex flex-column align-items-center">
            <Link to={`/product/${id}`} className="d-flex flex-column align-items-center">
                <img src={image} alt="productPhoto" className="mb-2" />
                <p className="mb-1 text-center">{name}</p>
                <p className="text-center">{price + currency}</p>
            </Link>
            <div>
                {/* <button
                    className="btn btn-outline-dark mr-2"
                    onClick={() => props.addToCart({
                        product: {
                            id,
                            name,
                            price,
                            currency,
                            image
                        }
                    })}
                >
                    Adaugă în coș
                </button> */}
                {
                    (isFavorites(id))
                        ? null
                        : <button
                            className="btn btn-outline-dark"
                            id={`button-favorite ${id}`}
                            onClick={() => {
                                props.addToFavorites({
                                    productF: {
                                        id,
                                        name,
                                        price,
                                        currency,
                                        image
                                    }
                                })
                            }}
                        >
                            <Favorite className='m1-2' />
                        </button>
                }
            </div>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (product) => dispatch(addToCart(product)),
        addToFavorites: (productF) => dispatch(addToFavorites(productF))
    };
}
function mapStateToProps(state) {
    return {
        favoritesProducts: state.favorites.favoritesProducts
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);