import React, {useState} from 'react'

import Table from '../../components/Table/Table'
import Pagination from '../../components/Pagination/Paginator'

//Material-UI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import GetApp from '@material-ui/icons/GetApp';

import './Payments.css'

const PaymentSummary = ({
    paymentMethods, 
    icons, 
    tableHead, 
    rows, 
    handleDownloadOnClick, 
    handleDeleteCard,
    handlePaginationOnChange,
    total,
    current,
    handleUpgradePlanOnClick,
    subscription
}) => {
    const [openMore, setMoreOpen] = useState(null)

    const handleMoreOpen = (event) => {
        setMoreOpen(event.currentTarget);
    }
    
      const handleMoreClose = () => {
        setMoreOpen(null);
    }

    const renderPaymentCard = (name, acc_num) => {
        return (
            <div className = "payment_method_card">
                <div className = "payment_method_card_top">
                    <img src = {icons[name]} alt = {name}/>
                    <div className = "more_icon" onClick = {handleMoreOpen}>
                        <MoreIcon/>
                    </div>
                    <Menu
                        id="simple-menu"
                        anchorEl={openMore}
                        keepMounted
                        open={Boolean(openMore)}
                        onClose={handleMoreClose}
                    >
                        <MenuItem onClick={handleDeleteCard}>Delete</MenuItem>
                    </Menu>
                </div>
                <div className = "card_number_block">
                    <span>{acc_num}</span>
                </div>
            </div>
        )
    }

    const renderPaymentMethod = () => {
        return (
            <div>
                <span className = "header_title_span">Payment Method</span>
                <div className = "payment_method_container">
                    <Grid container spacing={4}>
                        {
                            paymentMethods.map(item => {
                                const {name, acc_num} = item
                                return (
                                    <Grid item xs={6} sm={6} md={4}>
                                        { renderPaymentCard(name, acc_num) } 
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </div>
            </div>
        )
    }

    const renderPlan = () => {
        return (
            <div>
                <div className = "payment_method_card_top">
                    <span className = "header_title_span">Your Plan</span>
                    <Button variant="outlined" color="primary" size = "small" onClick = {handleUpgradePlanOnClick} >
                        upgarde plan
                    </Button>
                </div>
                {
                    subscription ? <h4 className = "plan_h4">{subscription}</h4>
                    :
                    <h5 className = "no_plan_h5">No Plan right now......</h5>
                }
            </div>
        )
    }

    return (
        <div className = "payment_summary_root_div">
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <div className = "summary_top shadow_card">
                        { renderPlan() }
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <div className = "summary_top shadow_card">
                        { renderPaymentMethod() }
                    </div>
                </Grid>
            </Grid>
            <div className = "summary_table shadow_card">
                <span className = "header_title_span">Invoice History</span>
                <Table 
                    type = "PAYMENTS"
                    tableHead = {tableHead}
                    rows = {rows}
                />
                <div className = "pagination_div">
                    <Pagination 
                        total = {total}
                        current = {current+1}
                        handleOnChange = {handlePaginationOnChange}
                    />
                </div>
                <div className = "add_card_block">
                    <span onClick = { handleDownloadOnClick }>
                        <GetApp/>
                        Download
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PaymentSummary
