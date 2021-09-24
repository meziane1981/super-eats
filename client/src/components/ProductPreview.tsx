import React from 'react';

interface ProductPreviewProps {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

function ProductPreview(props: ProductPreviewProps) {
    return(
        <div>
            <img src={props.imageUrl} alt={props.name} />
            <div>
                <h3>{props.name}</h3>
                <p>{props.description}</p>
                <div>
                    <p>{"€" + props.price}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        </div>)
    ;
}

export default ProductPreview;