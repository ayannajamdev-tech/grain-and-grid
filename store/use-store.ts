'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, Review } from '@/data/products'
export type CartItem = { product: Product; qty: number }
export type Order = { id:string; items:{name:string;qty:number;price:number}[]; total:number; customer:{name:string;email:string;phone:string;address:string;location:string;city:string;postalCode:string}; payment:'Cash on Delivery'|'Bank Transfer'; date:string }
type Store = { cart:CartItem[]; orders:Order[]; userReviews:Record<string,Review[]>; toast:string|null; addToCart:(p:Product,qty?:number)=>void; removeFromCart:(id:string)=>void; setQty:(id:string,qty:number)=>void; clearCart:()=>void; placeOrder:(o:Omit<Order,'id'|'date'>)=>string; addReview:(id:string,r:Omit<Review,'id'>)=>void; showToast:(m:string)=>void }
export const useStore = create<Store>()(persist((set,get)=>({cart:[],orders:[],userReviews:{},toast:null,
 addToCart:(p,qty=1)=>{set(s=>{const ex=s.cart.find(i=>i.product.id===p.id);return {cart:ex?s.cart.map(i=>i.product.id===p.id?{...i,qty:i.qty+qty}:i):[...s.cart,{product:p,qty}]}});get().showToast(`${p.name} added to your cart`)},
 removeFromCart:id=>set(s=>({cart:s.cart.filter(i=>i.product.id!==id)})),
 setQty:(id,qty)=>set(s=>({cart:qty<=0?s.cart.filter(i=>i.product.id!==id):s.cart.map(i=>i.product.id===id?{...i,qty}:i)})),
 clearCart:()=>set({cart:[]}),
 placeOrder:o=>{const id=`GG-${Date.now().toString().slice(-8)}`;set(s=>({orders:[{...o,id,date:new Date().toISOString()},...s.orders]}));return id},
 addReview:(id,r)=>set(s=>({userReviews:{...s.userReviews,[id]:[...(s.userReviews[id]||[]),{...r,id:Date.now()}]}})),
 showToast:m=>{set({toast:m});setTimeout(()=>set({toast:null}),2600)}
}),{name:'grain-grid-store'}))
export const useCartCount=()=>useStore(s=>s.cart.reduce((n,i)=>n+i.qty,0))
export const useCartTotal=()=>useStore(s=>s.cart.reduce((n,i)=>n+i.product.price*i.qty,0))
