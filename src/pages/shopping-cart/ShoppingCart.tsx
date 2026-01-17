import {
    Box,
    Button,
    Divider,
    FormControl,
    Grid2, IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import {AuthZPaymentPage} from "./AuthZPayment.tsx";
import {useState} from "react";
import type {AuthZStatusType} from "./AuthZModels.ts";
// import {IconButton} from "@react-m3/m3";
// import SettingIcon from '@mui/icons-material/Settings';

interface CartItem {
    image: string;
    name: string;
    unit_price: string;
    amount: number;
}

interface CartData {
    items: CartItem[];
    subtotal: string;
    shipping_estimate: string;
    tax_estimate: string;
    total: string;
}

const data: CartData = {
    items: [
        {
            image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
            name: "Basic shirt",
            unit_price: "$32.00",
            amount: 1
        },
        {
            image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
            name: "Basic black shirt",
            unit_price: "$30.00",
            amount: 3
        },
        {
            image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-01-product-03.jpg",
            name: "Nomad Tumbler",
            unit_price: "$40.00",
            amount: 2
        }
    ],
    subtotal: "$100.00",
    shipping_estimate: "$25.00",
    tax_estimate: "$10.00",
    total: "$135.00"
}

const TRANSACTION_ID = "0";

interface CartItemProps {
    item: CartItem;
}

const CartItem = ({ item }: CartItemProps) => {
    return (
        <Stack direction="row" spacing={3}>
            <img src={item.image}
                 alt="cloth"
                 style={{ width: "12rem", height: "12rem", objectFit: "cover" }} />
            <Stack spacing={2} sx={{ width: "50%" }}>
                <Typography variant="emphasizedLabelMedium">
                    { item.name }
                </Typography>
                <Typography variant="emphasizedLabelMedium">
                    { item.unit_price }
                </Typography>
            </Stack>
            <Stack direction="row" spacing={2}
                   justifyContent="space-between"
                   sx={{ width: "100%" }}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="amount-label">Amount</InputLabel>
                        <Select
                            labelId="amount-label"
                            id="amount-select"
                            value={item.amount}
                            label="Amount"
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <div>
                    <IconButton color="primary">
                        <ClearIcon/>
                    </IconButton>
                </div>
            </Stack>
        </Stack>
    )
}

export const ShoppingCart = () => {

    const loadData = data;
    const [openAuthZPayment, setOpenAuthZPayment] = useState(false);

    const onCloseAuthZPayment = (_state: AuthZStatusType) => {
        setOpenAuthZPayment(false)
    }

    const onClickQRCheckout = () => {
        setOpenAuthZPayment(true);
    }

    return <Stack spacing={3}>
        <Typography variant="displaySmall">
            Shopping Cart
        </Typography>
        <Grid2 container spacing={2} sx={{ paddingY: 6 }}>
            <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 8 }}>
                <Stack spacing={3}>
                    { loadData.items.map((item: CartItem) => (
                        <CartItem key={item.name} item={item}/>
                    ))}
                </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="emphasizedTitleSmall">
                        Order summary
                    </Typography>

                    <Stack sx={{ paddingY: 4 }} spacing={3} divider={<Divider/>}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="bodySmall">
                                Subtotal
                                {/*<IconButton><SettingIcon /></IconButton>*/}
                            </Typography>
                            <Typography variant="bodySmall">
                                { loadData.subtotal }
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="bodySmall">
                                Shipping estimate
                            </Typography>
                            <Typography variant="bodySmall">
                                { loadData.shipping_estimate }
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="bodySmall">
                                Tax estimate
                            </Typography>
                            <Typography variant="bodySmall">
                                { loadData.tax_estimate }
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="emphasizedTitleSmall">
                                Total
                            </Typography>
                            <Typography variant="emphasizedTitleSmall">
                                { loadData.total }
                            </Typography>
                        </Stack>
                    </Stack>
                    <Button variant="filled" fullWidth onClick={onClickQRCheckout}>
                        QR Checkout
                    </Button>
                </Paper>
            </Grid2>
        </Grid2>
        <AuthZPaymentPage open={openAuthZPayment}
                          transactionId={TRANSACTION_ID}
                          onClose={onCloseAuthZPayment}/>
    </Stack>
}