import React, { Component } from "react";

export const CartContext = React.createContext();

export class CartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem("listCart") || "[]"),
    };

    this.addToCart = this.addToCart.bind(this);
    this.removedAllItems = this.removedAllItems.bind(this);
    this.deleteItems = this.deleteItems.bind(this);
    this.incrementItems = this.incrementItems.bind(this);
    this.decrementItems = this.decrementItems.bind(this);
  }

  addToCart(product) {
    let listCart = JSON.parse(localStorage.getItem("listCart") || "[]");
    let list = this.state.cartItems;
    let y = list.map(items => items.id)
    let x = y.includes(product.id)

    console.log(x)
    console.log(list);
    if(x === true ){console.log("x ton tai")}else{console.log("x khong ton tai")}
    //add item to cart and save in localStorage
    /* test check id  */
    if (listCart) {
      if (listCart.length !== 0) {
        if(x === true){
          let checkID = listCart.map(items => {if(product.id === items.id){
            return {
              id: items.id,
                image: items.image,
                title: items.title,
                price: items.price,
                count: items.count + 1,
                total: items.price * items.count
            }
          }else{
            return {...items}
          }});
          localStorage.setItem("listCart",JSON.stringify(checkID.map(items => ({
            id: items.id,
            image: items.image,
            title: items.title,
            price: items.price,
            count: items.count ,
            total: items.price * items.count
          }))));
          this.setState({
            cartItems: JSON.parse(localStorage.getItem("listCart")),
          });
        }else{
          this.setState({
            cartItems: this.state.cartItems.concat(product),
          });
          listCart.push(product);
          localStorage.setItem(
            "listCart",
            JSON.stringify(
              listCart.map((items) => ({
                id: items.id,
                image: items.image,
                title: items.title,
                price: items.price,
                count: items.count,
                total: items.price * items.count,
              }))
            )
          );
        }
      } else {
        this.setState({
          cartItems: this.state.cartItems.concat(product),
        });
        localStorage.setItem(
          "listCart",
          JSON.stringify([
            {
              id: product.id,
              image: product.image,
              title: product.title,
              price: product.price,
              count: product.count,
              total: product.price * product.count,
            },
          ])
        );
      }

      /* check */
      /* this.setState({
        cartItems: this.state.cartItems.concat(product),
      });
      listCart.push(product);
      localStorage.setItem(
        "listCart",
        JSON.stringify(
          listCart.map((items) => ({
            id: items.id,
            image: items.image,
            title: items.title,
            price: items.price,
            count: items.count,
            total: items.price * items.count,
          }))
        )
      ); */
      /* check 2 */
    } else {
      this.setState({
        cartItems: this.state.cartItems.concat(product),
      });
      localStorage.setItem(
        "listCart",
        JSON.stringify([
          {
            id: product.id,
            image: product.image,
            title: product.title,
            price: product.price,
            count: product.count,
            total: product.price * product.count,
          },
        ])
      );
    }
  }
  /* Remove all */
  removedAllItems() {
    this.setState({
      cartItems: JSON.parse(localStorage.removeItem("listCart") || "[]"),
    });
  }
  /* Delete an item */
  deleteItems(product) {
    let currentItems = this.state.cartItems;
    currentItems = currentItems.filter((items) => items.id !== product.id);
    localStorage.setItem("listCart", JSON.stringify(currentItems));

    this.setState({
      cartItems: JSON.parse(localStorage.getItem("listCart")),
    });
  }
  /* Increment an items in localStorage */
  incrementItems(product) {
    let increment = this.state.cartItems;
    increment = increment.map((items) => {
      if (items.id === product.id) {
        return {
          id: items.id,
          image: items.image,
          title: items.title,
          price: items.price,
          count: items.count + 1,
        };
      } else {
        return {
          ...items,
        };
      }
    });
    localStorage.setItem(
      "listCart",
      JSON.stringify(
        increment.map((items) => ({
          id: items.id,
          image: items.image,
          title: items.title,
          price: items.price,
          count: items.count,
          total: items.price * items.count,
        }))
      )
    );
    this.setState({
      cartItems: JSON.parse(localStorage.getItem("listCart")),
    });
  }
  /* Decrement an item in localStorage */
  decrementItems(product) {
    let decrement = this.state.cartItems;
    decrement = decrement.map((items) => {
      if (items.id === product.id && items.count > 1) {
        return {
          id: items.id,
          image: items.image,
          title: items.title,
          price: items.price,
          count: items.count - 1,
        };
      } else {
        return {
          ...items,
        };
      }
    });
    localStorage.setItem(
      "listCart",
      JSON.stringify(
        decrement.map((items) => ({
          id: items.id,
          image: items.image,
          title: items.title,
          price: items.price,
          count: items.count,
          total: items.price * items.count,
        }))
      )
    );

    this.setState({
      cartItems: JSON.parse(localStorage.getItem("listCart")),
    });
  }
  render() {
    return (
      <CartContext.Provider
        value={{
          cartItems: this.state.cartItems,
          addToCart: this.addToCart,
          removedAllItems: this.removedAllItems,
          deleteItems: this.deleteItems,
          incrementItems: this.incrementItems,
          decrementItems: this.decrementItems,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
