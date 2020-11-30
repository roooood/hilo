import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'transparent',
        color: 'rgb(230, 230, 230)',
        fontWeight: 'bold',
        fontSize: 12,
        padding: 5,
        border: 0,
        width: 13,
        maxWidth: 13,
    },
    body: {
        backgroundColor: 'rgba(157, 157, 157, .1)',
        color: 'rgb(180, 180, 180)',
        border: 0,
        width: 11,
        maxWidth: 13,
        padding: 5,
        '&:first-child': {
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
        },
        '&:last-child': {
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
        }
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {

    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        borderCollapse: 'separate',
        borderSpacing: '0 5px'
    },
});

export default function CustomizedTables({ header, body }) {
    const classes = useStyles();
    const keys = Object.keys(header);
    return (
        <TableContainer  >
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {keys.map((th, i) =>
                            <StyledTableCell key={i} {...(i > 0 ? { align: "right" } : {})} > {header[th]}</StyledTableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {body.map((row, k) => (
                        <StyledTableRow key={k}>
                            {keys.map((th, i) =>
                                <StyledTableCell key={i} {...(i > 0 ? { align: "right" } : {})} style={row?.style?.[th]}> {row[th]}</StyledTableCell>
                            )}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
