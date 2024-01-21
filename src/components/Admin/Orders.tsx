import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Icon, IconButton, Tooltip } from '@mui/material';
import IOrder from "../../types/Order";
import { mdiEye, mdiCancel, mdiPlay, mdiRefresh } from "@mdi/js";

const Orders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    useEffect(() => {
        const fetchOrders = async () => {
            const ordersCollection = await db.collection('orders').get();
            setOrders(ordersCollection.docs.map(doc => doc.data() as IOrder));
            console.log(ordersCollection);
        };

        fetchOrders();
    }, []);

    return (
        <div style={{ paddingTop: '200px' }}>
            <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Order ID</TableCell>
          <TableCell align="right">Order Details</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      {/* <TableBody>
        {cartItems.map((item) => (
          <TableRow
            key={item.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {item.id}
            </TableCell>
            <TableCell align="right">{item.name}</TableCell>
            <TableCell align="right">
              <Tooltip title="View Order">
                <IconButton color="inherit">
                  <Icon path={mdiEye} size={1} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancel Order">
                <IconButton color="inherit">
                  <Icon path={mdiCancel} size={1} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Start Order">
                <IconButton color="inherit">
                  <Icon path={mdiPlay} size={1} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Change Status">
                <IconButton color="inherit">
                  <Icon path={mdiRefresh} size={1} />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody> */}
    </Table>
  </TableContainer>
        </div>
    );
};

export default Orders;