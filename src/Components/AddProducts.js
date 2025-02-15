import React, { useEffect, useState } from 'react'
import {db, uploadImages } from '../Config/Config'
import {toShowError, toShowSuccess} from './FlashMessages'
import { collection, addDoc, getDoc, getDocs } from "firebase/firestore";

export const AddProducts = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [model, setModel] = useState('')
    const [description, setDescription] = useState('')
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [models, setModels] = useState([])
    const [side, setSide] = useState(false)

    const types = ['image/png', 'image/jpeg']; // image types

    const productImgHandler = (e) => {
        let selectedFile = e.target.files;
        for(let i = 0; i < selectedFile.length; i ++){
            if (selectedFile && types.includes(selectedFile[0].type)) {
                setProductImg(selectedFile);
            }
            else {
                setProductImg(null);
                toShowError('Please select a valid image type (jpg or png)');
                return;
            }
        }
        setProductImg(selectedFile)
            
    }

    // add product
    const addProduct = (e) => {
        e.preventDefault();
        uploadImages(productImg).then((res)=>{
            try {
                const docRef = addDoc(collection(db, "Products"), {
                    ProductID: new Date().toLocaleDateString('ua-UA').split('.').join('') + new Date().getHours().toString().padStart(2, '0') + new Date().getMinutes().toString().padStart(2, '0') + new Date().getSeconds().toString().padStart(2, '0'),
                    ProductName: productName,
                    ProductPrice: Number(productPrice),
                    ProductCategory: category,
                    ProductSubCategory: subCategory,
                    ProductModel: model,
                    ProductSide: side,
                    ProductImg: res,
                    ProductDescription: description
                }).then((docRef) => {
                    toShowSuccess('Successfully added a product')
                    setProductName('');
                    setProductPrice(0)
                    setProductImg('');
                    setDescription('')
                    document.getElementById('file').value = '';
                })
            } catch (e) {
              console.error("Error adding document: ", e);
            }   
        }).catch((e)=>{
            console.log(e)
        })
    }

    useEffect(()=>{
        const querySnapshot = getDocs(collection(db, 'CategoriesForNavBar')).then((querySnapsot) => {
            querySnapsot.forEach((doc) => {
                if(doc.id === 'categories') {
                    setCategories(doc.data().data)
                }
                if(doc.id === 'subcategories'){
                    setSubCategories(doc.data().data)
                }
                if(doc.id === 'models'){
                    setModels(doc.data().data)
                }
              });
        })
    },[])

    return (
        <div className='addProducts'>
            <h2>ADD PRODUCTS</h2>
            <form autoComplete="off" className='formContainer' onSubmit={addProduct}>
                <div className='inputContainer'>
                    <span>Product Name</span>
                    <input type="text" className='input' required
                        onChange={(e) => setProductName(e.target.value)} value={productName} />
                </div>
                <div className='inputContainer'>
                    <span>Product Price</span>
                    <input type="number" className='input' required
                        onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                </div>    
                <div className='inputContainer'>
                    <span>Product Category</span>
                    <select value={category} onChange={(event)=>{setCategory(event.target.value)}}>
                        { 
                            categories.map((elem) => {
                                if (elem  !== 'All Products'){
                                    return (
                                        <option value={elem}>{elem}</option>
                                    ) 
                                }
                            })
                        }
                    </select>
                </div>
                <div className='inputContainer'>
                    <span>Product SubCategory</span>
                    <select value={subCategory} onChange={(event)=>{setSubCategory(event.target.value)}}>
                        { 
                            subCategories.map((elem) => {
                                    return (
                                        <option value={elem}>{elem}</option>
                                    ) 
                            })
                        }
                    </select>
                </div>
                <div className='inputContainer'>
                    <span>Product Model</span>
                    <select value={model} onChange={(event)=>{setModel(event.target.value)}}>
                        { 
                            models.map((elem) => {
                                    return (
                                        <option value={elem}>{elem}</option>
                                    ) 
                            })
                        }
                    </select>
                </div>
                <div className='inputContainer'>
                    <span>Product Side <input type="checkbox" checked={side} onChange={() => {setSide(!side)}} /></span>
                </div>
                <div className='inputContainer'>
                    <span>Product Image</span>
                    <input
                        type="file"
                        className='input'
                        accept="image/*"
                        id="file"
                        required
                        multiple
                        onChange={productImgHandler}
                    />
                </div>
                <div className='inputContainer'>
                    <span>Product description</span>
                    <textarea 
                        rows="4"
                        cols="50"
                        name="comment"
                        form="usrform"
                        onChange={(event)=>{setDescription(event.target.value)}}    
                    />
                </div>
                <button type="submit" className='btn btn-success btn-md mybtn'>ADD</button>
            </form>
            {/* {error && <span className='error-msg'>{error}</span>} */}
        </div>
    )
}
