import React from "react";
import { Typography, Button } from "antd";
import "./OrderConfirmation.css";

const { Title } = Typography;

export default function OrderConfirmation() {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "30px",
        border: "1px solid black",
      }}
    >
      <Title level={2} style={{ marginBottom: "20px" }}>
        Order Confirmation
      </Title>
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid gray",
          borderTop: "1px solid gray",
        }}
      >
        <div style={{ flex: "2" }}>
          <Title
            level={4}
            style={{
              marginBottom: "30px",
              fontSize: "22px",
              marginTop: "20px",
            }}
          >
            Invoice details
          </Title>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: "1", textAlign: "center" }}>
              <p style={{ marginBottom: "20px" }}>Customer's name</p>
              <p style={{ marginBottom: "20px" }}>Address1</p>
              <p style={{ marginBottom: "20px" }}>Address2</p>
              <p style={{ marginBottom: "20px" }}>Postcode</p>
            </div>
            <div style={{ flex: "1", textAlign: "center" }}>
              <p style={{ marginTop: "5px", marginBottom: "20px" }}>
                <strong>Order id</strong>
              </p>
              <p style={{ marginBottom: "20px" }}>
                <strong>Date</strong>
              </p>
              <p style={{ marginBottom: "20px" }}>
                <strong>Status</strong>
              </p>
            </div>
          </div>
        </div>
        <div style={{ flex: "1", borderLeft: "1px solid gray" }}>
          <Title
            level={4}
            style={{
              marginBottom: "30px",
              fontSize: "22px",
              marginTop: "20px",
            }}
          >
            Delivery details
          </Title>
          <div style={{ textAlign: "center" }}>
            <p style={{ marginTop: "15px", marginBottom: "20px" }}>
              Customer's name
            </p>
            <p style={{ marginBottom: "20px" }}>Address1</p>
            <p style={{ marginBottom: "20px" }}>Address2</p>
            <p style={{ marginBottom: "20px" }}>Postcode</p>
          </div>
        </div>
      </div>
      <Title level={4} style={{ marginTop: "20px", fontSize: "22px" }}>
        Order details
      </Title>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            borderBottom: "1px solid gray",
          }}
        >
          <div style={{ flex: "1" }}>
            <p style={{ marginBottom: "30px" }}>
              <strong>Product details</strong>
            </p>
            <p style={{ marginBottom: "20px" }}>Product Name</p>
            <p style={{ marginBottom: "20px" }}>Product Type</p>
            <p style={{ marginBottom: "20px" }}>Product Area</p>
            <p style={{ marginBottom: "40px" }}>Seller</p>
          </div>
          <div style={{ flex: "1" }}>
            <p style={{ marginBottom: "30px" }}>
              <strong>Qty</strong>
            </p>
            <p>1</p>
          </div>
          <div style={{ flex: "1" }}>
            <p style={{ marginBottom: "30px" }}>
              <strong>Price</strong>
            </p>
            <p>£9.99</p>
          </div>
          <div style={{ flex: "1" }}>
            <p style={{ marginBottom: "30px" }}>
              <strong>Total</strong>
            </p>
            <p>£9.99</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            style={{
              margin: "0 30px",
              backgroundColor: "#0053b3",
              fontSize: "20px",
              width: "220px",
              height: "40px",
              marginTop: "30px",
            }}
          >
            Continue Shopping
          </Button>
          <Button
            type="primary"
            style={{
              margin: "0 30px",
              backgroundColor: "#0053b3",
              fontSize: "20px",
              width: "220px",
              height: "40px",
              marginTop: "30px",
            }}
          >
            Print Invoice
          </Button>
          <Button
            type="primary"
            style={{
              margin: "0 30px",
              backgroundColor: "#0053b3",
              fontSize: "20px",
              width: "220px",
              height: "40px",
              marginTop: "30px",
            }}
          >
            Back to My Order
          </Button>
        </div>
      </div>
    </div>
  );
}
