import React, { Component } from 'react';
import '../public/css/app.css';
import ReactDOM from 'react-dom';

const Initialproducts =[
];

class ProductRow extends Component{
  render(){
    const product = this.props.product;
    return(
          <tr>
          <td>{product.Product_id}</td>
          <td>{product.Product_name}</td>
          <td>{product.Category}</td>
          <td>${product.Price}</td>
          <td><a href={product.Image} target="_blank">{product.Image}</a></td>
          </tr>
    );
  }
}


class ProductTable extends Component{
  render(){
    const productRows = this.props.products.map(product => <ProductRow key={product.Product_id} product={product}/>);
    return(
        <table className="bordered-table">
          <thead>
          <tr>
            <th>Product_id</th>
            <th>Product_name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
          </thead>
          <tbody>
            {productRows}
          </tbody> 
        </table>
    );
  }
}

class ProductAdd extends Component{
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    const form = document.forms.productAdd;
    const product ={
      Product_id:'0',
      Product_name : form.Product_name.value,
      Category : form.Category.value,
      Price : form.Price.value,
      Image :form.Image.value,
    }
    const temp = product.Image;
    this.props.createProduct(product);    
    form.Product_name.value = "";
    form.Category.value = "";
    form.Price.value = "";
    form.Image.value = "";
  }
  render(){
    return(
      <div className="form">
      <form name="productAdd" onSubmit={this.handleSubmit} className="main">
        <input type="text" name = "Product_name" placeholder="Product_name" />
          <select name="Category" className="select" placeholder="Category">
            <option value="Shirts">Shirts</option>
            <option value="Jeans">Jeans</option>
            <option value="Jackets">Jackets</option>
            <option value="Sweaters">Sweaters</option>
            <option value="Accessories">Accessories</option>
          </select>
          <div class="dollar"> <input type="text" name = "Price" placeholder="Price" /></div>
        <input type="text" name = "Image" placeholder="Image" />
        <button>Add Product</button>
      </form>
      </div>
    );
  }
}
export default class ProductList extends Component{
  constructor(props){
    super(props);
    this.state={products : []};
    this.createProduct = this.createProduct.bind(this);
  }
  componentDidMount(){
    this.loadData();
  }
  loadData(){
    setTimeout(()=>{
      this.setState({products:Initialproducts});
    },500);
  }
  createProduct(product){
    product.Product_id = this.state.products.length +1;
    const newProductList = this.state.products.slice();
    newProductList.push(product);
    this.setState({products:newProductList});
  }
  
  
  render(){
    return(
      <div className="container">
      <React.Fragment>
        <h1>My Company Inventory</h1>
        <hr />
        <div className="table">
        <ProductTable products={this.state.products}/>
        </div>
        <hr />
        <ProductAdd createProduct={this.createProduct}/>
        <hr />
      </React.Fragment>
      </div>
    );
  }
}

const element = <ProductList />;
ReactDOM.render(element,document.getElementById('root'));
