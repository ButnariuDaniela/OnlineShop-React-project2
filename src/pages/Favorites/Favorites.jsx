import React from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromFavorites } from '../../redux/favorites/FavoritesActions'
import { ReactComponent as Close} from '../../assets/icons/close.svg'


function Favorites(props) {
    console.log(props.favoritesProducts.length)
  return (
    
    <Layout>
      <div className="cart-page container-fluid container-min-max-width
                d-flex flex-column justify-content-center align-items-center">
        {
          props.favoritesProducts.length
          ? <div className="w-100">
             <div className="d-flex justify-content-between text-center h4 text-bold">
                            <p className="w-25">Produs</p>
                            <p className="w-25">Pret</p>
                            <p className="w-25">Elimina</p>
              </div>
              {
                props.favoritesProducts.map(product => {
                  return <div className="d-flex justify-content-between align-items-center text-center" key={product.id}>
                    <div className="w-25 d-flex flex-column justify-content-center align-items-center">
                      <img src={ product.image}  alt="Produs Favorit"/>
                      <p>{ product.name }</p>
                    </div>
                    <p className="w-25">{product.price} {product.currency}</p>
                    <div className="w-25" onClick={() => props.removeFromFavorites({id: product.id})}>
                        <Close/>
                    </div>
                  </div>
                })
              }
            </div>
          : <div>
              <p>Nu ai produse favorite!</p>
              <Link to="/"><button className="btn btn-outline-dark">Inapoi la home</button></Link>
            </div>

        }
      </div>
    </Layout>
  
  )
}

function mapStateToProps(state) {
  return {
      favoritesProducts: state.favorites.favoritesProducts
  };
}

function mapDispatchToProps(dispatch) {
  return {
      removeFromFavorites: (payload) => dispatch(removeFromFavorites(payload))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
