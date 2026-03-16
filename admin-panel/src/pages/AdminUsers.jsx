// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { Table, Button, Container, Spinner, Alert } from "react-bootstrap"

// const AdminUsers = () => {
//   const [users, setUsers] = useState([])
//   const [logs, setLogs] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [logsError, setLogsError] = useState(null)

//   const loadUsers = async () => {
//     try {
//       const res = await API.get("/admin/users")
//       setUsers(res.data)
//     } catch (err) {
//       console.error("Load Users Error:", err)
//       setError("Failed to load users")
//     }
//   }

//   const loadLogs = async () => {
//     try {
//       const res = await API.get("/admin/logins")
//       setLogs(res.data)
//     } catch (err) {
//       console.error("Load Logs Error:", err)
//       setLogsError("Failed to load login activity")
//     }
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true)
//       await loadUsers()
//       await loadLogs()
//       setLoading(false)
//     }
//     fetchData()
//   }, [])

//   const deleteUser = async (id) => {
//     if (!window.confirm("Delete this user?")) return
//     try {
//       await API.delete(`/admin/users/${id}`)
//       setUsers((prev) => prev.filter((user) => user.id !== id))
//     } catch (err) {
//       console.error("Delete User Error:", err)
//       setError("Failed to delete user")
//     }
//   }

//   if (loading) {
//     return (
//       <Container style={{ padding: "40px", textAlign: "center" }}>
//         <Spinner animation="border" />
//       </Container>
//     )
//   }

//   return (
//     <Container style={{ padding: "40px" }}>
//       <h3>Registered Users</h3>
//       {error && <Alert variant="danger">{error}</Alert>}

//       <Table bordered>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length === 0 ? (
//             <tr>
//               <td colSpan="5" style={{ textAlign: "center" }}>
//                 No Users Found
//               </td>
//             </tr>
//           ) : (
//             users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.role}</td>
//                 <td>
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => deleteUser(user.id)}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>

//       <h3 className="mt-5">Login Activity</h3>
//       {logsError && <Alert variant="danger">{logsError}</Alert>}

//       <Table bordered>
//         <thead>
//           <tr>
//             <th>User ID</th>
//             <th>Email</th>
//             <th>Login Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {logs.length === 0 ? (
//             <tr>
//               <td colSpan="3" style={{ textAlign: "center" }}>
//                 No Login Activity
//               </td>
//             </tr>
//           ) : (
//             logs.map((log) => (
//               <tr key={log.id}>
//                 <td>{log.userId}</td>
//                 <td>{log.email}</td>
//                 <td>{log.loginTime ? new Date(log.loginTime).toLocaleString() : "N/A"}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>
//     </Container>
//   )
// }

// export default AdminUsers


import { useEffect,useState } from "react"
import API from "../services/api"
import { Table,Button,Container,Spinner,Alert } from "react-bootstrap"

const AdminUsers = () => {

const [users,setUsers] = useState([])
const [logs,setLogs] = useState([])
const [loading,setLoading] = useState(true)
const [error,setError] = useState(null)
const [logsError,setLogsError] = useState(null)

const loadUsers = async ()=>{

try{

const res = await API.get("/admin/users")

setUsers(res.data)

}catch(err){

console.error("Load Users Error:",err)

setError("Failed to load users")

}

}

const loadLogs = async ()=>{

try{

const res = await API.get("/admin/logins")

setLogs(res.data)

setLogsError(null)

}catch(err){

console.error("Load Logs Error:",err)

setLogsError("Failed to load login activity")

}

}

useEffect(()=>{

const fetchData = async ()=>{

setLoading(true)

await loadUsers()

await loadLogs()

setLoading(false)

}

fetchData()

},[])

const deleteUser = async(id)=>{

if(!window.confirm("Delete this user?")) return

try{

await API.delete(`/admin/users/${id}`)

setUsers(prev => prev.filter(user => user.id !== id))

}catch(err){

console.error("Delete User Error:",err)

setError("Failed to delete user")

}

}

if(loading){

return(

<Container style={{padding:"40px",textAlign:"center"}}>
<Spinner animation="border"/>
</Container>

)

}

return(

<Container style={{padding:"40px"}}>

<h3>Registered Users</h3>

{error && <Alert variant="danger">{error}</Alert>}

<Table bordered>

<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{users.length === 0 ? (

<tr>
<td colSpan="5" style={{textAlign:"center"}}>
No Users Found
</td>
</tr>

) : (

users.map(user => (

<tr key={user.id}>
<td>{user.id}</td>
<td>{user.name}</td>
<td>{user.email}</td>
<td>{user.role}</td>
<td>

<Button
variant="danger"
size="sm"
onClick={()=>deleteUser(user.id)}
>
Delete
</Button>

</td>
</tr>

))

)}

</tbody>

</Table>


<h3 className="mt-5">Login Activity</h3>

{logsError && <Alert variant="danger">{logsError}</Alert>}

<Table bordered>

<thead>
<tr>
<th>User ID</th>
<th>Email</th>
<th>Login Time</th>
</tr>
</thead>

<tbody>

{logs.length === 0 ? (

<tr>
<td colSpan="3" style={{textAlign:"center"}}>
No Login Activity
</td>
</tr>

) : (

logs.map(log => (

<tr key={log.id}>
<td>{log.userId}</td>
<td>{log.email}</td>
<td>{log.loginTime ? new Date(log.loginTime).toLocaleString() : "N/A"}</td>
</tr>

))

)}

</tbody>

</Table>

</Container>

)

}

export default AdminUsers