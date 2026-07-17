import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRobot } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [sticky, setSticky] = useState(false);

  const { isAuthenticated, setIsAuthenticated } =
    useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const logout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/patient/logout",
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);

      setIsAuthenticated(false);

      navigate("/");

    } catch (error) {
      toast.error(
        error.response?.data?.message
      );
    }
  };

  return (
    <header
      className={
        sticky
          ? "navbar sticky"
          : "navbar"
      }
    >
      <div className="navbar-container">

        {/* LOGO */}

        <Link to="/" className="logo">

          <div className="logo-circle">

            <FaRobot />

          </div>

          <div>

            <h2>
              ShivShakti
            </h2>

            <span>
              AI Healthcare
            </span>

          </div>

        </Link>

        {/* LINKS */}

        <nav
          className={
            showMenu
              ? "nav-links active"
              : "nav-links"
          }
        >
          <Link
            to="/"
            onClick={() =>
              setShowMenu(false)
            }
          >
            Home
          </Link>

          <Link
            to="/appointment"
            onClick={() =>
              setShowMenu(false)
            }
          >
            Appointment
          </Link>

          <Link
            to="/about"
            onClick={() =>
              setShowMenu(false)
            }
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={() =>
              setShowMenu(false)
            }
          >
            Contact
          </Link>

        </nav>

        {/* BUTTON */}

        <div className="navbar-btn">

          {isAuthenticated ? (

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>

          ) : (

            <button
              className="login-btn"
              onClick={() =>
                navigate("/login")
              }
            >
              Login
            </button>

          )}

        </div>

        {/* MOBILE */}

        <div
          className="menu-icon"
          onClick={() =>
            setShowMenu(!showMenu)
          }
        >
          <GiHamburgerMenu />
        </div>

      </div>
    </header>
  );
};

export default Navbar;