// import React from 'react'
import { useStore } from '../store/Store'
import ShopKeeperProfile from '../components/ShopKeeperProfile';

const ShopKeeperLandingPage = () => {

    const { isShopKeeperNavOpen } = useStore();

    return (
        <div className={` transition-all bg-white w-full ${isShopKeeperNavOpen ? 'ml-[80px]' : 'ml-[260px]'}`}>
            <ShopKeeperProfile />
        </div>
    )
}

export default ShopKeeperLandingPage
