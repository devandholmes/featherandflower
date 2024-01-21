import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import Icon from "@mdi/react";
import IOrder from "../../types/Order";
import { mdiEye, mdiCancel, mdiPlay, mdiRefresh } from "@mdi/js";

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = await db.collection('orders').get();
      let fetchedOrders: IOrder[] = ordersCollection.docs.map(doc => doc.data() as IOrder);
      setOrders(fetchedOrders);
      console.log(fetchedOrders);
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ paddingTop: '200px' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell align="right">User Name</TableCell>
              <TableCell align="right">User Email</TableCell>
              <TableCell align="right">User Mobile</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Delivery Type</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.user.userName}>
                <TableCell component="th" scope="row">
                  {order.orderNumber}
                </TableCell>
                <TableCell align="right">{order.user.userName}</TableCell>
                <TableCell align="right">{order.user.userEmailAddress}</TableCell>
                <TableCell align="right">{order.user.userMobileNumber}</TableCell>
                <TableCell align="right">{order.total}</TableCell>
                <TableCell align="right">{order.deliveryType}</TableCell>
                <TableCell align="right">{moment(order.date).format('MM/DD/YYYY')}</TableCell>
                <TableCell align="right">
                  <Tooltip title="View Order">
                    <IconButton color="inherit" onClick={() => setSelectedOrder(order)}>
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
          </TableBody>
        </Table>
      </TableContainer>
      {selectedOrder && (
        <Dialog fullWidth={true} open={Boolean(selectedOrder)} onClose={() => setSelectedOrder(null)}>
          <DialogTitle>Order Details</DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product ID</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Cost Price</TableCell>
                    <TableCell align="right">Selling Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedOrder.items.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell component="th" scope="row">
                        {product.id}
                      </TableCell>
                      <TableCell align="right">{product.name}</TableCell>
                      <TableCell align="right">{product.costPrice}</TableCell>
                      <TableCell align="right">{product.sellingPrice}</TableCell>
                      <TableCell align="right">{product.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Orders;