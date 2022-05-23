import express, {
  json
} from 'express';
import morgan from 'morgan'; 
import cors from 'cors'; 
const cron = require('node-cron');

const app = require('express')();

var server = require('http').createServer(app);



app.use(morgan('dev'));
//app.use(json());
app.use(cors());
app.use(express.static('public'));
app.use(express.json({
  limit: '50mb'
}));



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});



import userRoutes from './routes/user.router';
import customerRoutes from './routes/customer.router';
import saleRoutes from './routes/sale.router';
import stockRoutes from './routes/stock.router';
import routeRoutes from './routes/route.router';
import productRoutes from './routes/product.router';
import locationRoutes from './routes/location.router';
import inventoryRoutes from './routes/inventory.router';
import extraExpenseRoutes from './routes/extraExpense.router';
import supplierRoutes from './routes/supplier.router';
import customerListRoute from './routes/customerList.router';
import inventoryInitialRoutes from './routes/inventoryInitial.router';
import { duplicateRoute } from '../src/services/route/duplicateRoute'





app.use("/api/user", userRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/sale", saleRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/route", routeRoutes);
app.use("/api/product", productRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/extraExpense", extraExpenseRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/inventoryInitial", inventoryInitialRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/customerList", customerListRoute);



// cron.schedule('* * * * * 0', function() {
//   console.log("Validando rutas")
//   duplicateRoute();
// });


server.listen(3002, function () {
  console.log('listening on *:3100');
});
