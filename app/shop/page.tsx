import {Suspense} from 'react';import ShopClient from '@/components/shop-client'
export default function ShopPage(){return <Suspense fallback={<div className="container-grid py-32 text-center">Loading collection…</div>}><ShopClient/></Suspense>}
