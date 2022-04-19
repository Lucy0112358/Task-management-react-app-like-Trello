// import React from 'react'
// import {db} from '../firebase-conf/index'
// import { useState, useEffect } from 'react'
// import {collection, getDocs} from 'firebase/firestore'

// export default function OneTask() {
//   const [users, setUsers] = useState([]);
//   const records = collection(db, "tasks");
//   useEffect(() => {
//     const asyncronous = async () => {
//       const data = await getDocs(records);
//       setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//       console.log(users);
//     };
//     asyncronous();
//   }, []);
//   return (
//     <div className="App">testin
//       {users.map((user) => {
//         return <li>{user.id} {user.title}</li>;
//       })}
//     </div>
//   );
// }



