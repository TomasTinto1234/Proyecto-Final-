import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import logoImg from "../../Image/Logo LookHouse.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../Search/SearchBar";
import { Box, Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

const NavBar = () => {
  const history = useHistory();

  const [navbar, setNavbar] = useState(false);

  const cambioColor = () => {
    /* console.log(window.scrollY); */
    if (window.scrollY > 150) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", cambioColor);

  const buttonCreatePost = (e) => {
    e.preventDefault();
    history.push("/createPost");
  };

  return (
    <div className={`${navbar ? style.containerBg : style.containerBgTop}`}>
      <Flex
        // bg={useColorModeValue("gray.50", "gray.900")}
        // color={useColorModeValue("gray.700", "gray.200")}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={"0rem 0.2rem"}
        w={"100%"}
        h={"60px"}
        // backgroundColor={"gray.100"}
      >
        <Link to="/">
          <Image h={"140px"} marginTop={"20px"} src={logoImg} alt="homeLogo" />
        </Link>
        <Box display={"flex"} alignItems={"center"} marginRight={"10px"}>
          {/* <Box direction={"row"} spacing={6}> */}
          <Box
            marginRight={"10px"}
            px={"1rem"}
            py={".5rem"}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            borderColor={"black"}
            variant="link"
            _hover={{ bg: "white" }}
            _expanded={{ bg: "white" }}
            _focus={{ boxShadow: "outline" }}
          >
            <Link name="property" _hover={{ bg: "#D9D9D9" }} _focus={{ bg: "#D9D9D9" }} to={"/"}>
              Inicio
            </Link>
          </Box>
          <Box
            marginRight={"10px"}
            px={"1rem"}
            py={".5rem"}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            borderColor={"black"}
            variant="link"
            _hover={{ bg: "white" }}
            _expanded={{ bg: "white" }}
            _focus={{ boxShadow: "outline" }}
          >
            <Link
              color={"black"}
              _hover={{ bg: "#D9D9D9" }}
              _focus={{ bg: "#D9D9D9" }}
              to={"/about"}
            >
              Conocenos
            </Link>
          </Box>
          <Box
            marginRight={"10px"}
            px={"1rem"}
            py={".5rem"}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            borderColor={"black"}
            variant="link"
            _hover={{ bg: "white" }}
            _expanded={{ bg: "white" }}
            _focus={{ boxShadow: "outline" }}
          >
            <Link
              color={"black"}
              _hover={{ bg: "#D9D9D9" }}
              _focus={{ bg: "#D9D9D9" }}
              to={"/help"}
            >
              Ayuda
            </Link>
          </Box>
          <Box
            marginRight={"10px"}
            px={"1rem"}
            py={".5rem"}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            borderColor={"black"}
            variant="link"
            _hover={{ bg: "white" }}
            _expanded={{ bg: "white" }}
            _focus={{ boxShadow: "outline" }}
          >
            <Link
              color={"black"}
              _hover={{ bg: "#D9D9D9" }}
              _focus={{ bg: "#D9D9D9" }}
              to={"mailto:lookhousepf@gmail.com"}
            >
              Contactanos
            </Link>
          </Box>
          {/* </Box> */}
          {/* <SearchBar /> */}
          <Button colorScheme="orange" bg="orange" variant="outline" onClick={buttonCreatePost}>
            Publicar
          </Button>
          <Menu>
            <MenuButton aria-label="Options" variant="outline" px={"1rem"} py={".5rem"}>
              <FontAwesomeIcon icon={faCircleUser} className={style.img} />
            </MenuButton>
            <MenuList>
              <Link to="/login">
                <MenuItem>Iniciar Sesión</MenuItem>
              </Link>
              <Link to="/checkin">
                <MenuItem>Registrarte</MenuItem>
              </Link>
              <Link to="/perfilPropietario">
                <MenuItem>Perfil Propietario</MenuItem>
              </Link>
              <Link to="/perfilInquilino">
                <MenuItem>Perfil Inquilino</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </div>
  );
};

export default NavBar;
