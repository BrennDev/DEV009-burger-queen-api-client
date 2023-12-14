import { Product } from "../pages/Waiter/OrdersList";

export const auth = (email: string, password: string) => {
  return fetch('https://burger-queen-api-mock-production-f025.up.railway.app/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });
};

export const products = (token: string) => {
  return fetch('https://burger-queen-api-mock-production-f025.up.railway.app/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Authorization': `Bearer ${token}`
    },
  })
}

export const postOrder = (data: {
  client: string,
  table: string,
  products: Product[],
}, token: string) => {
  return fetch(`https://burger-queen-api-mock-production-f025.up.railway.app/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
};

export const addProduct = (data: { name: string, type: string, price: number, id: number, image: any }, token: string) => {
  return fetch(`https://burger-queen-api-mock-production-f025.up.railway.app/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: data.name,
      type: data.type,
      price: data.price,
      id: data.id,
      image: data.image,
    })
  });
};

export const allOrders = (token: string) => {
  return fetch('https://burger-queen-api-mock-production-f025.up.railway.app/orders', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Authorization': `Bearer ${token}`
    },
  });
};

export const deleteProduct = (id: number, token: string) => {
  return fetch(`https://burger-queen-api-mock-production-f025.up.railway.app/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Authorization': `Bearer ${token}`
    },
  });    
};

export const deleteOrder = (id: number, token: string) => {
  return fetch(`https://burger-queen-api-mock-production-f025.up.railway.app/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Authorization': `Bearer ${token}`
    },
  });
};

export const editProduct = (id: number, updatedData: any, token: string) => {
  return fetch(`https://burger-queen-api-mock-production-f025.up.railway.app/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updatedData)
  });
 };

 export const addUsers = (data: { name: string, email: string, password: string, role:string, id: number}, token:string) => {
  return fetch(`https://burger-queen-api-mock-production-f025.up.railway.app/users`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
          id: data.id,
      })
  });
};

export const deleteUser = (id:number, token:string) => {
  return fetch(`https://burger-queen-api-mock-production-f025.up.railway.app/users/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          'Authorization': `Bearer ${token}`
      },
  })
}

export const editUser = (id:number, updatedData:object, token:string) => {
  return fetch(`https://burger-queen-api-mock-production-f025.up.railway.app/users/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
  });
};

export const users = (token:string) => {
  return fetch(`https://burger-queen-api-mock-production-f025.up.railway.app/users`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          'Authorization': `Bearer ${token}`
      },
  })
}

export const userOrder = (id:number, token:string) => {
  return fetch(`https://burger-queen-api-mock-production-f025.up.railway.app/orders/${id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          'Authorization': `Bearer ${token}`
      }
  })
};

export const patchOrder = (id:number, updatedData:any, token:string) => {
  return fetch(`https://burger-queen-api-mock-production-f025.up.railway.app/orders/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
  });
};