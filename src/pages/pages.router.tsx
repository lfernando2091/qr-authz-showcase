import {Route, Routes} from "react-router-dom";
import {CheckoutPage} from "./checkout/CheckoutPage.tsx";
import {SimpleLayout} from "../layout/simple.layout.tsx";
import {ScannerPage} from "./scan-qr/ScanQRPage.tsx";
import {StorePage} from "./store/StorePage.tsx";
import {HomePage} from "./home/Home.tsx";
import {ShoppingCart} from "./shopping-cart/ShoppingCart.tsx";


export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<SimpleLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="checkout/:id" element={<CheckoutPage/>}/>
                <Route path="scan-qr" element={<ScannerPage/>}/>
                <Route path="store" element={<StorePage/>}/>
                <Route path="shopping-cart" element={<ShoppingCart/>}/>
            </Route>
        </Routes>
    )
}