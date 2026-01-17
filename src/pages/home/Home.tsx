import { NavLink } from "react-router-dom"


export const HomePage = () => {
    return (<>
        <NavLink to="/checkout/abc" end>
            Checkout
        </NavLink>
        <NavLink to="/scan-qr" end>
            Scan QR
        </NavLink>
        <NavLink to="/store" end>
            Store
        </NavLink>
    </>)
}