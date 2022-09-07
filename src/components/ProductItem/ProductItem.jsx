import React from 'react';
import './ProductItem.css';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/cart/CartActions';
import { addToFavorites } from '../../redux/favorites/FavoritesActions';
import { Link } from 'react-router-dom';
import { ReactComponent as Favorite } from '../../assets/icons/favorites.svg';

function ProductItem(props) {
    // console.log(props)
    const {name, price, currency, image, id} = props;

    return(
        <div className="product-item col-12 col-md-4 mb-3 d-flex flex-column align-items-center">
            <Link to={`/product/${id}`} className="d-flex flex-column align-items-center">
                <img src={image} alt="productPhoto" className="mb-2"/>
                <p className="mb-1 text-center">{ name }</p>
                <p className="text-center">{ price + currency }</p>
            </Link>
            <div>
                <button
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
                </button>
                <button
                    className="btn btn-outline-dark"
                    onClick={() => props.addToFavorites({
                        productF: {
                            id,
                            name,
                            price,
                            currency,
                            image
                        }
                    })}
                >
                    <Favorite className='m1-2'/>
                </button>
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

export default connect(null, mapDispatchToProps)(ProductItem);