import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import heroImg from "./assets/family.jpeg";
import phImg from "./assets/phphoto.jpeg";
import TableImg from "./assets/table.jpeg";

import productImg1 from "./assets/maveriqa1.jpeg";
import productImg3 from "./assets/maveriqa3.jpeg";
import productImg4 from "./assets/maveriqa4.jpeg";
import productImg5 from "./assets/maveriqa5.jpeg";
import productImg6 from "./assets/maveriqa6.jpeg";

import logo from "./assets/logo.jpeg";
import Admin from "./Admin.jsx";

import "./App.css";

const defaultProducts = [
  {
      id: "default-1",
    name: "Maveriqa Pure",
    model: "Maveriqa 1",
    image: productImg1,
    display: '5" Touch Screen Display',
     Price: "₹1,29,999",
     specs: [
      ["Design", "Attractive Compact Model"],
      ["pH Range", "3.5 – 10.5"],
      ["ORP", "-750+"],
      ["Hydrogen", "1100 PPB"],
      ["Plates", "7 Titanium Platinum Coated"],
    ],
  },
  {
    id: "default-3",
    name: "MK007 Rich Ultra",
    model: "Maveriqa 3",
    image: productImg3,
    display: '7" Touch Screen',
    Price: "₹1,50,000",
    specs: [
      ["pH Range", "3.5 – 10.5"],
      ["ORP", "-1200+"],
      ["Hydrogen", "1400 PPB"],
      ["Plates", "7/9 Titanium Platinum Coated"],
    ],
  },
  {
    id: "default-4",
    name: "M10 Max Pro Premium",
    model: "Maveriqa 4",
    image: productImg4,
    display: '10.1" Touch Screen',
    Price: "₹1,75,000",
    
    specs: [
      ["pH Range", "3 – 11"],
      ["ORP", "-1400+"],
      ["Hydrogen", "1800 PPB"],
      ["Plates", "9/11 Titanium Platinum Coated"],
    ],
  },
  {
    id: "default-5",
    name: "M45 Compact",
    model: "Maveriqa 5",
    image: productImg5,
    display: '4.5" Touch Display',
    Price: "₹1,09,999",
  
    specs: [
      ["Alkaline Water", "pH 7.5 – 10.5"],
      ["Acidic Water", "pH 3.5 – 5.5"],
      ["ORP", "-900+"],
      ["Hydrogen", "11 PPB"],
      ["Plates", "5/7 Titanium Platinum Coated"],
    ],
  },
  {
    id: "default-6",
    name: "HB 501",
    model: "Maveriqa 6",
    image: productImg6,
    display: "Digital Display • Button Operated",
    Price: "₹94,999",
    specs: [
      [
        "pH Levels",
        "3.5 / 5.5 / 7.5 / 8.5 / 9.5 / 10.5",
      ],
      ["ORP", "-550+"],
      ["Hydrogen", "800 PPB"],
      ["Plates", "5 Titanium Platinum Coated"],
    ],
  },
];

const getDeletedProducts = () => {
  try {
    const saved = localStorage.getItem(
      "maveriqa_deleted_products"
    );

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const deletedProducts = getDeletedProducts();

      const visibleDefaultProducts = defaultProducts.filter(
        (product) => !deletedProducts.includes(product.id)
      );

      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      if (!response.ok) {
        throw new Error("Backend unavailable");
      }

      const data = await response.json();

      const backendProducts =
        Array.isArray(data) ? data : [];

      setProducts([
        ...visibleDefaultProducts,
        ...backendProducts,
      ]);
    } catch (error) {
      console.error("Products fetch error:", error);

      const deletedProducts = getDeletedProducts();

      const visibleDefaultProducts = defaultProducts.filter(
        (product) => !deletedProducts.includes(product.id)
      );

      setProducts(visibleDefaultProducts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOrder = (product) => {
    const message = `Hello Maveriqa,

I am interested in ordering:

Product: ${product.name}
Model: ${product.model}
Price: ${product.price}

Please contact me for order confirmation and further details.

Thank you.`;

    const whatsappUrl =
      "https://wa.me/919145442518?text=" +
      encodeURIComponent(message);

    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <nav className="navbar">
        <a href="#home" className="logo">
          <img src={logo} alt="Maveriqa Logo" />
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#technology">Technology</a>
          <a href="#water-guide">Water Guide</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <a href="#contact" className="nav-contact">
          Contact Us
        </a>
      </nav>

      {/* ================= HERO ================= */}

      <section id="home" className="hero-section">
        <div className="hero-content">
          <p className="small-title">
            ADVANCED WATER PURIFICATION
          </p>

          <h1>
            Future-Proof
            <br />
            <span>Your Health</span>
          </h1>

          <p className="hero-text">
            Experience advanced water purification
            technology designed for healthier living
            and a smarter lifestyle.
          </p>

          <div className="hero-buttons">
            <a href="#products">
              Explore Products
            </a>

            <a
              href="#technology"
              className="secondary-btn"
            >
              Discover Technology
            </a>
          </div>

          <div className="hero-highlights">
            <div>
              <strong>7</strong>
              <span>Plate Technology</span>
            </div>

            <div>
              <strong>1100</strong>
              <span>PPB Hydrogen</span>
            </div>

            <div>
              <strong>3.5–10.5</strong>
              <span>pH Range</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src={heroImg}
            alt="Maveriqa Water Purifier"
          />

          <div className="hero-image-text">
            Future-Proof Your Health
          </div>
        </div>
      </section>

      {/* ================= WHY MAVERIQA ================= */}

      <section className="why-section">
        <p className="small-title">
          WHY MAVERIQA
        </p>

        <h2>
          Pure Water.
          <span> Smarter Wellness.</span>
        </h2>

        <p>
          Maveriqa brings together modern purification
          technology, advanced ionization and
          wellness-focused innovation to deliver
          better water for everyday life.
        </p>
      </section>

      {/* ================= PRODUCTS ================= */}

      <section
        id="products"
        className="products-section"
      >
        <div className="section-heading">
          <div>
            <p className="small-title">
              OUR PRODUCTS
            </p>

            <h2>
              Meet the
              <span> Maveriqa Range.</span>
            </h2>
          </div>

          <p>
            Advanced water purification solutions
            engineered for modern homes and
            wellness-focused lifestyles.
          </p>
        </div>

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "50px",
            }}
          >
            <h3>Loading Products...</h3>
          </div>
        ) : products.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "50px",
            }}
          >
            <h3>No Products Available</h3>
          </div>
        ) : (
          <div className="product-cards">
            {products.map((product, index) => {
              const imageUrl =
                product.image?.startsWith("http")
                  ? product.image
                  : product.image?.startsWith("/uploads")
                  ? `http://localhost:5000${product.image}`
                  : product.image;

              return (
                <div
                  className="product-card"
                  key={
                    product._id ||
                    product.id ||
                    product.model ||
                    index
                  }
                >
                  <div className="product-photo">
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={product.name}
                      />
                    )}
                  </div>

                  <div className="product-info">
                    <small>{product.model}</small>

                    <h3>{product.name}</h3>

                    <p className="display-info">
                      {product.display}
                    </p>

                    <div className="product-specs">
                      {product.specs &&
                        product.specs.map(
                          (spec, specIndex) => {
                            const label =
                              Array.isArray(spec)
                                ? spec[0]
                                : spec.label;

                            const value =
                              Array.isArray(spec)
                                ? spec[1]
                                : spec.value;

                            return (
                              <div key={specIndex}>
                                <span>{label}</span>
                                <strong>{value}</strong>
                              </div>
                            );
                          }
                        )}
                    </div>

                    <div className="product-footer">
                      <div className="price-info">
                        <small>PRICE</small>
                        <div className="product-price">
                          {product.originalPrice && (
                            <span className="old-price">
                              {product.originalPrice}
                            </span>
                          )}
                          <strong className="new-price">
                            {product.price || product.Price}
                          </strong>
                        </div>
                        
                      </div>

                      <button
                        className="order-btn"
                        onClick={() =>
                          handleOrder(product)
                        }
                      >
                        Order Now →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ================= TECHNOLOGY ================= */}

      <section
        id="technology"
        className="technology-section"
      >
        <div className="technology-heading">
          <p className="small-title">
            ADVANCED TECHNOLOGY
          </p>

          <h2>
            Built for
            <span> Modern Wellness.</span>
          </h2>

          <p>
            Maveriqa combines advanced ionization
            technology, responsive controls and
            titanium platinum coated plate systems.
          </p>
        </div>

        <div className="technology-images">
          <div className="technology-image">
            <img
              src={phImg}
              alt="Maveriqa pH Technology"
            />
          </div>

          <div className="technology-image">
            <img
              src={TableImg}
              alt="Maveriqa pH Table"
            />
          </div>
        </div>

        <div className="technology-cards">
          <div>
            <strong>01</strong>
            <h3>Touch Screen Display</h3>
            <p>
              Attractive and intuitive touch
              screen displays for easy operation
              on selected models.
            </p>
          </div>

          <div>
            <strong>02</strong>
            <h3>Wide pH Range</h3>
            <p>
              Multiple pH levels according to
              each model's specifications.
            </p>
          </div>

          <div>
            <strong>03</strong>
            <h3>High Negative ORP</h3>
            <p>
              Advanced ionization technology
              with high negative ORP capability.
            </p>
          </div>

          <div>
            <strong>04</strong>
            <h3>Hydrogen-Rich Water</h3>
            <p>
              Selected Maveriqa models offer
              hydrogen levels up to 1800 PPB.
            </p>
          </div>

          <div>
            <strong>05</strong>
            <h3>Titanium Platinum Plates</h3>
            <p>
              Titanium plates with platinum
              coating across different Maveriqa models.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WATER GUIDE ================= */}

      <section
        id="water-guide"
        className="water-guide-section"
      >
        <div className="water-guide-heading">
          <p className="small-title">
            ALKALINE WATER GUIDE
          </p>

          <h2>
            Understand Your Water.
            <span> Transform Your Hydration.</span>
          </h2>

          <p>
            Across India, growing awareness about
            water quality has made pure and healthy
            drinking water an important part of
            modern wellness.
          </p>
        </div>

        <div className="water-guide-intro">
          <div className="guide-number">01</div>

          <div>
            <h3>What Is Alkaline Water?</h3>

            <p>
              Alkaline water is drinking water with
              a pH level above 7, typically between
              8 and 9.5.
            </p>

            <p>
              The alkaline nature of water can be
              associated with minerals such as
              calcium, magnesium, potassium and
              bicarbonate.
            </p>
          </div>
        </div>

        <div className="ph-scale-box">
          <div className="ph-scale-title">
            <small>UNDERSTANDING pH</small>

            <h3>
              Where Does Alkaline Water Sit?
            </h3>
          </div>

          <div className="ph-scale">
            <div className="ph-item">
              <strong>0–6</strong>
              <span>Acidic</span>
            </div>

            <div className="ph-item neutral">
              <strong>7</strong>
              <span>Neutral</span>
            </div>

            <div className="ph-item alkaline">
              <strong>8–9.5</strong>
              <span>Alkaline</span>
            </div>

            <div className="ph-item high-alkaline">
              <strong>10–14</strong>
              <span>Highly Alkaline</span>
            </div>
          </div>
        </div>

        <div className="water-difference">
          <div className="guide-section-title">
            <p className="small-title">
              THE DIFFERENCE
            </p>

            <h3>
              Alkaline Water vs Regular Water
            </h3>
          </div>

          <div className="difference-grid">
            <div className="difference-card regular-water">
              <span>01</span>

              <h4>Regular / Tap Water</h4>

              <ul>
                <li>
                  Usually around neutral pH
                </li>
                <li>
                  May contain chlorine or contaminants
                </li>
                <li>
                  Mineral content varies by source
                </li>
                <li>
                  Quality depends on water supply
                </li>
              </ul>
            </div>

            <div className="difference-card ro-water">
              <span>02</span>

              <h4>Standard RO Water</h4>

              <ul>
                <li>
                  Removes many dissolved contaminants
                </li>
                <li>
                  Can reduce naturally occurring minerals
                </li>
                <li>
                  Water profile depends on filtration stages
                </li>
                <li>
                  Post-treatment may be required
                </li>
              </ul>
            </div>

            <div className="difference-card alkaline-water">
              <span>03</span>

              <h4>Alkaline Ionized Water</h4>

              <ul>
                <li>
                  Typically produced through electrolysis
                </li>
                <li>
                  Can provide adjustable alkaline pH
                </li>
                <li>
                  May contain molecular hydrogen
                </li>
                <li>
                  Can have a negative ORP
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="ionized-water-box">
          <div className="ionized-content">
            <p className="small-title">
              NEXT GENERATION HYDRATION
            </p>

            <h3>
              What Is Alkaline Ionized Water?
            </h3>

            <p>
              Alkaline ionized water is produced
              through electrolysis. During this
              process, water passes through an
              electrolysis chamber.
            </p>

            <p>
              Depending on the ionizer design and
              operating conditions, the process can
              also generate molecular hydrogen.
            </p>
          </div>

          <div className="ionized-highlight">
            <div>
              <strong>pH</strong>
              <span>Adjustable alkaline range</span>
            </div>

            <div>
              <strong>H₂</strong>
              <span>Molecular hydrogen</span>
            </div>

            <div>
              <strong>ORP</strong>
              <span>Negative ORP capability</span>
            </div>
          </div>
        </div>

        <div className="electrolysis-section">
          <div className="guide-section-title">
            <p className="small-title">
              HOW IT WORKS
            </p>

            <h3>The Electrolysis Process</h3>

            <p>
              A high-quality alkaline water ionizer
              combines purification, filtration and
              controlled electrolysis.
            </p>
          </div>

          <div className="electrolysis-steps">
            <div className="electro-step">
              <div className="step-number">01</div>

              <h4>Pre-Filtration</h4>

              <p>
                Incoming water passes through
                filtration stages designed to reduce
                sediment, chlorine and other unwanted
                substances.
              </p>
            </div>

            <div className="electro-step">
              <div className="step-number">02</div>

              <h4>RO Purification</h4>

              <p>
                Selected systems use reverse osmosis
                to reduce dissolved solids and
                various contaminants.
              </p>
            </div>

            <div className="electro-step">
              <div className="step-number">03</div>

              <h4>Electrolysis</h4>

              <p>
                Water enters the electrolysis chamber
                where electrical current is applied
                across coated titanium plates.
              </p>
            </div>

            <div className="electro-step">
              <div className="step-number">04</div>

              <h4>Mineral Enhancement</h4>

              <p>
                Depending on the system, mineral
                management can help maintain suitable
                conductivity.
              </p>
            </div>

            <div className="electro-step">
              <div className="step-number">05</div>

              <h4>Safety & Storage</h4>

              <p>
                Advanced systems may include
                additional sanitation and storage
                protection features.
              </p>
            </div>
          </div>
        </div>

        <div className="benefits-section">
          <div className="guide-section-title">
            <p className="small-title">
              WELLNESS & HYDRATION
            </p>

            <h3>
              Potential Benefits of Alkaline Water
            </h3>

            <p>
              Research into alkaline and
              hydrogen-rich water is continuing.
              Some studies suggest potential benefits,
              although results can vary.
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <span>01</span>
              <h4>Hydration Support</h4>
              <p>
                Alkaline water can be included as part
                of a regular hydration routine.
              </p>
            </div>

            <div className="benefit-card">
              <span>02</span>
              <h4>Antioxidant Potential</h4>
              <p>
                Hydrogen-rich ionized water may have
                antioxidant properties associated with
                molecular hydrogen.
              </p>
            </div>

            <div className="benefit-card">
              <span>03</span>
              <h4>Digestive Wellness</h4>
              <p>
                Research has explored alkaline water
                in relation to gastric acidity.
              </p>
            </div>

            <div className="benefit-card">
              <span>04</span>
              <h4>Mineral Intake</h4>
              <p>
                Mineral-containing water can contribute
                calcium, magnesium and other minerals.
              </p>
            </div>

            <div className="benefit-card">
              <span>05</span>
              <h4>Active Lifestyle</h4>
              <p>
                Clean, refreshing water can support
                consistent hydration.
              </p>
            </div>

            <div className="benefit-card">
              <span>06</span>
              <h4>Everyday Wellness</h4>
              <p>
                A convenient home water system can make
                quality drinking water easier to include.
              </p>
            </div>
          </div>
        </div>

        <div className="guide-maveriqa-box">
          <div>
            <p className="small-title">
              WHY CHOOSE MAVERIQA
            </p>

            <h3>
              Advanced Technology.
              <span>
                {" "}Designed for Everyday Wellness.
              </span>
            </h3>
          </div>

          <div className="guide-maveriqa-points">
            <div>
              <strong>✓</strong>
              <p>
                Multiple pH levels across selected models
              </p>
            </div>

            <div>
              <strong>✓</strong>
              <p>
                Titanium platinum-coated plate technology
              </p>
            </div>

            <div>
              <strong>✓</strong>
              <p>
                Hydrogen-rich water capability on selected models
              </p>
            </div>

            <div>
              <strong>✓</strong>
              <p>
                Modern touch and digital controls
              </p>
            </div>
          </div>
        </div>

        <div className="medical-disclaimer">
          <strong>Medical Disclaimer</strong>

          <p>
            Alkaline water supports general wellness
            but is not a cure or replacement for medical
            treatment. Consult a qualified healthcare
            professional before making significant
            changes to your water intake.
          </p>
        </div>
      </section>

      {/* ================= ABOUT ================= */}

      <section
        id="about"
        className="about-company"
      >
        <div className="about-heading">
          <p className="small-title">
            ABOUT MAVERIQA
          </p>

          <h2>
            Pioneering Pure Water Technology
            <span> for Over 8 Years</span>
          </h2>

          <p>
            At Maveriqa, we believe that water is not
            just a basic necessity—it is the foundation
            of long-term health and vitality. Backed by
            8+ years of dedicated manufacturing expertise,
            we are a leading pioneer in designing and
            producing advanced Alkaline Water Ionizers.
          </p>

          <div className="mission-box">
            <small>OUR MISSION</small>

            <strong>
              Future-Proof Your Health.
            </strong>
          </div>
        </div>

        <div className="about-block">
          <div className="about-title">
            <span>01</span>

            <h3>Who We Are</h3>
          </div>

          <p>
            We are innovators and precision
            manufacturers in the water purification
            and ionization industry.
          </p>

          <p>
            From compact residential units to
            high-capacity systems, we engineer
            ionizers that deliver optimal pH balance,
            rich antioxidants, and molecular
            hydrogen-rich water.
          </p>
        </div>

        <div className="about-block">
          <div className="about-title">
            <span>02</span>

            <h3>What Sets Us Apart</h3>
          </div>

          <div className="about-cards">
            <div>
              <strong>8+</strong>
              <h4>
                Years of Engineering Excellence
              </h4>
              <p>
                Over eight years of continuous research,
                refinement, and manufacturing mastery.
              </p>
            </div>

            <div>
              <strong>04</strong>
              <h4>
                Versatile Placement Options
              </h4>
              <p>
                Counter-Top, Wall-Mounted, Under-Sink,
                and Custom Furniture Combination setups.
              </p>
            </div>

            <div>
              <strong>4–11</strong>
              <h4>
                Precision Plate Technology
              </h4>
              <p>
                Medical-Grade Platinum-Coated Titanium
                Plate systems for homes and commercial spaces.
              </p>
            </div>

            <div>
              <strong>100%</strong>
              <h4>
                Complete After-Sales Assurance
              </h4>
              <p>
                Genuine spare parts, reliable service,
                and expert technical support.
              </p>
            </div>
          </div>
        </div>

        <div className="vision-box">
          <div className="about-title">
            <span>03</span>

            <h3>Our Vision</h3>
          </div>

          <p>
            To build a healthier future by making
            advanced hydrogen-rich alkaline water
            accessible to every household, corporate
            space, and wellness center.
          </p>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="cta-section">
        <p className="small-title">
          READY FOR BETTER WATER?
        </p>

        <h2>
          Upgrade Your
          <span> Water Experience.</span>
        </h2>

        <p>
          Discover Maveriqa and choose the right
          water purification solution for your lifestyle.
        </p>

        <a href="#products">
          View Products
        </a>
      </section>

      {/* ================= CONTACT ================= */}

      <section
        id="contact"
        className="contact-section"
      >
        <div className="contact-heading">
          <p className="small-title">
            CONTACT US
          </p>

          <h2>
            Let's Talk About
            <span> Better Water.</span>
          </h2>

          <p>
            Interested in Maveriqa? Contact us for
            product information, orders and enquiries.
          </p>
        </div>

        <div className="contact-cards">
          <div>
            <span className="contact-icon">
              ☎
            </span>

            <small>MOBILE</small>

            <h3>+91 7498998749</h3>

            <a href="tel:91 7498998749">
              Call Now →
            </a>
          </div>

          <div>
            <span className="contact-icon">
              ⌖
            </span>

            <small>ADDRESS</small>

            <h3>
              Get no-447, plot no.B-52-53 Maitri park, 
              khansi machine haveli pune Pimpri chinchwad(M corp)
              411070

            </h3>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer>
        <div>
          <img
            src={logo}
            alt="Maveriqa Logo"
          />

          <p>
            Future-Proof Your Health
          </p>
        </div>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#technology">Technology</a>
          <a href="#water-guide">Water Guide</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <p>
          © 2026 Maveriqa. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;