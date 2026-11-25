// const login = async () => {
//     const url = "https://dummyjson.com/auth/login";

//     const result = await axios.post(url, {
//         username: "emilys",
//         password: "emilyspass"
//     }, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then(response => {
//         const token = response.data.accessToken;

//         localStorage.setItem('auth_token', token)
//     });
// }

// login();

const getOrders = async () => {
    const url = "https://dummyjson.com/auth/login";
    const token = localStorage.getItem('auth_token');

    const result = await axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}