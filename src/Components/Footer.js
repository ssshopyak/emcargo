import React, { useEffect, useState } from 'react'
import '../index.css'
import customer from '../images/support.png'
import location from '../images/location.png'
import email from '../images/email.png'
import delivery from '../images/tracking.png'
import guaranteed from '../images/guarantee.png'
import wallet from '../images/wallet.png'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Config/Config'
export const Footer = () => {

    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if(user.email === 'ostap.shopyak@gmail.com'){
                    setIsAdmin(true)
                }
            }
        })
    },[])

    return (
        <div className='footer'>
            <div className='footerContainers'>
                <h2 style={{color:'#f16a28'}}>Store Information</h2>
                <div className='shopInfo'>
                    <div>
                        <img style={{width:'50px', color:'#000', padding:'5px'}}src={customer} alt={'not found'}/>
                    </div>
                    <div style={{color:'#000',display:'flex',flexDirection:'column', marginLeft:'10px'}}>
                        <span>Call Customer Services</span> 
                        <span><a className='phoneTag' style={{color:'#000'}} href="tel:+1-708-334-0110">708-334-0110</a></span>  
                    </div>
                </div>
                <div className='shopInfo'>
                    <div>
                        <img style={{width:'50px', color:'#000', padding:'5px'}}src={location} alt={'not found'}/>
                    </div>
                    <div style={{color:'#000',display:'flex',flexDirection:'column', marginLeft:'10px'}}>
                        <span>Address</span>
                        <span>4210 W 124th Pl, Alsip, IL 60803</span>
                    </div>
                </div>
                <div className='shopInfo'>
                    <div>
                        <img style={{width:'50px', color:'#000', padding:'5px'}}src={email} alt={'not found'}/>
                    </div>
                    <div style={{color:'#000',display:'flex',flexDirection:'column', marginLeft:'10px'}}>
                        <span>Email</span>
                        <span>Info@eemparts.com</span>
                    </div>
                </div>
            </div>
            <div className='footerContainers'>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <h2 style={{color:'#f16a28'}}>Information</h2>
                    <Link to="/"  style={{color:'#000',marginTop:'5px', marginBottom:'5px'}}> About us</Link>
                    <Link to="/regulation"  style={{color:'#000',marginTop:'5px', marginBottom:'5px'}}> Store Regulations</Link>
                </div>
                <div style={{display:'flex', flexDirection:'column', marginTop:'20px'}}>
                    <h2 style={{color:'#f16a28'}}>My Account</h2>
                    <Link to="/orders" style={{color:'#000',marginTop:'5px', marginBottom:'5px'}}>My Orders (Track shipment)</Link>  
                    { isAdmin && <Link style={{color:'#000',marginTop:'5px', marginBottom:'5px'}} to="/addproducts">Add Products</Link>}
                    <Link to="/personal" style={{color:'#000',marginTop:'5px', marginBottom:'5px'}}>My personal info</Link>
                    <Link 
                        to={{
                            pathname:'/category',
                            state: { Category: null, SubCategory:null, Model:null, KeyWord:null }
                        }} 
                        style={{color:'#000',marginTop:'5px', marginBottom:'5px'}}>
                            Buy again
                    </Link> 
                </div>
            </div>
            <div className='footerContainers'>
                    <h2 style={{color:'#f16a28'}} className='footerTag'>Categories</h2>
                    <span style={{color: '#000',marginTop:'5px', marginBottom:'5px'}}>
                    <Link 
                        to={{
                            pathname:'/category',
                            state: { Category: 'Kenworth', SubCategory:null, Model:null,KeyWord:null }
                        }}
                        className='navlink' 
                        style={{color: '#000',marginTop:'5px', marginBottom:'5px'}}>
                        Kenworth
                    </Link>
                </span>
                <span style={{color: '#000',marginTop:'5px', marginBottom:'5px'}}>
                    <Link 
                        to={{
                            pathname:'/category',
                            state: { Category: 'Volvo', SubCategory:null, Model:null,KeyWord:null }
                        }}
                        className='navlink' 
                        style={{color: '#000',marginTop:'5px', marginBottom:'5px'}}>
                        Volvo
                    </Link>
                </span>
                <span style={{color: '#000',marginTop:'5px', marginBottom:'5px'}}>
                    <Link 
                        to={{
                            pathname:'/category',
                            state: { Category: 'DearGuards', SubCategory:null, Model:null,KeyWord:null }
                        }}
                        className='navlink' 
                        style={{color: '#000',marginTop:'5px', marginBottom:'5px'}}>
                        Dear Guards
                    </Link>
                </span>
                <span style={{color: '#000',marginTop:'5px', marginBottom:'5px'}}>
                    <Link 
                        to={{
                            pathname:'/category',
                            state: { Category: 'Freightliner', SubCategory:null, Model:null,KeyWord:null }
                        }}
                        className='navlink' 
                        style={{color: '#000',marginTop:'5px', marginBottom:'5px'}}>
                        Freightliner
                    </Link>
                </span>
                <span style={{color: '#000',marginTop:'5px', marginBottom:'5px'}}>
                    <Link 
                        to={{
                            pathname:'/category',
                            state: { Category: 'Peterbilt', SubCategory:null, Model:null, KeyWord:null }
                        }}
                        className='navlink' 
                        style={{color: '#000',marginTop:'5px', marginBottom:'5px'}}>
                        Peterbilt
                    </Link>
                </span>
                <span style={{color: '#000',marginTop:'5px', marginBottom:'5px'}}>
                        <Link 
                            to={{
                                pathname:'/category',
                                state: { Category: null, SubCategory:null, Model:null, KeyWord:null }
                            }}
                            className='navlink' 
                            style={{color: '#000',marginTop:'5px', marginBottom:'5px'}}>
                            All Products
                        </Link>
                </span>
            </div>
            <div className='footerContainers'>
                <h2 style={{color:'#f16a28'}}>Our Advantages</h2>
                <div className='shopInfo'>
                        <div>
                            <img style={{width:'50px', color:'#000', padding:'5px'}}src={delivery} alt={'not found'}/>
                        </div>
                        <div style={{color:'#000',display:'flex',flexDirection:'column', marginLeft:'10px'}}>
                            <span>That's right, if you live in the Chicago area</span>
                            <span>and spend over $500 on our website,</span>
                            <span>you'll receive free shipping on your order.</span> 
                        </div>
                    </div>
                    <div className='shopInfo'>
                        <div>
                            <img style={{width:'50px', color:'#000', padding:'5px'}}src={guaranteed} alt={'not found'}/>
                        </div>
                        <div style={{color:'#000',display:'flex',flexDirection:'column', marginLeft:'10px'}}>
                            <span>A guarantee of high quality or a full refund</span>
                        </div>
                    </div>
                    <div className='shopInfo'>
                        <div>
                            <img style={{width:'50px', color:'#000', padding:'5px'}}src={wallet} alt={'not found'}/>
                        </div>
                        <div style={{color:'#000',display:'flex',flexDirection:'column', marginLeft:'10px'}}>
                            <span>Available store pick up</span>
                        </div>
                    </div>
                </div>
        </div>
    )
}
