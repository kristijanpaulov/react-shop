import React, { useState, useEffect, useRef } from 'react'
import './productShowcase.scss'
import { v4 as uuidv4 } from 'uuid'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCartSharp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom'

const ProductShowcase = (props) => {
    const [Products, SetProducts] = useState([]);
    const inputBackNext = useRef()
    const navigate = useNavigate()
    useEffect(() => {
        fetch('http://192.168.1.113:9000/' + props.fetch, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json().then(data => {
            SetProducts(data)
        }))
    }, [])
    const scroll = (scrollOffset) => {
        inputBackNext.current.scrollLeft += scrollOffset;
    };

    function goBack() {
        scroll(-340)
    }
    function goNext() {
        scroll(340)
    }
    function addItem(x) {
        let a = []
        let pushNewData = true
        a = JSON.parse(localStorage.getItem('cart')) || [];

        let total = 1
        let cart = a.map(e => {
            total += e.quantity
        })

        a.find(item => {
            if (item.productid == x.productid) {
                item.quantity += 1
                pushNewData = false
                props.setCartNumber(`${total}`)
                localStorage.setItem('cart', JSON.stringify(a))
            }
        })
        if (pushNewData) {
            x.quantity = 1
            a.push(x);
            props.setCartNumber(`${total}`)
            localStorage.setItem('cart', JSON.stringify(a))
        }
    }


    return (
        <div className='productShowcaseWrapper'>

            <h1>{props.name}</h1>
            <div className='productShowcase' ref={inputBackNext}>
                <div className='slides'>
                    <div className='divBack'><button className='back' onClick={goBack} ><ArrowBackIosNewIcon /></button></div>
                    <div className='divNext'><button className='next' onClick={goNext}><ArrowForwardIosIcon /></button></div>
                    <div className='productCard'>
                        {Products.map(product => (
                            <div className='card' key={uuidv4()}>
                                <h2>{product.productName}</h2>
                                <h3>Current price: {product.productPrice}$</h3>
                                <h4 onClick={() => {navigate(`/productInfo`,{state:{product:product}})}}>Click for more info</h4>
                                <img src={require(`../ProductShowcase/images/${product.productImage}`)} alt="" />
                                <div className='blackOverlay'>
                                    <button onClick={() => { addItem(product) }}><AddShoppingCartIcon /></button>

                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductShowcase