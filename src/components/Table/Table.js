import React, {useState} from 'react'

//Boostrap
import Table from 'react-bootstrap/Table'

//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';

import './Table.css'

const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
    table_head_root: {
        border: '1px solid rgba(145, 158, 171, 0.32)'
    },
    table_head: {
        fontWeight: "600",
        textTransform: "uppercase",
        color: "blue",
        fontSize:' 0.75rem',
        lineHeight: '1.5',
        letterSpacing: '1.2px',
    },
    tableRow: {
        cursor: "pointer",
        '&:hover': {
            backgroundColor: "#EAF2F8"
        },
        fontSize:' 0.79rem',
        lineHeight: '1.5',
        letterSpacing: '1.2px',
        fontWeight: "540",
        color: "black"
    },
    collapseCell: {
        paddingBottom: 0, 
        paddingTop: 0
    },
    opened: {
        backgroundColor: "#EAF2F8",
    }
});


const  Row = (props) => {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const renderMoreDetails = () => {
        return (
            <div className = "more_detail_container">
                <h6>React Js</h6>
                <p className = "more_detail_content">
                    <span>Conducted By : </span>
                    Steven Nickman
                </p>
                <p className = "more_detail_content">
                    <span>Payment Id : </span>
                    PI00001
                </p>
            </div>
        )
    }
  
    return (
      <React.Fragment>
        <tr hover className={`${classes.tableRow} ${open && classes.opened}`} onClick={() => setOpen(!open)}>
            <td>{row.id}</td>
            <td>{row.type}</td>
            <td>{row.date}</td>
            <td>{row.amount}</td>
        </tr>
        <tr>
            <td className = {classes.collapseCell} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        { renderMoreDetails() }
                    </Box>
                </Collapse>
            </td>
        </tr>
      </React.Fragment>
    )
}

const TableComponent = ({type, tableHead, rows}) => {
    const classes = useStyles();
    const renderTableHead = () => {
        return (
            <tr className = {classes.table_head_root}>
                { tableHead.map(item => <th className = {classes.table_head}>{item}</th> ) }
            </tr>
        )
    }

    return (
        <Table borderless responsive>
            <thead>
                { renderTableHead() }
            </thead>
            <tbody>
                { rows.map(item => <Row row = {item} type = {type}/> ) }
            </tbody>
        </Table>
    )
}

export default TableComponent
