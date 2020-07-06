import SwipeableViews from 'react-swipeable-views';

// const theme2 = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#757ce8',
//       main: '#3f50b5',
//       dark: '#002884',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#ff7961',
//       main: '#f44336',
//       dark: '#ba000d',
//       contrastText: '#000',
//     },
//     background: {
//       guobaColor: '#ffd54f',
//     },
//   },
// });


const items = [
    {
      id: 0,
      title: 'chilli fish',
      price: 'RM 30.20',
      quantity: '0',
      buttonVariant: 'outlined',
    },
    {
      id: 1,
      title: 'bbq fried chicken',
      price: 'RM 40.10',
      quantity: '0',
      buttonVariant: 'outlined',
    },
    {
      id: 2,
      title: 'sweet and sour fish',
      price: 'RM 30.20',
      quantity: '0',
      buttonVariant: 'outlined',
    },
    {
      id: 3,
      title: 'chilli fried chicken',
      price: 'RM 30.20',
      quantity: '0',
      buttonVariant: 'outlined',
    },
  ];

  
// const rows = [
//   createRow('Fried Chicken', 100, 1.15),
//   createRow('Coke', 10, 45.99),
//   createRow('Curry Fish', 2, 17.99),
// ];

// const invoiceSubtotal = subtotal(rows);
// const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// const invoiceTotal = invoiceTaxes + invoiceSubtotal;

          // Object.entries(temp1).map(k=>k[1]).findIndex(el=>el==null)
          // e=Object.entries(temp1)
          //   e.reduce((a,e,i)=> {
          //     if (e.includes(null))
          //         a.push(i);
          //     return a;
          // }, []);

  // if (uncommittedOrders) {
  //   const rows2 = createRows(uncommittedOrders);
  //   // setRows(rows2);
  // }

  // useEffect(() => {
  //   if (categories && category) {
  //     console.log(categories);
  //     console.log(category);
  //     console.log(
  //       Object.values(categories)
  //         .map(n => n.name)
  //         .indexOf(category),
  //     );
  //   }
  // }, [categories, category]);



                    // console.log('hehe');
                  // if (
                  //   uncommittedOrders &&
                  //   Object.values(uncommittedOrders)
                  //     .map(({ title }) => title)
                  //     .includes(menuItem.title)
                  // ) {
                  //   setmI({
                  //     ...menuItem,
                  //     quantity: Object.values(uncommittedOrders).find(
                  //       obj => obj.title === menuItem.title,
                  //     ).quantity,
                  //   });
                    // menuItem.quantity = Object.values(uncommittedOrders).find(
                    //   obj => obj.title === menuItem.title,
                    // ).quantity;
                    // console.log(menuItem);

                    // const menuItem = {
                    //   ...menuItem,
                    // quantity: Object.values(uncommittedOrders).find(
                    //   obj => obj.title === menuItem.title,
                    // ).quantity,
                    // };
                  // } else {
                  //   setmI({ ...menuItem });
                  // }

                        {/* <Container className={classes.cardGrid} maxWidth="md">
        <List dense style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {uncommittedOrders &&
            Object.values(uncommittedOrders).map((item, index) => (
              // Object.keys(uncommittedOrders).map((key, index) => {
              // const { quantity } = uncommittedOrders[key];
              // const item = {
              //   title: key,
              //   quantity,
              // };
              <Product item={item} />
            ))}
        </List>
        <Grid container spacing={2}>
          {uncommittedOrders && 
            Object.values(uncommittedOrders).map((item, index) => (
              <Product item={item} />
            ))}
        </Grid>
      </Container> */}
