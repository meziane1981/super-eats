import React from 'react'
import ProductPreview from '../components/ProductPreview'

class Products extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <ProductPreview name="salad" description="a nice salad" price={20} imageUrl="./product-placeholder.jpg"/>
                    <ProductPreview name="salad" description="a nice salad" price={20} imageUrl="./product-placeholder.jpg"/>
                    <ProductPreview name="salad" description="a nice salad" price={20} imageUrl="./product-placeholder.jpg"/>
                    <ProductPreview name="salad" description="a nice salad" price={20} imageUrl="./product-placeholder.jpg"/>
                </div>
            </div>
        )
    }
}

export default Products;