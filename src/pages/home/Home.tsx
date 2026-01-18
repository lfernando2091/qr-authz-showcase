import { NavLink } from "react-router-dom"


export const HomePage = () => {
    return (<>
        <NavLink to="/checkout/abc" end>
            Checkout
        </NavLink>
        <br/>
        <NavLink to="/scan-qr" end>
            Scan QR
        </NavLink>
        <br/>
        <NavLink to="/store" end>
            Store
        </NavLink>
        <br/>
        <NavLink to="/shopping-cart" end>
            Shopping Cart
        </NavLink>
    </>)
}