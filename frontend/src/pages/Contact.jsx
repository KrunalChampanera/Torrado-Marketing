import { Container, Row, Col, Form, Button } from "react-bootstrap"
import PageHeader from "../components/PageHeader"
import InstagramSection from "../components/InstagramSection"

const Contact = () => {

return(

<>

<PageHeader title="Contact Us" breadcrumb="Contact Us" />

<section style={{padding:"60px 0"}}>

<Container>

<Row>

{/* Contact Info */}

<Col md={4}>

<div className="mb-4 d-flex">

<div style={{
width:"60px",
height:"60px",
background:"#eef5f9",
display:"flex",
alignItems:"center",
justifyContent:"center",
marginRight:"15px"
}}>

<i className="bi bi-telephone"></i>

</div>

<div>

<h6>Phone:</h6>
<p>(800) 216 2020<br/>(800) 216 2030</p>

</div>

</div>


<div className="mb-4 d-flex">

<div style={{
width:"60px",
height:"60px",
background:"#eef5f9",
display:"flex",
alignItems:"center",
justifyContent:"center",
marginRight:"15px"
}}>

<i className="bi bi-envelope"></i>

</div>

<div>

<h6>Email:</h6>
<p>hello@torado.com<br/>info@torado.com</p>

</div>

</div>


<div className="mb-4 d-flex">

<div style={{
width:"60px",
height:"60px",
background:"#eef5f9",
display:"flex",
alignItems:"center",
justifyContent:"center",
marginRight:"15px"
}}>

<i className="bi bi-geo-alt"></i>

</div>

<div>

<h6>Location:</h6>
<p>
29 Street, Melbourne City<br/>
29 Street, New York City
</p>

</div>

</div>

</Col>


{/* Contact Form */}

<Col md={8}>

<h4 className="mb-4">Get In Touch</h4>

<Form>

<Row>

<Col md={6}>
<Form.Control placeholder="Name" className="mb-3"/>
</Col>

<Col md={6}>
<Form.Control placeholder="Email" className="mb-3"/>
</Col>

</Row>


<Row>

<Col md={6}>
<Form.Control placeholder="Phone" className="mb-3"/>
</Col>

<Col md={6}>
<Form.Control placeholder="Subject" className="mb-3"/>
</Col>

</Row>

<Form.Control
as="textarea"
rows={5}
placeholder="Message"
className="mb-3"
/>

<Button
style={{
background:"#2b8db9",
border:"none",
width:"100%",
padding:"12px"
}}
>
Submit
</Button>

</Form>

</Col>

</Row>

</Container>

</section>


{/* Google Map */}

<div style={{width:"100%",height:"450px"}}>

<iframe
title="map"
width="100%"
height="100%"
style={{border:0}}
loading="lazy"
allowFullScreen
src="https://www.google.com/maps?q=Melbourne%20Australia&output=embed"
></iframe>

</div>

<InstagramSection/>

</>

)

}

export default Contact