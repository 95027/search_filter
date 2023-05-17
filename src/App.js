import './App.css';
import {useEffect, useState} from 'react';


function App() {

  const [products, setProducts] = useState([]);
  const [records, setRecords] = useState([]);

  const [search, setSearch] = useState([]);

  useEffect(()=>{
    fetch('https://dummyjson.com/products')
    .then(res=>res.json())
    .then(data=>{
      setProducts(data.products);
      setRecords(data.products);
    })
    .catch(err=>console.log(err))
  },[])


 const searchedProduct = ()=>{
  let filtered = records.filter(product=>{
    return product.category.toLowerCase().includes(search.toString().toLowerCase());
  })

  if(search ==='')
  {
    alert('Please search something...!')
  }

  if(filtered.length ===0)
  {
    alert('no products matched...!');
    setProducts(records);
  }
  else
  {
    setProducts(filtered);
  }

}


  return (
    <div className="App">
      <div className='search'>
      <input type='search' placeholder='product name' value={search} onChange={(e)=>setSearch(e.target.value)}/>
      <button onClick={searchedProduct}>Search</button>
      </div>
      {

        products.map(item=>{
          const {description, category, title, rating, id, price, thumbnail} = item;
          return(
            <div key={id} className='container'>
              <h1>{category}</h1>
              <div>
                <img src={thumbnail} alt='logo' />
              </div>
              <div className='info'>
                <h2>{id}. {title}</h2>
                <p>price:<mark>$ {price}</mark></p>
                <p>rating: {rating}</p>
                <p className='left'><span>description:</span> {description}</p>
              </div>
            </div>
          )
        })

      }
    </div>
  );
}

export default App;
