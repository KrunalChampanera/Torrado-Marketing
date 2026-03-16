import { useEffect, useState } from "react"
import { Container, Row, Col, Form, InputGroup, FormControl, Card, Badge, Spinner } from "react-bootstrap"
import API from "../services/api"
import { Link, useNavigate } from "react-router-dom"
import InstagramSection from "./InstagramSection"
import PageHeader from "./PageHeader"

const BASE_URL = "http://localhost:5000/uploads/"

const Shop = () => {

  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("default")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const productsPerPage = 12

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await API.get("/products")
      setProducts(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const filtered = [...products]

    .filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )

    .sort((a, b) => {

      if (sort === "priceLow") return a.price - b.price

      if (sort === "priceHigh") return b.price - a.price

      if (sort === "rating") return (b.rating || 0) - (a.rating || 0)

      if (sort === "newest") return b.id - a.id

      if (sort === "nameAZ") return a.title.localeCompare(b.title)

      if (sort === "nameZA") return b.title.localeCompare(a.title)

      return 0
    })

  const indexOfLast = currentPage * productsPerPage
  const indexOfFirst = indexOfLast - productsPerPage

  const currentProducts = filtered.slice(indexOfFirst, indexOfLast)

  const totalPages = Math.ceil(filtered.length / productsPerPage)

  const handleAddToCart = (e, product) => {
    e.preventDefault()
    e.stopPropagation()

    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const existingItem = cart.find(item => item.id === product.id)

    if (existingItem) {
      existingItem.qty += 1
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        couponId: product.couponId,
        qty: 1
      })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    alert(`${product.title} added to cart!`)
  }

  if (loading) {
    return (
      <>
        <PageHeader title="Shop" breadcrumb="Shop" />
        <section style={{
          padding: "100px 0",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Container>
            <div style={{ textAlign: "center" }}>
              <Spinner animation="border" style={{ color: "#ff6b35", marginBottom: "20px" }} />
              <p style={{ color: "#666", fontSize: "1.1rem" }}>Loading products...</p>
            </div>
          </Container>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHeader title="Shop" breadcrumb="Shop" />

      <section style={{
        padding: "80px 20px",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        minHeight: "100vh"
      }}>

        <Container style={{ maxWidth: "1400px" }}>

          {/* Filters Section */}
          <div style={{
            marginBottom: "50px",
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)"
          }}>

            <Row style={{ alignItems: "center", gap: "20px" }}>

              {/* Results Count */}
              <Col lg={3} md={6}>
                <div style={{
                  padding: "15px",
                  background: "#f8f9fa",
                  borderRadius: "8px",
                  textAlign: "center"
                }}>
                  <p style={{
                    margin: 0,
                    color: "#666",
                    fontWeight: "500"
                  }}>
                    <strong style={{ color: "#1a1a1a", fontSize: "1.1rem" }}>
                      {filtered.length}
                    </strong>
                    {" "}Products Found
                  </p>
                  <small style={{ color: "#999" }}>
                    Showing {indexOfFirst + 1}-{Math.min(indexOfLast, filtered.length)}
                  </small>
                </div>
              </Col>

              {/* Search Input */}
              <Col lg={4} md={6}>
                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#1a1a1a",
                    fontSize: "0.9rem"
                  }}>
                    Search Products
                  </label>
                  <InputGroup style={{ borderRadius: "8px", overflow: "hidden" }}>
                    <FormControl
                      placeholder="Search by name..."
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value)
                        setCurrentPage(1)
                      }}
                      style={{
                        padding: "12px 15px",
                        fontSize: "0.95rem",
                        border: "1px solid #ddd"
                      }}
                    />
                    <span style={{
                      padding: "12px 15px",
                      background: "#f8f9fa",
                      borderLeft: "1px solid #ddd"
                    }}>
                      🔍
                    </span>
                  </InputGroup>
                </div>
              </Col>

              {/* Sort Dropdown */}
              <Col lg={5} md={6}>
                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#1a1a1a",
                    fontSize: "0.9rem"
                  }}>
                    Sort By
                  </label>
                  <Form.Select
                    value={sort}
                    onChange={(e) => {
                      setSort(e.target.value)
                      setCurrentPage(1)
                    }}
                    style={{
                      padding: "12px 15px",
                      fontSize: "0.95rem",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      cursor: "pointer"
                    }}
                  >
                    <option value="default">Default Sorting</option>
                    <option value="newest">Newest First</option>
                    <option value="priceLow">💰 Price: Low to High</option>
                    <option value="priceHigh">💰 Price: High to Low</option>
                    <option value="rating">⭐ Rating High to Low</option>
                    <option value="nameAZ">A-Z Name</option>
                    <option value="nameZA">Z-A Name</option>
                  </Form.Select>
                </div>
              </Col>

            </Row>

          </div>

          {/* Products Grid */}
          {currentProducts.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "80px 20px",
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "15px" }}>🔍</div>
              <h3 style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                color: "#1a1a1a",
                marginBottom: "10px"
              }}>
                No Products Found
              </h3>
              <p style={{ color: "#666", marginBottom: "25px" }}>
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearch("")
                  setSort("default")
                  setCurrentPage(1)
                }}
                style={{
                  background: "#ff6b35",
                  color: "white",
                  border: "none",
                  padding: "12px 30px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <Row style={{ gap: "20px", marginBottom: "50px" }}>

              {currentProducts.map((product) => (
                <Col lg={3} md={4} sm={6} key={product.id} style={{ marginBottom: "20px" }}>

                  <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>

                    <Card style={{
                      border: "none",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                      transition: "all 0.3s ease",
                      height: "100%",
                      cursor: "pointer",
                      background: "white"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)"
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.12)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "0 2px 12px rgba(0, 0, 0, 0.06)"
                    }}
                    >

                      {/* Product Image Container */}
                      <div style={{
                        position: "relative",
                        height: "250px",
                        background: "#f8f9fa",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden"
                      }}>

                        {product.image && (
                          <Card.Img
                            variant="top"
                            src={BASE_URL + product.image}
                            style={{
                              height: "100%",
                              objectFit: "contain",
                              padding: "20px"
                            }}
                          />
                        )}

                        {/* Badges */}
                        <div style={{
                          position: "absolute",
                          top: "15px",
                          left: "15px",
                          display: "flex",
                          gap: "8px",
                          flexWrap: "wrap"
                        }}>
                          {product.isNew && (
                            <Badge bg="success" style={{ fontSize: "0.75rem", fontWeight: "600" }}>
                              NEW
                            </Badge>
                          )}
                          {product.isTopDeal && (
                            <Badge bg="danger" style={{ fontSize: "0.75rem", fontWeight: "600" }}>
                              TOP DEAL
                            </Badge>
                          )}
                          {product.isPopular && (
                            <Badge bg="warning" text="dark" style={{ fontSize: "0.75rem", fontWeight: "600" }}>
                              POPULAR
                            </Badge>
                          )}
                        </div>

                        {/* Coupon Badge */}
                        {product.Coupon && (
                          <div style={{
                            position: "absolute",
                            bottom: "15px",
                            right: "15px",
                            background: "linear-gradient(135deg, #ff6b35, #e85a2a)",
                            color: "white",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            fontSize: "0.8rem",
                            fontWeight: "600"
                          }}>
                            Save {product.Coupon.discountType === "percentage" ? product.Coupon.discountValue + "%" : "$" + product.Coupon.discountValue}
                          </div>
                        )}

                      </div>

                      {/* Product Info */}
                      <Card.Body style={{ padding: "20px" }}>

                        {/* Title */}
                        <Card.Title style={{
                          fontSize: "0.95rem",
                          fontWeight: "600",
                          color: "#1a1a1a",
                          marginBottom: "12px",
                          lineHeight: "1.3",
                          minHeight: "40px"
                        }}>
                          {product.title}
                        </Card.Title>

                        {/* Rating */}
                        {product.rating && (
                          <div style={{ marginBottom: "12px" }}>
                            <span style={{ color: "#ffc107", fontSize: "0.9rem" }}>
                              ⭐ {product.rating.toFixed(1)}
                            </span>
                          </div>
                        )}

                        {/* Price */}
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "15px"
                        }}>
                          <span style={{
                            fontSize: "1.3rem",
                            fontWeight: "700",
                            color: "#ff6b35"
                          }}>
                            ${product.price?.toFixed(2)}
                          </span>
                          {product.oldPrice && (
                            <span style={{
                              fontSize: "0.85rem",
                              textDecoration: "line-through",
                              color: "#999"
                            }}>
                              ${product.oldPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          style={{
                            width: "100%",
                            background: "linear-gradient(135deg, #007bff, #0056b3)",
                            color: "white",
                            border: "none",
                            padding: "12px",
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "all 0.3s ease"
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = "scale(1.02)"
                            e.target.style.boxShadow = "0 4px 12px rgba(0, 123, 255, 0.3)"
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = "scale(1)"
                            e.target.style.boxShadow = "none"
                          }}
                        >
                          🛒 Add to Cart
                        </button>

                      </Card.Body>

                    </Card>

                  </Link>

                </Col>
              ))}

            </Row>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              marginTop: "50px",
              marginBottom: "30px",
              flexWrap: "wrap"
            }}>

              {currentPage > 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  style={{
                    padding: "10px 16px",
                    border: "1px solid #ddd",
                    background: "#fff",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    color: "#1a1a1a",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#f8f9fa"
                    e.target.style.borderColor = "#ff6b35"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#fff"
                    e.target.style.borderColor = "#ddd"
                  }}
                >
                  ← Previous
                </button>
              )}

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  style={{
                    padding: "10px 14px",
                    minWidth: "44px",
                    border: "1px solid " + (currentPage === i + 1 ? "#ff6b35" : "#ddd"),
                    background: currentPage === i + 1 ? "linear-gradient(135deg, #ff6b35, #e85a2a)" : "#fff",
                    color: currentPage === i + 1 ? "#fff" : "#1a1a1a",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== i + 1) {
                      e.target.style.borderColor = "#ff6b35"
                      e.target.style.color = "#ff6b35"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== i + 1) {
                      e.target.style.borderColor = "#ddd"
                      e.target.style.color = "#1a1a1a"
                    }
                  }}
                >
                  {i + 1}
                </button>
              ))}

              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  style={{
                    padding: "10px 16px",
                    border: "1px solid #ddd",
                    background: "#fff",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    color: "#1a1a1a",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#f8f9fa"
                    e.target.style.borderColor = "#ff6b35"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#fff"
                    e.target.style.borderColor = "#ddd"
                  }}
                >
                  Next →
                </button>
              )}

            </div>
          )}

        </Container>

      </section>

      <InstagramSection />

    </>
  )

}

export default Shop