import { useEffect,useState } from "react"
import { Container,Row,Col,Button,Card } from "react-bootstrap"
import API from "../services/api"

const BASE_URL = "http://localhost:5000/uploads/"

const Coupons = ()=>{

const [coupons,setCoupons] = useState([])

useEffect(()=>{

fetchCoupons()

},[])

const fetchCoupons = async()=>{

const res = await API.get("/coupons")

setCoupons(res.data)

}

const copyCode = (code)=>{

navigator.clipboard.writeText(code)

alert("Coupon copied: "+code)

}

return(

<section style={{padding:"60px 0"}}>

<Container>

<h3 className="mb-4">Latest Deals & Coupons</h3>

{coupons.map(coupon=>(

<Card className="mb-3 p-3" key={coupon.id}>

<Row>

<Col md={2}>

<img
src={BASE_URL+coupon.image}
style={{width:"100px"}}
/>

</Col>

<Col md={8}>

<h5>{coupon.title}</h5>

<p>{coupon.description}</p>

<div>

<span style={{color:"red",fontWeight:"600"}}>
${coupon.newPrice}
</span>

<span style={{
textDecoration:"line-through",
marginLeft:"10px"
}}>
${coupon.oldPrice}
</span>

</div>

</Col>

<Col md={2} className="text-center">

<Button
variant="outline-primary"
onClick={()=>copyCode(coupon.code)}
>
Get Code
</Button>

</Col>

</Row>

</Card>

))}

</Container>

</section>

)

}

export default Coupons